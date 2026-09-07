import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "light";
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", error = false, className = "", ...rest }, ref) => {
    const variantClass =
      variant === "light" ? "bg-white/60" : "bg-[var(--surface)]";

    const borderClass = error
      ? "border-red-500 focus:border-red-500"
      : ["border-[var(--border)]", "focus:border-[var(--accent-border)]"].join(
          " ",
        );

    return (
      <input
        ref={ref}
        className={[
          "w-full",
          "rounded-lg",
          "border",
          "px-3 py-2",
          "text-sm",
          "text-[var(--fg)]",
          "outline-none",
          "transition-colors duration-200",
          "placeholder:text-[var(--fg-dim)]",
          variantClass,
          borderClass,
          "focus:ring-2",
          "focus:ring-[var(--accent-bg)]",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error || undefined}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
