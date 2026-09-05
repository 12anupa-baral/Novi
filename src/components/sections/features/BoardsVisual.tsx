import { C } from "../../../theme/color";

export const BoardsVisual = () => {
  const columns = [
    { label: "To Do", color: C.fgDim, tasks: ["Audit flow", "Write notes"] },
    { label: "Doing", color: C.accent, tasks: ["Settings redesign"] },
    { label: "Done", color: C.green, tasks: ["v2.4 shipped", "Auth fix"] },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 pointer-events-none select-none">
      {columns.map((col) => (
        <div key={col.label} className="flex-1 flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 mb-0.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: col.color }}
            />
            <span
              className="text-[10px] sm:text-xs"
              style={{ color: C.fgMuted }}
            >
              {col.label}
            </span>
          </div>
          {col.tasks.map((task) => (
            <div
              key={task}
              className="rounded-lg px-2 py-1.5 text-[10px] sm:text-xs"
              style={{
                background: "#f5f5f9",
                border: `1px solid ${C.border}`,
                color: C.fgMuted,
              }}
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardsVisual;
