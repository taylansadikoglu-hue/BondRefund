"use client";

import { useMemo, useState } from "react";
import { officialResources } from "@/lib/official-resources";

type Claim = { id: number; item: string; amount: string; detail: string };
const checklist = [
  "Ask for the claim in writing, with each amount listed separately.",
  "Keep your entry and exit condition reports together.",
  "Save dated photos, messages, quotes, invoices and payment receipts.",
  "Write down what you agree with and what you want explained.",
];

export function DeductionEvidenceChecker() {
  const [claims, setClaims] = useState<Claim[]>([{ id: 1, item: "Cleaning", amount: "", detail: "" }]);
  const [region, setRegion] = useState("New South Wales");
  const [copied, setCopied] = useState(false);
  const resource = useMemo(() => officialResources.find((item) => item.region === region) ?? officialResources[0], [region]);
  const message = useMemo(() => {
    const items = claims.filter((claim) => claim.item.trim() || claim.amount.trim()).map((claim) => {
      const amount = claim.amount.trim() ? ` — $${claim.amount.trim()}` : "";
      const detail = claim.detail.trim() ? ` (${claim.detail.trim()})` : "";
      return `• ${claim.item.trim() || "Claim"}${amount}${detail}`;
    });
    return `Hello,\n\nCould you please send me an itemised breakdown of the proposed bond deductions, including an invoice or quote for each item?\n\n${items.length ? items.join("\n") : "• [Add each claimed item and amount]"}\n\nI am checking these against my entry and exit records. Please let me know how I can discuss any item I do not understand.\n\nThank you`;
  }, [claims]);

  function update(id: number, field: keyof Omit<Claim, "id">, value: string) {
    setClaims((current) => current.map((claim) => claim.id === id ? { ...claim, [field]: value } : claim));
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="claims-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Step 1 · List the claim</p>
            <h2 id="claims-heading" className="mt-1 text-2xl font-extrabold text-slate-950">What are they asking you to pay?</h2>
          </div>
          <label className="grid gap-1 text-sm font-bold text-slate-700">State or territory
            <select className="focus-ring min-h-11 rounded-md border border-slate-300 bg-white px-3" value={region} onChange={(event) => setRegion(event.target.value)}>
              {officialResources.slice(1).map((item) => <option key={item.region}>{item.region}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">Add each item from the agent or landlord’s message. This page does not decide whether a charge is fair or allowed.</p>
        <div className="mt-5 grid gap-4">
          {claims.map((claim, index) => (
            <fieldset key={claim.id} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_10rem]">
              <legend className="sr-only">Claim {index + 1}</legend>
              <label className="grid gap-1 text-sm font-bold text-slate-700">Claimed item
                <input className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal" value={claim.item} onChange={(event) => update(claim.id, "item", event.target.value)} placeholder="For example, carpet cleaning" />
              </label>
              <label className="grid gap-1 text-sm font-bold text-slate-700">Amount (optional)
                <input className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal" inputMode="decimal" value={claim.amount} onChange={(event) => update(claim.id, "amount", event.target.value.replace(/[^\d.]/g, ""))} placeholder="$0" />
              </label>
              <label className="grid gap-1 text-sm font-bold text-slate-700 sm:col-span-2">What do you know about it? (optional)
                <input className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal" value={claim.detail} onChange={(event) => update(claim.id, "detail", event.target.value)} placeholder="What was said, or what you want explained" />
              </label>
              {claims.length > 1 && <button type="button" className="justify-self-start text-sm font-semibold text-red-700 underline" onClick={() => setClaims((current) => current.filter((item) => item.id !== claim.id))}>Remove this item</button>}
            </fieldset>
          ))}
        </div>
        <button type="button" className="focus-ring mt-4 min-h-11 rounded-md border border-[var(--brand)] px-4 font-bold text-[var(--brand-dark)] hover:bg-emerald-50" onClick={() => setClaims((current) => [...current, { id: Date.now(), item: "", amount: "", detail: "" }])}>+ Add another claimed item</button>
      </section>

      <aside className="grid content-start gap-5">
        <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Step 2 · Gather your records</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">A simple evidence checklist</h2>
          <ul className="mt-4 grid gap-3">{checklist.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-800">✓</span>{item}</li>)}</ul>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"><strong>Keep it together:</strong> make one folder for reports, photos, messages and receipts. Note the date and what each record shows.</div>
        </section>
        <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Step 3 · Ask for details</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Copy a calm reply</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Edit this message to fit your situation. It asks for information; it does not make a legal claim.</p>
          <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-700">{message}</pre>
          <button type="button" className="focus-ring mt-4 min-h-11 rounded-md bg-[var(--brand)] px-4 font-bold text-white hover:bg-[var(--brand-dark)]" onClick={copyMessage}>{copied ? "Copied" : "Copy reply"}</button>
          {!copied && <span className="sr-only" aria-live="polite">{copied ? "Reply copied" : ""}</span>}
        </section>
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-extrabold text-slate-900">Check the local process</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">Bond steps and time limits vary by state or territory. Read the official information for {region} before you decide what to do.</p>
          <a className="mt-3 inline-flex font-bold text-[var(--brand-dark)] underline" href={resource.href} target="_blank" rel="noreferrer">{resource.title} ↗</a>
        </section>
        <p className="text-xs leading-5 text-slate-500">Your entries stay in this page while it is open. They are not uploaded or saved by this tool. Do not enter names, addresses, account details or other private information. General information only—not legal advice.</p>
      </aside>
    </div>
  );
}
