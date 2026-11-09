import type { Metadata } from "next";
import Link from "next/link";
import { DeductionEvidenceChecker } from "@/components/DeductionEvidenceChecker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bond Deduction Evidence Checker for Australian Renters",
  description: "List proposed bond deductions, organise the records you have and prepare a calm request for itemised details. Free, private, and built for Australian renters.",
  alternates: { canonical: "/tools/bond-deduction-evidence-checker" },
  robots: { index: true, follow: true },
  openGraph: { title: "Bond Deduction Evidence Checker | BondRefund.online", description: "A practical checklist to organise bond deduction details and records before you reply.", url: `${site.url}/tools/bond-deduction-evidence-checker`, type: "website" },
};

export default function BondDeductionEvidenceCheckerPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="border-b border-[var(--line)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Link href="/calculators/bond-refund-calculator" className="text-sm font-bold text-[var(--brand-dark)] underline">← Bond refund calculator</Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Free renter tool · Australia</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Bond deduction evidence checker</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">Have you been told money may come out of your bond? List each item, see what records to gather, and prepare a clear request for more detail.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-700"><span className="rounded-full bg-emerald-50 px-3 py-2">No sign-up</span><span className="rounded-full bg-emerald-50 px-3 py-2">No file uploads</span><span className="rounded-full bg-emerald-50 px-3 py-2">Takes a few minutes</span></div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-10"><DeductionEvidenceChecker /></section>
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="grid gap-5 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
        <div><h2 className="text-xl font-extrabold text-slate-950">What this tool can—and cannot—do</h2><p className="mt-2 text-sm leading-7 text-slate-700">It helps you organise information and ask for an itemised explanation. It cannot tell you whether a deduction is lawful, predict a tribunal decision, or replace advice from your local tenancy service.</p></div>
        <div><h2 className="text-xl font-extrabold text-slate-950">A useful next step</h2><p className="mt-2 text-sm leading-7 text-slate-700">Compare the claimed amount with the bond you paid and see the possible balance. Then check your local authority’s process and dates.</p><Link className="mt-3 inline-flex font-bold text-[var(--brand-dark)] underline" href="/calculators/bond-refund-calculator">Open the bond refund calculator →</Link></div>
      </div>
    </section>
  </main>;
}
