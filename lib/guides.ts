export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  relatedCalculators: string[];
  location?: string;
};

const titles: Record<string, [string, string, string[], string?]> = {
  "how-to-get-your-bond-back-nsw": ["How to Get Your Bond Back in NSW", "NSW bond refund steps, evidence and common deduction issues.", ["bond-refund-calculator"]],
  "how-to-get-your-bond-back-vic": ["How to Get Your Bond Back in Victoria", "Victorian renter steps for preparing a bond refund claim.", ["bond-refund-calculator"]],
  "how-to-get-your-bond-back-qld": ["How to Get Your Bond Back in Queensland", "Queensland bond refund basics and practical preparation tips.", ["bond-refund-calculator"]],
  "how-long-does-bond-refund-take": ["How Long Does a Bond Refund Take?", "Understand the usual bond refund timeline and what can slow it down.", ["bond-refund-calculator"]],
  "fair-wear-and-tear-australia": ["Fair Wear and Tear in Australia", "Plain-English examples of wear, damage and evidence renters can keep.", ["bond-refund-calculator"]],
  "can-landlord-charge-for-painting": ["Can a Landlord Charge for Painting?", "What renters should consider before accepting painting deductions.", ["bond-refund-calculator"]],
  "can-landlord-charge-for-carpet-cleaning": ["Can a Landlord Charge for Carpet Cleaning?", "Carpet cleaning deductions, evidence and condition report checks.", ["end-of-lease-cleaning-calculator"]],
  "end-of-lease-cleaning-checklist": ["End of Lease Cleaning Checklist", "A room-by-room checklist for preparing a rental before handover.", ["end-of-lease-cleaning-calculator"]],
  "rental-bond-dispute-guide": ["Rental Bond Dispute Guide", "How to organise evidence and respond to disputed bond deductions.", ["bond-refund-calculator"]],
  "break-lease-costs-australia": ["Break Lease Costs in Australia", "Common break lease costs and how to estimate your exposure.", ["break-lease-calculator"]],
  "rent-increase-rules-australia": ["Rent Increase Rules in Australia", "General rent increase concepts and where to check local rules.", ["rent-increase-calculator"]],
  "moving-house-checklist": ["Moving House Checklist", "A practical checklist for planning, packing and updating services.", ["moving-cost-calculator"]],
  "rental-inspection-checklist": ["Rental Inspection Checklist", "What to check before, during and after rental inspections.", ["bond-refund-calculator"]],
  "how-to-dispute-bond-deductions": ["How to Dispute Bond Deductions", "Steps to review, question and document claimed deductions.", ["bond-refund-calculator"]],
  "bond-cleaning-cost-guide": ["Bond Cleaning Cost Guide", "What affects end-of-lease cleaning prices and quotes.", ["end-of-lease-cleaning-calculator"]],
  "tenant-rights-bond-refund": ["Tenant Rights and Bond Refunds", "General renter considerations when seeking a bond refund.", ["bond-refund-calculator"]],
  "normal-wear-and-tear-examples": ["Normal Wear and Tear Examples", "Examples renters can use when thinking about fair wear and tear.", ["bond-refund-calculator"]],
  "landlord-deduction-examples": ["Landlord Deduction Examples", "Common deduction types and what evidence may be relevant.", ["bond-refund-calculator"]],
  "rental-bond-refund-letter-template": ["Rental Bond Refund Letter Template", "A simple structure for requesting bond evidence and refund progress.", ["bond-refund-calculator"]],
  "end-of-lease-photo-checklist": ["End of Lease Photo Checklist", "Photos to take before returning keys at the end of a lease.", ["bond-refund-calculator"]],
  "how-to-prepare-for-final-inspection": ["How to Prepare for Final Inspection", "A practical preparation guide for the final rental inspection.", ["end-of-lease-cleaning-calculator"]],
  "bond-refund-mistakes-to-avoid": ["Bond Refund Mistakes to Avoid", "Common renter mistakes that can make bond refund discussions harder.", ["bond-refund-calculator"]],
  "bond-refund-for-sharehouses": ["Bond Refunds for Sharehouses", "How shared tenancies can plan bond splits and evidence.", ["bond-refund-calculator"]],
  "breaking-lease-without-penalty": ["Breaking Lease Without Penalty", "Situations to investigate before assuming all break lease costs apply.", ["break-lease-calculator"]],
  "rent-affordability-guide": ["Rent Affordability Guide", "How to compare rent with income and other moving costs.", ["rental-affordability-calculator"]],
  "moving-costs-australia": ["Moving Costs in Australia", "Typical moving cost categories renters should budget for.", ["moving-cost-calculator"]],
  "bond-loans-explained": ["Bond Loans Explained", "A simple guide to bond loans, repayments, fees and alternatives.", ["bond-loan-calculator"]],
  "rental-application-costs": ["Rental Application Costs", "Costs to prepare for when applying and moving into a rental.", ["rental-affordability-calculator", "bond-loan-calculator"]],
  "first-time-renter-guide": ["First-Time Renter Guide", "A starter guide to bond, rent, inspections and moving costs.", ["rental-affordability-calculator", "bond-refund-calculator"]],
  "state-by-state-bond-guide": ["State-by-State Bond Guide", "Where to check bond rules and refund processes around Australia.", ["bond-refund-calculator"]],
  "sydney-bond-refund-guide": ["Sydney Bond Refund Guide", "A Sydney renter guide to bond refund evidence, claimed deductions and end-of-lease preparation.", ["bond-refund-calculator", "end-of-lease-cleaning-calculator"], "Sydney"],
  "melbourne-bond-refund-guide": ["Melbourne Bond Refund Guide", "A Melbourne renter guide to preparing for bond refund discussions and final inspections.", ["bond-refund-calculator", "end-of-lease-cleaning-calculator"], "Melbourne"],
  "brisbane-bond-refund-guide": ["Brisbane Bond Refund Guide", "A Brisbane renter guide to organising bond refund evidence and common end-of-lease costs.", ["bond-refund-calculator"], "Brisbane"],
  "perth-bond-refund-guide": ["Perth Bond Refund Guide", "A Perth renter guide to bond refund planning, deductions and practical moving records.", ["bond-refund-calculator"], "Perth"],
  "adelaide-bond-refund-guide": ["Adelaide Bond Refund Guide", "An Adelaide renter guide to preparing bond refund evidence before returning keys.", ["bond-refund-calculator"], "Adelaide"],
  "canberra-bond-refund-guide": ["Canberra Bond Refund Guide", "A Canberra renter guide to bond refund preparation, photos and written records.", ["bond-refund-calculator"], "Canberra"],
  "gold-coast-bond-refund-guide": ["Gold Coast Bond Refund Guide", "A Gold Coast renter guide to bond refund preparation and end-of-lease cost planning.", ["bond-refund-calculator"], "Gold Coast"],
  "newcastle-bond-refund-guide": ["Newcastle Bond Refund Guide", "A Newcastle renter guide to organising evidence for bond refund conversations.", ["bond-refund-calculator"], "Newcastle"],
  "sydney-end-of-lease-cleaning-costs": ["Sydney End of Lease Cleaning Costs", "Estimate Sydney bond cleaning costs and understand what can affect quotes.", ["end-of-lease-cleaning-calculator", "bond-refund-calculator"], "Sydney"],
  "melbourne-end-of-lease-cleaning-costs": ["Melbourne End of Lease Cleaning Costs", "Estimate Melbourne end-of-lease cleaning costs and common quote variables.", ["end-of-lease-cleaning-calculator"], "Melbourne"],
  "brisbane-end-of-lease-cleaning-costs": ["Brisbane End of Lease Cleaning Costs", "Estimate Brisbane bond cleaning costs for bedrooms, bathrooms, carpet and furniture.", ["end-of-lease-cleaning-calculator"], "Brisbane"],
  "sydney-moving-costs": ["Sydney Moving Costs", "Plan Sydney moving costs for removalists, distance, packing and storage extras.", ["moving-cost-calculator"], "Sydney"],
  "melbourne-moving-costs": ["Melbourne Moving Costs", "Plan Melbourne moving costs with a simple removalist and extras checklist.", ["moving-cost-calculator"], "Melbourne"],
  "brisbane-moving-costs": ["Brisbane Moving Costs", "Plan Brisbane moving costs using bedrooms, distance, hourly rates and extras.", ["moving-cost-calculator"], "Brisbane"],
  "sydney-rent-increase-guide": ["Sydney Rent Increase Guide", "Compare a Sydney rent increase with your annual budget and moving alternatives.", ["rent-increase-calculator", "rental-affordability-calculator"], "Sydney"],
  "melbourne-rent-increase-guide": ["Melbourne Rent Increase Guide", "Compare a Melbourne rent increase with affordability and moving cost estimates.", ["rent-increase-calculator", "rental-affordability-calculator"], "Melbourne"],
  "brisbane-rent-increase-guide": ["Brisbane Rent Increase Guide", "Compare a Brisbane rent increase with household income and moving costs.", ["rent-increase-calculator", "rental-affordability-calculator"], "Brisbane"],
  "sydney-break-lease-costs": ["Sydney Break Lease Costs", "Estimate possible Sydney break lease costs and organise reletting-related records.", ["break-lease-calculator"], "Sydney"],
  "melbourne-break-lease-costs": ["Melbourne Break Lease Costs", "Estimate possible Melbourne break lease costs and compare moving options.", ["break-lease-calculator"], "Melbourne"],
  "brisbane-break-lease-costs": ["Brisbane Break Lease Costs", "Estimate possible Brisbane break lease costs including uncovered rent and fees.", ["break-lease-calculator"], "Brisbane"],
};

export const guides: Guide[] = Object.entries(titles).map(([slug, [title, description, relatedCalculators, location]]) => ({
  slug,
  title,
  description,
  category: location
    ? "Local guides"
    : slug.includes("bond")
      ? "Bond refunds"
      : slug.includes("moving")
        ? "Moving"
        : slug.includes("lease")
          ? "Break lease"
          : "Renting",
  relatedCalculators,
  location,
}));

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function guideSections(guide: Guide) {
  if (guide.location) {
    return [
      {
        heading: `${guide.location} renter snapshot`,
        body: `${guide.description} Local rent, moving and cleaning costs can vary by suburb, property size, access, parking and timing, so use the calculators as planning tools rather than fixed quotes.`,
      },
      {
        heading: "What to check locally",
        body: `For a ${guide.location} rental, keep entry and exit condition records, dated photos, cleaning receipts, emails and any quotes in one folder. Compare any claimed cost with the property condition and the evidence you hold.`,
      },
      {
        heading: "Cost planning tips",
        body: "Run the related calculator, then add a buffer for timing, access, urgent bookings and extra services. Ask providers for itemised quotes so you can understand what is included before you commit.",
      },
      {
        heading: "Important limits",
        body: "This page is written for search and planning, not legal advice. Tenancy processes and outcomes can depend on state rules, documents, evidence and the facts of your rental.",
      },
    ];
  }

  return [
    {
      heading: "Quick summary",
      body: `${guide.description} Use this guide as a starting point, then check your lease, condition report and state or territory tenancy authority for your situation.`,
    },
    {
      heading: "What to gather",
      body: "Keep your lease, bond receipt, entry condition report, exit photos, repair invoices, cleaning receipts, emails and text messages in one folder. Clear records make it easier to compare claims with the actual condition of the property.",
    },
    {
      heading: "Useful next steps",
      body: "Write down the issue, the amount involved and the evidence on each side. Ask for itemised costs where money is being claimed. Avoid agreeing to deductions until you understand what they relate to.",
    },
    {
      heading: "When to get extra help",
      body: "If the amount is significant, the facts are disputed, or you feel pressured, contact your state or territory tenancy information service. This website provides general information only and is not a substitute for advice about your circumstances.",
    },
  ];
}
