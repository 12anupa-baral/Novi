import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "../../theme/color";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);

      media.addEventListener("change", callback);

      return () => media.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export interface CarouselProps {
  items: ReactNode[];
  itemsPerView?: number;
  gap?: number;
  autoPlay?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  dragThreshold?: number;
  peek?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerView = 3,
  gap = 16,
  autoPlay = 0,
  showDots = true,
  showArrows = true,
  className = "",
  dragThreshold = 50,
  peek = 20,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  const effectivePeek = isMobile ? 0 : isTablet ? 10 : peek;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);

  const totalItems = items.length;
  const cloneCount = itemsPerView;

  const clonedItems = [
    ...items.slice(-cloneCount),
    ...items,
    ...items.slice(0, cloneCount),
  ];

  const [virtualIndex, setVirtualIndex] = useState(cloneCount);

  const realIndex =
    totalItems > 0 ? (virtualIndex - cloneCount + totalItems) % totalItems : 0;

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const firstChild = trackRef.current.children[0] as
          HTMLElement | undefined;

        if (firstChild) {
          setItemWidth(firstChild.offsetWidth + gap);
        }
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [itemsPerView, gap]);

  const goTo = useCallback(
    (index: number, animate = true) => {
      if (isTransitioning && animate) return;

      setVirtualIndex(index);
      setIsTransitioning(animate);

      if (!animate) {
        setTimeout(() => setIsTransitioning(false), 0);
      } else {
        setTimeout(() => setIsTransitioning(false), 300);
      }
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    const nextIndex = virtualIndex + 1;
    goTo(nextIndex);
  }, [virtualIndex, goTo]);

  const prev = useCallback(() => {
    const prevIndex = virtualIndex - 1;
    goTo(prevIndex);
  }, [virtualIndex, goTo]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    const upperBound = cloneCount + totalItems;

    if (virtualIndex >= upperBound) {
      const newIndex = virtualIndex - totalItems;

      setVirtualIndex(newIndex);

      if (trackRef.current) {
        trackRef.current.style.transition = "none";

        // Force browser reflow so the transition reset is applied.
        void trackRef.current.offsetHeight;

        trackRef.current.style.transition = "";
      }
    } else if (virtualIndex < cloneCount) {
      const newIndex = virtualIndex + totalItems;

      setVirtualIndex(newIndex);

      if (trackRef.current) {
        trackRef.current.style.transition = "none";

        // Force browser reflow so the transition reset is applied.
        void trackRef.current.offsetHeight;

        trackRef.current.style.transition = "";
      }
    }
  };

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;

    setIsDragging(true);
    setDragStartX(clientX);
    setDragCurrentX(clientX);
    setDragOffsetX(0);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    setDragCurrentX(clientX);
    setDragOffsetX(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }

    const diff = dragCurrentX - dragStartX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    setDragOffsetX(0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    handleDragStart(e.clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    handleDragStart(touch.clientX);

    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });

    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
  };

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    const touch = e.touches[0];

    handleDragMove(touch.clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
  };

  useEffect(() => {
    if (!autoPlay || totalItems <= itemsPerView || isDragging) {
      return;
    }

    const timer = setInterval(next, autoPlay);

    return () => clearInterval(timer);
  }, [autoPlay, isDragging, itemsPerView, totalItems, next]);

  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const baseOffset = virtualIndex * (itemWidth || 0);
  const dragOffset = isDragging ? dragOffsetX : 0;
  const offset = baseOffset - dragOffset - effectivePeek;

  return (
    <div
      className={`relative carousel-region ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={handleContainerKeyDown}
    >
      <div
        className="py-8 overflow-visible"
        style={{
          paddingLeft: effectivePeek,
          paddingRight: effectivePeek,
        }}
      >
        <div
          className="overflow-visible cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div
            ref={trackRef}
            className="flex overflow-visible"
            style={{
              transform: `translateX(-${offset}px)`,
              gap: `${gap}px`,
              transition:
                isDragging || !isTransitioning
                  ? "none"
                  : "transform 300ms ease-in-out",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 overflow-visible"
                style={{
                  width: `calc((100% - ${
                    (itemsPerView - 1) * gap
                  }px) / ${itemsPerView})`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              color: C.fgMuted,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = C.accentBg)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = C.card)}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              color: C.fgMuted,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = C.accentBg)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = C.card)}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalItems > itemsPerView && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalItems }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const target = cloneCount + i;
                goTo(target);
              }}
              className="transition-all duration-200"
              style={{
                width: i === realIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === realIndex ? C.accent : C.fgDim,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
