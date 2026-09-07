const columns = [
  {
    label: "To Do",
    dot: "bg-[var(--fg-dim)]",
    tasks: ["Audit flow", "Write notes"],
  },
  {
    label: "Doing",
    dot: "bg-[var(--accent)]",
    tasks: ["Settings redesign"],
  },
  {
    label: "Done",
    dot: "bg-[var(--green)]",
    tasks: ["v2.4 shipped", "Auth fix"],
  },
];

export const BoardsVisual = () => {
  return (
    <div
      className="
        pointer-events-none
        mt-4
        flex select-none
        flex-col gap-2
        sm:flex-row sm:gap-3
      "
      aria-hidden="true"
    >
      {columns.map(({ label, dot, tasks }) => (
        <div
          key={label}
          className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2"
        >
          <div className="mb-0.5 flex items-center gap-1">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />

            <span className="text-[10px] text-[var(--fg-muted)] sm:text-xs">
              {label}
            </span>
          </div>

          {tasks.map((task) => (
            <div
              key={task}
              className="
                rounded-lg
                border border-[var(--border)]
                bg-[var(--surface)]
                px-2 py-1.5
                text-[10px]
                text-[var(--fg-muted)]
                sm:text-xs
              "
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
