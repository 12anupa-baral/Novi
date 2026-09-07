import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  threshold?: number;
}

const numberFormatter = new Intl.NumberFormat();

export function useCountUp(
  target = 0,
  suffix = "",
  { duration = 1400, threshold = 0.5 }: UseCountUpOptions = {},
) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let animationFrameId = 0;
    let started = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const startAnimation = () => {
      if (started) return;
      started = true;

      if (prefersReducedMotion) {
        setValue(target);
        return;
      }

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextValue = Math.floor(eased * target);

        setValue(nextValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setValue(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        startAnimation();
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, threshold]);

  return {
    ref,
    display: `${numberFormatter.format(value)}${suffix}`,
  };
}

