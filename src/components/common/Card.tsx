import type { ReactNode } from 'react';
import { useState } from 'react';
import { C } from '../../theme/color';

export interface CardProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  colSpan?: 1 | 2;
  shadow?: string;       
  hoverShadow?: string;   
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  colSpan = 1,
  shadow = 'none',
  hoverShadow,
  accentColor
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={{
        gridColumn: colSpan === 2 ? 'span 2' : undefined,
        background: C.card,
        border: `1px solid ${isHover && accentColor ? `${accentColor}66` : C.border}`,
        minHeight: 200,
        boxShadow: isHover && hoverShadow ? hoverShadow : shadow,
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {children}
    </div>
  );
};
