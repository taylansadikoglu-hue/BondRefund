import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorClient } from "@/components/CalculatorClient";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { calculators, getCalculator } from "@/lib/calculators";
import { getGuide } from "@/lib/guides";
import { isIndexableGuide } from "@/lib/index-policy";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const pageUpgrades: Record<
  string,
  {
    eyebrow: string;
    heroTitle?: string;
    heroBody: string;
    introPoints: string[];
    useCases: string[];
    nextSteps: string[];
    relatedLinks: { href: string; label: string }[];
    resultItems: { label: string; body: string }[];
    officialSource?: { label: string; href: string };
  }
> = {
  "rental-affordability-calculator": {
    eyebrow: "Rent budget tool",
    heroTitle: "Can you really afford this rent?",
    heroBody:
      "This page helps you pressure-test the rent before you apply, renew, or decide whether moving is the better option.",
    introPoints: [
      "See rent as a share of your yearly income",
      "Get a simple comfort rating in seconds",
      "Use it before signing, renewing or comparing suburbs",
    ],
    useCases: [
      "You are comparing two rentals",
      "You just got a rent increase",
      "You want to know if moving may be cheaper overall",
    ],
    nextSteps: [
      "Run the affordability check with combined household income if more than one person pays rent.",
      "Compare the result with moving costs, bond needs and the new weekly budget.",
      "If the rent feels stretched, review cheaper suburbs or negotiate before signing.",
    ],
    relatedLinks: [
      { href: "/calculators/rent-increase-calculator", label: "Compare a rent increase" },
      { href: "/calculators/moving-cost-calculator", label: "Estimate moving costs" },
      { href: "/guides/rent-affordability-guide", label: "Read the affordability guide" },
    ],
    resultItems: [
      { label: "Rent share", body: "The percentage of gross household income going to rent before tax and other bills." },
      { label: "Weekly room", body: "The income left before tax after the weekly rent amount is set aside." },
      { label: "Pressure rating", body: "A simple planning signal—not an approval rule or proof that a home is affordable." },
    ],
    officialSource: {
      label: "ASIC Moneysmart budget planner",
      href: "https://moneysmart.gov.au/budgeting/budget-planner",
    },
  },
  "bond-refund-calculator": {
    eyebrow: "Bond back estimate",
    heroTitle: "How much bond might you actually get back?",
    heroBody:
      "This calculator gives renters a fast estimate before replying to an agent, landlord or property manager about deductions.",
    introPoints: [
      "See the refund amount after claimed deductions",
      "Use it before agreeing to cleaning or damage costs",
      "Keep the number simple before you move into dispute mode",
    ],
    useCases: [
      "You have been given a deduction amount and want to sense-check it",
      "You are comparing multiple claimed costs before responding",
      "You want to see whether the missing bond amount is small or serious",
    ],
    nextSteps: [
      "Match every deduction against your entry report, exit photos and written messages.",
      "Ask for itemised invoices or quotes if the amount feels vague or inflated.",
      "If the number is larger than expected, read the dispute and wear-and-tear guides before responding.",
    ],
    relatedLinks: [
      { href: "/guides/how-long-does-bond-refund-take", label: "See the bond timeline" },
      { href: "/guides/how-to-get-your-bond-back-nsw", label: "Read the NSW bond guide" },
      { href: "/guides/fair-wear-and-tear-australia", label: "Check wear and tear examples" },
    ],
    resultItems: [
      { label: "Bond paid", body: "The full bond amount held before any agreed or decided deductions." },
      { label: "Claimed deductions", body: "Cleaning, rent, repairs or other amounts entered for a first-pass comparison." },
      { label: "Estimated refund", body: "Bond paid minus the entered claims; it does not decide whether each claim is valid." },
    ],
  },
  "break-lease-calculator": {
    eyebrow: "Lease exit cost tool",
    heroTitle: "What could breaking the lease really cost?",
    heroBody:
      "This calculator helps renters separate the scary headline from the likely real costs before agreeing to uncovered rent, reletting fees or advertising charges.",
    introPoints: [
      "Estimate uncovered rent and one-off fees separately",
      "Use it before you accept a landlord or agent figure",
      "Compare the exit cost with the cost of staying or moving later",
    ],
    useCases: [
      "You need to leave early and want a clean first estimate",
      "An agent has quoted a break lease amount and you want to sense-check it",
      "You are comparing whether moving now is better than waiting",
    ],
    nextSteps: [
      "Keep rent exposure separate from fixed charges like advertising or reletting.",
      "Ask for dates, invoices and proof of reletting efforts if the amount feels high.",
      "Compare the result with moving costs, cleaning and the cost of staying put for a bit longer.",
    ],
    relatedLinks: [
      { href: "/guides/break-lease-costs-australia", label: "Read the Australia break lease guide" },
      { href: "/guides/brisbane-break-lease-costs", label: "See a Brisbane example" },
      { href: "/calculators/moving-cost-calculator", label: "Compare moving costs too" },
    ],
    resultItems: [
      { label: "Uncovered rent", body: "Weekly rent multiplied by the vacancy period you entered." },
      { label: "One-off costs", body: "Advertising, reletting and other entered costs shown separately from rent exposure." },
      { label: "Planning total", body: "A scenario for discussion—not a ruling on what can legally be charged." },
    ],
  },
  "moving-cost-calculator": {
    eyebrow: "Moving budget tool",
    heroTitle: "How much could your move really cost?",
    heroBody:
      "This calculator helps renters budget for the full move, not just the truck, so the cheap new place does not become an expensive surprise.",
    introPoints: [
      "Estimate bedrooms, hours, distance and extras",
      "Use it before signing or comparing suburbs",
      "Include cleaning, access issues and storage if needed",
    ],
    useCases: [
      "You are choosing between staying and moving",
      "You need a simple budget before booking removalists",
      "You want to compare quote ranges with your own assumptions",
    ],
    nextSteps: [
      "Get written quotes and check if call-out time, fuel and GST are included.",
      "Add a buffer for stairs, parking problems, lifts or delays on the day.",
      "Compare the move cost with the rent difference over the next 6 to 12 months.",
    ],
    relatedLinks: [
      { href: "/guides/moving-costs-australia", label: "Read the Australia moving guide" },
      { href: "/guides/sydney-moving-costs", label: "See Sydney moving costs" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent too" },
    ],
    resultItems: [
      { label: "Removalist estimate", body: "Hourly rate multiplied by time, then adjusted for the distance assumptions entered." },
      { label: "Extras", body: "Packing, storage and other costs you add rather than leaving them as moving-day surprises." },
      { label: "Planning range", body: "A buffer around the estimate because access, delays and quote inclusions vary." },
    ],
  },
  "rent-increase-calculator": {
    eyebrow: "Rent change checker",
    heroTitle: "What does the rent increase cost over a full year?",
    heroBody:
      "Turn a weekly rent rise into weekly, monthly and annual figures before you decide whether to accept it, question it or compare the cost of moving.",
    introPoints: [
      "See the weekly and yearly increase together",
      "Check the percentage change in seconds",
      "Compare staying with the real cost of moving",
    ],
    useCases: [
      "You received a rent increase notice",
      "You are comparing a renewal with another property",
      "You need one clear number for a household budget discussion",
    ],
    nextSteps: [
      "Check the notice date and the rules for your state or territory.",
      "Compare the new rent with similar local properties and your household budget.",
      "If moving is an option, include bond, cleaning, removalists and rent overlap before deciding.",
    ],
    relatedLinks: [
      { href: "/guides/rent-increase-rules-australia", label: "Check rent increase rules" },
      { href: "/calculators/rental-affordability-calculator", label: "Test the new rent" },
      { href: "/calculators/moving-cost-calculator", label: "Compare moving costs" },
    ],
    resultItems: [
      { label: "Weekly increase", body: "New weekly rent minus current weekly rent." },
      { label: "Monthly equivalent", body: "The annual increase divided by 12—not simply four weekly increases." },
      { label: "Annual impact", body: "The weekly increase multiplied by 52, useful for comparing staying and moving." },
    ],
    officialSource: {
      label: "Official state and territory renter contacts",
      href: "/renter-resources",
    },
  },
  "end-of-lease-cleaning-calculator": {
    eyebrow: "Cleaning quote checker",
    heroTitle: "What might an end-of-lease clean cost?",
    heroBody:
      "Build a practical cleaning range from the property size and the work actually needed, then compare quotes line by line before booking or accepting a deduction.",
    introPoints: [
      "Start with bedrooms and bathrooms",
      "Add carpet, furniture and condition only when relevant",
      "Compare quote inclusions—not just the final price",
    ],
    useCases: [
      "You need a budget before requesting cleaner quotes",
      "You want to compare two quotes with different inclusions",
      "An agent has claimed a cleaning deduction and you need a sense-check",
    ],
    nextSteps: [
      "Ask each cleaner to itemise carpet, oven, windows, walls, balconies and GST.",
      "Confirm whether a return clean is included if the agent identifies missed work.",
      "Keep the invoice, entry report, exit photos and any re-clean messages together.",
    ],
    relatedLinks: [
      { href: "/guides/sydney-end-of-lease-cleaning-costs", label: "See a detailed cleaning-cost example" },
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the room checklist" },
      { href: "/calculators/bond-refund-calculator", label: "Check the bond impact" },
    ],
    resultItems: [
      { label: "Base clean", body: "The starting range for the property size entered." },
      { label: "Added work", body: "Carpet, furnished rooms, extra bathrooms and condition adjustments." },
      { label: "Quote range", body: "A planning range for comparison; actual local quotes and inclusions can differ." },
    ],
  },
  "bond-loan-calculator": {
    eyebrow: "Bond loan repayment tool",
    heroTitle: "What would a bond loan really cost each week?",
    heroBody:
      "Turn the amount borrowed, fees and repayment period into a simple total and weekly estimate before agreeing to a private loan or comparing official assistance.",
    introPoints: [
      "See repayment and total cost separately",
      "Add known fees instead of hiding them",
      "Compare the loan with state-based bond assistance first",
    ],
    useCases: [
      "You need help covering bond before the old bond is returned",
      "You are comparing a private bond loan with official assistance",
      "You want to know whether repayments fit beside the new rent",
    ],
    nextSteps: [
      "Check whether your state or territory offers a bond loan or grant before using private credit.",
      "Compare the total repayment, not only the weekly amount.",
      "Add new rent, rent in advance and moving costs to the same budget.",
    ],
    relatedLinks: [
      { href: "/guides/rent-affordability-guide", label: "Check the full rental budget" },
      { href: "/guides/moving-costs-australia", label: "Plan move-in costs" },
      { href: "/calculators/rental-affordability-calculator", label: "Check rent affordability" },
    ],
    resultItems: [
      { label: "Amount borrowed", body: "The bond funding shortfall entered before fees or repayments." },
      { label: "Total repayment", body: "Borrowed amount plus the fees and charges included in the scenario." },
      { label: "Weekly repayment", body: "The total divided across the repayment weeks entered for budgeting." },
    ],
    officialSource: {
      label: "Official state and territory renter contacts",
      href: "/renter-resources",
    },
  },
};

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
  const upgrade = pageUpgrades[calculator.slug];
  const defaultUseCases = [
    "You want a simple estimate before replying to an agent or landlord",
    "You need to compare the cost with staying, moving or disputing",
    "You want the main money drivers written in plain English",
  ];
  const defaultNextSteps = [
    "Enter the simplest numbers first, then adjust extras only if they apply.",
    "Keep photos, quotes, invoices, emails and condition reports together.",
    "Check official state or territory guidance before relying on the result for a dispute.",
  ];

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
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">
            {upgrade?.eyebrow ?? "Free renter calculator"}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            {upgrade?.heroTitle ?? calculator.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {upgrade?.heroBody ?? calculator.description}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(upgrade?.introPoints ?? [
              "Fast estimate before you reply",
              "Built for renters, not agents",
              "General guidance with clear limits",
            ]).map((point) => (
              <div key={point} className="rounded-xl border border-[var(--line)] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {point}
              </div>
            ))}
          </div>
        </header>

        <section className="mt-8">
          <CalculatorClient kind={calculator.kind} />
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
            {site.disclaimer}
          </p>
        </section>

        {upgrade ? (
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Read your result</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">What the numbers mean</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {upgrade.resultItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-950">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
            {upgrade.officialSource ? (
              upgrade.officialSource.href.startsWith("http") ? (
                <a
                  className="mt-5 inline-flex font-bold text-[var(--brand-dark)] hover:underline"
                  href={upgrade.officialSource.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Check the official source: {upgrade.officialSource.label}
                </a>
              ) : (
                <Link className="mt-5 inline-flex font-bold text-[var(--brand-dark)] hover:underline" href={upgrade.officialSource.href}>
                  Check the official source: {upgrade.officialSource.label}
                </Link>
              )
            ) : null}
          </section>
        ) : null}

        <section className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Best for</p>
            <div className="mt-4 grid gap-3">
              {(upgrade?.useCases ?? defaultUseCases).map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-800">Use the result well</p>
            <div className="mt-4 grid gap-3">
              {(upgrade?.nextSteps ?? defaultNextSteps).map((step, index) => (
                <div key={step} className="rounded-xl bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700">
                  <strong className="mr-2 text-[var(--brand-dark)]">0{index + 1}</strong>
                  {step}
                </div>
              ))}
            </div>
          </div>
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
          <h2>What can change the real answer</h2>
          <p>
            The estimate can change when the lease wording, property condition, local rules, evidence quality, timing, quote detail or payment
            arrangement changes. Use the calculator as a first pass, then check the documents and official guidance that apply to your situation.
          </p>
          <h2>What to keep before you respond</h2>
          <ul>
            <li>Entry and exit condition reports.</li>
            <li>Photos or videos with dates where possible.</li>
            <li>Receipts, quotes, invoices and written messages.</li>
            <li>Your lease, rent ledger and key handover date.</li>
          </ul>
        </section>

        {upgrade ? (
          <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Good next pages</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {upgrade.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-xl border border-[var(--line)] p-4 hover:border-[var(--brand)]"
                >
                  <span className="font-bold text-slate-950">{link.label}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8">
          <AdSlot label="Sponsored content" format="fluid" />
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Related guides</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {calculator.relatedGuides.filter(isIndexableGuide).map((slug) => {
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
        <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-extrabold">Use official rules too</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This page helps with planning, but rental rules can vary by state or territory. Use official tenancy guidance before making a serious decision.
          </p>
          <Link className="mt-4 inline-flex font-bold text-[var(--brand-dark)] hover:underline" href="/methodology">
            Read how estimates work
          </Link>
          <Link className="mt-3 block font-bold text-[var(--brand-dark)] hover:underline" href="/renter-resources">
            Check official renter sources
          </Link>
        </section>
      </aside>
    </main>
  );
}
