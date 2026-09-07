import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);

      media.addEventListener("change", callback);

      return () => {
        media.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
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

export const Carousel = ({
  items,
  itemsPerView = 3,
  gap = 16,
  autoPlay = 0,
  showDots = true,
  showArrows = true,
  className = "",
  dragThreshold = 50,
  peek = 20,
}: CarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery(
    "(min-width: 641px) and (max-width: 1024px)",
  );

  const totalItems = items.length;

  const safeItemsPerView = Math.max(
    1,
    Math.min(itemsPerView, totalItems || 1),
  );

  const cloneCount =
    totalItems > 0
      ? Math.min(safeItemsPerView, totalItems)
      : 0;

  const effectivePeek = isMobile
    ? 0
    : isTablet
      ? 10
      : peek;

  /*
   * --------------------------------------------------
   * Refs
   * --------------------------------------------------
   */

  const trackRef = useRef<HTMLDivElement>(null);

  const itemWidthRef = useRef(0);

  const virtualIndexRef = useRef(cloneCount);

  const dragStartXRef = useRef(0);
  const dragOffsetXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const isDraggingRef = useRef(false);
  const isTransitioningRef = useRef(false);

  /*
   * Used to prevent autoplay from firing while the
   * user is interacting with the carousel.
   */
  const interactionRef = useRef(false);

  /*
   * --------------------------------------------------
   * React state
   * --------------------------------------------------
   */

  const [virtualIndex, setVirtualIndex] =
    useState(cloneCount);

  const [isDragging, setIsDragging] = useState(false);

  /*
   * --------------------------------------------------
   * Cloned slides
   * --------------------------------------------------
   */

  const clonedItems =
    totalItems > 0
      ? [
          ...items.slice(-cloneCount),
          ...items,
          ...items.slice(0, cloneCount),
        ]
      : [];

  /*
   * --------------------------------------------------
   * Helpers
   * --------------------------------------------------
   */

  const setTrackTransition = useCallback(
    (enabled: boolean) => {
      const track = trackRef.current;

      if (!track) return;

      track.style.transition = enabled
        ? "transform 300ms ease-in-out"
        : "none";
    },
    [],
  );

  const updateTrackPosition = useCallback(
    (
      index: number,
      dragOffset = 0,
      animate = false,
    ) => {
      const track = trackRef.current;

      if (!track || !itemWidthRef.current) return;

      const offset =
        index * itemWidthRef.current -
        dragOffset -
        effectivePeek;

      if (animate) {
        setTrackTransition(true);
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    },
    [effectivePeek, setTrackTransition],
  );

  /*
   * --------------------------------------------------
   * Measure slide width
   * --------------------------------------------------
   */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const updateWidth = () => {
      const firstChild =
        track.firstElementChild as HTMLElement | null;

      if (!firstChild) return;

      itemWidthRef.current =
        firstChild.getBoundingClientRect().width + gap;

      updateTrackPosition(
        virtualIndexRef.current,
        isDraggingRef.current
          ? dragOffsetXRef.current
          : 0,
      );
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(track);

    return () => {
      observer.disconnect();
    };
  }, [
    gap,
    safeItemsPerView,
    updateTrackPosition,
  ]);

  /*
   * --------------------------------------------------
   * Sync virtual index
   * --------------------------------------------------
   */

  useEffect(() => {
    virtualIndexRef.current = virtualIndex;
  }, [virtualIndex]);

  /*
   * --------------------------------------------------
   * Navigation
   * --------------------------------------------------
   */

  const goTo = useCallback(
    (index: number, animate = true) => {
      if (
        totalItems <= safeItemsPerView ||
        isTransitioningRef.current
      ) {
        return;
      }

      virtualIndexRef.current = index;

      setVirtualIndex(index);

      isTransitioningRef.current = animate;

      updateTrackPosition(index, 0, animate);

      if (!animate) {
        requestAnimationFrame(() => {
          isTransitioningRef.current = false;
        });
      }
    },
    [
      safeItemsPerView,
      totalItems,
      updateTrackPosition,
    ],
  );

  const next = useCallback(() => {
    if (totalItems <= safeItemsPerView) return;

    goTo(virtualIndexRef.current + 1);
  }, [goTo, safeItemsPerView, totalItems]);

  const prev = useCallback(() => {
    if (totalItems <= safeItemsPerView) return;

    goTo(virtualIndexRef.current - 1);
  }, [goTo, safeItemsPerView, totalItems]);

  /*
   * --------------------------------------------------
   * Infinite loop
   * --------------------------------------------------
   */

  const handleTransitionEnd = useCallback(() => {
    isTransitioningRef.current = false;

    const upperBound = cloneCount + totalItems;

    let newIndex: number | null = null;

    if (virtualIndexRef.current >= upperBound) {
      newIndex =
        virtualIndexRef.current - totalItems;
    } else if (virtualIndexRef.current < cloneCount) {
      newIndex =
        virtualIndexRef.current + totalItems;
    }

    if (newIndex === null) return;

    virtualIndexRef.current = newIndex;

    setTrackTransition(false);

    setVirtualIndex(newIndex);

    /*
     * Wait for the browser to apply transition:none
     * before moving to the cloned position.
     */
    requestAnimationFrame(() => {
      updateTrackPosition(newIndex);
    });
  }, [
    cloneCount,
    totalItems,
    setTrackTransition,
    updateTrackPosition,
  ]);

  /*
   * --------------------------------------------------
   * Pointer dragging
   * --------------------------------------------------
   */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      totalItems <= safeItemsPerView ||
      isTransitioningRef.current
    ) {
      return;
    }

    pointerIdRef.current = event.pointerId;

    dragStartXRef.current = event.clientX;

    dragOffsetXRef.current = 0;

    isDraggingRef.current = true;
    interactionRef.current = true;

    setIsDragging(true);

    setTrackTransition(false);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !isDraggingRef.current ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const diff =
      event.clientX - dragStartXRef.current;

    dragOffsetXRef.current = diff;

    /*
     * Direct DOM update.
     *
     * No React render occurs here.
     */
    updateTrackPosition(
      virtualIndexRef.current,
      diff,
    );
  };

  const finishDrag = useCallback(
    (event?: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;

      const diff = dragOffsetXRef.current;

      isDraggingRef.current = false;
      pointerIdRef.current = null;

      dragOffsetXRef.current = 0;

      interactionRef.current = false;

      setIsDragging(false);

      if (
        event &&
        event.currentTarget.hasPointerCapture(
          event.pointerId,
        )
      ) {
        event.currentTarget.releasePointerCapture(
          event.pointerId,
        );
      }

      if (Math.abs(diff) >= dragThreshold) {
        if (diff < 0) {
          next();
        } else {
          prev();
        }

        return;
      }

      /*
       * Snap back to current slide.
       */
      updateTrackPosition(
        virtualIndexRef.current,
        0,
        true,
      );
    },
    [
      dragThreshold,
      next,
      prev,
      updateTrackPosition,
    ],
  );

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    finishDrag(event);
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    pointerIdRef.current = null;

    dragOffsetXRef.current = 0;

    interactionRef.current = false;

    setIsDragging(false);

    updateTrackPosition(
      virtualIndexRef.current,
      0,
      true,
    );
  };

  /*
   * --------------------------------------------------
   * Keyboard navigation
   * --------------------------------------------------
   */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  /*
   * --------------------------------------------------
   * Autoplay
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      !autoPlay ||
      totalItems <= safeItemsPerView
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (
        !interactionRef.current &&
        !isDraggingRef.current &&
        !isTransitioningRef.current
      ) {
        next();
      }
    }, autoPlay);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    autoPlay,
    next,
    safeItemsPerView,
    totalItems,
  ]);

  /*
   * --------------------------------------------------
   * Reset when item count changes
   * --------------------------------------------------
   */

  useEffect(() => {
    if (totalItems === 0) return;

    const newIndex = cloneCount;

    virtualIndexRef.current = newIndex;

    isTransitioningRef.current = false;

    setVirtualIndex(newIndex);

    setTrackTransition(false);

    requestAnimationFrame(() => {
      updateTrackPosition(newIndex);
    });
  }, [
    cloneCount,
    totalItems,
    setTrackTransition,
    updateTrackPosition,
  ]);

  /*
   * --------------------------------------------------
   * Empty state
   * --------------------------------------------------
   */

  if (totalItems === 0) {
    return null;
  }

  /*
   * --------------------------------------------------
   * Dynamic layout styles
   * --------------------------------------------------
   *
   * These are intentionally inline because their
   * values are calculated at runtime.
   */

  const containerStyle: CSSProperties = {
    paddingLeft: effectivePeek,
    paddingRight: effectivePeek,
  };

  const slideWidth = `calc(
    (100% - ${(safeItemsPerView - 1) * gap}px)
    / ${safeItemsPerView}
  )`;

  const realIndex =
    (virtualIndex - cloneCount + totalItems) %
    totalItems;

  const showControls =
    totalItems > safeItemsPerView;

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Track container */}
      <div
        className="overflow-visible py-8"
        style={containerStyle}
      >
        <div
          className={[
            "select-none",
            "overflow-visible",
            "touch-pan-y",
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab",
          ].join(" ")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            ref={trackRef}
            className="flex overflow-visible will-change-transform"
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedItems.map((item, index) => (
              <div
                key={index}
                className="shrink-0 overflow-visible"
                style={{
                  width: slideWidth,
                  marginRight:
                    index === clonedItems.length - 1
                      ? 0
                      : gap,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {showArrows && showControls && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="
              absolute left-0 top-1/2 z-10
              flex h-8 w-8
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[var(--border)]
              bg-[var(--card)]
              text-[var(--fg-muted)]
              shadow-lg
              transition-all duration-200
              hover:border-[var(--border-hi)]
              hover:bg-[var(--accent-bg)]
              hover:text-[var(--accent)]
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--focus-ring)]
              focus-visible:ring-offset-2
              cursor-pointer
            "
          >
            <ChevronLeft
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="
              absolute right-0 top-1/2 z-10
              flex h-8 w-8
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[var(--border)]
              bg-[var(--card)]
              text-[var(--fg-muted)]
              shadow-lg
              transition-all duration-200
              hover:border-[var(--border-hi)]
              hover:bg-[var(--accent-bg)]
              hover:text-[var(--accent)]
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--focus-ring)]
              focus-visible:ring-offset-2
              cursor-pointer
            "
          >
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && showControls && (
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Carousel slides"
        >
          {Array.from({ length: totalItems }).map(
            (_, index) => {
              const isActive =
                index === realIndex;

              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  onClick={() =>
                    goTo(cloneCount + index)
                  }
                  className={[
                    "h-2 rounded-full",
                    "transition-all duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-[var(--focus-ring)]",
                    "focus-visible:ring-offset-2",
                    "cursor-pointer",
                    isActive
                      ? "w-6 bg-[var(--accent)]"
                      : [
                          "w-2",
                          "bg-[var(--fg-dim)]",
                          "hover:bg-[var(--fg-muted)]",
                        ].join(" "),
                  ].join(" ")}
                />
              );
            },
          )}
        </div>
      )}
    </div>
  );
};
