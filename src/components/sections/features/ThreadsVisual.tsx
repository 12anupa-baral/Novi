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

export const ThreadsVisual = () => {
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
      {messages.map((message) => (
        <div
          key={message.time}
          className={[
            "flex gap-1.5 sm:gap-2",
            message.self ? "flex-row-reverse" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Avatar */}
          <div
            className={[
              "mt-px",
              "flex h-4 w-4 shrink-0",
              "items-center justify-center",
              "rounded-full",
              "text-[8px]",
              "sm:h-5 sm:w-5 sm:text-xs",
              message.self
                ? "bg-[#fff0e8] text-[#e0804a]"
                : "bg-[#ede8ff] text-[var(--violet)]",
            ].join(" ")}
          >
            {message.name[0]}
          </div>

          {/* Message */}
          <div
            className={[
              "max-w-[75%] sm:max-w-[80%]",
              "border border-[var(--border)]",
              "px-2 py-1.5",
              "text-[10px] leading-snug",
              "sm:px-3 sm:py-2 sm:text-xs",
              message.self
                ? "rounded-[12px_12px_4px_12px] bg-[var(--cta-bg-start)]"
                : "rounded-[12px_12px_12px_4px] bg-[#f8f8fb]",
              "text-[var(--fg)]",
            ].join(" ")}
          >
            {message.msg}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadsVisual;
