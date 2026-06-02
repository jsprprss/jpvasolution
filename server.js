import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import serverHandler from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "3000", 10);
const clientDir = "./dist/client";

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const nodeServer = createServer(async (req, res) => {
  const urlPath = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`).pathname;

  /* -------- try static file first -------- */
  const staticPath = join(clientDir, urlPath);
  if (existsSync(staticPath) && !staticPath.endsWith("/")) {
    const ext = extname(staticPath);
    const contentType = mimeTypes[ext] || "application/octet-stream";
    try {
      const data = readFileSync(staticPath);
      res.setHeader("Content-Type", contentType);
      res.end(data);
      return;
    } catch {
      /* fall through to SSR */
    }
  }

  /* -------- collect body -------- */
  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));
  await new Promise((resolve, reject) => {
    req.on("end", resolve);
    req.on("error", reject);
  });
  const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

  /* -------- build Fetch Request -------- */
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const request = new Request(`http://${req.headers.host || "localhost"}${req.url || "/"}`, {
    method: req.method,
    headers,
    body,
  });

  /* -------- delegate to SSR handler -------- */
  try {
    const response = await serverHandler.fetch(request, {}, {});

    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const responseBody = await response.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (error) {
    console.error("SSR error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

nodeServer.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
