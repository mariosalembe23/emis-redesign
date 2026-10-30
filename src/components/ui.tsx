import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export const useInView = <T extends Element>(threshold = 0) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
};

export const Separator = () => <div aria-hidden className="em-rail relative z-10 h-6 border-y border-line" />;

export const Reveal = ({
  as: Tag = "section",
  id,
  className = "",
  children,
}: {
  as?: "section" | "div" | "footer";
  id?: string;
  className?: string;
  children: ReactNode;
}) => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag id={id} ref={ref as never} className={`reveal ${inView ? "in" : ""} ${className}`}>
      {children}
    </Tag>
  );
};

export const fmt = (v: number, decimals = 0) => {
  const [int, dec] = v.toFixed(decimals).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
};

export const Counter = ({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 1600);
      setV(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {fmt(v, decimals)}
      {suffix}
    </span>
  );
};

export const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1240px] px-5 @bmd:px-10 ${className}`}>{children}</div>
);
