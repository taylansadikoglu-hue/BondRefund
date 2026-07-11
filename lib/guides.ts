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
  "break-lease-costs-australia": ["Break Lease Calculator Australia: Estimate Break Lease Costs", "Use the break lease calculator to estimate uncovered rent, advertising, reletting fees and other possible costs before you negotiate.", ["break-lease-calculator"]],
  "break-lease-calculator-guide": ["Break Lease Calculator Guide", "How to use a break lease calculator to estimate rent, reletting costs, advertising and other possible break lease costs.", ["break-lease-calculator"]],
  "break-lease-fee-calculator": ["Break Lease Fee Calculator", "Estimate possible break lease fees and separate fixed costs from vacancy-related rent exposure.", ["break-lease-calculator"]],
  "how-much-does-it-cost-to-break-a-lease": ["How Much Does It Cost to Break a Lease?", "A practical guide to the costs that can appear when a renter ends a lease early in Australia.", ["break-lease-calculator"]],
  "break-lease-costs-nsw": ["Break Lease Costs NSW", "Estimate possible NSW break lease costs and organise the records to check any claimed amount.", ["break-lease-calculator"], "NSW"],
  "break-lease-costs-vic": ["Break Lease Costs Victoria", "Estimate possible Victorian break lease costs and compare claimed fees with evidence and timing.", ["break-lease-calculator"], "Victoria"],
  "break-lease-costs-qld": ["Break Lease Costs Queensland", "Estimate possible Queensland break lease costs including rent exposure, advertising and reletting items.", ["break-lease-calculator"], "Queensland"],
  "rent-increase-rules-australia": ["Rent Increase Rules in Australia", "General rent increase concepts and where to check local rules.", ["rent-increase-calculator"]],
  "moving-house-checklist": ["Moving House Checklist", "A practical checklist for planning, packing and updating services.", ["moving-cost-calculator"]],
  "rental-inspection-checklist": ["Rental Inspection Checklist", "What to check before, during and after rental inspections.", ["bond-refund-calculator"]],
  "how-to-dispute-bond-deductions": ["How to Dispute Bond Deductions", "Steps to review, question and document claimed deductions.", ["bond-refund-calculator"]],
  "bond-cleaning-cost-guide": ["End of Lease Cleaning Cost Guide", "What affects end-of-lease cleaning cost, bond cleaning prices and cleaner quotes in Australia.", ["end-of-lease-cleaning-calculator"]],
  "end-of-lease-cleaning-cost": ["End of Lease Cleaning Cost Australia", "Estimate end-of-lease cleaning cost by property size, bathrooms, carpet, furnished rooms and quote inclusions.", ["end-of-lease-cleaning-calculator", "bond-refund-calculator"]],
  "end-of-lease-cleaning-quote": ["End of Lease Cleaning Quote: What to Check", "How to compare an end-of-lease cleaning quote before booking a cleaner or accepting a bond deduction.", ["end-of-lease-cleaning-calculator", "bond-refund-calculator"]],
  "end-of-lease-cleaning-prices": ["End of Lease Cleaning Prices", "Understand the main drivers behind end-of-lease cleaning prices before comparing cleaner quotes.", ["end-of-lease-cleaning-calculator"]],
  "bond-cleaning-quote": ["Bond Cleaning Quote: What Should Be Included?", "Check what a bond cleaning quote includes before you book a cleaner or respond to a cleaning deduction.", ["end-of-lease-cleaning-calculator", "bond-refund-calculator"]],
  "end-of-lease-cleaning-cost-2-bedroom": ["End of Lease Cleaning Cost for a 2 Bedroom Home", "Estimate cleaning cost for a 2 bedroom rental using bathrooms, carpet, furnished rooms and condition.", ["end-of-lease-cleaning-calculator"]],
  "end-of-lease-cleaning-cost-3-bedroom": ["End of Lease Cleaning Cost for a 3 Bedroom Home", "Estimate cleaning cost for a 3 bedroom rental and compare cleaner quotes with common inclusions.", ["end-of-lease-cleaning-calculator"]],
  "end-of-lease-carpet-cleaning-cost": ["End of Lease Carpet Cleaning Cost", "Plan carpet cleaning costs for an end-of-lease clean and check when carpet cleaning is actually relevant.", ["end-of-lease-cleaning-calculator", "bond-refund-calculator"]],
  "tenant-rights-bond-refund": ["Tenant Rights and Bond Refunds", "General renter considerations when seeking a bond refund.", ["bond-refund-calculator"]],
  "normal-wear-and-tear-examples": ["Normal Wear and Tear Examples", "Examples renters can use when thinking about fair wear and tear.", ["bond-refund-calculator"]],
  "landlord-deduction-examples": ["Landlord Deduction Examples", "Common deduction types and what evidence may be relevant.", ["bond-refund-calculator"]],
  "rental-bond-refund-letter-template": ["Rental Bond Refund Letter Template", "A simple structure for requesting bond evidence and refund progress.", ["bond-refund-calculator"]],
  "end-of-lease-photo-checklist": ["End of Lease Photo Checklist", "Photos to take before returning keys at the end of a lease.", ["bond-refund-calculator"]],
  "how-to-prepare-for-final-inspection": ["How to Prepare for Final Inspection", "A practical preparation guide for the final rental inspection.", ["end-of-lease-cleaning-calculator"]],
  "bond-refund-mistakes-to-avoid": ["Bond Refund Mistakes to Avoid", "Common renter mistakes that can make bond refund discussions harder.", ["bond-refund-calculator"]],
  "bond-refund-for-sharehouses": ["Bond Refunds for Sharehouses", "How shared tenancies can plan bond splits and evidence.", ["bond-refund-calculator"]],
  "breaking-lease-without-penalty": ["Breaking Lease Without Penalty", "Situations to investigate before assuming all break lease costs apply.", ["break-lease-calculator"]],
  "rent-affordability-guide": ["Rent Affordability Guide Australia", "How to compare rent with income, moving costs and your household budget.", ["rental-affordability-calculator"]],
  "how-much-rent-can-i-afford-australia": ["How Much Rent Can I Afford in Australia?", "Use income, weekly rent and moving costs to estimate how much rent may fit your Australian rental budget.", ["rental-affordability-calculator", "moving-cost-calculator"]],
  "how-much-can-i-afford-to-rent": ["How Much Can I Afford to Rent?", "Estimate affordable rent from income, weekly rent, moving costs and a simple rent-to-income benchmark.", ["rental-affordability-calculator", "moving-cost-calculator"]],
  "how-much-rent-can-i-afford-on-60000": ["How Much Rent Can I Afford on $60,000?", "Use a $60,000 income as a starting point for estimating weekly rent affordability in Australia.", ["rental-affordability-calculator"]],
  "how-much-rent-can-i-afford-on-80000": ["How Much Rent Can I Afford on $80,000?", "Use an $80,000 income as a starting point for estimating weekly rent affordability in Australia.", ["rental-affordability-calculator"]],
  "how-much-rent-can-i-afford-on-100000": ["How Much Rent Can I Afford on $100,000?", "Use a $100,000 income as a starting point for estimating weekly rent affordability in Australia.", ["rental-affordability-calculator"]],
  "rent-to-income-ratio-calculator-australia": ["Rent to Income Ratio Calculator Australia", "Compare weekly rent with annual income and understand what the rent-to-income percentage means.", ["rental-affordability-calculator"]],
  "30-percent-rent-rule-australia": ["30% Rent Rule Australia", "Understand the 30% rent rule, when it helps, and why moving costs and take-home pay still matter.", ["rental-affordability-calculator"]],
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
  "brisbane-moving-costs": ["Moving Costs Brisbane", "Estimate moving costs in Brisbane using bedrooms, distance, removalist hours, access, packing and extras.", ["moving-cost-calculator"], "Brisbane"],
  "how-much-does-it-cost-to-move-in-brisbane": ["How Much Does It Cost to Move in Brisbane?", "Estimate Brisbane moving costs using removalist time, bedrooms, access, packing and move distance.", ["moving-cost-calculator"], "Brisbane"],
  "moving-house-costs-brisbane": ["Moving House Costs Brisbane", "Plan moving house costs in Brisbane including removalists, cleaning, bond, rent in advance and overlap.", ["moving-cost-calculator"], "Brisbane"],
  "removalist-costs-brisbane": ["Removalist Costs Brisbane", "Estimate Brisbane removalist costs by hours, access, stairs, distance, packing and heavy items.", ["moving-cost-calculator"], "Brisbane"],
  "brisbane-moving-quotes": ["Brisbane Moving Quotes: What to Compare", "Compare Brisbane moving quotes by hourly rate, call-out time, access fees, insurance and inclusions.", ["moving-cost-calculator"], "Brisbane"],
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
        : slug.includes("cleaning")
          ? "End of lease cleaning"
        : slug.includes("lease")
          ? "Break lease"
          : "Renting",
  relatedCalculators,
  location,
}));

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

const searchFocusedSections: Record<string, { heading: string; body: string }[]> = {
  "break-lease-costs-australia": [
    {
      heading: "What the break lease calculator estimates",
      body: "The calculator is designed for planning possible exposure before you speak with an agent or landlord. Enter the weekly rent, the expected number of uncovered weeks, advertising or reletting costs, and any other known amounts to create a transparent estimate.",
    },
    {
      heading: "Costs that often drive the total",
      body: "The largest variable is usually how long the property stays vacant before a replacement renter starts. Smaller items can include advertising, reletting fees, cleaning, key return costs, minor repairs or agreed administrative charges.",
    },
    {
      heading: "How to use the estimate",
      body: "Use the result as a comparison number, not a final bill. Ask for itemised costs, dates, invoices or quotes, and evidence of attempts to relet the property where relevant.",
    },
    {
      heading: "Important limits",
      body: "Break lease outcomes can depend on state rules, lease wording, mitigation efforts and evidence. This page is general information only and does not decide what you legally owe.",
    },
  ],
  "end-of-lease-cleaning-cost": [
    {
      heading: "What affects end-of-lease cleaning cost",
      body: "Property size, bathrooms, kitchens, carpet, furnished rooms, balconies, appliances, wall marks and general condition can all change the quote. Urgent bookings and difficult access can also increase the price.",
    },
    {
      heading: "Use the calculator before comparing quotes",
      body: "Enter bedrooms, bathrooms, carpet and furnishing details in the cleaning calculator to get a planning range. Then compare cleaner quotes against the same inclusions so you are not comparing a basic clean with a full bond clean.",
    },
    {
      heading: "Cleaning cost and bond deductions",
      body: "If cleaning is claimed from your bond, ask for photos, an itemised invoice or quote, and a link between the claimed cleaning and the exit condition of the property.",
    },
    {
      heading: "What to keep",
      body: "Keep booking confirmations, receipts, before-and-after photos, entry condition reports, exit reports and messages about access or re-clean requests.",
    },
  ],
  "end-of-lease-cleaning-quote": [
    {
      heading: "What a good quote should include",
      body: "A useful quote should list property size, bathrooms, kitchen appliances, carpet cleaning, windows, walls, balconies, furnished items, GST, call-out fees and whether a return clean is included.",
    },
    {
      heading: "Questions to ask before booking",
      body: "Ask what is excluded, whether carpet steam cleaning is included, whether the cleaner works with real estate checklists, and what happens if the agent requests a re-clean.",
    },
    {
      heading: "Compare quotes fairly",
      body: "The cheapest quote may exclude carpet, windows, blinds, oven detail or furnished-item cleaning. Compare line by line rather than only looking at the final price.",
    },
    {
      heading: "If the quote becomes a bond claim",
      body: "If a landlord or agent uses a cleaning quote to support a deduction, ask why the work was needed, what evidence supports it and whether the amount is reasonable for the actual condition.",
    },
  ],
  "how-much-rent-can-i-afford-australia": [
    {
      heading: "Start with rent as a share of income",
      body: "A common rule of thumb is that rent above 30% of gross income can feel stretched, but the right number depends on tax, debts, household size, transport and savings goals.",
    },
    {
      heading: "Use weekly and monthly views",
      body: "Rent is often advertised weekly in Australia, but budgets are often monthly. Convert weekly rent into annual and monthly amounts so you can compare it with income and other bills.",
    },
    {
      heading: "Do not forget moving costs",
      body: "Bond, rent in advance, removalists, cleaning, utility setup and overlap between properties can make a rental affordable on paper but stressful upfront.",
    },
    {
      heading: "Use the calculator as a budget check",
      body: "Enter weekly rent and annual household income in the rental affordability calculator, then add a moving cost estimate before applying for a property.",
    },
  ],
  "brisbane-moving-costs": [
    {
      heading: "What changes moving costs in Brisbane",
      body: "Bedrooms, stairs, lifts, parking, distance, travel time, packing, storage, heavy items and weekend timing can all affect a Brisbane moving quote.",
    },
    {
      heading: "Use hours and access, not just distance",
      body: "A short move can still cost more if access is difficult or the truck cannot park close to the property. Estimate removalist hours and add extras for packing or storage.",
    },
    {
      heading: "Budget for end-of-lease overlap",
      body: "Brisbane renters may need to budget for cleaning, bond, rent in advance, utility changes and a few days of rent overlap while moving out.",
    },
    {
      heading: "Get itemised quotes",
      body: "Ask whether the quote includes call-out time, fuel, stairs, heavy items, insurance, packing materials and GST before comparing movers.",
    },
  ],
  "bond-cleaning-cost-guide": [
    {
      heading: "Cost is usually about time and inclusions",
      body: "End-of-lease cleaning cost depends on how much work is included. Kitchens, bathrooms, carpets, windows, wall marks and furnished spaces usually drive the difference between quotes.",
    },
    {
      heading: "Use a planning range first",
      body: "The cleaning calculator gives a planning range so renters can sense-check quotes before booking or responding to a claimed deduction.",
    },
    {
      heading: "Ask for proof if it affects your bond",
      body: "If cleaning is deducted from bond, ask for itemised evidence showing what was cleaned, why it was needed and how the cost was calculated.",
    },
    {
      heading: "Keep your own evidence",
      body: "Photos, receipts and condition reports are useful because cleaning disputes often turn on what the property looked like at entry and exit.",
    },
  ],
  "rent-affordability-guide": [
    {
      heading: "Rent affordability is more than one percentage",
      body: "The 30% rent-to-income benchmark is useful, but it does not know your tax, debts, commute, family costs, savings goals or moving costs.",
    },
    {
      heading: "Use household income carefully",
      body: "If multiple people contribute to rent, combined income can help. If one income is irregular, use a conservative number before signing a lease.",
    },
    {
      heading: "Compare staying with moving",
      body: "A cheaper weekly rent can still be expensive upfront if moving costs, cleaning, bond and rent overlap are high.",
    },
    {
      heading: "Build a buffer",
      body: "Leave room for utilities, groceries, transport, insurance and emergencies. A rental can pass a percentage test and still feel tight.",
    },
  ],
};

export function guideSections(guide: Guide) {
  const focused = searchFocusedSections[guide.slug];
  if (focused) {
    return focused;
  }

  if (guide.slug.includes("break-lease")) {
    return [
      {
        heading: "Quick estimate",
        body: `${guide.description} Start with weekly rent, expected vacant weeks, advertising or reletting items, and any known fixed amounts.`,
      },
      {
        heading: "Costs to separate",
        body: "Separate rent exposure from once-off fees. Rent exposure usually depends on timing, while advertising, reletting, cleaning or administration items should be checked against records and invoices.",
      },
      {
        heading: "Evidence to ask for",
        body: "Ask for itemised amounts, lease references, dates, invoices, advertising records and evidence of efforts to find a replacement renter where relevant.",
      },
      {
        heading: "Use the calculator before agreeing",
        body: "Run the related break lease calculator, compare the result with the claimed amount, and keep the estimate with your lease, emails and condition records.",
      },
    ];
  }

  if (guide.slug.includes("cleaning") || guide.slug.includes("clean")) {
    return [
      {
        heading: "Quick estimate",
        body: `${guide.description} The biggest cost drivers are property size, bathrooms, kitchen condition, carpet, furnished rooms, windows, balconies and urgency.`,
      },
      {
        heading: "Quote checks",
        body: "Before booking or accepting a deduction, check whether carpet, oven, windows, blinds, balconies, furnished items, GST and return cleans are included.",
      },
      {
        heading: "Bond deduction checks",
        body: "If cleaning is claimed from bond, ask for photos, an itemised invoice or quote, and a clear link between the work claimed and the exit condition of the property.",
      },
      {
        heading: "Use the calculator",
        body: "Use the end-of-lease cleaning calculator to create a planning range, then compare each quote against the same rooms and inclusions.",
      },
    ];
  }

  if (guide.slug.includes("rent") || guide.slug.includes("afford")) {
    return [
      {
        heading: "Quick estimate",
        body: `${guide.description} Convert weekly rent into annual rent, then compare it with gross income and your real take-home budget.`,
      },
      {
        heading: "What the percentage means",
        body: "A 30% rent-to-income benchmark is a useful warning light, not a rule. Debt, transport, dependants, savings goals and irregular income can change what feels affordable.",
      },
      {
        heading: "Upfront costs matter",
        body: "Bond, rent in advance, removalists, end-of-lease cleaning, utility setup and rent overlap can make a rental hard to afford even when the weekly rent looks manageable.",
      },
      {
        heading: "Use the calculator",
        body: "Use the rental affordability calculator to compare weekly rent with annual income, then add a moving cost estimate before applying.",
      },
    ];
  }

  if (guide.slug.includes("moving") || guide.slug.includes("removalist")) {
    return [
      {
        heading: "Quick estimate",
        body: `${guide.description} Moving costs usually depend on bedrooms, truck access, stairs or lifts, travel time, removalist hours, packing and storage.`,
      },
      {
        heading: "Compare quotes properly",
        body: "Ask whether the quote includes call-out time, fuel, GST, stairs, heavy items, insurance, packing materials and waiting time before comparing movers.",
      },
      {
        heading: "Budget beyond the truck",
        body: "Renters should also allow for bond, rent in advance, cleaning, utility changes, overlap between homes and small replacement items after moving.",
      },
      {
        heading: "Use the calculator",
        body: "Use the moving cost calculator to test bedrooms, hours and extras, then keep written quotes so you can compare the same scope of work.",
      },
    ];
  }

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

export function guideFaqs(guide: Guide) {
  if (guide.slug.includes("break-lease")) {
    return [
      {
        question: `Can I use this ${guide.title.toLowerCase()} page as a final legal amount?`,
        answer: "No. It is a planning estimate only. Break lease outcomes can depend on local rules, lease terms, mitigation, evidence and timing.",
      },
      {
        question: "What should I check before paying break lease costs?",
        answer: "Ask for itemised costs, dates, invoices, advertising or reletting records, and an explanation of how the amount was calculated.",
      },
    ];
  }

  if (guide.slug.includes("cleaning") || guide.slug.includes("clean")) {
    return [
      {
        question: "What should an end-of-lease cleaning quote include?",
        answer: "It should clearly list rooms, bathrooms, kitchen detail, carpet, windows, furnished items, GST, exclusions and whether a return clean is included.",
      },
      {
        question: "Can cleaning be deducted from my bond?",
        answer: "Cleaning may be claimed in some situations, but the claim should be supported by evidence, condition records and a reasonable cost.",
      },
    ];
  }

  if (guide.slug.includes("rent") || guide.slug.includes("afford")) {
    return [
      {
        question: "Is the 30% rent rule always right?",
        answer: "No. It is only a benchmark. Your take-home pay, debts, transport, household costs and savings goals can make a lower or higher percentage feel different.",
      },
      {
        question: "Should I include moving costs when checking affordability?",
        answer: "Yes. Bond, rent in advance, removalists, cleaning and utility setup can create a large upfront cost before the weekly rent even starts.",
      },
    ];
  }

  if (guide.slug.includes("moving") || guide.slug.includes("removalist")) {
    return [
      {
        question: "What affects moving costs the most?",
        answer: "Bedrooms, access, stairs, parking, travel time, removalist hours, packing, storage, heavy items and timing usually drive the final cost.",
      },
      {
        question: "Why do moving quotes vary so much?",
        answer: "Quotes can include different assumptions about call-out time, GST, insurance, packing materials, stairs, waiting time and the number of movers.",
      },
    ];
  }

  return [
    {
      question: `Is ${guide.title} legal advice?`,
      answer: "No. It is general information to help renters organise numbers and evidence before checking official sources or getting advice.",
    },
    {
      question: "Which calculator should I use next?",
      answer: "Use the related calculator shown on this page to turn the guide into a simple estimate you can compare with quotes, deductions or moving budgets.",
    },
  ];
}
