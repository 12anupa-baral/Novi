import { Play } from "lucide-react";
import { useFadeIn } from "../../../hooks/useFadeIn";
import { C } from "../../../theme/color";
import LiveBoard from "../../ui/LiveBoard";
import Button from "../../common/Button";
import type { HeroProps } from "./type";

const Hero: React.FC<HeroProps> = ({ openModal }) => {
  const heroRef = useFadeIn(0);

  return (
    <section className="relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 80%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(108,92,231,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-8">
        <div ref={heroRef} className="fade-in-up">
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: C.accentBg,
                border: `1px solid ${C.accentBdr}`,
                color: C.accent,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: C.accent }}
              />
              Try now and manage your project with ease
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-display text-center text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-light leading-[1.04] tracking-tight mb-6">
            Run your team
            <br />
            <em className="italic" style={{ color: C.accent }}>
              without
            </em>{" "}
            the tab switching.
          </h1>

          <p
            className="text-center text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: C.fgMuted }}
          >
            Novi brings tasks, docs, and conversations into one calm workspace
            built for small, fast-moving teams.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
            <Button
              as="a"
              href="#"
              variant="primary"
              size="lg"
              className="shadow-[0_0_28px_rgba(108,92,231,0.28)] hover:shadow-[0_0_40px_rgba(108,92,231,0.42)] hover:-translate-y-0.5"
            >
              Start free — No card needed
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={Play}
              onClick={openModal}
            >
              See how it works
            </Button>
          </div>

          <p className="text-center text-xs" style={{ color: C.fgDim }}>
            Trusted by 2,400+ teams · SOC 2 Type II certified
          </p>
        </div>

        {/* Board graphic */}
        <div
          className="mt-16 max-w-3xl mx-auto animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <LiveBoard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
