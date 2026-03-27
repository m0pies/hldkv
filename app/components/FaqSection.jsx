"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn, Stagger } from "./Motion";

const faqItems = [
  {
    question: "Сколько обычно занимает разработка сайта?",
    answer:
      "В среднем от двух до пяти недель в зависимости от задачи и объёма проекта, лендинг можно сделать быстрее, а более сложные сайты требуют больше времени из-за структуры и количества страниц",
  },
  {
    question: "Что нужно для старта?",
    answer:
      "Достаточно общего понимания задачи и того что вы хотите получить, даже если нет готового текста или структуры, я помогу разобраться и собрать основу для сайта",
  },
  {
    question: "Можно ли обратиться, если уже есть сайт или идея?",
    answer:
      "Да можно доработать существующий сайт, пересобрать структуру или сделать новый на основе вашей идеи если текущая версия устарела или не даёт результата",
  },
  {
    question: "Делаете ли вы сайт полностью?",
    answer:
      "Да беру проект целиком от структуры и логики до дизайна и сборки, вам не нужно искать отдельных специалистов и разбираться в технической части",
  },
  {
    question: "Что происходит после запуска?",
    answer:
      "Сайт передаётся вам в готовом виде и при необходимости я остаюсь на связи, можно внести правки, доработать отдельные блоки или развивать сайт дальше",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <Stagger className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:gap-10 lg:gap-12">
            <FadeIn className="max-w-2xl" inView={false}>
              <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
                FAQ
              </h2>
              <p className="mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                Коротко собрал ответы на вопросы, которые чаще всего возникают до старта работы над сайтом.
              </p>
            </FadeIn>

            <Stagger className="grid gap-4" inView={false}>
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <FadeIn
                    as="article"
                    key={item.question}
                    className="group rounded-2xl border border-black/10 bg-bg-secondary transition-colors duration-300 ease-out hover:border-black/20 hover:bg-[#f8f7f4]"
                    inView={false}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="max-w-3xl text-lg sm:text-xl lg:text-2xl text-balance font-medium text-text-primary transition-colors duration-300 ease-out group-hover:text-black ">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-text-secondary transition-[transform,color] duration-300 ease-out group-hover:text-text-primary ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid overflow-hidden px-4 sm:px-5 lg:px-6 transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] pb-4 sm:pb-5 lg:pb-6 opacity-100"
                          : "grid-rows-[0fr] pb-0 opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="max-w-3xl text-base text-balance leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                          {item.answer}
                        </p>
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
