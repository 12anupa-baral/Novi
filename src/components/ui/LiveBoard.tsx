import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { C } from "../../theme/color";
import { BOARD_COLUMNS, NOTIFS, SIDEBAR_ITEMS } from "../../data/Mockdata";

interface TaskCardProps {
  title: string;
  tag: string;
  tc: string;
  tt: string;
  assignee: string;
  active?: boolean;
  done?: boolean;
}

const TaskCard = ({
  title,
  tag,
  tc,
  tt,
  assignee,
  active,
  done,
}: TaskCardProps) => (
  <div
    className="rounded-xl p-3"
    style={{
      background: active ? "#161620" : "#0d0d11",
      border: `1px solid ${active ? "rgba(200,245,90,0.18)" : "rgba(255,255,255,0.04)"}`,
      opacity: done ? 0.45 : 1,
    }}
  >
    {active && (
      <div className="flex items-center gap-1 mb-2">
        <div
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ background: C.accent }}
        />
        <span className="text-xs" style={{ color: C.accent, fontSize: 10 }}>
          in progress
        </span>
      </div>
    )}
    <div
      className="text-xs leading-snug"
      style={{
        color: done ? C.fgDim : "#d4d0c8",
        textDecoration: done ? "line-through" : "none",
      }}
    >
      {title}
    </div>
    <div className="flex items-center justify-between mt-2">
      <span
        className="inline-block px-1.5 py-0.5 rounded text-xs"
        style={{ background: tc, color: tt, fontSize: 10 }}
      >
        {tag}
      </span>
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
        style={{ background: "#1e1e28", color: C.fgMuted, fontSize: 9 }}
      >
        {assignee}
      </div>
    </div>
  </div>
);

//  Add Task Button

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton = ({ onClick }: AddTaskButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left transition-colors hover:bg-white/[0.04]"
    style={{ border: `1px dashed ${C.fgDim}`, color: C.fgDim }}
  >
    <Plus className="w-3 h-3 transition-transform group-hover:rotate-90" stroke="currentColor" strokeWidth={1.5} />
    <span className="text-xs">Add task</span>
  </button>
);

//  LiveBoard

const LiveBoard = () => {
  const [notifIdx, setNotifIdx] = useState(0);
  const [notifKey, setNotifKey] = useState(0);
  const [activeSidebar, setActiveSidebar] = useState("My workspace");
  const [addedTasks, setAddedTasks] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setNotifIdx((i) => (i + 1) % NOTIFS.length);
      setNotifKey((k) => k + 1);
    }, 3600);
    return () => clearInterval(id);
  }, []);

  const notif = NOTIFS[notifIdx];

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl blur-3xl opacity-15"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${C.accent} 0%, transparent 65%)`,
        }}
      />

      {/* Notification badge */}
      <div
        key={notifKey}
        className="animate-notif absolute -top-4 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap"
        style={{
          background: "#111118",
          border: `1px solid ${C.border}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          color: C.fgMuted,
        }}
      >
        <span style={{ color: notif.color }}>{notif.icon}</span>
        {notif.text}
        <span style={{ color: C.fgDim }}>· just now</span>
      </div>

      {/* Window frame */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0e0e13",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Chrome */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            borderBottom: `1px solid ${C.border}`,
            background: "#09090c",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#28c840" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs"
              style={{
                background: "#141418",
                color: C.fgDim,
                fontFamily: "monospace",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: C.accent }}
              />
              sprint-9 · design
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              ["L", "#3a2a6a"],
              ["M", "#1a3028"],
              ["K", "#2a2a14"],
            ].map(([l, bg]) => (
              <div
                key={l}
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ background: bg, color: C.fg, fontSize: 9 }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Main board */}
        <div className="flex" style={{ minHeight: 320 }}>
          {/* Sidebar */}
          <div
            className="w-40 shrink-0 flex flex-col p-3 gap-0.5"
            style={{ borderRight: `1px solid ${C.border}` }}
          >
            {SIDEBAR_ITEMS.map(({ icon, label, active }) => (
              <button
                type="button"
                key={label}
                onClick={() => setActiveSidebar(label)}
                aria-pressed={activeSidebar === label}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-left transition-colors hover:bg-white/[0.04]"
                style={{
                  background: activeSidebar === label ? C.accentBg : "transparent",
                  color: activeSidebar === label ? C.accent : C.fgMuted,
                }}
              >
                <span style={{ fontSize: 10, opacity: active ? 1 : 0.6 }}>
                  {icon}
                </span>
                {label}
              </button>
            ))}
            <div
              className="mt-auto pt-3"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div className="px-2 py-1.5 text-xs" style={{ color: C.fgDim }}>
                <div className="mb-1" style={{ color: C.fgMuted }}>
                  Sprint progress
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "#1e1e28" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "73%", background: C.accent }}
                  />
                </div>
                <div className="mt-1" style={{ color: C.fgDim }}>
                  73%
                </div>
              </div>
            </div>
          </div>

          {/* Board columns */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex gap-3 h-full">
              {BOARD_COLUMNS.map((col) => (
                <div key={col.col} className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: col.dot }}
                      />
                      <span className="text-xs" style={{ color: C.fgMuted }}>
                        {col.col}
                      </span>
                    </div>
                    <span
                      className="text-xs px-1.5 rounded"
                      style={{ background: "#1e1e28", color: C.fgDim }}
                    >
                      {col.count}
                    </span>
                  </div>

                  {col.tasks.map((task) => (
                    <TaskCard key={task.title} {...task} />
                  ))}

                  {col.col === "To do" &&
                    Array.from({ length: addedTasks }, (_, index) => (
                      <TaskCard
                        key={`new-task-${index}`}
                        title="New team task"
                        tag="new"
                        tc="#24301b"
                        tt={C.accent}
                        assignee="Y"
                        active
                      />
                    ))}

                  <AddTaskButton
                    onClick={() => setAddedTasks((count) => count + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBoard;
