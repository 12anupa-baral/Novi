import React, { forwardRef } from "react";
import type { ReactNode } from "react";
import { C } from "../../theme/color";
import type { LucideIcon } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  as?: "button" | "a";
  className?: string;
  disabled?: boolean;
  href?: string;
}

interface VariantStyle {
  base: {
    background: string;
    color: string;
    border: string;
  };
  hover: {
    background?: string;
    color?: string;
    borderColor?: string;
    opacity?: number;
  };
}

const variantStyles: Record<
  NonNullable<ButtonProps["variant"]>,
  VariantStyle
> = {
  primary: {
    base: { background: C.accent, color: C.bg, border: "none" },
    hover: { opacity: 0.88 },
  },
  secondary: {
    base: {
      background: "rgba(255,255,255,0.05)",
      color: C.fg,
      border: `1px solid ${C.border}`,
    },
    hover: { background: "rgba(255,255,255,0.09)" },
  },
  outline: {
    base: {
      background: "transparent",
      color: C.fgMuted,
      border: `1px solid ${C.border}`,
    },
    hover: { color: C.fg, borderColor: C.borderHi },
  },
  ghost: {
    base: { background: "transparent", color: C.fgMuted, border: "none" },
    hover: { color: C.fg, background: "rgba(255,255,255,0.03)" },
  },
  danger: {
    base: { background: "#e74c3c", color: "#fff", border: "none" },
    hover: { opacity: 0.85 },
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      as: Component = "button",
      className = "",
      disabled = false,
      href,
      ...rest
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    const { base, hover } = variantStyles[variant];

    const commonClasses = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ${sizeClasses[size]} ${className}`;

    const style = {
      ...base,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    };

    const handleHoverStart = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = e.currentTarget;
      if (hover.background) el.style.background = hover.background;
      if (hover.color) el.style.color = hover.color;
      if (hover.borderColor) el.style.borderColor = hover.borderColor;
      if (hover.opacity) el.style.opacity = String(hover.opacity);
    };

    const handleHoverEnd = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = e.currentTarget;
      el.style.background = base.background;
      el.style.color = base.color;
      el.style.borderColor = base.border;
      el.style.opacity = "1";
    };

    const content = (
      <>
        {LeftIcon && <LeftIcon className="w-4 h-4" />}
        {children && <span>{children}</span>}
        {RightIcon && <RightIcon className="w-4 h-4" />}
      </>
    );

    if (Component === "a") {
      return (
        <a
          href={href || "#"}
          className={commonClasses}
          style={style}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={commonClasses}
        style={style}
        disabled={disabled}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
