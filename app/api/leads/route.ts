import { headers } from "next/headers";

type LeadPayload = {
  email?: string;
  source?: string;
  offer?: string;
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null;
  const email = body?.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Please enter a valid email." }, 400);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE ?? "email_signups";

  if (!supabaseUrl || !supabaseKey) {
    return json({ ok: false, error: "Lead capture is not connected yet. Please email hello@bondrefund.online for now." }, 503);
  }

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent");
  const forwardedFor = headerStore.get("x-forwarded-for");

  const leadRecord = {
    email,
    source: body?.source ?? "/",
    offer: body?.offer ?? "renter-checklist",
    user_agent: userAgent,
    ip_address: forwardedFor?.split(",")[0]?.trim() ?? null,
  };

  const payloadOptions = [
    leadRecord,
    {
      email,
      source: body?.source ?? "/",
      offer: body?.offer ?? "renter-checklist",
    },
    {
      email,
    },
  ];

  let lastError = "";

  for (const payload of payloadOptions) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify([payload]),
    });

    if (response.ok) {
      return json({ ok: true });
    }

    lastError = await response.text().catch(() => "");
    if (lastError.includes("duplicate key") || lastError.includes("already exists")) {
      return json({ ok: true });
    }

    if (lastError.includes("relation")) {
      break;
    }
  }
  return json(
    {
      ok: false,
      error: lastError.includes("relation")
        ? "Lead capture table is not ready yet. Please email hello@bondrefund.online for now."
        : "Could not save your email right now. Please try again or email hello@bondrefund.online.",
    },
    500,
  );
}
