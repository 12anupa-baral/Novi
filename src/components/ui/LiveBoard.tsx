import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
  active = false,
  done = false,
}: TaskCardProps) => {
  return (
    <div
      className={[
        "rounded-xl p-3",
        "border",
        active
          ? "border-[rgba(200,245,90,0.18)] bg-[#161620]"
          : "border-[rgba(255,255,255,0.04)] bg-[#0d0d11]",
        done ? "opacity-45" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {active && (
        <div className="mb-2 flex items-center gap-1">
          <div
            className="
              h-1 w-1
              animate-pulse
              rounded-full
              bg-[var(--accent)]
            "
          />

          <span
            className="
              text-[10px]
              text-[var(--accent)]
            "
          >
            in progress
          </span>
        </div>
      )}

      <div
        className={[
          "text-xs leading-snug",
          done ? "text-[var(--fg-dim)] line-through" : "text-[#d4d0c8]",
        ].join(" ")}
      >
        {title}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span
          className="
            inline-block
            rounded
            px-1.5 py-0.5
            text-[10px]
          "
          style={{
            backgroundColor: tc,
            color: tt,
          }}
        >
          {tag}
        </span>

        <div
          className="
            flex
            h-4 w-4
            items-center justify-center
            rounded-full
            bg-[#1e1e28]
            text-[9px]
            text-[var(--fg-muted)]
          "
        >
          {assignee}
        </div>
      </div>
    </div>
  );
};

const AddTaskButton = () => {
  return (
    <button
      type="button"
      className="
        flex
        cursor-pointer
        items-center gap-1.5
        rounded-lg
        border
        border-dashed
        border-[var(--fg-dim)]
        px-2 py-1.5
        text-[var(--fg-dim)]
        transition-colors
        hover:border-[var(--fg-muted)]
        hover:text-[var(--fg-muted)]
      "
    >
      <Plus aria-hidden="true" className="h-3 w-3" strokeWidth={1.5} />
      <span className="text-xs">Add task</span>
    </button>
  );
};

const LiveBoard = () => {
  const [notifIdx, setNotifIdx] = useState(0);
  const [notifKey, setNotifKey] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNotifIdx((index) => (index + 1) % NOTIFS.length);
      setNotifKey((key) => key + 1);
    }, 3600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const notification = NOTIFS[notifIdx];

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-2xl
          bg-[radial-gradient(ellipse_at_50%_80%,var(--accent)_0%,transparent_65%)]
          opacity-15
          blur-3xl
        "
      />

      {/* Notification badge */}
      <div
        key={notifKey}
        className="
          animate-notif
          absolute
          -top-4 left-1/2
          z-20
          flex
          -translate-x-1/2
          items-center
          gap-2
          whitespace-nowrap
          rounded-full
          border
          border-[var(--border)]
          bg-[#111118]
          px-3 py-1.5
          text-xs
          text-[var(--fg-muted)]
          shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        "
      >
        <span style={{ color: notification.color }} aria-hidden="true">
          {notification.icon}
        </span>

        {notification.text}

        <span className="text-[var(--fg-dim)]">· just now</span>
      </div>

      {/* Window frame */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[rgba(255,255,255,0.1)]
          bg-[#0e0e13]
        "
      >
        {/* Chrome */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            bg-[#09090c]
            px-4 py-2.5
          "
        >
          {/* Window controls */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Sprint */}
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                items-center gap-1.5
                rounded-md
                bg-[#141418]
                px-3 py-1
                font-mono
                text-xs
                text-[var(--fg-dim)]
              "
            >
              <div
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-[var(--accent)]
                "
              />
              sprint-9 · design
            </div>
          </div>

          {/* Team avatars */}
          <div className="flex items-center gap-2">
            {[
              ["L", "#3a2a6a"],
              ["M", "#1a3028"],
              ["K", "#2a2a14"],
            ].map(([initial, background]) => (
              <div
                key={initial}
                className="
                  flex
                  h-5 w-5
                  items-center justify-center
                  rounded-full
                  text-[9px]
                  text-[var(--fg)]
                "
                style={{ backgroundColor: background }}
              >
                {initial}
              </div>
            ))}
          </div>
        </div>

        {/* Main board */}
        <div className="flex min-h-80">
          {/* Sidebar */}
          <div
            className="
              flex
              w-40
              shrink-0
              flex-col
              gap-0.5
              border-r
              border-[var(--border)]
              p-3
            "
          >
            {SIDEBAR_ITEMS.map(({ icon, label, active }) => (
              <div
                key={label}
                className={[
                  "flex items-center gap-2",
                  "cursor-pointer",
                  "rounded-md",
                  "px-2 py-1.5",
                  "text-xs",
                  active
                    ? "bg-[var(--accent-bg)] text-[var(--accent)]"
                    : "text-[var(--fg-muted)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[10px]",
                    active ? "opacity-100" : "opacity-60",
                  ].join(" ")}
                >
                  {icon}
                </span>

                {label}
              </div>
            ))}

            {/* Sprint progress */}
            <div
              className="
                mt-auto
                border-t
                border-[var(--border)]
                pt-3
              "
            >
              <div className="px-2 py-1.5 text-xs text-[var(--fg-dim)]">
                <div className="mb-1 text-[var(--fg-muted)]">
                  Sprint progress
                </div>

                <div
                  className="
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-[#1e1e28]
                  "
                >
                  <div
                    className="
                      h-full
                      w-[73%]
                      rounded-full
                      bg-[var(--accent)]
                    "
                  />
                </div>

                <div className="mt-1 text-[var(--fg-dim)]">73%</div>
              </div>
            </div>
          </div>

          {/* Board columns */}
          <div className="flex-1 overflow-hidden p-4">
            <div className="flex h-full gap-3">
              {BOARD_COLUMNS.map((column) => (
                <div key={column.col} className="flex flex-1 flex-col gap-2">
                  {/* Column header */}
                  <div className="mb-0.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: column.dot }}
                      />

                      <span className="text-xs text-[var(--fg-muted)]">
                        {column.col}
                      </span>
                    </div>

                    <span
                      className="
                        rounded
                        bg-[#1e1e28]
                        px-1.5
                        text-xs
                        text-[var(--fg-dim)]
                      "
                    >
                      {column.count}
                    </span>
                  </div>

                  {/* Tasks */}
                  {column.tasks.map((task) => (
                    <TaskCard key={task.title} {...task} />
                  ))}

                  <AddTaskButton />
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
