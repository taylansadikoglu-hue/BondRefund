export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9404887139180084",
  displaySlot: process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT || "",
  inArticleSlot: process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || "",
};

export const affiliateOffers = [
  {
    label: "Compare removalists",
    description: "Send moving-cost traffic to a partner quote form once approved.",
    href: process.env.NEXT_PUBLIC_AFFILIATE_MOVERS_URL || "",
  },
  {
    label: "Book end-of-lease cleaning",
    description: "Route bond-cleaning searches to a cleaning marketplace or local lead form.",
    href: process.env.NEXT_PUBLIC_AFFILIATE_CLEANING_URL || "",
  },
  {
    label: "Connect utilities",
    description: "Monetise moving checklists with energy, internet or moving concierge offers.",
    href: process.env.NEXT_PUBLIC_AFFILIATE_UTILITIES_URL || "",
  },
];

export function hasActiveAffiliateOffers() {
  return affiliateOffers.some((offer) => Boolean(offer.href));
}
