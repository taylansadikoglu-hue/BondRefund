import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { getCalculator } from "@/lib/calculators";
import { getGuide, guides, guideFaqs, guideSections } from "@/lib/guides";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const guideUpgrades: Record<
  string,
  {
    eyebrow: string;
    heroTitle?: string;
    heroBody: string;
    quickChecks: string[];
    actionTitle: string;
    actions: string[];
    extraLinks: { href: string; label: string }[];
  }
> = {
  "sydney-moving-costs": {
    eyebrow: "Sydney moving guide",
    heroTitle: "What does moving in Sydney really cost?",
    heroBody:
      "This page helps you think beyond the truck quote so you do not get surprised by packing, access, timing, storage or cleaning costs.",
    quickChecks: [
      "Removalist hours can blow out with stairs, lifts or tight parking",
      "Packing, boxes and cleaning often get missed in the first budget",
      "A cheaper rent can still cost more if moving is rushed or complex",
    ],
    actionTitle: "Before you book",
    actions: [
      "Get at least two written quotes and ask exactly what is included.",
      "Check whether stairs, long walks, lifts or parking restrictions add time.",
      "Compare the move cost with the rent savings over 6 to 12 months.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Estimate the move cost" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent" },
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the cleaning checklist" },
    ],
  },
  "how-to-get-your-bond-back-nsw": {
    eyebrow: "NSW bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in NSW",
    heroBody:
      "This page is designed for renters who want a calm, practical checklist before the final inspection and before agreeing to any deductions.",
    quickChecks: [
      "Take final photos before handing back keys",
      "Keep entry condition reports, emails and receipts together",
      "Do not agree to deductions until you understand what they are for",
    ],
    actionTitle: "Best next steps",
    actions: [
      "Compare the claimed issue with your entry report and exit photos.",
      "Ask for an itemised list, invoice or quote for any money being kept.",
      "Use the calculator first so you understand the size of the deduction clearly.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/how-to-dispute-bond-deductions", label: "Read the dispute guide" },
      { href: "/guides/fair-wear-and-tear-australia", label: "See wear and tear examples" },
    ],
  },
  "how-to-get-your-bond-back-vic": {
    eyebrow: "Victoria bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in Victoria",
    heroBody:
      "This page helps Victorian renters prepare before the final inspection, organise proof clearly, and avoid saying yes to deductions too early.",
    quickChecks: [
      "Keep entry reports, exit photos and cleaning receipts together",
      "Ask for a clear breakdown before agreeing to money being kept",
      "Use a simple estimate first so the deduction size is obvious",
    ],
    actionTitle: "What to do next",
    actions: [
      "Check the claimed issue against your entry condition report and exit photos.",
      "Ask for itemised evidence, invoices or quotes if the amount feels vague.",
      "Use the bond refund calculator so you can see the real impact on the final refund.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/how-to-dispute-bond-deductions", label: "Read the dispute guide" },
      { href: "/guides/melbourne-bond-refund-guide", label: "See the Melbourne renter guide" },
    ],
  },
  "how-to-get-your-bond-back-qld": {
    eyebrow: "Queensland bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in Queensland",
    heroBody:
      "This page helps Queensland renters keep the process simple: organise evidence, understand the claimed deduction, and do not rush into agreeing before the numbers make sense.",
    quickChecks: [
      "Take clear final photos before keys are returned",
      "Keep cleaning receipts, emails and condition reports in one folder",
      "Check any claim against a simple refund estimate first",
    ],
    actionTitle: "Best next moves",
    actions: [
      "Match each claimed cost to real evidence, not just a broad statement from the agent.",
      "Ask for invoices or quotes if cleaning, repairs or rent are being deducted.",
      "Use the calculator to see whether the missing bond amount is small, serious or worth disputing further.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
      { href: "/guides/brisbane-bond-refund-guide", label: "See the Brisbane renter guide" },
    ],
  },
  "how-long-does-bond-refund-take": {
    eyebrow: "Bond timeline guide",
    heroTitle: "How long does a bond refund usually take?",
    heroBody:
      "This page gives renters a simple way to think about the bond refund timeline, what can slow it down, and what to do if the process starts dragging out.",
    quickChecks: [
      "Simple refunds can move quickly when both sides agree",
      "Disputes, missing evidence or slow replies usually add time",
      "A clear paper trail often speeds up the next step",
    ],
    actionTitle: "If it feels slow",
    actions: [
      "Check whether both sides have actually agreed on the deduction or refund amount.",
      "Put your photos, receipts, emails and condition reports into one folder before chasing an update.",
      "Ask for a written breakdown if money is being kept and the reason is still unclear.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate what should come back" },
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
      { href: "/guides/rental-bond-refund-letter-template", label: "Use the refund letter template" },
    ],
  },
  "sydney-bond-refund-guide": {
    eyebrow: "Sydney renter guide",
    heroTitle: "Sydney bond refund guide for renters who want fewer surprises",
    heroBody:
      "If you are ending a lease in Sydney, this page helps you prepare for deductions, final inspection pressure and the real-world costs that often appear at the last minute.",
    quickChecks: [
      "Take photos before cleaners, agents or owners re-enter the property",
      "Keep receipts for cleaning, repairs and any agreed services",
      "Check the claim against Sydney quote ranges before saying yes",
    ],
    actionTitle: "Use this before handover",
    actions: [
      "Run the bond refund calculator so you know what each deduction does to the final amount.",
      "Compare any Sydney cleaning or repair claim with a real quote or invoice, not just a vague estimate.",
      "Keep emails, photos and the entry report together in case the claim changes later.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Check your refund amount" },
      { href: "/guides/sydney-end-of-lease-cleaning-costs", label: "Compare Sydney cleaning costs" },
      { href: "/guides/how-to-get-your-bond-back-nsw", label: "Read the NSW bond checklist" },
    ],
  },
  "brisbane-break-lease-costs": {
    eyebrow: "Brisbane lease exit guide",
    heroTitle: "What could breaking a lease in Brisbane really cost?",
    heroBody:
      "This page helps Brisbane renters estimate the likely cost before accepting uncovered rent, advertising charges or reletting fees at face value.",
    quickChecks: [
      "Separate uncovered rent from one-off fees",
      "Check whether the property was actually re-let quickly",
      "Compare the break cost with moving and staying costs",
    ],
    actionTitle: "Before you agree",
    actions: [
      "Ask for dates, invoices and evidence of reletting activity if the figure feels high.",
      "Use the break lease calculator with your own assumptions first, not just the agent number.",
      "Compare the result with moving cost, bond and cleaning costs before deciding the best next step.",
    ],
    extraLinks: [
      { href: "/calculators/break-lease-calculator", label: "Estimate break lease costs" },
      { href: "/calculators/moving-cost-calculator", label: "Compare moving costs" },
      { href: "/guides/break-lease-costs-australia", label: "Read the national guide" },
    ],
  },
  "melbourne-rent-increase-guide": {
    eyebrow: "Melbourne rent guide",
    heroTitle: "Should you accept this rent increase in Melbourne?",
    heroBody:
      "This page helps Melbourne renters compare the new rent with income, moving costs and the real cost of staying versus leaving.",
    quickChecks: [
      "Check the yearly cost, not just the weekly jump",
      "Compare the increase with your real household budget",
      "Do not ignore moving costs when a cheaper place looks tempting",
    ],
    actionTitle: "Use it well",
    actions: [
      "Run the rent increase calculator so the weekly, monthly and annual jump is clear.",
      "Check the result against affordability and likely moving costs in Melbourne.",
      "If the increase feels too high, compare the cost of staying with the cost of moving over the next year.",
    ],
    extraLinks: [
      { href: "/calculators/rent-increase-calculator", label: "Compare the rent increase" },
      { href: "/calculators/rental-affordability-calculator", label: "Check affordability" },
      { href: "/guides/melbourne-moving-costs", label: "See Melbourne moving costs" },
    ],
  },
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle ?? guide.title,
    description: guide.metaDescription ?? guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle ?? guide.title,
      description: guide.metaDescription ?? guide.description,
      url: `${site.url}/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
  const faqs = guideFaqs(guide);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        name: "Guides",
        item: `${site.url}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${site.url}/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <article>
        <nav className="text-sm font-semibold text-slate-500">
          <Link className="focus-ring hover:text-[var(--brand)]" href="/">
            Home
          </Link>
          <span> / </span>
          <Link className="focus-ring hover:text-[var(--brand)]" href="/guides">
            Guides
          </Link>
        </nav>
        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">
            {guideUpgrades[guide.slug]?.eyebrow ?? guide.category}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            {guideUpgrades[guide.slug]?.heroTitle ?? guide.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {guideUpgrades[guide.slug]?.heroBody ?? guide.description}
          </p>
          {guideUpgrades[guide.slug] ? (
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {guideUpgrades[guide.slug].quickChecks.map((point) => (
                <div key={point} className="rounded-xl border border-[var(--line)] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  {point}
                </div>
              ))}
            </div>
          ) : null}
        </header>

        {guideUpgrades[guide.slug] ? (
          <section className="mt-8 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-800">
                {guideUpgrades[guide.slug].actionTitle}
              </p>
              <div className="mt-4 grid gap-3">
                {guideUpgrades[guide.slug].actions.map((step, index) => (
                  <div key={step} className="rounded-xl bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700">
                    <strong className="mr-2 text-[var(--brand-dark)]">0{index + 1}</strong>
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Useful next clicks</p>
              <div className="mt-4 grid gap-3">
                {guideUpgrades[guide.slug].extraLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[var(--brand)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="content-prose mt-8 rounded-md border border-[var(--line)] bg-white p-6">
          <h2>Quick answer</h2>
          <p>{guide.description}</p>
          {guideSections(guide).map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <h2>Renter action planner</h2>
          <div className="not-prose grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Estimate</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use the related calculator to turn the issue into a rough dollar range before replying.</p>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Collect proof</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Keep photos, condition reports, receipts, quotes, invoices, emails and key dates together.</p>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Compare</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Compare any claimed amount with the evidence, the quote detail and the actual property condition.</p>
            </div>
          </div>
          <h2>Related calculators</h2>
          <ul>
            {guide.relatedCalculators.map((slug) => {
              const calculator = getCalculator(slug);
              if (!calculator) return null;
              return (
                <li key={slug}>
                  <Link className="font-bold text-[var(--brand-dark)] hover:underline" href={`/calculators/${calculator.slug}`}>
                    {calculator.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <h2>Frequently asked questions</h2>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
          <h2>Disclaimer</h2>
          <p>{site.disclaimer}</p>
        </section>
        <div className="mt-8">
          <AdSlot label="Sponsored content" format="fluid" />
        </div>
      </article>
      <aside className="grid content-start gap-5">
        <AdSlot />
        <EmailCapture />
        <AffiliateCTA />
      </aside>
    </main>
  );
}
