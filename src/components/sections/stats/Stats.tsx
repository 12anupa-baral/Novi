import { useCountUp } from "../../../hooks/useCountUp";
import FadeIn from "../../common/FadeIn";

interface StatProps {
  target: number;
  suffix: string;
  label: string;
}

const Stat = ({ target, suffix, label }: StatProps) => {
  const { ref, display } = useCountUp(target, suffix);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="
          mb-1.5
          block
          font-display
          text-4xl font-light
          text-[var(--fg)]
          md:text-5xl
        "
      >
        {display}
      </span>

      <div className="text-sm text-[var(--fg-muted)]">{label}</div>
    </div>
  );
};

export const Stats = () => {
  return (
    <section
      className="
        border-y
        border-[var(--border)]
      "
      aria-label="Novi statistics"
    >
      <FadeIn delay={0.08}>
        <div
          className="
            grid
            grid-cols-2
            gap-8
            md:grid-cols-4
            py-16
          "
        >
          <Stat target={2400} suffix="+" label="Teams using Novi" />

          <Stat target={98} suffix="%" label="Sprint completion rate" />

          <Stat target={40} suffix="%" label="Fewer status meetings" />

          <Stat target={8} suffix=" min" label="Average setup time" />
        </div>
      </FadeIn>
    </section>
  );
};

export default Stats;
