import { affiliateOffers, hasActiveAffiliateOffers } from "@/lib/monetisation";

export function AffiliateCTA() {
  const hasOffers = hasActiveAffiliateOffers();

  if (!hasOffers) {
    return null;
  }

  return (
    <section className="rounded-md border border-emerald-100 bg-[var(--soft-green)] p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Recommended services</p>
      <h2 className="mt-2 text-xl font-extrabold">Renter services marketplace</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Helpful services that may save time when you are moving, cleaning or setting up a new place.
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
          ) : null,
        )}
      </div>
    </section>
  );
}
