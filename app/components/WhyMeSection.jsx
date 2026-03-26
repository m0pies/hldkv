"use client";

import { FadeIn, Stagger } from "./Motion";

function BoltIcon(props) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      strokeWidth="1.25"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
    </svg>
  );
}

function PuzzlePieceIcon(props) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      strokeWidth="1.25"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"></path>
    </svg>
  );
}

function Squares2X2Icon(props) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      strokeWidth="1.25"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path>
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      data-slot="icon"
      fill="none"
      strokeWidth="1.25"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"></path>
    </svg>
  );
}

const reasons = [
  {
    title: "Оперативность",
    description:
      "Быстро включаюсь в проект, не растягиваю старт на бесконечные созвоны и подготовку",
    icon: BoltIcon,
  },
  {
    title: "Комплексный подход",
    description:
      "Работаю с проектом целиком от идеи до запуска а не только с визуалом",
    icon: PuzzlePieceIcon,
  },
  {
    title: "Структура",
    description:
      "Выстраиваю подачу так чтобы сайт был понятен и логично вёл к действию",
    icon: Squares2X2Icon,
  },
  {
    title: "Работа под задачу бизнеса",
    description:
      "Каждое решение в проекте должно доносить ценность и приводить к нужному действию.",
    icon: BriefcaseIcon,
  },
];

export default function WhyMeSection() {
  return (
    <section className="section-frame">
      <div className="section-shell">
        <div className="section-content py-16 sm:py-24 lg:py-32">
          <FadeIn className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
              Подход к работе
            </h2>
            <p className="mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
              Подход который упрощает процесс и даёт понятный результат
            </p>
          </FadeIn>

          <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <FadeIn
                  as="article"
                  key={reason.title}
                  className="rounded-2xl border border-black/10 bg-bg-secondary p-4 sm:p-5 lg:p-6"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4d4d1] bg-[linear-gradient(180deg,#f7f6f3_0%,#efede8_100%)] text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_0_0_6px_rgba(236,234,229,0.95),0_8px_20px_rgba(17,17,17,0.05)] sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                    <Icon
                      className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-2 sm:mt-3 lg:mt-4 text-lg sm:text-xl lg:text-2xl text-balance font-medium text-text-primary">
                    {reason.title}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 lg:mt-1.5 max-w-md text-balance text-base leading-7 text-text-secondary sm:text-lg lg:text-xl">
                    {reason.description}
                  </p>
                </FadeIn>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
