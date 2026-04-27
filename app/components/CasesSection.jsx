"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./Motion";
import { cases } from "../data/cases";

export default function CasesSection() {
  const featuredCase = cases[0];

  if (!featuredCase) {
    return null;
  }

  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <FadeIn inView={false}>
            <Link
              href={`/${featuredCase.slug}`}
              className="group block overflow-hidden rounded-[28px] border border-black/10 bg-[linear-gradient(135deg,#f7f5f1_0%,#ece7dc_48%,#e3ddd1_100%)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-black/20"
            >
              <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-12 lg:p-10">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary sm:text-sm">
                    Кейсы
                  </span>

                  <h2 className="mt-4 text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
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
                        className="rounded-full border border-black/10 bg-white/75 px-3 py-1.5 text-sm text-text-secondary sm:text-base"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-base font-medium text-text-primary sm:mt-8 sm:text-lg lg:text-xl">
                    Смотреть кейс
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-[#fbfaf7] p-3 shadow-[0_24px_60px_rgba(17,17,17,0.08)] sm:p-4">
                  <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-[#d9c7a2]/45 blur-3xl" />
                  <Image
                    src={featuredCase.coverImage}
                    alt={featuredCase.coverAlt}
                    width={1200}
                    height={900}
                    className="relative h-auto w-full rounded-[18px] border border-black/6"
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
