import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { CalculatorClient } from "@/components/CalculatorClient";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { calculators, getCalculator } from "@/lib/calculators";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return {};

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    alternates: { canonical: `/calculators/${calculator.slug}` },
    openGraph: {
      title: calculator.metaTitle,
      description: calculator.metaDescription,
      url: `${site.url}/calculators/${calculator.slug}`,
      type: "website",
    },
  };
}

export default async function CalculatorPage({ params }: Params) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculator.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.title,
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript in a modern web browser.",
    inLanguage: "en-AU",
    isAccessibleForFree: true,
    operatingSystem: "Web",
    url: `${site.url}/calculators/${calculator.slug}`,
    description: calculator.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
      url: `${site.url}/calculators/${calculator.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${site.url}/#calculators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.title,
        item: `${site.url}/calculators/${calculator.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <JsonLd data={faqSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article>
        <nav className="text-sm font-semibold text-slate-500">
          <Link className="focus-ring hover:text-[var(--brand)]" href="/">
            Home
          </Link>
          <span> / </span>
          <span>{calculator.title}</span>
        </nav>
        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Free calculator</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">{calculator.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{calculator.description}</p>
        </header>

        <section className="mt-8">
          <CalculatorClient kind={calculator.kind} />
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
            {site.disclaimer}
          </p>
        </section>

        <section className="mt-8 rounded-md border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-2xl font-extrabold text-slate-950">Quick answer</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">{calculator.description}</p>
          <p className="mt-3 text-base leading-7 text-slate-700">{calculator.example}</p>
        </section>

        <section className="content-prose mt-10 rounded-md border border-[var(--line)] bg-white p-6">
          <h2>What this estimate means</h2>
          <p>{calculator.guideText}</p>
          <h2>Example scenario</h2>
          <p>{calculator.example}</p>
        </section>

        <div className="mt-8">
          <AdSlot label="Sponsored content" format="fluid" />
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Related guides</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {calculator.relatedGuides.map((slug) => {
              const guide = getGuide(slug);
              if (!guide) return null;
              return (
                <Link className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
                  <span className="font-bold">{guide.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{guide.description}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Frequently asked questions</h2>
          <div className="mt-4 grid gap-3">
            {calculator.faqs.map((faq) => (
              <details className="rounded-md border border-[var(--line)] bg-white p-4" key={faq.question}>
                <summary className="cursor-pointer font-bold">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      <aside className="grid content-start gap-5">
        <AdSlot />
        <EmailCapture />
        <AffiliateCTA />
        <AdSlot label="Sponsored placement" />
      </aside>
    </main>
  );
}
