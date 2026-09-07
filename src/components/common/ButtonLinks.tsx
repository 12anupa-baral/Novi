import { forwardRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface ButtonLinkProps extends Omit<LinkProps, "className"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3.5 text-base",
} as const;

const variantClasses = {
  primary: `
    border border-transparent
    bg-[var(--accent)]
    text-white
    hover:bg-[var(--violet)]
  `,

  secondary: `
    border border-[var(--border)]
    bg-black/[0.02]
    text-[var(--fg)]
    hover:border-[var(--border-hi)]
    hover:bg-black/[0.05]
  `,

  outline: `
    border border-[var(--border)]
    bg-transparent
    text-[var(--fg)]
    hover:border-[var(--border-hi)]
    hover:bg-black/[0.03]
  `,

  ghost: `
    border border-transparent
    bg-transparent
    text-[var(--fg-muted)]
    hover:bg-black/[0.04]
    hover:text-[var(--fg)]
  `,

  danger: `
    border border-transparent
    bg-red-500
    text-white
    hover:bg-red-600
  `,
} as const;

const baseClasses = `
  inline-flex
  items-center
  justify-center
  gap-2
  rounded-xl
  font-medium
  transition-all
  duration-200
  ease-out
  cursor-pointer

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[var(--focus-ring)]
  focus-visible:ring-offset-2

  active:scale-[0.98]
`;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      className = "",
      ...rest
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        className={[
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {LeftIcon && (
          <LeftIcon
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
          />
        )}

        {children && <span>{children}</span>}

        {RightIcon && (
          <RightIcon
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
          />
        )}
      </Link>
    );
  },
);

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
