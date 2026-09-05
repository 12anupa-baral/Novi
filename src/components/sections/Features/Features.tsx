import { useFadeIn } from "../../../hooks/useFadeIn";
import FeatureCard from "../../common/FeatureCard";
import BoardsVisual from "./BoardsVisual";
import ThreadsVisual from "./ThreadsVisual";
import TimelineVisual from "./TimelineVisual";
import ImportVisual from "./ImportVisual";
import { C } from "../../../theme/color";
import { LayoutGrid, MessageSquare, Clock, Import } from "lucide-react";

export const Features: React.FC = () => {
  const featRef = useFadeIn(80);

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-8">
      <div ref={featRef} className="fade-in-up">
        <div className="max-w-lg mb-12">
          <h2
            className="font-display text-3xl md:text-4xl font-light leading-snug mb-4"
            style={{ color: C.fg }}
          >
            Everything in one place.{" "}
            <span className="italic" style={{ color: C.fgMuted }}>
              Finally.
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: C.fgMuted }}>
            Designed around how small teams actually work — short sprints, lots
            of context‑switching, not a minute to spare.
          </p>
        </div>

        {/* 
          Grid:
          - Mobile: 1 column, auto row height (content fits)
          - Tablet+: 2-3 columns, equal row heights (auto-rows-[1fr])
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 sm:auto-rows-[1fr]">
          {/* Boards – spans 2 columns on tablet+ */}
          <div className="sm:col-span-2 h-full">
            <FeatureCard
              className="h-full"
              accentColor={C.accent}
              icon={<LayoutGrid className="w-4 h-4" stroke={C.accent} strokeWidth={1.5} />}
              title="Boards that move at your speed"
              description="Plan sprints and track tasks without hunting through spreadsheets. Drag, drop, ship."
            >
              <BoardsVisual />
            </FeatureCard>
          </div>

          {/* Threads – 1 column */}
          <div className="h-full">
            <FeatureCard
              className="h-full"
              accentColor={C.violet}
              icon={<MessageSquare className="w-4 h-4" stroke={C.violet} strokeWidth={1.5} />}
              title="Threads, not another inbox"
              description="Keep project conversations attached to the work itself."
            >
              <ThreadsVisual />
            </FeatureCard>
          </div>

          {/* Timeline – 1 column */}
          <div className="h-full">
            <FeatureCard
              className="h-full"
              accentColor={C.amber}
              icon={<Clock className="w-4 h-4" stroke={C.amber} strokeWidth={1.5} />}
              title="One timeline for the whole team"
              description="Every deadline and milestone in one shared view."
            >
              <TimelineVisual />
            </FeatureCard>
          </div>

          {/* Import – spans 2 columns on tablet+ */}
          <div className="sm:col-span-2 h-full">
            <FeatureCard
              className="h-full"
              accentColor={C.cyan}
              icon={<Import className="w-4 h-4" stroke={C.cyan} strokeWidth={1.5} />}
              title="Works the way you already do"
              description="Import from Trello, Asana, or a spreadsheet in minutes. Zero migration pain."
            >
              <ImportVisual />
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
};