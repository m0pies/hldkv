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
          <FadeIn inView={false}>
            <Link
              href={`/${featuredCase.slug}`}
              onClick={handleCaseNavigation}
              className="group block overflow-hidden rounded-[28px] border border-black/10 bg-bg-secondary transition-colors duration-300 ease-out hover:border-black/20 hover:bg-[#faf9f6]"
            >
              <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-12 lg:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
                    {featuredCase.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                    Сайт для поиска недвижимости в Дубае. Открой кейс и посмотри,
                    как можно подать такой продукт через структуру, визуал и
                    акценты.
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

                <div className="overflow-hidden rounded-[24px] border border-black/10 bg-bg-primary p-3 sm:p-4">
                  <Image
                    src={featuredCase.coverImage}
                    alt={featuredCase.coverAlt}
                    width={1200}
                    height={900}
                    className="h-auto w-full rounded-[18px] border border-black/10"
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
