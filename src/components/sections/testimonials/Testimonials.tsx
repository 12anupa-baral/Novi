import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card } from "../../common/Card";
import { Carousel } from "../../common/Carousel";
import { QUOTES } from "../../../data/Mockdata";

type Testimonial = (typeof QUOTES)[number];

const TestimonialCard = ({ q }: { q: Testimonial }) => {
  return (
    <Card
      accentColor="var(--violet)"
      className="
        w-full
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* Rating */}
      <div className="mb-3 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            className="h-3 w-3 text-[var(--accent)]"
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className="
          mb-4
          text-sm
          leading-relaxed
          text-[var(--fg)]
        "
      >
        "{q.quote}"
      </p>

      <div className="flex items-center gap-2.5">
        <div
          className="
      flex
      h-7 w-7
      shrink-0
      items-center justify-center
      rounded-full
      bg-[var(--accent-bg)]
      text-xs font-medium
      text-[var(--accent)]
    "
          aria-hidden="true"
        >
          {q.initials}
        </div>

        <div>
          <div className="text-xs font-medium text-[var(--fg)]">{q.name}</div>

          <div className="text-xs text-[var(--fg-dim)]">{q.role}</div>
        </div>
      </div>
    </Card>
  );
};

const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    const update = () => {
      if (mobileQuery.matches) {
        setItemsPerView(1);
      } else if (tabletQuery.matches) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    update();

    mobileQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);

  return itemsPerView;
};

const Testimonials = () => {
  const itemsPerView = useItemsPerView();

  const items = QUOTES.map((quote) => (
    <TestimonialCard key={quote.name} q={quote} />
  ));

  return (
    <section
      className="
        overflow-hidden
        px-10 py-8
      "
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-10">
        <h2
          id="testimonials-heading"
          className="
            font-display
            text-2xl font-light
            text-[var(--fg)]
            md:text-3xl
          "
        >
          What teams are saying
        </h2>
      </div>

      <Carousel
        items={items}
        itemsPerView={itemsPerView}
        gap={16}
        autoPlay={4000}
        showDots
        showArrows
        className="w-full"
      />
    </section>
  );
};

export default Testimonials;
