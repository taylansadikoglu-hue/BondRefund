import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { EmailCapture } from "@/components/EmailCapture";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Australian Renter Guides",
  description: "Helpful guides for Australian renters covering bond refunds, moving costs, rent increases and end-of-lease preparation.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const featuredGuides = [
    "how-to-get-your-bond-back-nsw",
    "how-long-does-bond-refund-take",
    "sydney-bond-refund-guide",
    "sydney-moving-costs",
  ]
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is (typeof guides)[number] => Boolean(guide));

  const guideGroups = [
    {
      title: "Bond refund help",
      body: "Pages for final inspection, deductions, timelines, evidence and getting your bond back.",
      slugs: ["how-to-get-your-bond-back-nsw", "how-to-get-your-bond-back-vic", "how-to-get-your-bond-back-qld", "how-long-does-bond-refund-take"],
    },
    {
      title: "Moving and cost planning",
      body: "Pages for moving quotes, budget checks, cleaning costs and the real cost of changing property.",
      slugs: ["moving-costs-australia", "sydney-moving-costs", "brisbane-moving-costs", "end-of-lease-cleaning-cost"],
    },
    {
      title: "Rent pressure and lease exits",
      body: "Pages for rent increases, break lease costs and deciding whether staying or moving is the better option.",
      slugs: ["rent-affordability-guide", "melbourne-rent-increase-guide", "brisbane-break-lease-costs", "break-lease-costs-australia"],
    },
  ].map((group) => ({
    ...group,
    guides: group.slugs.map((slug) => guides.find((guide) => guide.slug === slug)).filter(Boolean),
  }));

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <section>
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Guides</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">Australian renter guides</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Clear, general information to help renters organise evidence, estimate costs and prepare for moving.
        </p>
        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">How to use this library</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Start with the guide that matches your exact problem",
              "Use the linked calculator to turn the issue into a simple number",
              "Check your lease, photos, quotes and official state information before deciding",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-[var(--line)] bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Best places to start</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featuredGuides.map((guide) =>
              guide ? (
                <Link
                  className="focus-ring rounded-xl border border-[var(--line)] bg-slate-50 p-5 hover:border-[var(--brand)]"
                  href={`/guides/${guide.slug}`}
                  key={guide.slug}
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--brand-dark)]">{guide.category}</span>
                  <h2 className="mt-2 text-xl font-extrabold">{guide.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                </Link>
              ) : null,
            )}
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {guideGroups.map((group) => (
            <section key={group.title} className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-950">{group.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{group.body}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {group.guides.map((guide) =>
                  guide ? (
                    <Link
                      className="focus-ring rounded-xl border border-[var(--line)] bg-slate-50 p-5 hover:border-[var(--brand)]"
                      href={`/guides/${guide.slug}`}
                      key={guide.slug}
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-[var(--brand-dark)]">{guide.category}</span>
                      <h3 className="mt-2 text-lg font-extrabold">{guide.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link className="focus-ring rounded-md border border-[var(--line)] bg-white p-5 shadow-sm hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--brand-dark)]">{guide.category}</span>
              <h2 className="mt-2 text-xl font-extrabold">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <aside className="grid content-start gap-5">
        <AdSlot />
        <EmailCapture />
      </aside>
    </main>
  );
}
