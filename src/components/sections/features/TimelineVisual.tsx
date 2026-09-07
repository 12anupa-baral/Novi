import type { CSSProperties } from "react";

const bars = [
  {
    label: "Design",
    width: "65%",
    offset: "0%",
    color: "var(--violet)",
  },
  {
    label: "Dev",
    width: "45%",
    offset: "20%",
    color: "var(--accent)",
  },
  {
    label: "QA",
    width: "25%",
    offset: "55%",
    color: "var(--green)",
  },
  {
    label: "Launch",
    width: "10%",
    offset: "80%",
    color: "var(--amber)",
  },
];

const months = ["Aug", "Sep", "Oct", "Nov"];

export const TimelineVisual = () => {
  return (
    <div
      className="
        mt-4
        flex flex-col
        gap-1.5
        pointer-events-none
        select-none
        sm:gap-2
      "
      aria-hidden="true"
    >
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="
              w-10 shrink-0
              text-[10px]
              text-[var(--fg-muted)]
              sm:w-14 sm:text-xs
            "
          >
            {bar.label}
          </span>

          <div
            className="
              relative
              h-1 flex-1
              overflow-hidden
              rounded-full
              bg-[#e8e8f0]
              sm:h-1.5
            "
          >
            <div
              className="
                absolute
                h-full
                rounded-full
                bg-[var(--bar-color)]
                opacity-70
              "
              style={
                {
                  "--bar-color": bar.color,
                  left: bar.offset,
                  width: bar.width,
                } as CSSProperties
              }
            />
          </div>
        </div>
      ))}

      <div className="mt-0.5 flex justify-between sm:mt-1">
        {months.map((month) => (
          <span
            key={month}
            className="
              text-[8px]
              text-[var(--fg-dim)]
              sm:text-xs
            "
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimelineVisual;
