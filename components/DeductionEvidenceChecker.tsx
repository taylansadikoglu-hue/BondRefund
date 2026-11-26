"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { bondTimelines } from "@/lib/bond-timelines";
import { officialResources } from "@/lib/official-resources";

type Claim = { id: number; item: string; amount: string; detail: string };

type ClaimType = {
  label: string;
  keywords: string[];
  askFor: string;
  guide?: { href: string; label: string };
};

// What to ask for depends on what is being claimed. Matching is by keyword in the item name.
const claimTypes: ClaimType[] = [
  {
    label: "Carpet cleaning",
    keywords: ["carpet", "rug"],
    askFor: "Which rooms, what the problem was (general clean, a stain or damage), photos, and the cleaner's invoice.",
    guide: { href: "/guides/can-landlord-charge-for-carpet-cleaning", label: "Carpet cleaning claims" },
  },
  {
    label: "Cleaning",
    keywords: ["clean", "oven", "window", "bathroom", "kitchen"],
    askFor: "Which areas were not clean, exit photos of those areas, and the invoice showing the work done.",
    guide: { href: "/guides/end-of-lease-cleaning-checklist", label: "End of lease cleaning checklist" },
  },
  {
    label: "Painting or wall marks",
    keywords: ["paint", "wall", "mark", "patch", "hole"],
    askFor: "Which wall or area, the paint's age, entry and exit photos, and a quote showing the size of the job.",
    guide: { href: "/guides/can-landlord-charge-for-painting", label: "Painting claims" },
  },
  {
    label: "Repair or damage",
    keywords: ["repair", "damage", "broken", "replace", "crack", "fix"],
    askFor: "Photos of the damage, the item's age, the entry report entry for it, and the repair invoice or quote.",
    guide: { href: "/guides/fair-wear-and-tear-australia", label: "Fair wear and tear compared with damage" },
  },
  {
    label: "Unpaid rent",
    keywords: ["rent", "arrears"],
    askFor: "The rent ledger, the dates covered, and how it matches your own payment receipts.",
  },
  {
    label: "Garden or outdoor",
    keywords: ["garden", "lawn", "yard", "mow", "gutter", "pool"],
    askFor: "The lease clause about the garden, entry and exit photos, and the invoice for the work.",
  },
  {
    label: "Keys, locks or remotes",
    keywords: ["key", "lock", "remote", "fob"],
    askFor: "What is missing, when it was noticed, and the receipt for the replacement.",
  },
];

const quickAdd = claimTypes.map((type) => type.label);

const checklist = [
  "Ask for the claim in writing, with each amount listed separately.",
  "Keep your entry and exit condition reports together.",
  "Save dated photos, messages, quotes, invoices and payment receipts.",
  "Write down what you agree with and what you want explained.",
];

function matchType(item: string) {
  const text = item.toLowerCase();
  return claimTypes.find((type) => type.keywords.some((keyword) => text.includes(keyword)));
}

function toNumber(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const money = (value: number) =>
  value.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });

let nextId = 2;

export function DeductionEvidenceChecker() {
  const [claims, setClaims] = useState<Claim[]>([{ id: 1, item: "", amount: "", detail: "" }]);
  const [bond, setBond] = useState("");
  const [region, setRegion] = useState("New South Wales");
  const [copyStatus, setCopyStatus] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const resource = useMemo(
    () => officialResources.find((item) => item.region === region) ?? officialResources[0],
    [region],
  );
  const timeline = useMemo(() => bondTimelines.find((row) => row.region === region), [region]);

  const claimedTotal = claims.reduce((sum, claim) => sum + toNumber(claim.amount), 0);
  const bondAmount = toNumber(bond);
  const balance = bondAmount - claimedTotal;

  const message = useMemo(() => {
    const items = claims
      .filter((claim) => claim.item.trim() || claim.amount.trim())
      .map((claim) => {
        const amount = claim.amount.trim() ? ` — ${money(toNumber(claim.amount))}` : "";
        const detail = claim.detail.trim() ? ` (${claim.detail.trim()})` : "";
        return `• ${claim.item.trim() || "Claimed item"}${amount}${detail}`;
      });
    const totalsLine =
      bondAmount > 0 && claimedTotal > 0
        ? `The bond is ${money(bondAmount)} and the items above total ${money(claimedTotal)}.`
        : "";
    return [
      "Hello,",
      "",
      "Re: bond for [property address]",
      "",
      "Could you please send me an itemised breakdown of the proposed bond deductions, with an invoice, quote or photo supporting each item?",
      "",
      items.length ? items.join("\n") : "• [Add each claimed item and amount]",
      ...(totalsLine ? ["", totalsLine] : []),
      "",
      "I am checking these against my entry condition report and exit photos. Please let me know how I can discuss any item I do not understand.",
      "",
      "Thank you,",
      "[Your name]",
    ].join("\n");
  }, [claims, bondAmount, claimedTotal]);

  function update(id: number, field: keyof Omit<Claim, "id">, value: string) {
    setClaims((current) => current.map((claim) => (claim.id === id ? { ...claim, [field]: value } : claim)));
  }

  function addClaim(item = "") {
    setClaims((current) => {
      // Fill the first empty row before adding a new one.
      const empty = current.find((claim) => !claim.item.trim() && !claim.amount.trim() && !claim.detail.trim());
      if (empty && item) return current.map((claim) => (claim.id === empty.id ? { ...claim, item } : claim));
      return [...current, { id: nextId++, item, amount: "", detail: "" }];
    });
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Reply copied. Paste it into your email and fill in the bracketed parts.");
    } catch {
      // Clipboard can be blocked; select the text so it can be copied by hand.
      messageRef.current?.select();
      setCopyStatus("Your browser blocked copying. The text is selected, so press Ctrl+C or Cmd+C to copy it.");
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
          <label className="grid gap-1 text-sm font-bold text-slate-700">
            State or territory
            <select
              className="focus-ring min-h-11 rounded-md border border-slate-300 bg-white px-3"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            >
              {officialResources.slice(1).map((item) => (
                <option key={item.region}>{item.region}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add each item from the agent or landlord’s message. This page does not decide whether a charge is fair or allowed.
        </p>

        <label className="mt-5 grid max-w-xs gap-1 text-sm font-bold text-slate-700">
          Bond you paid (optional)
          <input
            className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
            inputMode="decimal"
            value={bond}
            onChange={(event) => setBond(event.target.value.replace(/[^\d.]/g, ""))}
            placeholder="For example, 2400"
          />
        </label>

        <div className="mt-5">
          <p className="text-sm font-bold text-slate-700">Quick add a common item</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quickAdd.map((label) => (
              <button
                key={label}
                type="button"
                className="focus-ring min-h-10 rounded-full border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:border-[var(--brand)]"
                onClick={() => addClaim(label)}
              >
                + {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {claims.map((claim, index) => {
            const type = matchType(claim.item);
            return (
              <fieldset key={claim.id} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_10rem]">
                <legend className="px-1 text-sm font-bold text-slate-900">Item {index + 1}</legend>
                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Claimed item
                  <input
                    className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
                    value={claim.item}
                    onChange={(event) => update(claim.id, "item", event.target.value)}
                    placeholder="For example, carpet cleaning"
                  />
                </label>
                <label className="grid gap-1 text-sm font-bold text-slate-700">
                  Amount in dollars (optional)
                  <input
                    className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
                    inputMode="decimal"
                    value={claim.amount}
                    onChange={(event) => update(claim.id, "amount", event.target.value.replace(/[^\d.]/g, ""))}
                    placeholder="0"
                  />
                </label>
                <label className="grid gap-1 text-sm font-bold text-slate-700 sm:col-span-2">
                  What do you know about it? (optional)
                  <input
                    className="focus-ring min-h-11 rounded-md border border-slate-300 px-3 font-normal"
                    value={claim.detail}
                    onChange={(event) => update(claim.id, "detail", event.target.value)}
                    placeholder="What was said, or what you want explained"
                  />
                </label>
                {type ? (
                  <div className="rounded-lg border border-emerald-200 bg-white p-3 text-sm leading-6 text-slate-700 sm:col-span-2">
                    <strong className="text-slate-900">What to ask for:</strong> {type.askFor}
                    {type.guide ? (
                      <>
                        {" "}
                        <Link className="font-bold text-[var(--brand-dark)] underline" href={type.guide.href}>
                          {type.guide.label}
                        </Link>
                      </>
                    ) : null}
                  </div>
                ) : null}
                {claims.length > 1 && (
                  <button
                    type="button"
                    className="justify-self-start text-sm font-semibold text-red-700 underline"
                    onClick={() => setClaims((current) => current.filter((item) => item.id !== claim.id))}
                  >
                    Remove item {index + 1}
                  </button>
                )}
              </fieldset>
            );
          })}
        </div>
        <button
          type="button"
          className="focus-ring mt-4 min-h-11 rounded-md border border-[var(--brand)] px-4 font-bold text-[var(--brand-dark)] hover:bg-emerald-50"
          onClick={() => addClaim()}
        >
          + Add another claimed item
        </button>

        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
          <p className="text-sm font-bold text-slate-900">Running total</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            Claimed so far: <strong>{money(claimedTotal)}</strong>
            {bondAmount > 0 ? (
              <>
                {" "}of a {money(bondAmount)} bond.{" "}
                {balance >= 0 ? (
                  <>If every item were accepted, about <strong>{money(balance)}</strong> would come back to you.</>
                ) : (
                  <>The items add up to <strong>{money(-balance)}</strong> more than the bond. Ask how they plan to recover the extra amount.</>
                )}
              </>
            ) : null}
          </p>
        </div>
      </section>

      <aside className="grid content-start gap-5">
        <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Step 2 · Gather your records</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">A simple evidence checklist</h2>
          <ul className="mt-4 grid gap-3">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-800">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <strong>Keep it together:</strong> make one folder for reports, photos, messages and receipts. Note the date and what each record shows.
          </div>
        </section>
        <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Step 3 · Ask for details</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">Copy a calm reply</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Replace the parts in square brackets before sending. The message asks for information. It does not make a legal claim.
          </p>
          <label className="sr-only" htmlFor="reply-text">Reply message</label>
          <textarea
            id="reply-text"
            ref={messageRef}
            readOnly
            value={message}
            rows={12}
            className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans text-sm leading-6 text-slate-700"
          />
          <button
            type="button"
            className="focus-ring mt-4 min-h-11 rounded-md bg-[var(--brand)] px-4 font-bold text-white hover:bg-[var(--brand-dark)]"
            onClick={copyMessage}
          >
            Copy reply
          </button>
          <p className="mt-2 min-h-5 text-sm text-slate-700" role="status" aria-live="polite">{copyStatus}</p>
        </section>
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-extrabold text-slate-900">How bond refunds work in {region}</h2>
          {timeline ? (
            <dl className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              <div><dt className="inline font-bold text-slate-900">Who holds the bond: </dt><dd className="inline">{timeline.heldBy}</dd></div>
              <div><dt className="inline font-bold text-slate-900">Time to respond: </dt><dd className="inline">{timeline.otherPartyResponse}</dd></div>
              <div><dt className="inline font-bold text-slate-900">If you disagree: </dt><dd className="inline">{timeline.ifDisputed}</dd></div>
            </dl>
          ) : null}
          <p className="mt-3 text-sm leading-6 text-slate-700">Steps and time limits can change. Read the official information before you decide what to do.</p>
          <a className="mt-3 inline-flex font-bold text-[var(--brand-dark)] underline" href={resource.href} target="_blank" rel="noopener noreferrer">
            {resource.title} ({region}) ↗
          </a>
          <Link className="mt-2 block text-sm font-bold text-[var(--brand-dark)] underline" href="/guides/how-long-does-bond-refund-take">
            Compare bond refund timing in every state
          </Link>
        </section>
        <p className="text-xs leading-5 text-slate-500">
          Your entries stay in this page while it is open. They are not uploaded or saved by this tool. Do not enter names, addresses, account details or other private information. General information only, not legal advice.
        </p>
      </aside>
    </div>
  );
}
