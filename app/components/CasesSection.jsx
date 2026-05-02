"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "./Motion";
import { cases } from "../data/cases";

export default function CasesSection() {
  const featuredCase = cases[0];

  if (!featuredCase) {
    return null;
  }

  function handleCaseNavigation() {
    document.documentElement.style.scrollBehavior = "auto";
    window.sessionStorage.setItem("restore-scroll-behavior", "true");
  }

  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <FadeIn className="max-w-2xl" inView={false}>
            <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
              Проекты
            </h2>
            <p className="mt-2 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:mt-3 sm:text-lg lg:mt-4 lg:text-xl">
              Здесь можно посмотреть, как я собираю структуру, визуал и подачу
              под конкретную задачу бизнеса
            </p>
          </FadeIn>

          <FadeIn className="mt-8 sm:mt-10 lg:mt-12" inView={false}>
            <Link
              href={`/${featuredCase.slug}`}
              onClick={handleCaseNavigation}
              className="group block overflow-hidden rounded-[28px] border border-black/10 bg-bg-secondary transition-colors duration-300 ease-out hover:border-black/20 hover:bg-[#faf9f6]"
            >
              <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-8 lg:p-6">
                <div className="max-w-2xl">
                  <h2 className="text-balance text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
                    {featuredCase.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                    Сайт для поиска недвижимости в Дубае. Открой кейс и посмотри,
                    как можно подать такой продукт через структуру, визуал и
                    акценты
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6">
                    {featuredCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary sm:text-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-base font-medium text-text-primary sm:mt-8 sm:text-lg lg:text-xl">
                    Смотреть кейс
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-bg-primary p-2">
                  <div className="pointer-events-none absolute inset-2 z-10 flex items-center justify-center rounded-[14px] bg-black/28 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <span className="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm sm:text-base">
                      Посмотреть кейс
                    </span>
                  </div>
                  <Image
                    src={featuredCase.coverImage}
                    alt={featuredCase.coverAlt}
                    width={1200}
                    height={900}
                    className="h-auto w-full rounded-[14px] border border-black/10 object-cover transition duration-300 ease-out group-hover:scale-[1.01] group-hover:blur-[3px]"
                  />
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
