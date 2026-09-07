import type { CSSProperties, ReactNode } from "react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor?: string;
  colSpan?: 1 | 2;
  children?: ReactNode;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  children,
  accentColor = "var(--accent)",
  colSpan = 1,
  className = "",
}: FeatureCardProps) => {
  const style = {
    "--feature-accent": accentColor,
  } as CSSProperties;

  return (
    <Card colSpan={colSpan} className={className} accentColor={accentColor}>
      <div
        className="
          mb-4
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          bg-[color-mix(in_srgb,var(--feature-accent)_13%,transparent)]
        "
        style={style}
      >
        {icon}
      </div>

      <h3 className="mb-1.5 text-base font-medium text-[var(--fg)]">{title}</h3>

      <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
        {description}
      </p>

      {children}
    </Card>
  );
};

export default FeatureCard;
