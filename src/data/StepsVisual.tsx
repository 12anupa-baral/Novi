import { Check, Plus } from "lucide-react";
import { C } from "../theme/color";
import type { Step } from "../types";

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Create your workspace",
    body: "Give your team a home. Name your first project, pick a workflow template, and you're in — no onboarding call required.",
    visual: (
      <div
        className="relative w-full h-44 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: "#0f0f13", border: `1px solid ${C.border}` }}
      >
        <div className="flex flex-col gap-2 w-56">
          {["Sprint 9", "Design System", "Q3 Launch"].map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{
                background: i === 0 ? C.accentBg : "#141418",
                border: `1px solid ${i === 0 ? C.accentBdr : C.border}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: i === 0 ? C.accent : C.fgDim }}
              />
              <span
                className="text-xs"
                style={{ color: i === 0 ? C.accent : C.fgMuted }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: C.accent }}
        >
          <Plus className="w-4 h-4" stroke="#0b0b0e" strokeWidth={2.5} />
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
        className="relative w-full h-44 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: "#0f0f13", border: `1px solid ${C.border}` }}
      >
        <div className="flex -space-x-3">
          {[
            ["L", "#3a2a6a"],
            ["M", "#1a3028"],
            ["K", "#2a2a14"],
            ["A", "#2a1a14"],
            ["+", "#1e1e28"],
          ].map(([l, bg], i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold border-2"
              style={{
                background: bg,
                color: C.fg,
                borderColor: C.bg,
                zIndex: 5 - i,
                ...(l === "+"
                  ? {
                      background: C.accentBg,
                      color: C.accent,
                      border: `2px dashed ${C.accentBdr}`,
                    }
                  : {}),
              }}
            >
              {l}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div
            className="px-4 py-1.5 rounded-full text-xs"
            style={{
              background: C.accentBg,
              color: C.accent,
              border: `1px solid ${C.accentBdr}`,
            }}
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
        className="relative w-full h-44 rounded-xl overflow-hidden p-4"
        style={{ background: "#0f0f13", border: `1px solid ${C.border}` }}
      >
        <div className="flex flex-col gap-2">
          {[
            { label: "v2.4 shipped", done: true, color: C.green },
            { label: "Onboarding redesign", done: true, color: C.green },
            { label: "Mobile app beta", done: false, color: C.accent },
          ].map(({ label, done, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: done ? C.greenBg : C.accentBg,
                  border: `1px solid ${done ? C.green : C.accent}22`,
                }}
              >
                {done ? (
                  <Check
                    className="w-2.5 h-2.5"
                    stroke={C.green}
                    strokeWidth={1.5}
                  />
                ) : (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: C.accent }}
                  />
                )}
              </div>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: "#1e1e28" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: done ? "100%" : "68%",
                    background: color,
                    transition: "width 1s ease",
                  }}
                />
              </div>
              <span
                className="text-xs w-8 text-right"
                style={{ color: done ? C.green : C.accent }}
              >
                {done ? "100%" : "68%"}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 right-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
            style={{ background: C.accentBg, color: C.accent }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: C.accent }}
            />
            Sprint on track
          </div>
        </div>
      </div>
    ),
  },
];
