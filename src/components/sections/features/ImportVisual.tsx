import type { CSSProperties } from "react";

const tools = [
  { name: "Trello", color: "#0052CC", label: "T" },
  { name: "Asana", color: "#F06A6A", label: "A" },
  { name: "Sheets", color: "#0F9D58", label: "S" },
];

export const ImportVisual = () => {
  return (
    <div
      className="
        mt-4
        flex flex-wrap
        items-center justify-center
        gap-2
        pointer-events-none
        select-none
        sm:gap-3
      "
      aria-hidden="true"
    >
      {tools.map((tool, index) => (
        <div key={tool.name} className="flex items-center gap-1 sm:gap-2">
          <div
            className="
              flex
              h-6 w-6
              items-center justify-center
              rounded-lg
              text-[10px] font-bold text-white
              sm:h-8 sm:w-8 sm:text-xs
              bg-[var(--tool-color)]
            "
            style={
              {
                "--tool-color": tool.color,
              } as CSSProperties
            }
          >
            {tool.label}
          </div>

          {index < tools.length - 1 && (
            <svg
              viewBox="0 0 20 8"
              className="h-1.5 w-3 sm:h-2 sm:w-5"
              aria-hidden="true"
            >
              <path
                d="M0 4h14M10 1l4 3-4 3"
                stroke="var(--fg-dim)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </div>
      ))}

      {/* Final destination — Novi logo */}
      <div
        className="
          flex
          h-6 w-6
          items-center justify-center
          rounded-lg
          border
          border-[var(--accent-border)]
          bg-[var(--accent-bg)]
          text-[10px] font-bold
          text-[var(--accent)]
          sm:h-8 sm:w-8 sm:text-xs
        "
      >
        N
      </div>
    </div>
  );
};

export default ImportVisual;
