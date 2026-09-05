import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number = 0, suffix = "") {
  const [value, setValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();

        let start = 0;
        const duration = 1400;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(step);
          else setValue(target);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  // Guard against undefined or NaN
  const displayValue = (value ?? 0).toLocaleString();
  return { ref, display: displayValue + suffix };
}
