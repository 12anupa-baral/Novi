import React, { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { C } from "../../theme/color";
import Button from "../common/Button";
import { STEPS } from "../../data/StepsVisual";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  ariaLabel,
  size = "md",
  showCloseButton = true,
  className = "",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      triggerRef.current = document.activeElement as HTMLElement;
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "unset";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape, and trap Tab focus inside the dialog
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? ariaLabel ?? "Dialog"}
        className={`w-full ${sizeClasses[size]} rounded-2xl overflow-hidden ${className}`}
        style={{
          background: C.card,
          border: `1px solid ${C.borderHi}`,
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `1px solid ${C.border}` }}
          >
            {title && (
              <h3
                className="font-display text-lg font-medium"
                style={{ color: C.fg }}
              >
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: C.fgMuted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.06)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StepsModal: React.FC<StepsModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const totalSteps = STEPS.length;

  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleNext = () => setStep((s) => Math.min(totalSteps - 1, s + 1));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      ariaLabel={`How Novi works — step ${step + 1} of ${totalSteps}: ${STEPS[step].title}`}
    >
      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-4">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="transition-all duration-200"
            style={{
              width: i === step ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === step ? C.accent : i < step ? C.green : C.fgDim,
            }}
          />
        ))}
      </div>

      {/* Visual */}
      {STEPS[step].visual}

      {/* Text content */}
      <div className="mt-5">
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: C.fgDim }}
        >
          Step {STEPS[step].num}
        </div>
        <h3
          className="font-display text-2xl font-light mb-2"
          style={{ color: C.fg }}
        >
          {STEPS[step].title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: C.fgMuted }}>
          {STEPS[step].body}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={handleBack}
          className={step === 0 ? "opacity-40 cursor-not-allowed" : ""}
        >
          Back
        </Button>
        {step < totalSteps - 1 ? (
          <Button variant="primary" size="sm" onClick={handleNext}>
            Next step →
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onClose}>
            Start free
          </Button>
        )}
      </div>
    </Modal>
  );
};
