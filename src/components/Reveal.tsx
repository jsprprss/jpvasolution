import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({ children, delay = 0, y = 24, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      style={{
        transform: shown ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
        opacity: shown ? 1 : 0,
        transition: `opacity 800ms ease, transform 900ms cubic-bezier(.2,.7,.2,1)`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}
