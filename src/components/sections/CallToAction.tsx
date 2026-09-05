import { C } from "../../theme/color";
import { useFadeIn } from "../../hooks/useFadeIn";
import Button from "../common/Button";
interface CallToActionProps {
  openModal: () => void;
}

export const CallToAction = ({ openModal }: CallToActionProps) => {
  const ctaRef = useFadeIn(0);
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div ref={ctaRef} className="fade-in-up">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f0eeff 0%, #e8e2ff 50%, #f0eeff 100%)",
            border: `1px solid ${C.borderHi}`,
          }}
        >
          {/* Subtle grid*/}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(108,92,231,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.06) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl"
            style={{ background: "rgba(108,92,231,0.15)" }}
          />
          <div className="relative px-8 md:px-16 py-16 text-center">
            <h2
              className="font-display text-4xl md:text-5xl font-light leading-snug mb-4"
              style={{ color: C.fg }}
            >
              Ready to calm
              <br />
              <em className="italic" style={{ color: C.accent }}>
                the chaos?
              </em>
            </h2>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: C.fgMuted }}
            >
              Set up in under five minutes. Invite your team and start shipping.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg">
                Start free today
              </Button>
              <Button variant="outline" size="lg" onClick={openModal}>
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
