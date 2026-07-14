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
  title: "Bond refund, rent increase and moving cost calculators",
  description: "Simple renter calculators and guides for bond refunds, rent increases, moving costs, break lease costs and end-of-lease cleaning.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BondRefund.online | Bond, rent and moving calculators",
    description:
      "Simple renter calculators and guides for bond refunds, rent increases, moving costs, break lease costs and end-of-lease cleaning.",
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
                href: "/guides/how-to-get-your-bond-back-nsw",
                title: "How to get your bond back in NSW",
                body: "Use a simple checklist before final inspection and deduction talks.",
              },
              {
                href: "/guides/sydney-moving-costs",
                title: "Sydney moving costs guide",
                body: "See the extras renters often miss when comparing a move.",
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
    </main>
  );
}
