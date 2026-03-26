"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn, Stagger } from "./Motion";

const services = [
  {
    title: "Лендинги",
    description:
      "Одностраничные сайты для услуг и продуктов которые быстро объясняют суть и подводят к действию",
    points: [
      "Сильный первый экран и ясное предложение",
      "Продуманная последовательность блоков",
      "Фокус на конверсии и понятной подаче",
    ],
    accent: "от идеи до заявки",
    tags: ["Один продукт", "Под действие", "Быстрый запуск"],
  },
  {
    title: "Многостраничные сайты",
    description:
      "Сайты с несколькими страницами где важно подробно раскрыть продукт компанию или направление",
    points: [
      "Удобная структура и карта разделов",
      "Единый визуальный язык на всех страницах",
      "Запас для роста контента и бизнеса",
    ],
    accent: "структура и масштаб",
    tags: ["Структура", "Разделение", "Масштаб"],
  },
  {
    title: "Редизайн",
    description:
      "Обновляю существующий сайт чтобы сделать его понятнее современнее и удобнее для восприятия",
    points: [
      "Акцент на работах и экспертизе",
      "Выдержанная визуальная подача",
      "Простой путь к контакту и запросу",
    ],
    accent: "доверие с первого экрана",
    tags: ["Пересборка", "Упрощение", "Актуализация"],
  },
  {
    title: "Другое",
    description:
      "Помогаю с отдельными задачами по сайту если не нужен полноценный проект",
    points: [
      "Один подход к дизайну и реализации",
      "Адаптивность и внимание к деталям",
      "Более целостный итоговый результат",
    ],
    accent: "цельно и без потерь",
    tags: ["Гибкость", "Доработка", "Под запрос"],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <Stagger className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:gap-10 lg:gap-12">
            <FadeIn className="max-w-2xl" inView={false}>
              <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
                Типы проектов
              </h2>
              <p className="mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                Подбирается под задачу от простых лендингов до более сложных сайтов
              </p>
            </FadeIn>

            <Stagger className="grid gap-4" inView={false}>
              {services.map((service, index) => {
                const isOpen = openIndex === index;

                return (
                  <FadeIn
                    as="article"
                    key={service.title}
                    className="group rounded-2xl border border-black/10 bg-bg-secondary transition-colors duration-300 ease-out hover:border-black/20 hover:bg-[#f8f7f4]"
                    inView={false}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5 lg:px-6 lg:py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl lg:text-2xl text-balance font-medium text-text-primary transition-colors duration-300 ease-out group-hover:text-black">
                        {service.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-text-secondary transition-[transform,color] duration-300 ease-out group-hover:text-text-primary ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid overflow-hidden transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="grid gap-5 px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                          <div>
                            <p className="max-w-md text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                              {service.description}
                            </p>
                            <div className="mt-4 sm:mt-5 lg:mt-6 flex flex-wrap gap-4">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-[#d4d4d1] bg-[linear-gradient(180deg,#f7f6f3_0%,#efede8_100%)] px-4 py-2 text-sm font-medium text-[#6a6964] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_0_0_4px_rgba(236,234,229,0.85),0_6px_16px_rgba(17,17,17,0.04)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </Stagger>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
