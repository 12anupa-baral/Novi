import { Clock, Import, LayoutGrid, MessageSquare } from "lucide-react";
import FeatureCard from "../../common/FeatureCard";
import FadeIn from "../../common/FadeIn";
import BoardsVisual from "./BoardsVisual";
import ThreadsVisual from "./ThreadsVisual";
import TimelineVisual from "./TimelineVisual";
import ImportVisual from "./ImportVisual";

const Features = () => {
  return (
    <section id="features" className="py-8">
      <FadeIn delay={0.08}>
        {/* Section heading */}
        <div className="mb-12 max-w-lg">
          <h2
            className="
              mb-4
              font-display
              text-3xl font-light
              leading-snug
              text-[var(--fg)]
              md:text-4xl
            "
          >
            Everything in one place.{" "}
            <span className="italic text-[var(--fg-muted)]">
              Finally.
            </span>
          </h2>

          <p
            className="
              text-base
              leading-relaxed
              text-[var(--fg-muted)]
            "
          >
            Designed around how small teams actually work — short sprints,
            lots of context-switching, not a minute to spare.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:auto-rows-[1fr]
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {/* Boards */}
          <div className="h-full sm:col-span-2">
            <FeatureCard
              className="h-full"
              accentColor="var(--accent)"
              icon={
                <LayoutGrid
                  className="h-4 w-4 text-[var(--accent)]"
                  strokeWidth={1.5}
                />
              }
              title="Boards that move at your speed"
              description="Plan sprints and track tasks without hunting through spreadsheets. Drag, drop, ship."
            >
              <BoardsVisual />
            </FeatureCard>
          </div>

          {/* Threads */}
          <div className="h-full">
            <FeatureCard
              className="h-full"
              accentColor="var(--violet)"
              icon={
                <MessageSquare
                  className="h-4 w-4 text-[var(--violet)]"
                  strokeWidth={1.5}
                />
              }
              title="Threads, not another inbox"
              description="Keep project conversations attached to the work itself."
            >
              <ThreadsVisual />
            </FeatureCard>
          </div>

          {/* Timeline */}
          <div className="h-full">
            <FeatureCard
              className="h-full"
              accentColor="var(--amber)"
              icon={
                <Clock
                  className="h-4 w-4 text-[var(--amber)]"
                  strokeWidth={1.5}
                />
              }
              title="One timeline for the whole team"
              description="Every deadline and milestone in one shared view."
            >
              <TimelineVisual />
            </FeatureCard>
          </div>

          {/* Import */}
          <div className="h-full sm:col-span-2">
            <FeatureCard
              className="h-full"
              accentColor="var(--cyan)"
              icon={
                <Import
                  className="h-4 w-4 text-[var(--cyan)]"
                  strokeWidth={1.5}
                />
              }
              title="Works the way you already do"
              description="Import from Trello, Asana, or a spreadsheet in minutes. Zero migration pain."
            >
              <ImportVisual />
            </FeatureCard>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Features;
