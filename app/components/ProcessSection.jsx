"use client";

import { FadeIn, Stagger } from "./Motion";

const steps = [
  {
    number: "01",
    title: "Знакомство и обсуждение",
    description:
      "Обсуждаем проект, цели сайта и ожидаемый результат. Фиксируем формат работы и основные договорённости",
  },
  {
    number: "02",
    title: "Аналитика и структура",
    description:
      "Анализирую задачу и собираю структуру сайта чтобы информация подавалась понятно и последовательно",
  },
  {
    number: "03",
    title: "Концепция и дизайн",
    description:
      "Определяю визуальное направление и делаю дизайн, который отражает задачу проекта",
  },
  {
    number: "04",
    title: "Сборка и запуск",
    description:
      "Собираю сайт адаптирую его под устройства и подготавливаю к полноценному запуску",
  },
  {
    number: "05",
    title: "Передача и поддержка",
    description:
      "Передаю готовый сайт и остаюсь на связи если потребуется помощь или доработки",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <Stagger className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:gap-10 lg:gap-12">
            <FadeIn className="max-w-2xl" inView={false}>
              <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
                Этапы работы
              </h2>
              <p className="mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
                Работаю по понятным этапам: от обсуждения задачи и структуры до финальной сборки и запуска сайта.
              </p>
            </FadeIn>

            <Stagger className="lg:pt-1" inView={false}>
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                  <FadeIn
                    as="article"
                    key={step.number}
                    className="relative grid grid-cols-[28px_1fr] gap-4 sm:grid-cols-[40px_1fr] sm:gap-6 lg:grid-cols-[56px_1fr] lg:gap-8"
                    inView={false}
                  >
                    <div className="flex h-full flex-col items-center self-stretch">
                      <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d4d4d1] bg-[linear-gradient(180deg,#f7f6f3_0%,#efede8_100%)] text-[11px] font-medium text-[#6a6964] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_0_0_4px_rgba(236,234,229,0.85),0_6px_16px_rgba(17,17,17,0.04)] sm:h-10 sm:w-10 sm:text-sm lg:h-12 lg:w-12">
                        {step.number}
                      </span>
                      {!isLast ? (
                        <span className="w-px flex-1 bg-[#d8d5cf]" />
                      ) : null}
                    </div>

                    <div className={isLast ? "pb-0" : "pb-8 sm:pb-12 lg:pb-16"}>
                      <h3 className="text-lg sm:text-xl lg:text-2xl text-balance font-medium text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 sm:mt-1 lg:mt-1.5 max-w-md text-balance text-base leading-7 text-text-secondary sm:text-lg lg:text-xl">
                        {step.description}
                      </p>
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
