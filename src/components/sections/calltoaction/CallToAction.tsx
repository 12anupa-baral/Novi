import { ArrowRight } from "lucide-react";
import Button from "../../common/Button";
import ButtonLink from "../../common/ButtonLinks";
import FadeIn from "../../common/FadeIn";

interface CallToActionProps {
  openModal: () => void;
}

const CallToAction = ({ openModal }: CallToActionProps) => {
  return (
    <section className="py-8">
      <FadeIn delay={0.08}>
        <div className="cta-background relative overflow-hidden rounded-3xl border border-[var(--border-hi)]">
          {/* Grid texture */}
          <div
            aria-hidden="true"
            className="grid-texture pointer-events-none absolute inset-0"
          />

          {/* Bottom glow */}
          <div
            aria-hidden="true"
            className="
              cta-glow
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-48
              w-96
              -translate-x-1/2
              rounded-full
              blur-3xl
            "
          />

          {/* Content */}
          <div className="relative px-8 py-16 text-center md:px-16">
            <h2 className="mb-4 font-display text-4xl font-light leading-snug text-[var(--fg)] md:text-5xl">
              Ready to calm
              <br />
              <em className="italic text-[var(--accent)]">the chaos?</em>
            </h2>

            <p className="mx-auto mb-8 max-w-md text-base text-[var(--fg-muted)]">
              Set up in under five minutes. Invite your team and start shipping.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to="/startfree" size="lg" rightIcon={ArrowRight}>
                Start free
              </ButtonLink>

              <Button variant="outline" size="lg" onClick={openModal}>
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default CallToAction;
