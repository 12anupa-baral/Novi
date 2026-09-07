import type { CSSProperties, ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  colSpan?: 1 | 2;
}

export const Card = ({
  children,
  accentColor = "var(--accent)",
  className = "",
  colSpan = 1,
}: CardProps) => {
  const style = {
    "--card-accent": accentColor,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={[
        "min-h-[200px]",
        "rounded-2xl",
        "border border-[var(--border)]",
        "bg-[var(--card)]",
        "p-6",
        "transition-all duration-300",
        "hover:border-[color-mix(in_srgb,var(--card-accent)_40%,var(--border))]",
        colSpan === 2 ? "col-span-2" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};
