import React, { useState, useEffect } from "react";
import { Card } from "../common/Card";
import { Carousel } from "../common/Carousel";
import { C } from "../../theme/color";
import { Star } from "lucide-react";
import { QUOTES } from "../../data/Mockdata";

const TestimonialCard: React.FC<{ q: (typeof QUOTES)[0] }> = ({ q }) => (
  <Card
   accentColor={C.violet}
    className="w-full transition-all duration-300 hover:-translate-y-1"
    hoverShadow="rgba(108,92,231,0.25) 0px 8px 30px -4px, rgba(108,92,231,0.15) 0px 0px 0px 1px"
  >
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3 h-3" fill={C.accent} stroke="none" />
      ))}
    </div>
    <p className="text-sm leading-relaxed mb-4" style={{ color: C.fg }}>
      "{q.quote}"
    </p>
    <div className="flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
        style={{ background: q.bg, color: C.fg }}
      >
        {q.initials}
      </div>
      <div>
        <div className="text-xs font-medium" style={{ color: C.fg }}>
          {q.name}
        </div>
        <div className="text-xs" style={{ color: C.fgDim }}>
          {q.role}
        </div>
      </div>
    </div>
  </Card>
);

const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return itemsPerView;
};

const Testimonials = () => {
  const items = QUOTES.map((q) => <TestimonialCard key={q.name} q={q} />);
  const itemsPerView = useItemsPerView();

  return (
    <div className="py-8 px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2
          className="font-display text-2xl md:text-3xl font-light"
          style={{ color: C.fg }}
        >
          What teams are saying
        </h2>
      </div>

      <Carousel
        items={items}
        itemsPerView={itemsPerView}
        gap={16}
        autoPlay={4000}
        showDots={true}
        showArrows={true}
        className="w-full"
      />
    </div>
  );
};

export default Testimonials;