import { notFound } from "next/navigation";
import CaseHero from "../components/CaseHero";
import CaseImageFrame from "../components/CaseImageFrame";
import FloatingCTA from "../components/FloatingCTA";
import RestoreScrollBehavior from "../components/RestoreScrollBehavior";
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
      <RestoreScrollBehavior />
      <FloatingCTA heroId="case-hero" contactId="" maxWidthClassName="max-w-[680px]" />
      <div className="section-shell">
        <article className="section-content py-12 sm:py-16 lg:py-24">
          <CaseHero caseItem={caseItem} />

          <div className="mx-auto mt-12 grid max-w-[680px] gap-10 sm:mt-14 lg:mt-16">
            {caseItem.body.map((section) => (
              <section key={section.heading} className="text-left">
                <h2 className="text-2xl font-medium text-text-primary">
                  {section.heading}
                </h2>

                <div className="mt-4 grid gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[18px] leading-relaxed text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {caseItem.media?.length ? (
            <div className="mx-auto mt-12 grid max-w-[680px] gap-12 sm:mt-14 lg:mt-16 lg:gap-16">
              {caseItem.media.map((item) => (
                <section key={item.image} className="grid gap-5">
                  <CaseImageFrame
                    src={item.image}
                    alt={item.alt}
                    width={1600}
                    height={1000}
                    plain
                    sizes="(min-width: 1024px) 680px, 100vw"
                  />

                  <div className="text-left">
                    <h3 className="text-2xl font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[18px] leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          ) : null}

          <div id="case-contact" className="mt-12 h-px sm:mt-14 lg:mt-16" />
        </article>
      </div>
    </main>
  );
}
