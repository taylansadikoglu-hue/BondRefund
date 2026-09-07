import type { Metadata } from "next";
import Link from "next/link";
import { officialResources } from "@/lib/official-resources";

export const metadata: Metadata = {
  title: "Official Renter Resources Australia",
  description: "Official Australian tenancy and rental bond sources used alongside BondRefund.online calculators and guides.",
  alternates: { canonical: "/renter-resources" }
};

export default function RenterResourcesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Official sources</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">Check the rule where you rent</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Our calculators help you organise the money. Official tenancy authorities explain the rules. Use the source for the state or territory where the property is located before making a serious decision.
      </p>
      <section className="mt-8 grid gap-4">
        {officialResources.map((resource) => (
          <article key={resource.region} className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">{resource.region}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{resource.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{resource.body}</p>
            <a className="focus-ring mt-4 inline-flex font-bold text-[var(--brand-dark)] underline" href={resource.href} rel="noopener noreferrer" target="_blank">
              Open the official source
            </a>
          </article>
        ))}
      </section>
      <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-2xl font-extrabold text-slate-950">Use both parts together</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Start with a calculator to understand the rough dollar effect. Then use the official source to check process, timing, evidence and local rules. Sources were last checked on 8 September 2026.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 font-bold text-white" href="/calculators/bond-refund-calculator">Estimate your bond refund</Link>
          <Link className="focus-ring rounded-md border border-[var(--line)] bg-white px-4 py-3 font-bold text-slate-900" href="/methodology">Read our methodology</Link>
        </div>
      </section>
    </main>
  );
}
