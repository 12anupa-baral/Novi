import { C } from "../../../theme/color";

export const ThreadsVisual = () => {
  const messages = [
    {
      name: "Lena",
      msg: "Attached the new Figma link — take a look before standup",
      self: false,
      time: "9:14",
    },
    {
      name: "Marcus",
      msg: "On it. Left a few comments on the settings flow",
      self: true,
      time: "9:22",
    },
    {
      name: "Lena",
      msg: "Perfect. Kira just approved the direction ✓",
      self: false,
      time: "9:31",
    },
  ];

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 mt-4 pointer-events-none select-none">
      {messages.map((m) => (
        <div
          key={m.time}
          className={`flex gap-1.5 sm:gap-2 ${m.self ? "flex-row-reverse" : ""}`}
        >
          <div
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] sm:text-xs"
            style={{
              background: m.self ? "#fff0e8" : "#ede8ff",
              color: m.self ? "#e0804a" : C.violet,
              marginTop: 1,
            }}
          >
            {m.name[0]}
          </div>
          <div
            className="max-w-[75%] sm:max-w-[80%] rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs leading-snug"
            style={{
              background: m.self ? "#f0eeff" : "#f8f8fb",
              border: `1px solid ${C.border}`,
              color:  C.fg,
              borderRadius: m.self
                ? "12px 12px 4px 12px"
                : "12px 12px 12px 4px",
            }}
          >
            {m.msg}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadsVisual;
