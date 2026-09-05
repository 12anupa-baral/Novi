import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { C } from "../../theme/color";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "light";
  className?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", error = false, ...rest }, ref) => {
    const baseStyles = {
      background: variant === "light" ? "rgba(255,255,255,0.6)" : C.surface,
      border: `1px solid ${error ? "#e74c3c" : C.border}`,
      color: C.fg,
      outline: "none",
      transition: "border-color 0.2s ease",
    };

    return (
      <input
        ref={ref}
        className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors ${className}`}
        style={baseStyles}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = C.accentBdr;
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = C.border;
          }
        }}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
