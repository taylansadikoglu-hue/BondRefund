"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { EmailCapture } from "@/components/EmailCapture";
import { calculators } from "@/lib/calculators";
import { countryExperiences, type CountryCode } from "@/lib/country-experience";
import { useCountryPreference } from "@/lib/country-preference";
import { guides } from "@/lib/guides";

export function HomeCountryExperience() {
  const { country, setCountry, ready } = useCountryPreference("AU");
  const detected = country;

  const experience = countryExperiences[country];
  const localGuides = useMemo(() => guides.filter((guide) => guide.category === "Local guides").slice(0, 6), []);
  const starterGuides = useMemo(() => guides.slice(0, 8), []);

  return (
    <>
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-4 pt-10 lg:pt-14">
          <div className="rounded-2xl border border-[var(--line)] bg-white/95 p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-dark)]">Pick your country</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  We’re showing {experience.label} first{ready && country === detected ? " from your browser settings" : ""}. You can switch anytime.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {(Object.keys(countryExperiences) as CountryCode[]).map((code) => {
                const option = countryExperiences[code];
                const active = code === country;
                return (
                  <button
                    key={code}
                    className={`focus-ring rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-[var(--brand)] bg-[var(--soft-green)] shadow-sm"
                        : "border-[var(--line)] bg-white hover:border-[var(--brand)]"
                    }`}
                    onClick={() => setCountry(code)}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-extrabold text-slate-950">{option.label}</p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                          active ? "bg-[var(--brand)] text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {option.currency}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{option.audienceLabel}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-dark)]">
                      {active ? "Selected" : `Use ${option.label}`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
          <div>
            <p className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-bold text-[var(--brand-dark)]">
              {experience.badge}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
              {experience.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {experience.heroBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {experience.commonProblems.slice(0, 4).map((problem) => (
                <span
                  key={problem.title}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                >
                  {problem.title}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="focus-ring rounded-md bg-[var(--brand)] px-5 py-3 text-center font-bold text-white shadow-sm" href="/calculators/bond-refund-calculator">
                Estimate your {experience.depositWord}
              </Link>
              <Link className="focus-ring rounded-md border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-900" href="/guides">
                Browse guides
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {experience.quickFacts.map((item) => (
                <div className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-slate-700" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="brand-shadow overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <Image
              alt="Rental paperwork, keys and moving cost planning on a bright table"
              className="h-56 w-full object-cover"
              height={720}
              priority
              src="/renter-costs-hero.png"
              width={960}
            />
            <div className="p-5">
              <div className="rounded-xl bg-[var(--soft-gold)] p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-800">Start with your problem</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-950">What are you trying to figure out today?</p>
              </div>
              <div className="mt-4 grid gap-3">
                {experience.commonProblems.map((problem, index) => (
                  <div className="rounded-xl border border-slate-200 p-4" key={problem.title}>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-dark)]">0{index + 1}</div>
                    <p className="mt-1 font-bold text-slate-950">{problem.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{problem.body}</p>
                  </div>
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
            <h2 className="mt-2 text-3xl font-extrabold">Pick the calculator you need</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Start with a simple estimate. Then check your papers and local rules.
            </p>
          </div>
          <Link className="focus-ring text-sm font-bold text-[var(--brand-dark)] hover:underline" href="/guides">
            See renter guides
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {calculators.map((calculator) => (
            <Link className="focus-ring rounded-xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)]" href={`/calculators/${calculator.slug}`} key={calculator.slug}>
              <h2 className="text-xl font-extrabold">{calculator.shortTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{calculator.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Check the rules in {experience.label}</p>
            <h2 className="mt-2 text-3xl font-extrabold">Common problems and where to check</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We help with the numbers. For the final answer, check the right authority, your lease and your evidence.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-[var(--line)] bg-slate-50 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">Common renter problems</h3>
              <div className="mt-4 grid gap-3">
                {experience.commonProblems.map((problem) => (
                  <div className="rounded-xl border border-white bg-white p-4" key={problem.title}>
                    <p className="font-bold text-slate-950">{problem.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{problem.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-slate-50 p-5">
              <h3 className="text-lg font-extrabold text-slate-950">Where to check the rules</h3>
              <div className="mt-4 grid gap-3">
                {experience.lawChecks.map((item) => (
                  <div className="rounded-xl border border-white bg-white px-4 py-3" key={item}>
                    <p className="text-sm font-bold text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                These are the first places to check in {experience.label}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1fr_320px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Guides</p>
          <h2 className="mt-2 text-2xl font-extrabold">{experience.guidesHeading}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{experience.guidesIntro}</p>

          {country === "AU" ? (
            <>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {localGuides.map((guide) => (
                  <Link className="focus-ring rounded-xl border border-[var(--line)] bg-white p-4 hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
                    <span className="font-bold">{guide.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{guide.description}</span>
                  </Link>
                ))}
              </div>
              <h2 className="mt-10 text-2xl font-extrabold">Starter renter guides</h2>
            </>
          ) : (
            <h2 className="mt-8 text-2xl font-extrabold">Start with the core guides</h2>
          )}

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {starterGuides.map((guide) => (
              <Link className="focus-ring rounded-xl border border-[var(--line)] p-4 hover:border-[var(--brand)]" href={`/guides/${guide.slug}`} key={guide.slug}>
                <span className="font-bold">{guide.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{guide.description}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-5">
          <AdSlot />
          <EmailCapture />
          <AffiliateCTA />
        </div>
      </section>
    </>
  );
}
