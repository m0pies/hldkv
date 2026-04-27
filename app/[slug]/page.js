import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseBySlug, cases } from "../data/cases";

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    return {
      title: "Кейс не найден | Егор Холодков",
    };
  }

  return {
    title: `${caseItem.title} | Кейс`,
    description: caseItem.description,
    openGraph: {
      title: `${caseItem.title} | Кейс`,
      description: caseItem.description,
      url: `https://www.hldkv.com/${caseItem.slug}`,
      images: [
        {
          url: `https://www.hldkv.com${caseItem.coverImage}`,
          width: 1200,
          height: 900,
        },
      ],
    },
  };
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    notFound();
  }

  return (
    <main className="section-frame">
      <div className="section-shell">
        <article className="section-content py-12 sm:py-16 lg:py-24">
          <header className="max-w-4xl">
            <span className="inline-flex rounded-full border border-black/10 bg-bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary sm:text-sm">
              Кейс
            </span>

            <h1 className="mt-4 text-balance text-4xl font-semibold text-text-primary sm:text-5xl lg:text-6xl">
              {caseItem.title}
            </h1>

            <p className="mt-4 max-w-3xl text-balance text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
              {caseItem.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {caseItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-bg-secondary px-3 py-1.5 text-sm text-text-secondary sm:text-base"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-[linear-gradient(135deg,#f8f6f2_0%,#ebe6db_100%)] p-3 shadow-[0_24px_64px_rgba(17,17,17,0.08)] sm:mt-12 sm:p-4 lg:mt-14 lg:p-5">
            <Image
              src={caseItem.coverImage}
              alt={caseItem.coverAlt}
              width={1200}
              height={900}
              priority
              className="h-auto w-full rounded-[20px] border border-black/6"
            />
          </div>

          <div className="mt-12 grid gap-10 sm:mt-14 lg:mt-16">
            {caseItem.body.map((section) => (
              <section key={section.heading} className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl lg:text-4xl">
                  {section.heading}
                </h2>

                <div className="mt-4 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-text-secondary sm:text-lg lg:text-xl"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
