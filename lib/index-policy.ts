export const indexableGuideSlugs = [
  "sydney-moving-costs",
  "can-landlord-charge-for-painting",
  "can-landlord-charge-for-carpet-cleaning",
  "normal-wear-and-tear-examples",
  "landlord-deduction-examples",
  "rental-bond-refund-letter-template",
  "end-of-lease-photo-checklist",
  "how-to-prepare-for-final-inspection",
  "rent-increase-rules-australia",
  "fair-wear-and-tear-australia",
  "end-of-lease-cleaning-checklist",
  "rental-bond-dispute-guide",
  "break-lease-costs-australia",
  "rent-affordability-guide",
  "how-much-rent-can-i-afford-australia",
  "sydney-end-of-lease-cleaning-costs",
  "brisbane-moving-costs",
  "how-to-get-your-bond-back-nsw",
  "how-to-get-your-bond-back-vic",
  "how-to-get-your-bond-back-qld",
  "how-long-does-bond-refund-take",
  "sydney-bond-refund-guide",
  "sydney-rent-increase-guide",
  "melbourne-rent-increase-guide",
  "melbourne-break-lease-costs",
  "brisbane-break-lease-costs",
  "melbourne-moving-costs",
  "moving-house-checklist",
  "melbourne-end-of-lease-cleaning-costs",
  "brisbane-end-of-lease-cleaning-costs",
  "moving-costs-australia"
] as const;

const indexableGuideSlugSet = new Set<string>(indexableGuideSlugs);

export function isIndexableGuide(slug: string) {
  return indexableGuideSlugSet.has(slug);
}
