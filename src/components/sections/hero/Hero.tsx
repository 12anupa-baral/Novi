import { ArrowRight, Play } from "lucide-react";
import LiveBoard from "../../ui/LiveBoard";
import Button from "../../common/Button";
import ButtonLink from "../../common/ButtonLinks";
import type { HeroProps } from "./type";
import FadeIn from "../../common/FadeIn";

const Hero: React.FC<HeroProps> = ({ openModal }) => {

  return (
    <section className="relative overflow-hidden">
      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="grid-texture-hero pointer-events-none absolute inset-0"
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="radial-glow pointer-events-none absolute inset-0"
      />

      <div className="relative pb-8 pt-20">
         <FadeIn delay={0.08}>
          {/* Announcement */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-3 py-1.5 text-xs text-[var(--accent)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]"
              />

              Try now and manage your project with ease
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-center font-display text-5xl font-light leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[80px]">
            Run your team
            <br />
            <em className="italic text-[var(--accent)]">
              without
            </em>{" "}
            the tab switching.
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-xl text-center text-lg leading-relaxed text-[var(--fg-muted)] md:text-xl">
            Novi brings tasks, docs, and conversations into one calm
            workspace built for small, fast-moving teams.
          </p>

          {/* CTAs */}
          <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              to="/startfree"
              size="lg"
              rightIcon={ArrowRight}
            >
              Start free
            </ButtonLink>

            <Button
              variant="outline"
              size="lg"
              leftIcon={Play}
              onClick={openModal}
            >
              See how it works
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="text-center text-xs text-[var(--fg-dim)]">
            Trusted by 2,400+ teams · SOC 2 Type II certified
          </p>
        </FadeIn>

        {/* Board graphic */}
        <div
          className="mx-auto mt-16 max-w-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <LiveBoard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
