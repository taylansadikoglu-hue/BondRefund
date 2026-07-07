import { affiliateOffers, hasActiveAffiliateOffers } from "@/lib/monetisation";

export function AffiliateCTA() {
  const hasOffers = hasActiveAffiliateOffers();

  return (
    <section className="rounded-md border border-emerald-100 bg-[var(--soft-green)] p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">
        {hasOffers ? "Partner offers" : "Monetisation ready"}
      </p>
      <h2 className="mt-2 text-xl font-extrabold">Renter services marketplace</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Add approved affiliate or lead-generation URLs to turn high-intent calculator traffic into quote clicks.
      </p>
      <div className="mt-4 grid gap-2">
        {affiliateOffers.map((offer) =>
          offer.href ? (
            <a
              className="focus-ring rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--brand-dark)]"
              href={offer.href}
              key={offer.label}
              rel="nofollow sponsored"
            >
              {offer.label}
            </a>
          ) : (
            <div className="rounded-md border border-emerald-200 bg-white/70 p-3" key={offer.label}>
              <p className="text-sm font-bold text-slate-800">{offer.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{offer.description}</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
