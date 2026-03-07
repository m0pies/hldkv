"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

const works = [
  { 
    title: "BNID", 
    description: "Dubai-based property search platform", 
    tags: ["UI/UX", "Product Design", "Web Development", "Real Estate"], 
    img: "/bnid-mockup.png", 
    alt: "Dubai property search interface design"
  },
  { 
    title: "Linky", 
    description: "A concept app for finding hobby partners", 
    tags: ["Mobile App", "Product Design", "Interaction Destign", "UIX/UX"], 
    img: "/linky-mockup.png", 
    alt: "Mobile app interface design" 
  },
  { 
    title: "Opaline", 
    description: "Website design for a cosmetics brand", 
    tags: ["Branding", "Web Design", "Beauty Industry", "Visual Identity"], 
    img: "/opaline-mockup.png", 
    alt: "E-commerce UI design"
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isAdjusting = useRef(false);

  const GAP = 24;
  const CLONES = works.length;
  const slides = [...works.slice(-CLONES), ...works, ...works.slice(0, CLONES)];

  const startIndex = CLONES;
  const [index, setIndex] = useState(startIndex);

  const [cardWidth, setCardWidth] = useState(1200);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w < 480)  setCardWidth(320);
      else if (w < 640) setCardWidth(440);
      else if (w < 768)  setCardWidth(560);
      else if (w < 1024) setCardWidth(680);
      else if (w < 1280) setCardWidth(900);
      else               setCardWidth(1200);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const STEP = cardWidth + GAP;

  const syncPosition = (withTransition = false) => {
    const el = containerRef.current;
    if (!el) return;

    if (!withTransition) {
      el.style.transition = "none";
    }

    el.style.transform = `translateX(calc(50vw - ${cardWidth / 2}px - ${index * STEP}px))`;

    if (!withTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "transform 0.4s ease";
        });
      });
    }
  };


  useEffect(() => {
    if (!isAdjusting.current) {
      syncPosition(true);
    }
  }, [index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    isAnimating.current = false;
    isAdjusting.current = false;

    el.style.transition = "none";

    el.style.transform = `translateX(calc(50vw - ${cardWidth / 2}px - ${index * STEP}px))`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.4s ease";
      });
    });

  }, [cardWidth]);

  const moveTo = (target: number) => {
    if (isAnimating.current || isAdjusting.current) return;

    const el = containerRef.current;
    if (!el) return;

    isAnimating.current = true;

    el.style.transition = "transform 0.4s ease";
    el.style.transform = `translateX(calc(50vw - ${cardWidth / 2}px - ${target * STEP}px))`;

    setIndex(target);

    const onTransitionEnd = () => {
      el.removeEventListener("transitionend", onTransitionEnd);

      isAdjusting.current = true;

      let adjustedIndex = target;

      if (target < CLONES) {
        adjustedIndex = target + works.length;
      } else if (target >= slides.length - CLONES) {
        adjustedIndex = target - works.length;
      }

      if (adjustedIndex !== target) {
        el.style.transition = "none";
        el.style.transform = `translateX(calc(50vw - ${cardWidth / 2}px - ${adjustedIndex * STEP}px))`;
        setIndex(adjustedIndex);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = "transform 0.4s ease";
            isAdjusting.current = false;
            isAnimating.current = false;
          });
        });
      } else {
        isAdjusting.current = false;
        isAnimating.current = false;
      }
    };

    el.addEventListener("transitionend", onTransitionEnd, { once: true });
  };

  const next = () => moveTo(index + 1);
  const prev = () => moveTo(index - 1);

  const realIndex = (index - CLONES + works.length) % works.length;

  return (
    <section className="bg-[#0D0D0C] text-white pt-16 md:pt-24 pb-32 overflow-hidden" id="works">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-0 pb-8">
        <h2 className="text-2xl font-medium text-[#7d7d7d]">Selected works</h2>
      </div>

      <div
        className="relative w-full overflow-visible"
      
      >
        <div
          ref={containerRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP}px` }}
        >
          {slides.map((w, i) => (
            <div key={`${w.title}-${i}`} className="shrink-0" style={{ width: `${cardWidth}px` }}>
              <div
                className={`
                  cursor-not-allowed rounded-xl md:rounded-2xl xl:rounded-3xl flex flex-col-reverse xl:flex-row 
                  border border-white/10 bg-white/[0.03] overflow-hidden
                  ring-1 ring-white/10 hover:ring-white/20 transition-all duration-1000 ease-out
                  
                `}
              >
                <div className="p-4 md:p-6 xl:w-[400px] flex flex-col h-fit">
                  
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-medium">{w.title}</h3>
                  <p className="mt-1 md:mt-2 text-sm md:text-base leading-relaxed text-white/60 text-balance">{w.description}</p>
                  <div className="mt-2 md:mt-4 flex flex-wrap gap-2">
                    {w.tags?.map((tag, t) => (
                      <span key={t} className="text-xs md:text-sm px-3 py-1 rounded-full border border-white/20 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-2 md:mt-4 text-xs tracking-wide text-neutral-600"> Case-study coming soon</span>
                </div>
                <div className="w-full xl:h-[495] h-full">
                  <Image src={w.img} alt={w.alt} width={1280} height={720} className="w-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 md:mt-16 max-w-[1200px] px-4 md:px-8 xl:px-0 relative">
        <div className="flex justify-center gap-1.5 md:gap-2.5">
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => moveTo(i + CLONES)}
              className={`h-1.5 md:h-2.5 w-1.5 md:w-2.5 rounded-full transition cursor-pointer ${
                realIndex === i ? "bg-white scale-105" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="absolute right-4 md:right-8 xl:right-0 top-1/2 -translate-y-1/2 flex gap-2">
          <button onClick={prev} className="px-2 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="px-2 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}