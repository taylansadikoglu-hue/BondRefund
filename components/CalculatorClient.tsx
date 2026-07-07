"use client";

import { useMemo, useState } from "react";
import type { CalculatorKind } from "@/lib/calculators";

function money(value: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0,
  );
}

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
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
        min={min}
        step={step}
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
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
  const [state, setState] = useState("NSW");
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

  const result = useMemo(() => {
    if (kind === "bond-refund") {
      // Bond refund estimate: refund equals bond paid minus claimed deductions, never below zero.
      const refund = Math.max(bondPaid - deductions, 0);
      return {
        lines: [
          ["Estimated refund", money(refund)],
          ["Claimed deduction percentage", percent((deductions / Math.max(bondPaid, 1)) * 100)],
        ],
        guidance:
          refund === 0
            ? "The claimed deductions equal or exceed the bond entered. Ask for itemised evidence before agreeing."
            : `${state} estimate: compare the claimed deductions with your condition report, photos and receipts.`,
      };
    }
    if (kind === "break-lease") {
      // Break lease estimate: uncovered rent plus letting/advertising fee plus other renter-entered costs.
      const total = weeklyRent * weeksRemaining + lettingFee + otherCosts;
      return { lines: [["Estimated break lease cost", money(total)]], guidance: "This is a planning estimate only. Actual liability can depend on reletting and local rules." };
    }
    if (kind === "rent-increase") {
      // Weekly increase is annualised over 52 weeks, then averaged across 12 months.
      const weekly = newWeeklyRent - weeklyRent;
      return {
        lines: [
          ["Weekly increase", money(weekly)],
          ["Monthly increase", money((weekly * 52) / 12)],
          ["Annual increase", money(weekly * 52)],
          ["Percentage increase", percent((weekly / Math.max(weeklyRent, 1)) * 100)],
        ],
        guidance: weekly <= 0 ? "The new rent is not higher than the current rent entered." : "Use this to compare the increase with local listings and your household budget.",
      };
    }
    if (kind === "moving-cost") {
      // Moving range: labour plus distance and bedroom allowances, with a 15% buffer either side.
      const base = hourlyRate * hours + extras + distance * 3 + bedrooms * 80;
      return {
        lines: [
          ["Low estimate", money(base * 0.85)],
          ["High estimate", money(base * 1.15)],
        ],
        guidance: "Access, stairs, heavy items, packing and storage can move the real quote outside this range.",
      };
    }
    if (kind === "rental-affordability") {
      // Affordability ratio: yearly rent divided by gross annual income.
      const ratio = ((weeklyRent * 52) / Math.max(annualIncome, 1)) * 100;
      const rating = ratio < 25 ? "Comfortable" : ratio <= 30 ? "Watch closely" : ratio <= 40 ? "Stretched" : "High pressure";
      return {
        lines: [
          ["Rent as percentage of income", percent(ratio)],
          ["Affordability rating", rating],
        ],
        guidance: "This uses gross income. Your after-tax budget, debts and living costs may change the picture.",
      };
    }
    if (kind === "end-of-lease-cleaning") {
      // Cleaning range: base property size plus bathrooms and optional carpet/furnished load.
      const base = 180 + bedrooms * 95 + bathrooms * 55 + (carpet ? bedrooms * 45 : 0) + (furnished ? 120 : 0);
      return {
        lines: [
          ["Low estimate", money(base * 0.9)],
          ["High estimate", money(base * 1.2)],
        ],
        guidance: "Condition, appliances, carpet, windows and quote inclusions can change the final price.",
      };
    }
    // Bond loan estimate: total repayment equals principal plus user-entered fees/interest, divided by repayment weeks.
    const total = loanAmount + feesInterest;
    return {
      lines: [
        ["Estimated total repayment", money(total)],
        ["Estimated weekly repayment", money(total / Math.max(repaymentWeeks, 1))],
      ],
      guidance: "Compare total repayment, fees and eligibility before applying for any loan product.",
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
  ]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <div className="grid gap-4">
          {kind === "bond-refund" && (
            <>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                State or territory
                <select className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal" value={state} onChange={(event) => setState(event.target.value)}>
                  {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <Field label="Weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label="Bond paid" value={bondPaid} onChange={setBondPaid} />
              <Field label="Claimed deductions" value={deductions} onChange={setDeductions} />
            </>
          )}
          {kind === "break-lease" && (
            <>
              <Field label="Weekly rent" value={weeklyRent} onChange={setWeeklyRent} />
              <Field label="Weeks remaining or uncovered" value={weeksRemaining} onChange={setWeeksRemaining} />
              <Field label="Advertising/letting fee" value={lettingFee} onChange={setLettingFee} />
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
              <Field label="Removalist hourly rate" value={hourlyRate} onChange={setHourlyRate} />
              <Field label="Estimated hours" value={hours} onChange={setHours} />
              <Field label="Packing/storage extras" value={extras} onChange={setExtras} />
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
      </section>
    </div>
  );
}
