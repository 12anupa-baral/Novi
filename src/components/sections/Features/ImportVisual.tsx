import { C } from "../../../theme/color";

export const ImportVisual = () => {
  const tools = [
    { name: "Trello", bg: "#0052CC", label: "T" },
    { name: "Asana", bg: "#F06A6A", label: "A" },
    { name: "Sheets", bg: "#0F9D58", label: "S" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 pointer-events-none select-none">
      {tools.map((tool, idx) => (
        <div key={tool.name} className="flex items-center gap-1 sm:gap-2">
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
            style={{ background: tool.bg }}
          >
            {tool.label}
          </div>
          {idx < tools.length - 1 && (
            <svg viewBox="0 0 20 8" className="w-3 sm:w-5 h-1.5 sm:h-2">
              <path
                d="M0 4h14M10 1l4 3-4 3"
                stroke={C.fgDim}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </div>
      ))}
      {/* Final destination – Novi logo */}
      <div
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold"
        style={{
          background: C.accentBg,
          border: `1px solid ${C.accentBdr}`,
          color: C.accent,
        }}
      >
        N
      </div>
    </div>
  );
};

export default ImportVisual;
