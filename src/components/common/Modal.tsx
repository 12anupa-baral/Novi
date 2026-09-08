import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
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

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "a[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
} as const;

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  ariaLabel,
  size = "md",
  showCloseButton = true,
  className = "",
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  /*
   * Lock body scroll and restore focus when the modal closes.
   */
  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }

    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      const firstFocusable =
        dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

      firstFocusable?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * Escape key + focus trap.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/75
        p-4
        backdrop-blur-lg
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? ariaLabel ?? "Dialog"}
        className={[
          "w-full",
          sizeClasses[size],
          "overflow-hidden",
          "rounded-2xl",
          "border border-[var(--border-hi)]",
          "bg-[var(--card)]",
          "shadow-[0_40px_80px_rgba(0,0,0,0.6)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {(title || showCloseButton) && (
          <div
            className="
              flex items-center justify-between
              border-b border-[var(--border)]
              px-6 py-4
            "
          >
            {title ? (
              <h3
                className="
                  font-display
                  text-lg font-medium
                  text-[var(--fg)]
                "
              >
                {title}
              </h3>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="
                  flex h-7 w-7
                  cursor-pointer
                  items-center justify-center
                  rounded-lg
                  text-[var(--fg-muted)]
                  transition-colors duration-200
                  hover:bg-black/[0.06]
                  hover:text-[var(--fg)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--focus-ring)]
                  focus-visible:ring-offset-2
                "
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StepsModal = ({ isOpen, onClose }: StepsModalProps) => {

  const [step, setStep] = useState(0);

  const totalSteps = STEPS.length;
  const currentStep = STEPS[step];

  const handleBack = () => {
    setStep((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setStep((current) => Math.min(totalSteps - 1, current + 1));
  };

  if (!currentStep) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
      ariaLabel={`How Novi works — step ${step + 1} of ${totalSteps}: ${currentStep.title}`}
      size="lg"
    >
      {/* Step indicators */}
      <div
        className="mb-4 flex items-center gap-3"
        role="tablist"
        aria-label="Steps"
      >
        {STEPS.map((item, index) => {
          const isActive = index === step;
          const isCompleted = index < step;

          return (
            <button
              key={item.num}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to step ${index + 1}: ${item.title}`}
              onClick={() => setStep(index)}
              className={[
                "h-2 rounded-full",
                "cursor-pointer",
                "transition-all duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[var(--focus-ring)]",
                "focus-visible:ring-offset-2",
                isActive
                  ? "w-6 bg-[var(--accent)]"
                  : isCompleted
                    ? "w-2 bg-[var(--green)]"
                    : "w-2 bg-[var(--fg-dim)]",
              ].join(" ")}
            />
          );
        })}
      </div>

      {/* Step visual */}
      {currentStep.visual}

      {/* Step text */}
      <div className="mt-5">
        <div
          className="
            mb-2
            text-xs font-semibold
            uppercase tracking-widest
            text-[var(--fg-dim)]
          "
        >
          Step {currentStep.num}
        </div>

        <h3
          className="
            mb-2
            font-display
            text-2xl font-light
            text-[var(--fg)]
          "
        >
          {currentStep.title}
        </h3>

        <p
          className="
            text-sm leading-relaxed
            text-[var(--fg-muted)]
          "
        >
          {currentStep.body}
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {step < totalSteps - 1 ? (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleNext}
          >
            Next step →
          </Button>
        ) : (
          <Button type="button" variant="primary" size="sm" onClick={onClose}>
            Start free
          </Button>
        )}
      </div>
    </Modal>
  );
};
