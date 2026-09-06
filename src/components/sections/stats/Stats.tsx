import { useCountUp } from "../../../hooks/useCountUp";
import { useFadeIn } from "../../../hooks/useFadeIn";
import { C } from "../../..//theme/color";

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
        className="font-display text-4xl md:text-5xl font-light mb-1.5 block"
        style={{ color: C.fg }}
      >
        {display}
      </span>
      <div className="text-sm" style={{ color: C.fgMuted }}>
        {label}
      </div>
    </div>
  );
};

export const Stats = () => {
  const statsRef = useFadeIn(0);

  return (
    <div
      style={{
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div ref={statsRef} className="fade-in-up py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat target={2400} suffix="+" label="Teams using Novi" />
          <Stat target={98} suffix="%" label="Sprint completion rate" />
          <Stat target={40} suffix="%" label="Fewer status meetings" />
          <Stat target={8} suffix=" min" label="Average setup time" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
