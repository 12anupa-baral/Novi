import { C } from "../../../theme/color";

export const TimelineVisual = () => {
  const bars = [
    { label: "Design", w: "65%", offset: "0%", color: C.violet },
    { label: "Dev", w: "45%", offset: "20%", color: C.accent },
    { label: "QA", w: "25%", offset: "55%", color: C.green },
    { label: "Launch", w: "10%", offset: "80%", color: C.amber },
  ];

  return (
    <div className="mt-4 flex flex-col gap-1.5 sm:gap-2 pointer-events-none select-none">
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="text-[10px] sm:text-xs w-10 sm:w-14 flex-shrink-0"
            style={{ color: C.fgMuted }}
          >
            {b.label}
          </span>
          <div
            className="flex-1 h-1 sm:h-1.5 rounded-full relative"
            style={{  background: "#e8e8f0" }}
          >
            <div
              className="absolute h-full rounded-full"
              style={{
                left: b.offset,
                width: b.w,
                background: b.color,
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-0.5 sm:mt-1">
        {["Aug", "Sep", "Oct", "Nov"].map((m) => (
          <span
            key={m}
            className="text-[8px] sm:text-xs"
            style={{ color: C.fgDim }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimelineVisual;
