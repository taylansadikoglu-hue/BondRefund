"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalculatorKind } from "@/lib/calculators";
import {
  countryExperiences,
  formatMoneyForCountry,
  type CountryCode,
} from "@/lib/country-experience";
import { useCountryPreference } from "@/lib/country-preference";

function percent(value: number) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(1)}%`;
}

function Field({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
        min={min}
        step={step}
        type="text"
        inputMode={step < 1 ? "decimal" : "numeric"}
        value={draft}
        onChange={(event) => {
          const next = event.target.value.replace(/[^\d.]/g, "");
          setDraft(next);

          if (next === "") {
            return;
          }

          const parsed = Number(next);
          if (Number.isFinite(parsed) && parsed >= min) {
            onChange(parsed);
          }
        }}
        onBlur={() => {
          if (draft === "") {
            setDraft(String(value));
            return;
          }

          const parsed = Number(draft);
          if (!Number.isFinite(parsed) || parsed < min) {
            setDraft(String(value));
            return;
          }

          setDraft(String(parsed));
          onChange(parsed);
        }}
      />
    </label>
  );
}

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-3 last:border-0">
      <span className="text-sm text-slate-600">{label}</span>
      <strong className="text-right text-lg text-slate-950">{value}</strong>
    </div>
  );
}

export function CalculatorClient({ kind }: { kind: CalculatorKind }) {
  const { country, setCountry } = useCountryPreference("AU");
  const experience = countryExperiences[country];
  const [state, setState] = useState(experience.areas[0] ?? "NSW");
  const [weeklyRent, setWeeklyRent] = useState(600);
  const [bondPaid, setBondPaid] = useState(2400);
  const [deductions, setDeductions] = useState(350);
  const [weeksRemaining, setWeeksRemaining] = useState(4);
  const [lettingFee, setLettingFee] = useState(600);
  const [otherCosts, setOtherCosts] = useState(150);
  const [newWeeklyRent, setNewWeeklyRent] = useState(660);
  const [bedrooms, setBedrooms] = useState(2);
  const [distance, setDistance] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(160);
  const [hours, setHours] = useState(5);
  const [extras, setExtras] = useState(250);
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [bathrooms, setBathrooms] = useState(1);
  const [carpet, setCarpet] = useState(true);
  const [furnished, setFurnished] = useState(false);
  const [loanAmount, setLoanAmount] = useState(2000);
  const [repaymentWeeks, setRepaymentWeeks] = useState(20);
  const [feesInterest, setFeesInterest] = useState(120);

  function money(value: number) {
    return formatMoneyForCountry(value, country);
  }

  const depositLabel = experience.depositWord === "security deposit"
    ? "Security deposit paid"
    : `${experience.depositWord.charAt(0).toUpperCase()}${experience.depositWord.slice(1)} paid`;

  const deductionLabel = country === "AU" ? "Claimed deductions" : "Claimed charges";

  const result = useMemo(() => {
    if (kind === "bond-refund") {
      const returnLabel =
        country === "AU"
          ? "Estimated bond back"
          : country === "US"
            ? "Estimated deposit back"
            : "Estimated deposit back";
      const refund = Math.max(bondPaid - deductions, 0);
      return {
        lines: [
          [returnLabel, money(refund)],
          ["Claimed share", percent((deductions / Math.max(bondPaid, 1)) * 100)],
        ],
        guidance:
          refund === 0
            ? `The claimed charges use all of the ${experience.depositWord} entered. Ask ${experience.landlordWord} for a clear item list before you agree.`
            : `${experience.label} estimate: compare the claimed charges with your photos, reports and receipts.`,
      };
    }
    if (kind === "break-lease") {
      const total = weeklyRent * weeksRemaining + lettingFee + otherCosts;
      return {
        lines: [["Estimated leaving cost", money(total)]],
        guidance: `Use this as a simple planning number. Final costs can change with reletting, notice rules and local law in ${experience.label}.`,
      };
    }
    if (kind === "rent-increase") {
      const weekly = newWeeklyRent - weeklyRent;
      return {
        lines: [
          ["Weekly change", money(weekly)],
          ["Monthly change", money((weekly * 52) / 12)],
          ["Yearly change", money(weekly * 52)],
          ["Change %", percent((weekly / Math.max(weeklyRent, 1)) * 100)],
        ],
        guidance:
          weekly <= 0
            ? "The new rent is not higher than the current rent entered."
            : `Use this to compare the new rent with your budget and the cost of moving in ${experience.label}.`,
      };
    }
    if (kind === "moving-cost") {
      const base = hourlyRate * hours + extras + distance * 3 + bedrooms * 80;
      return {
        lines: [
          ["Low estimate", money(base * 0.85)],
          ["High estimate", money(base * 1.15)],
        ],
        guidance: "Stairs, parking, heavy items, packing and storage can change the real price.",
      };
    }
    if (kind === "rental-affordability") {
      const ratio = ((weeklyRent * 52) / Math.max(annualIncome, 1)) * 100;
      const rating = ratio < 25 ? "Comfortable" : ratio <= 30 ? "Watch" : ratio <= 40 ? "Stretched" : "High";
      return {
        lines: [
          ["Rent vs income", percent(ratio)],
          ["Rating", rating],
        ],
        guidance: "This uses gross income. Real affordability can change after tax, debt and living costs.",
      };
    }
    if (kind === "end-of-lease-cleaning") {
      const base = 180 + bedrooms * 95 + bathrooms * 55 + (carpet ? bedrooms * 45 : 0) + (furnished ? 120 : 0);
      return {
        lines: [
          ["Low estimate", money(base * 0.9)],
          ["High estimate", money(base * 1.2)],
        ],
        guidance: "Property condition, carpet, windows and quote inclusions can change the final price.",
      };
    }
    const total = loanAmount + feesInterest;
    return {
      lines: [
        ["Total repayment", money(total)],
        ["Weekly repayment", money(total / Math.max(repaymentWeeks, 1))],
      ],
      guidance: "Compare the total cost, fees and rules before you apply.",
    };
  }, [
    annualIncome,
    bathrooms,
    bedrooms,
    bondPaid,
    carpet,
    deductions,
    distance,
    extras,
    feesInterest,
    furnished,
    hourlyRate,
    hours,
    kind,
    lettingFee,
    loanAmount,
    newWeeklyRent,
    otherCosts,
    repaymentWeeks,
    state,
    weeklyRent,
    weeksRemaining,
    country,
    experience.authorityLabel,
    experience.depositWord,
    experience.label,
    experience.landlordWord,
  ]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <div className="mb-5 rounded-xl border border-[var(--line)] bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Country</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(countryExperiences) as CountryCode[]).map((code) => {
              const active = code === country;
              return (
                <button
                  key={code}
                  className={`focus-ring rounded-full border px-4 py-2 text-sm font-bold ${
                    active
                      ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                      : "border-[var(--line)] bg-white text-slate-700"
                  }`}
                  onClick={() => {
                    setCountry(code);
                    setState(countryExperiences[code].areas[0] ?? "");
                  }}
                  type="button"
                >
                  {countryExperiences[code].label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Using {experience.label} terms and {experience.currency} amounts.
          </p>
        </div>
        <div className="grid gap-4">
          {kind === "bond-refund" && (
            <>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                {experience.areaLabel}
                <select className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal" value={state} onChange={(event) => setState(event.target.value)}>
                  {experience.areas.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <Field label="Weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label={depositLabel} value={bondPaid} onChange={setBondPaid} />
              <Field label={deductionLabel} value={deductions} onChange={setDeductions} />
            </>
          )}
          {kind === "break-lease" && (
            <>
              <Field label="Weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label="Weeks left or not covered" value={weeksRemaining} onChange={setWeeksRemaining} />
              <Field label="Advertising or reletting fee" value={lettingFee} onChange={setLettingFee} />
              <Field label="Other costs" value={otherCosts} onChange={setOtherCosts} />
            </>
          )}
          {kind === "rent-increase" && (
            <>
              <Field label="Current weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label="New weekly rent" value={newWeeklyRent} onChange={setNewWeeklyRent} />
            </>
          )}
          {kind === "moving-cost" && (
            <>
              <Field label="Number of bedrooms" value={bedrooms} onChange={setBedrooms} />
              <Field label="Moving distance in km" value={distance} onChange={setDistance} />
              <Field label="Moving company hourly rate" value={hourlyRate} onChange={setHourlyRate} />
              <Field label="Estimated hours" value={hours} onChange={setHours} />
              <Field label="Packing or storage extras" value={extras} onChange={setExtras} />
            </>
          )}
          {kind === "rental-affordability" && (
            <>
              <Field label="Weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label="Annual gross income" value={annualIncome} onChange={setAnnualIncome} step={1000} />
            </>
          )}
          {kind === "end-of-lease-cleaning" && (
            <>
              <Field label="Bedrooms" value={bedrooms} onChange={setBedrooms} />
              <Field label="Bathrooms" value={bathrooms} onChange={setBathrooms} />
              <label className="flex min-h-11 items-center gap-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={carpet} onChange={(event) => setCarpet(event.target.checked)} />
                Include carpet cleaning
              </label>
              <label className="flex min-h-11 items-center gap-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={furnished} onChange={(event) => setFurnished(event.target.checked)} />
                Furnished property
              </label>
            </>
          )}
          {kind === "bond-loan" && (
            <>
              <Field label="Loan amount" value={loanAmount} onChange={setLoanAmount} />
              <Field label="Repayment period in weeks" value={repaymentWeeks} onChange={setRepaymentWeeks} />
              <Field label="Fees/interest" value={feesInterest} onChange={setFeesInterest} />
            </>
          )}
        </div>
      </form>
      <section className="rounded-md border border-emerald-100 bg-[var(--soft-green)] p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Instant estimate</p>
        <div className="mt-4 rounded-md bg-white px-4">
          {result.lines.map(([label, value]) => (
            <ResultLine key={label} label={label} value={value} />
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-700">{result.guidance}</p>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Check the final rule with your {experience.authorityLabel} and your lease papers.
        </p>
      </section>
    </div>
  );
}
