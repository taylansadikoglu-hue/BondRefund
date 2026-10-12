import Link from "next/link";

export function EditorialNote() {
  return (
    <aside className="mt-5 rounded-xl border border-[var(--line)] bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
      <p className="font-bold text-slate-950">Reviewed by the BondRefund.online editorial team</p>
      <p>
        Last reviewed 9 October 2026. This independent Australian resource is checked against state and territory tenancy authorities and clearly
        separates planning estimates from legal outcomes.
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-bold text-[var(--brand-dark)]">
        <Link href="/renter-resources" className="underline">Official renter sources</Link>
        <Link href="/methodology" className="underline">Methodology</Link>
        <Link href="/contact" className="underline">Report an issue</Link>
      </div>
    </aside>
  );
}
