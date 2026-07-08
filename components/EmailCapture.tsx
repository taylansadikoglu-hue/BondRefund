"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

function getLeadHook(pathname: string) {
  if (pathname.includes("/calculators/bond-refund")) {
    return {
      title: "Get the free bond refund checklist",
      body: "Enter your email and we’ll send the simple checklist renters can use before replying to deductions.",
      offer: "bond-refund-checklist",
    };
  }

  if (pathname.includes("/calculators/break-lease")) {
    return {
      title: "Get the free break lease checklist",
      body: "Enter your email and we’ll send a simple checklist for leaving early, costs to check and records to keep.",
      offer: "break-lease-checklist",
    };
  }

  return {
    title: "Get the free renter checklist",
    body: "Enter your email and we’ll send a simple renter checklist plus useful updates when new guides go live.",
    offer: "renter-checklist",
  };
}

export function EmailCapture() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const hook = useMemo(() => getLeadHook(pathname ?? "/"), [pathname]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: pathname ?? "/",
          offer: hook.offer,
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? "Could not save your email right now.");
      }

      setStatus("success");
      setMessage("Thanks — you’re on the list. You can also open the guide now below.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not save your email right now.");
    }
  }

  return (
    <section className="rounded-md border border-blue-100 bg-[var(--soft-blue)] p-5">
      <h2 className="text-xl font-extrabold">{hook.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{hook.body}</p>

      <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-sm font-semibold text-slate-700" htmlFor="lead-email">
          Email address
        </label>
        <input
          autoComplete="email"
          className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-[var(--brand)]"
          id="lead-email"
          inputMode="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        <button
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "saving"}
          type="submit"
        >
          {status === "saving" ? "Saving..." : "Send me the free guide"}
        </button>
      </form>

      {message ? (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-slate-700"}`}>{message}</p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
        <Link className="font-semibold text-[var(--brand-dark)] hover:underline" href="/guides/moving-house-checklist">
          Open the checklist now
        </Link>
        <a className="hover:underline" href="mailto:hello@bondrefund.online?subject=Send%20me%20the%20free%20renter%20checklist">
          Prefer email? Contact hello@bondrefund.online
        </a>
      </div>
    </section>
  );
}
