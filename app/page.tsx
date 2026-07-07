import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { EmailCapture } from "@/components/EmailCapture";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";

export default function HomePage() {
  const localGuides = guides.filter((guide) => guide.category === "Local guides").slice(0, 6);

  return (
    <main>
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-bold text-[var(--brand-dark)]">
              Free Australian renter calculators
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
              Know your rental costs before they surprise you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Estimate bond refunds, break lease costs, rent increases, moving costs and end-of-lease expenses with transparent Australian renter tools.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 text-center font-bold text-white" href="/calculators/bond-refund-calculator">
                Calculate bond refund
              </Link>
              <Link className="focus-ring rounded-md border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-900" href="/guides">
                Browse guides
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["No signup", "Fast estimates", "Built for Australia"].map((item) => (
                <div className="rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-slate-700" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="brand-shadow overflow-hidden rounded-md border border-[var(--line)] bg-white">
            <Image
              alt="Rental paperwork, keys and moving cost planning on a bright table"
              className="h-56 w-full object-cover"
              height={720}
              priority
              src="/renter-costs-hero.png"
              width={960}
            />
            <div className="p-5">
              <div className="rounded-md bg-[var(--soft-gold)] p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-800">Start here</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-950">What might you get back?</p>
              </div>
              <div className="mt-4 grid gap-3">
                {calculators.slice(0, 5).map((calculator) => (
                  <Link className="focus-ring rounded-md border border-slate-200 p-4 hover:border-[var(--brand)] hover:bg-slate-50" href={`/calculators/${calculator.slug}`} key={calculator.slug}>
                    <span className="font-bold">{calculator.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{calculator.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Calculators</p>
            <h2 className="mt-2 text-3xl font-extrabold">Plan the money side of renting</h2>
          </div>
          <Link className="focus-ring text-sm font-bold text-[var(--brand-dark)] hover:underline" href="/guides">
            See renter guides
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {calculators.map((calculator) => (
            <Link className="focus-ring rounded-md border border-[var(--line)] bg-white p-5 shadow-sm hover:border-[var(--brand)]" href={`/calculators/${calculator.slug}`} key={calculator.slug}>
              <h2 className="text-xl font-extrabold">{calculator.shortTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{calculator.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">How it works</p>
            <h2 className="mt-2 text-3xl font-extrabold">Simple numbers first, then better questions</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              BondRefund.online helps renters get organised before they reply to an agent, compare quotes or agree to deductions.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Pick the right calculator",
                body: "Choose the bond, rent, moving or break lease tool that matches the decision in front of you.",
              },
              {
                title: "Enter your own numbers",
                body: "Use your rent, bond, quotes and fees so the estimate reflects your situation, not a generic example.",
              },
              {
                title: "Use the result to prepare",
                body: "Take the estimate into your next step with receipts, condition reports, emails and local tenancy guidance.",
              },
            ].map((item) => (
              <div className="rounded-md border border-[var(--line)] bg-slate-50 p-5" key={item.title}>
                <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Local SEO</p>
          <h2 className="mt-2 text-2xl font-extrabold">Bond refund guides by city</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {localGuides.map((guide) => (
              <Link className="focus-ring rounded-md border border-[var(--line)] bg-white p-4 hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
                <span className="font-bold">{guide.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-extrabold">Starter renter guides</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {guides.slice(0, 8).map((guide) => (
              <Link className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
                <span className="font-bold">{guide.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <AdSlot />
          <EmailCapture />
          <AffiliateCTA />
        </div>
      </section>
    </main>
  );
}
