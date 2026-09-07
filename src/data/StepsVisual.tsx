import { Check, Plus } from "lucide-react";
import type { Step } from "../types";

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Create your workspace",
    body: "Give your team a home. Name your first project, pick a workflow template, and you're in — no onboarding call required.",
    visual: (
      <div
        className="
          relative
          flex h-44 w-full
          items-center justify-center
          overflow-hidden
          rounded-xl
          border border-[var(--border)]
          bg-[#0f0f13]
        "
      >
        <div className="flex w-56 flex-col gap-2">
          {["Sprint 9", "Design System", "Q3 Launch"].map((name, index) => {
            const active = index === 0;

            return (
              <div
                key={name}
                className={[
                  "flex items-center gap-3",
                  "rounded-lg",
                  "border",
                  "px-3 py-2",
                  active
                    ? "border-[var(--accent-border)] bg-[var(--accent-bg)]"
                    : "border-[var(--border)] bg-[#141418]",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-2 w-2 rounded-full",
                    active ? "bg-[var(--accent)]" : "bg-[var(--fg-dim)]",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-xs",
                    active ? "text-[var(--accent)]" : "text-[var(--fg-muted)]",
                  ].join(" ")}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="
            absolute bottom-3 right-3
            flex h-8 w-8
            items-center justify-center
            rounded-full
            bg-[var(--accent)]
          "
        >
          <Plus
            aria-hidden="true"
            className="h-4 w-4 text-[#0b0b0e]"
            strokeWidth={2.5}
          />
        </div>
      </div>
    ),
  },

  {
    num: "02",
    title: "Invite your team",
    body: "Send a link. That's it. Your team lands straight in the workspace, not a tutorial maze. Everyone's up to speed in under a minute.",
    visual: (
      <div
        className="
          relative
          flex h-44 w-full
          items-center justify-center
          overflow-hidden
          rounded-xl
          border border-[var(--border)]
          bg-[#0f0f13]
        "
      >
        <div className="flex -space-x-3">
          {[
            ["L", "#3a2a6a"],
            ["M", "#1a3028"],
            ["K", "#2a2a14"],
            ["A", "#2a1a14"],
            ["+", "#1e1e28"],
          ].map(([label, background], index) => {
            const isAdd = label === "+";

            return (
              <div
                key={label}
                className={[
                  "relative",
                  "flex h-10 w-10",
                  "items-center justify-center",
                  "rounded-full",
                  "text-xs font-semibold",
                  isAdd
                    ? [
                        "border-2 border-dashed",
                        "border-[var(--accent-border)]",
                        "bg-[var(--accent-bg)]",
                        "text-[var(--accent)]",
                      ].join(" ")
                    : ["border-2 border-[var(--bg)]", "text-[var(--fg)]"].join(
                        " ",
                      ),
                ].join(" ")}
                style={{
                  backgroundColor: isAdd ? undefined : background,
                  zIndex: 5 - index,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>

        <div
          className="
            absolute inset-x-0 bottom-4
            flex justify-center
          "
        >
          <div
            className="
              rounded-full
              border border-[var(--accent-border)]
              bg-[var(--accent-bg)]
              px-4 py-1.5
              text-xs
              text-[var(--accent)]
            "
          >
            Invite link copied ✓
          </div>
        </div>
      </div>
    ),
  },

  {
    num: "03",
    title: "Ship without the chaos",
    body: "Boards, threads, and timelines work together so nothing slips. Your team knows what's happening and who owns what — always.",
    visual: (
      <div
        className="
          relative
          h-44 w-full
          overflow-hidden
          rounded-xl
          border border-[var(--border)]
          bg-[#0f0f13]
          p-4
        "
      >
        <div className="flex flex-col gap-2">
          {[
            {
              label: "v2.4 shipped",
              done: true,
              color: "var(--green)",
            },
            {
              label: "Onboarding redesign",
              done: true,
              color: "var(--green)",
            },
            {
              label: "Mobile app beta",
              done: false,
              color: "var(--accent)",
            },
          ].map(({ label, done, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={[
                  "flex h-5 w-5 shrink-0",
                  "items-center justify-center",
                  "rounded-full",
                  "border",
                  done
                    ? "border-[color-mix(in_srgb,var(--green)_20%,transparent)] bg-[color-mix(in_srgb,var(--green)_10%,transparent)]"
                    : "border-[var(--accent-border)] bg-[var(--accent-bg)]",
                ].join(" ")}
              >
                {done ? (
                  <Check
                    aria-hidden="true"
                    className="h-2.5 w-2.5 text-[var(--green)]"
                    strokeWidth={1.5}
                  />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </div>

              <div
                className="
                  h-1.5
                  flex-1
                  overflow-hidden
                  rounded-full
                  bg-[#1e1e28]
                "
              >
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-in-out"
                  style={{
                    width: done ? "100%" : "68%",
                    backgroundColor: color,
                  }}
                />
              </div>

              <span
                className={[
                  "w-8 text-right text-xs",
                  done ? "text-[var(--green)]" : "text-[var(--accent)]",
                ].join(" ")}
              >
                {done ? "100%" : "68%"}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 right-3">
          <div
            className="
              flex items-center gap-1.5
              rounded-full
              bg-[var(--accent-bg)]
              px-2.5 py-1
              text-xs
              text-[var(--accent)]
            "
          >
            <div
              className="
                h-1.5 w-1.5
                animate-pulse
                rounded-full
                bg-[var(--accent)]
              "
            />
            Sprint on track
          </div>
        </div>
      </div>
    ),
  },
];
