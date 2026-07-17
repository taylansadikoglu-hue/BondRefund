import type { Metadata } from "next";
import Link from "next/link";
import { HomeCountryExperience } from "@/components/HomeCountryExperience";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const homepageFaqs = [
  {
    question: "What does BondRefund.online help with?",
    answer:
      "BondRefund.online helps renters estimate bond refunds, rent increases, break lease costs, moving costs, end-of-lease cleaning costs and rental affordability in simple language.",
  },
  {
    question: "Is BondRefund.online legal advice?",
    answer:
      "No. BondRefund.online gives general information and simple estimates. Renters should still check their lease, local housing rules and official tenancy authorities.",
  },
  {
    question: "Who is BondRefund.online for?",
    answer:
      "It is for renters who want a fast estimate before replying to an agent, landlord or property manager, especially when English may be their second language.",
  },
  {
    question: "Which countries does BondRefund.online support?",
    answer:
      "The site starts with Australia and also provides renter-friendly calculator wording for the United States and the United Kingdom.",
  },
];

export const metadata: Metadata = {
  title: "Bond Refund Calculator, Rent Increase & Moving Cost Tools Australia",
  description:
    "Simple Australian renter calculators and guides for bond refunds, rent increases, break lease costs, moving costs and rental affordability.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BondRefund.online | Bond, rent and moving calculators",
    description:
      "Simple Australian renter calculators and guides for bond refunds, rent increases, moving costs, break lease costs and rental affordability.",
    url: site.url,
    type: "website",
  },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "BondRefund.online",
    url: site.url,
    description: "Simple renter calculators and guides for bond refunds, rent increases, moving costs, break lease costs and end-of-lease cleaning.",
    about: [
      "Rental bond refunds",
      "Rent increases",
      "Break lease costs",
      "Moving costs",
      "End of lease cleaning",
    ],
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <HomeCountryExperience />
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Quick answers</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Simple answers to common renter questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {homepageFaqs.map((faq) => (
              <div className="rounded-xl border border-[var(--line)] p-5" key={faq.question}>
                <h3 className="text-lg font-extrabold text-slate-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Popular next clicks</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Start with the pages renters use most</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            If you are trying to work out money, deductions or whether moving still makes sense, these are the best places to start.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/calculators/bond-refund-calculator",
                title: "Bond refund calculator",
                body: "Estimate how much bond may come back after claimed deductions.",
              },
              {
                href: "/calculators/rental-affordability-calculator",
                title: "Rental affordability calculator",
                body: "Check whether the rent looks manageable before you apply or renew.",
              },
              {
                href: "/calculators/break-lease-calculator",
                title: "Break lease calculator",
                body: "Estimate uncovered rent, fees and the real cost of leaving early.",
              },
              {
                href: "/guides/how-to-get-your-bond-back-nsw",
                title: "How to get your bond back in NSW",
                body: "Use a simple NSW checklist before final inspection and deduction talks.",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl border border-[var(--line)] p-5 hover:border-[var(--brand)]">
                <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Built for real renter problems",
              body: "The site focuses on bond deductions, moving costs, rent increases, break lease costs and affordability checks because those are the questions renters actually need help with.",
            },
            {
              title: "Simple first, then deeper help",
              body: "Each page aims to give a quick answer first, then the calculator, then the practical checks and next steps that help a renter use the result properly.",
            },
            {
              title: "Independent and transparent",
              body: "The site is independent, not a tenancy authority or real estate agency, and it explains where calculators stop and official rules or evidence need to take over.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">How the site works</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Start with the number. Then check the records.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "1. Use the closest calculator",
                body: "Pick the page that matches the exact problem: bond refund, rent increase, break lease, moving cost, cleaning or affordability.",
              },
              {
                title: "2. Turn the issue into a simple estimate",
                body: "Use the result to understand the rough size of the problem before you agree to anything or spend money.",
              },
              {
                title: "3. Check your evidence and local rules",
                body: "Compare the estimate with your lease, photos, receipts, quotes, emails and official state information before making a decision.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--line)] bg-slate-50 p-5">
                <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="focus-ring rounded-md border border-[var(--line)] bg-white px-4 py-3 font-bold text-slate-900 hover:border-[var(--brand)]" href="/methodology">
              Read the methodology
            </Link>
            <Link className="focus-ring rounded-md border border-[var(--line)] bg-white px-4 py-3 font-bold text-slate-900 hover:border-[var(--brand)]" href="/editorial-policy">
              Read the editorial policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
