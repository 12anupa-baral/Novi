import type { ReactNode } from "react";
import { Card } from "./Card";
import { C } from "../../theme/color";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor?: string;
  colSpan?: 1 | 2;
  children?: ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  children,
  accentColor = C.accent,
  colSpan = 1,
  className = '',
}) => (
  <Card
    accentColor={accentColor}
    colSpan={colSpan}
    className={className}  
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${accentColor}22` }}>
      {icon}
    </div>
    <h3 className="text-base font-medium mb-1.5" style={{ color: C.fg }}>
      {title}
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: C.fgMuted }}>
      {description}
    </p>
    {children}
  </Card>
);

export default FeatureCard