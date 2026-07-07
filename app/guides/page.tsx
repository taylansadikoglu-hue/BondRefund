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
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <section>
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Guides</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">Australian renter guides</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Clear, general information to help renters organise evidence, estimate costs and prepare for moving.
        </p>
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
