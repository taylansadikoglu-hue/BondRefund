export type Guide = {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
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
  "break-lease-costs-australia": ["Break Lease Costs Australia", "Use the break lease calculator to estimate uncovered rent, advertising, reletting fees and other possible costs before you negotiate.", ["break-lease-calculator"]],
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
  "bond-refund-nsw-form": ["Bond Refund NSW Form Guide", "What NSW renters should prepare before lodging or responding to a bond refund form.", ["bond-refund-calculator"], "NSW"],
  "bond-refund-vic-form": ["Bond Refund Victoria Form Guide", "What Victorian renters should prepare before lodging or responding to a bond refund claim.", ["bond-refund-calculator"], "Victoria"],
  "bond-refund-qld-form": ["Bond Refund Queensland Form Guide", "What Queensland renters should prepare before lodging or responding to a bond refund request.", ["bond-refund-calculator"], "Queensland"],
  "bond-refund-wa-form": ["Bond Refund WA Form Guide", "What Western Australian renters should prepare before bond refund discussions or claims.", ["bond-refund-calculator"], "Western Australia"],
  "bond-refund-sa-form": ["Bond Refund SA Form Guide", "What South Australian renters should prepare before bond refund discussions or claims.", ["bond-refund-calculator"], "South Australia"],
  "bond-refund-act-form": ["Bond Refund ACT Form Guide", "What Canberra and ACT renters should prepare before bond refund discussions or claims.", ["bond-refund-calculator"], "ACT"],
  "bond-refund-tas-form": ["Bond Refund Tasmania Form Guide", "What Tasmanian renters should prepare before bond refund discussions or claims.", ["bond-refund-calculator"], "Tasmania"],
  "bond-refund-nt-form": ["Bond Refund NT Form Guide", "What Northern Territory renters should prepare before bond refund discussions or claims.", ["bond-refund-calculator"], "Northern Territory"],
  "bond-refund-timeline-nsw": ["Bond Refund Timeline NSW", "Understand the practical steps and documents that can affect a NSW bond refund timeline.", ["bond-refund-calculator"], "NSW"],
  "bond-refund-timeline-vic": ["Bond Refund Timeline Victoria", "Understand the practical steps and documents that can affect a Victorian bond refund timeline.", ["bond-refund-calculator"], "Victoria"],
  "perth-end-of-lease-cleaning-costs": ["Perth End of Lease Cleaning Costs", "Estimate Perth end-of-lease cleaning costs and compare quotes by rooms, carpets and inclusions.", ["end-of-lease-cleaning-calculator"], "Perth"],
  "adelaide-end-of-lease-cleaning-costs": ["Adelaide End of Lease Cleaning Costs", "Estimate Adelaide end-of-lease cleaning costs and compare quote inclusions before booking.", ["end-of-lease-cleaning-calculator"], "Adelaide"],
  "canberra-end-of-lease-cleaning-costs": ["Canberra End of Lease Cleaning Costs", "Estimate Canberra bond cleaning costs for bedrooms, bathrooms, carpet and furnished rooms.", ["end-of-lease-cleaning-calculator"], "Canberra"],
  "gold-coast-end-of-lease-cleaning-costs": ["Gold Coast End of Lease Cleaning Costs", "Estimate Gold Coast end-of-lease cleaning costs and check cleaner quote inclusions.", ["end-of-lease-cleaning-calculator"], "Gold Coast"],
  "newcastle-end-of-lease-cleaning-costs": ["Newcastle End of Lease Cleaning Costs", "Estimate Newcastle bond cleaning costs and compare carpet, oven, bathroom and window inclusions.", ["end-of-lease-cleaning-calculator"], "Newcastle"],
  "hobart-end-of-lease-cleaning-costs": ["Hobart End of Lease Cleaning Costs", "Estimate Hobart end-of-lease cleaning costs and compare cleaner quote inclusions.", ["end-of-lease-cleaning-calculator"], "Hobart"],
  "darwin-end-of-lease-cleaning-costs": ["Darwin End of Lease Cleaning Costs", "Estimate Darwin end-of-lease cleaning costs and compare cleaner quote inclusions.", ["end-of-lease-cleaning-calculator"], "Darwin"],
  "wollongong-end-of-lease-cleaning-costs": ["Wollongong End of Lease Cleaning Costs", "Estimate Wollongong bond cleaning costs and compare cleaner quotes before handover.", ["end-of-lease-cleaning-calculator"], "Wollongong"],
  "geelong-end-of-lease-cleaning-costs": ["Geelong End of Lease Cleaning Costs", "Estimate Geelong end-of-lease cleaning costs and compare quote inclusions.", ["end-of-lease-cleaning-calculator"], "Geelong"],
  "townsville-end-of-lease-cleaning-costs": ["Townsville End of Lease Cleaning Costs", "Estimate Townsville end-of-lease cleaning costs and compare cleaner quote inclusions.", ["end-of-lease-cleaning-calculator"], "Townsville"],
  "perth-moving-costs": ["Perth Moving Costs", "Estimate Perth moving costs using bedrooms, distance, removalist hours, access and extras.", ["moving-cost-calculator"], "Perth"],
  "adelaide-moving-costs": ["Adelaide Moving Costs", "Estimate Adelaide moving costs using bedrooms, distance, removalist hours, access and extras.", ["moving-cost-calculator"], "Adelaide"],
  "canberra-moving-costs": ["Canberra Moving Costs", "Estimate Canberra moving costs using bedrooms, access, distance, removalist hours and extras.", ["moving-cost-calculator"], "Canberra"],
  "gold-coast-moving-costs": ["Gold Coast Moving Costs", "Estimate Gold Coast moving costs including removalists, access, packing and storage extras.", ["moving-cost-calculator"], "Gold Coast"],
  "newcastle-moving-costs": ["Newcastle Moving Costs", "Estimate Newcastle moving costs using bedrooms, distance, removalist hours and extras.", ["moving-cost-calculator"], "Newcastle"],
  "hobart-moving-costs": ["Hobart Moving Costs", "Estimate Hobart moving costs using bedrooms, access, removalist hours and extras.", ["moving-cost-calculator"], "Hobart"],
  "darwin-moving-costs": ["Darwin Moving Costs", "Estimate Darwin moving costs using bedrooms, distance, removalist hours and extras.", ["moving-cost-calculator"], "Darwin"],
  "wollongong-moving-costs": ["Wollongong Moving Costs", "Estimate Wollongong moving costs using bedrooms, access, removalist hours and extras.", ["moving-cost-calculator"], "Wollongong"],
  "geelong-moving-costs": ["Geelong Moving Costs", "Estimate Geelong moving costs using bedrooms, distance, removalist hours and extras.", ["moving-cost-calculator"], "Geelong"],
  "townsville-moving-costs": ["Townsville Moving Costs", "Estimate Townsville moving costs using bedrooms, access, removalist hours and extras.", ["moving-cost-calculator"], "Townsville"],
  "rent-affordability-sydney": ["Rent Affordability Sydney", "Estimate whether weekly rent may fit a Sydney household budget after income and moving costs.", ["rental-affordability-calculator"], "Sydney"],
  "rent-affordability-melbourne": ["Rent Affordability Melbourne", "Estimate whether weekly rent may fit a Melbourne household budget after income and moving costs.", ["rental-affordability-calculator"], "Melbourne"],
  "rent-affordability-brisbane": ["Rent Affordability Brisbane", "Estimate whether weekly rent may fit a Brisbane household budget after income and moving costs.", ["rental-affordability-calculator"], "Brisbane"],
  "rent-affordability-perth": ["Rent Affordability Perth", "Estimate whether weekly rent may fit a Perth household budget after income and moving costs.", ["rental-affordability-calculator"], "Perth"],
  "rent-affordability-adelaide": ["Rent Affordability Adelaide", "Estimate whether weekly rent may fit an Adelaide household budget after income and moving costs.", ["rental-affordability-calculator"], "Adelaide"],
  "rent-affordability-canberra": ["Rent Affordability Canberra", "Estimate whether weekly rent may fit a Canberra household budget after income and moving costs.", ["rental-affordability-calculator"], "Canberra"],
  "student-rent-affordability": ["Student Rent Affordability", "Estimate student rent affordability by comparing weekly rent, income, bond and moving costs.", ["rental-affordability-calculator"]],
  "single-income-rent-affordability": ["Single Income Rent Affordability", "Estimate rent affordability for one income, including weekly rent, bond and moving cost pressure.", ["rental-affordability-calculator"]],
  "couples-rent-affordability": ["Couples Rent Affordability", "Estimate rent affordability for couples using combined income, weekly rent and moving costs.", ["rental-affordability-calculator"]],
  "rent-affordability-on-60000": ["Rent Affordability on $60,000", "Estimate how much rent may fit a $60,000 income in Australia before moving costs.", ["rental-affordability-calculator"]],
  "carpet-cleaning-bond-deduction": ["Carpet Cleaning Bond Deduction", "Check carpet cleaning deductions against condition reports, photos, quotes and receipts.", ["bond-refund-calculator", "end-of-lease-cleaning-calculator"]],
  "oven-cleaning-bond-deduction": ["Oven Cleaning Bond Deduction", "Check oven cleaning deductions against evidence, quote detail and the condition at handover.", ["bond-refund-calculator", "end-of-lease-cleaning-calculator"]],
  "wall-marks-bond-deduction": ["Wall Marks Bond Deduction", "Check wall mark deductions against fair wear, entry condition evidence and repair quotes.", ["bond-refund-calculator"]],
  "garden-maintenance-bond-deduction": ["Garden Maintenance Bond Deduction", "Check garden maintenance deductions against lease duties, photos, invoices and entry condition.", ["bond-refund-calculator"]],
  "unpaid-rent-bond-deduction": ["Unpaid Rent Bond Deduction", "Estimate how unpaid rent can affect a bond refund and what records renters should check.", ["bond-refund-calculator"]],
  "pet-damage-bond-deduction": ["Pet Damage Bond Deduction", "Check pet damage deductions against evidence, fair wear, repair quotes and condition records.", ["bond-refund-calculator"]],
  "sharehouse-bond-split": ["Sharehouse Bond Split Guide", "Plan how to split a sharehouse bond refund when housemates move out at different times.", ["bond-refund-calculator"]],
  "co-tenant-bond-refund": ["Co-Tenant Bond Refund Guide", "What co-tenants should prepare when a bond refund or deduction is shared across renters.", ["bond-refund-calculator"]],
  "bond-refund-without-condition-report": ["Bond Refund Without a Condition Report", "What renters can organise when a bond dispute happens without a clear condition report.", ["bond-refund-calculator"]],
  "agent-claiming-more-than-bond": ["Agent Claiming More Than the Bond", "How renters can think through claims that exceed the bond and what records to gather.", ["bond-refund-calculator"]],
};

export const guides: Guide[] = Object.entries(titles).map(([slug, [title, description, relatedCalculators, location]]) => ({
  slug,
  title,
  description,
  metaTitle:
    slug === "how-to-get-your-bond-back-nsw"
      ? "How to Get Your Bond Back in NSW | Bond Refund Guide"
      : slug === "how-long-does-bond-refund-take"
        ? "How Long Does a Bond Refund Take in Australia?"
        : slug === "sydney-moving-costs"
          ? "Sydney Moving Costs Guide | Plan a Rental Move"
          : slug === "sydney-bond-refund-guide"
            ? "Sydney Bond Refund Guide | Bond Back Checklist"
            : slug === "sydney-rent-increase-guide"
              ? "Sydney Rent Increase Guide | What Rent Rise Can You Afford?"
              : slug === "how-to-get-your-bond-back-vic"
                ? "How to Get Your Bond Back in Victoria | Bond Guide"
                : slug === "bond-cleaning-cost-guide"
                  ? "End of Lease Cleaning Cost Guide Australia"
                  : slug === "brisbane-moving-costs"
                    ? "Brisbane Moving Costs Guide | Plan Your Move Budget"
                    : slug === "moving-costs-australia"
                      ? "Moving Costs Australia | What Renters Should Budget"
                      : slug === "rental-bond-refund-letter-template"
                        ? "Rental Bond Refund Letter Template | Simple Renter Copy"
            : undefined,
  metaDescription:
    slug === "how-to-get-your-bond-back-nsw"
      ? "Learn how to get your bond back in NSW, what evidence to keep, and what to check before agreeing to deductions."
      : slug === "how-long-does-bond-refund-take"
        ? "See the usual bond refund timeline in Australia, what can slow it down, and what renters should prepare first."
        : slug === "sydney-moving-costs"
          ? "Estimate real Sydney moving costs, including removalists, packing, cleaning and the extras renters often miss."
          : slug === "sydney-bond-refund-guide"
            ? "A practical Sydney renter guide to getting your bond back, reducing deduction risk and preparing for final inspection."
            : slug === "sydney-rent-increase-guide"
              ? "Compare a Sydney rent increase with your budget, moving costs and other options before deciding whether to stay."
              : slug === "how-to-get-your-bond-back-vic"
                ? "Learn how to get your bond back in Victoria, what records matter, and what to check before accepting deductions."
                : slug === "bond-cleaning-cost-guide"
                  ? "See what usually affects end-of-lease cleaning costs in Australia and how to compare quotes before booking."
                  : slug === "brisbane-moving-costs"
                    ? "Estimate Brisbane moving costs, including removalists, access, packing, storage and the extras renters miss."
                    : slug === "moving-costs-australia"
                      ? "Understand moving costs in Australia, from removalists and packing to cleaning, storage and rent overlap."
                      : slug === "rental-bond-refund-letter-template"
                        ? "Use a simple rental bond refund letter template to ask for evidence, a refund update or a clearer deduction breakdown."
            : undefined,
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
  "can-landlord-charge-for-carpet-cleaning": [
    { heading: "What the rules say in the three largest states", body: "In NSW, a tenancy agreement cannot require you to have the carpet professionally cleaned, or to pay for that cleaning, at the end of the tenancy. The exception is where the landlord agreed to a pet being kept inside and the cleaning is reasonable for that type of pet. In Victoria, for agreements signed from 29 March 2021, a rental provider cannot require professional cleaning at the end unless it is needed to return the property to the condition it was in at the start, allowing for fair wear and tear. One example is where it was professionally cleaned just before you moved in and you were told so. In Queensland, you must leave the property in the same condition as at the start, apart from fair wear and tear. The RTA says a special term requiring a receipt, a professional cleaner, a particular company or a set fee breaches the law on requiring renters to buy goods or services. These rules were checked on the NSW Government, Consumer Affairs Victoria and RTA websites on 26 November 2026." },
    { heading: "What this means in practice", body: "In every state the starting point is the same: the carpet should be left in the same condition as at the start of the tenancy, allowing for fair wear and tear. If you can show that with entry and exit photos, a blanket professional-cleaning charge is much harder to justify. If there is a specific stain or pet damage, expect that area to be treated differently." },
    { heading: "If you clean it yourself", body: "Vacuum thoroughly, treat any marks you caused, and photograph every carpeted room in good light after you finish. Keep a receipt if you hire a machine. That gives you evidence of the standard you left, whether or not the lease mentions carpet." }
  ],
  "sydney-end-of-lease-cleaning-costs": [
    { heading: "What NSW law says about cleaning", body: "In NSW, you must leave the property in the same condition as at the start of the tenancy, allowing for fair wear and tear, and reasonably clean. A NSW lease also cannot make professional carpet cleaning compulsory when you leave, unless you were allowed to keep a pet inside and the clean suits that pet. A cleaning claim against your bond should be linked to a specific area that was left dirtier than at the start." },
    { heading: "What drives a Sydney cleaning quote", body: "Quotes usually depend on the number of bedrooms and bathrooms, whether there is a balcony, the oven and rangehood, windows and tracks, walls and skirting boards, and carpet. Apartments with lifts, loading docks or limited parking can add time. Ask each cleaner to price the same list so you can compare them fairly." },
    { heading: "Do it yourself or hire a cleaner", body: "Hiring a cleaner is a choice, not a requirement, unless your situation fits the pet exception above. A professional clean with a re-clean guarantee can save stress if your time is short. If you clean yourself, work from the room-by-room checklist and take dated photos of the result." },
    { heading: "If cleaning is claimed from your bond", body: "Ask which rooms and surfaces were not clean, the photos that show it, and the cleaner's invoice. Compare those with your exit photos and the entry condition report. If you disagree, you can dispute the claim through Rental Bonds Online and the matter can go to the NSW Civil and Administrative Tribunal." }
  ],
  "end-of-lease-cleaning-checklist": [
    { heading: "The standard you are aiming for", body: "The usual standard is the condition the property was in when you moved in, allowing for fair wear and tear, and reasonably clean. It is not a brand-new standard. Read your entry condition report before you start, so you clean to the right level and do not miss anything that was noted." },
    { heading: "A sensible order of work", body: "Remove everything first, including rubbish and items in the garage or shed. Then clean from top to bottom: ceilings and light fittings, walls and switches, cupboards and benches, then floors last. Do kitchens and bathrooms early, because they take the longest and are checked most closely." },
    { heading: "Commonly missed spots", body: "Oven racks and trays, the rangehood filter, window tracks, the shower screen and grout, exhaust fans, skirting boards, inside cupboards and drawers, blinds, and the dishwasher filter are the areas most often raised at final inspection." },
    { heading: "Finish with proof", body: "Photograph every room and the commonly missed spots once you finish, before you return the keys. Keep receipts for any cleaning products hired or services booked. These records help if the clean is questioned later." }
  ],
  "moving-house-checklist": [
    { heading: "Four to six weeks before", body: "Give notice in writing, following your lease and the required notice period for your state. Get two or three removalist quotes on the same inventory. Book any end-of-lease cleaning, and start using up food and selling or donating what you won't move." },
    { heading: "Two weeks before", body: "Arrange disconnection and connection of electricity, gas and internet, ideally so the new place is connected the day you arrive. Redirect mail. Update your address with your bank, employer, insurer, the ATO, Medicare and the electoral roll." },
    { heading: "The last few days", body: "Pack an essentials box with chargers, medication, documents, bedding and basic kitchen items. Do the final clean, take dated photos of every room, read the meters and photograph the readings, and return all keys and remotes in a way you can prove, such as by email confirmation." },
    { heading: "After the move", body: "Lodge or respond to the bond refund claim promptly. Keep your exit photos, receipts and messages until the bond is fully settled. At the new place, check the entry condition report carefully and add your own photos before you unpack." }
  ],
  "rental-bond-dispute-guide": [
    { heading: "Step 1: get the claim itemised", body: "Ask for each deduction in writing, with an amount and the evidence behind it, such as photos, invoices or quotes. A single total is hard to check. Separate items are much easier to accept or dispute one by one." },
    { heading: "Step 2: match evidence to each item", body: "For every item, put the entry condition report note, your entry photo, your exit photo and any receipts side by side. Note whether the issue was there at the start, is fair wear and tear, or is something you caused. Agree in writing to the items you accept, so the undisputed part can be paid." },
    { heading: "Step 3: use the official process for the rest", body: "Each state has its own process. In NSW, disputes go to the NSW Civil and Administrative Tribunal. In Victoria, Rental Dispute Resolution Victoria can help before VCAT. In Queensland, the RTA offers dispute resolution. Response periods are often 14 days, so check the timing for your state straight away." },
    { heading: "What a tribunal usually looks at", body: "Tribunals generally compare the property's condition at the start and end of the tenancy, allow for fair wear and tear, and look at the age of anything replaced. A claim for the full cost of replacing an old item may be reduced to reflect its age. Clear, dated evidence carries the most weight." }
  ],
  "how-to-prepare-for-final-inspection": [
    { heading: "Know what the agent will compare", body: "The final inspection compares the property with the entry condition report. Read your copy before the inspection and walk through with it, room by room. Anything that was already noted at the start should not be held against you." },
    { heading: "Fix the small things you can", body: "Replace blown light globes, refill or replace smoke alarm batteries if that is your responsibility under the lease, patch small marks you caused with the agent's agreement, and remove picture hooks you installed if the lease requires it. Small fixes can head off claims that cost more than the repair." },
    { heading: "Be there if you can", body: "Ask whether you can attend the inspection. If something is raised, you can discuss it on the spot, take your own photo and offer to fix it before keys are returned. Ask for any issues to be confirmed in writing." },
    { heading: "Hand over properly", body: "Return every key, remote and access card, and get written confirmation of what was returned and when. Note the meter readings. Then start or respond to the bond refund claim promptly, so the response period starts as early as possible." }
  ],
  "landlord-deduction-examples": [
    { heading: "Deductions that are commonly allowed", body: "Unpaid rent, the reasonable cost of cleaning areas left dirtier than at the start, repairing damage beyond fair wear and tear, and replacing keys or remotes not returned are typical legitimate claims, as long as they are supported by evidence." },
    { heading: "Deductions that often need challenging", body: "A full repaint for a few marks, replacing old carpet at new prices, a flat professional cleaning fee where the lease cannot require one, routine maintenance the landlord is responsible for, and items noted as already damaged in the entry report are common examples worth questioning." },
    { heading: "Age matters", body: "When something old is damaged, a fair claim takes its age into account. Carpet, paint and blinds all have limited lifespans. A landlord is generally not entitled to a brand-new item at your expense when the old one was already part-way through its life." },
    { heading: "Check the deduction checker", body: "The bond deduction evidence checker on this site lets you list each claimed item, see what proof to ask for and copy a calm reply asking for an itemised breakdown." }
  ],
  "end-of-lease-photo-checklist": [
    { heading: "Settings that make photos useful", body: "Use daylight or turn every light on, keep the camera's date stamp or original file information, and do not filter or edit the images. Take a wide shot of each wall from a corner, then close-ups of anything worth noting. Video walk-throughs are also useful, as long as they are slow and well lit." },
    { heading: "What to capture in every room", body: "Floors and carpet, all four walls, ceilings, windows and tracks, blinds or curtains, light fittings, power points, doors and handles, and the inside of cupboards. In wet areas, add the grout, shower screen, exhaust fan and under the sink. In the kitchen, add the inside of the oven, the rangehood and the dishwasher." },
    { heading: "Outside and extras", body: "Lawn and garden beds, paving, the garage or car space, letterbox, bins and any outdoor furniture listed in the entry report. Photograph meter readings and all keys and remotes laid out together on the day you return them." },
    { heading: "Store them safely", body: "Back the photos up to cloud storage the same day, in a folder named with the property address and date. Keep them until the bond is fully refunded and any dispute is finished." }
  ],
  "normal-wear-and-tear-examples": [
    { heading: "How to decide which it is", body: "Ask three questions. Did it happen gradually through ordinary living, or from a specific event? How old was the item, and what condition was it in at the start? Would a careful tenant in the same home for the same time have caused the same change? Gradual, ordinary change points to fair wear and tear. A specific event or careless use points to damage." },
    { heading: "Scenario: marks on a hallway wall", body: "Light scuffs at shoulder height in a busy hallway after three years are typical wear. A dent from a moved bed frame, or a hole from an unapproved hook, is damage. The fair cost for damage is usually a patch and touch-up of that section, not repainting the whole house." },
    { heading: "Scenario: carpet after five years", body: "A worn path from the front door, and fading near a sunny window, are wear. A large red wine stain or a burn mark is damage. Even for damage, the claim should reflect the carpet's age. A five-year-old carpet is not replaced at the cost of brand-new carpet." },
    { heading: "Scenario: a dripping tap", body: "A worn washer that starts dripping is wear, and the landlord normally fixes it. If you didn't report it and water damaged the cupboard underneath, that later damage may be argued as your responsibility. Report problems in writing as they happen." }
  ],
  "can-landlord-charge-for-painting": [
    { heading: "When painting can be charged", body: "Painting can be a fair claim when you damaged the walls beyond fair wear and tear, for example with large marks, holes, unapproved paint colours or smoke staining where smoking was not allowed. The claim should cover the damaged area, not the whole property." },
    { heading: "When it usually can't", body: "Gradual fading, minor scuffs from ordinary living and marks that were in the entry condition report are generally not your cost. Paint has a limited life. If a room was due for repainting anyway because of its age, a claim for the full job is hard to justify." },
    { heading: "Ask how the amount was worked out", body: "Ask which walls were painted, why the whole room was needed if only one area was marked, how old the paint was, and for the painter's invoice. A quote for a whole room against a single marked wall is worth questioning." }
  ],

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
  "how-to-get-your-bond-back-nsw": [
    {
      heading: "Start with the evidence, not the argument",
      body: "Before discussing deductions, collect the NSW entry condition report, exit photos, cleaning receipts, emails and any final inspection notes. A simple evidence folder is often more useful than a long emotional reply."
    },
    {
      heading: "Check each deduction one by one",
      body: "Cleaning, damage, unpaid rent and replacement claims should be reviewed separately. Ask what each amount relates to and what proof supports it before agreeing to any money being kept."
    },
    {
      heading: "Use the bond refund calculator first",
      body: "A simple refund estimate helps you see whether the issue is small, moderate or worth pushing back on. That makes the conversation easier and clearer."
    },
    {
      heading: "Keep the process simple",
      body: "Write down the claimed amount, the reason given, and the evidence on both sides. Staying clear and organised usually works better than replying in anger."
    },
  ],
  "how-to-get-your-bond-back-vic": [
    {
      heading: "Prepare the Victorian evidence first",
      body: "Start with the entry condition report, exit photos, receipts and written messages. Those records make it easier to compare a claimed deduction with the actual property condition."
    },
    {
      heading: "Do not accept vague amounts",
      body: "If money is being kept, ask what the amount is for, whether there is an invoice or quote, and why the work was needed. A broad claim is not the same as a clear itemised one."
    },
    {
      heading: "Estimate the refund before replying",
      body: "Use the calculator to work out what should come back if the claim is right, then compare that with what you expected to receive."
    },
    {
      heading: "Keep the conversation written",
      body: "A short written summary of the issue, the amount and the evidence on each side can keep the process much calmer and clearer."
    },
  ],
  "how-to-get-your-bond-back-qld": [
    {
      heading: "Keep Queensland bond records in one place",
      body: "Put the entry report, exit photos, invoices, receipts and messages into one folder before the refund process gets messy."
    },
    {
      heading: "Check the real reason for each claim",
      body: "If cleaning, repairs or unpaid rent are mentioned, ask which amount belongs to which issue and what evidence supports it."
    },
    {
      heading: "Use a simple refund estimate first",
      body: "The calculator helps you understand the size of the deduction before you decide whether to accept it, question it or prepare for a dispute."
    },
    {
      heading: "Slow down before agreeing",
      body: "A rushed yes can be hard to unwind later. Make sure you understand the amount, the evidence and the actual impact on the bond refund first."
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
  "sydney-moving-costs": [
    {
      heading: "Sydney moves often cost more than the first quote",
      body: "Parking limits, stairs, lifts, narrow access, storage, longer travel time and extra waiting can all turn a basic truck quote into a much bigger bill."
    },
    {
      heading: "Budget beyond removalists",
      body: "The truck is only one part of the move. Bond, rent overlap, end-of-lease cleaning, packing materials, key collection and utility changes can all affect the real cost."
    },
    {
      heading: "Compare moving with staying",
      body: "If you are moving because of rent, compare the move cost with the likely rent saving over the next 6 to 12 months. A cheaper rental can still be expensive upfront."
    },
    {
      heading: "Use the calculator before booking",
      body: "Estimate the move first, then compare written quotes against the same assumptions so you are judging like for like."
    },
  ],
  "moving-costs-australia": [
    {
      heading: "Most renters underestimate the full move cost",
      body: "They remember the truck quote but forget bond, rent in advance, overlap, cleaning, packing, storage and small setup costs at the new place."
    },
    {
      heading: "The biggest cost is often time",
      body: "Travel time, access problems, stairs, parking delays and packing can change a move far more than people expect from the first estimate."
    },
    {
      heading: "Use the move cost as a decision number",
      body: "If you are deciding whether to renew, move or break lease, compare the full moving cost with the likely savings or extra rent over the next year."
    },
    {
      heading: "Use a range, not one perfect figure",
      body: "Moving costs are variable, so a useful estimate should give you a planning number plus a sensible buffer."
    },
  ],
  "melbourne-rent-increase-guide": [
    {
      heading: "Look at the annual cost, not just the weekly jump",
      body: "A small weekly increase can still add a meaningful amount across a full year, especially once utilities, transport and other living costs are added."
    },
    {
      heading: "Check the new rent against your actual budget",
      body: "Compare the increase with household income, not just broad market talk. A rent rise that looks normal on paper can still feel too tight in real life."
    },
    {
      heading: "Moving is not free",
      body: "A cheaper rental can still cost more upfront once removalists, cleaning, bond and rent overlap are included. That is why moving costs should be part of the decision."
    },
    {
      heading: "Run both numbers before you decide",
      body: "Use the rent increase calculator for the new weekly cost, then compare it with affordability and likely moving expenses."
    },
  ],
  "brisbane-break-lease-costs": [
    {
      heading: "Separate rent exposure from one-off charges",
      body: "The most important question is often how long the property stayed vacant or whether there was a real gap before a new tenant moved in. Fixed fees should still be checked separately."
    },
    {
      heading: "Ask for proof before accepting the number",
      body: "If a landlord or agent gives you a break lease figure, ask how it was calculated, what dates were used and what invoices or advertising records support it."
    },
    {
      heading: "Compare the cost with your alternatives",
      body: "Sometimes the better question is not just what leaving costs, but whether leaving now is still cheaper than staying for longer and moving later."
    },
    {
      heading: "Use the calculator to keep the discussion clear",
      body: "A simple estimate helps you stay practical. It is much easier to question a number calmly when you already understand its main parts."
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
  // Only page-specific sections. Shared category text used to be appended here,
  // which made most guides repeat the same paragraphs.
  return searchFocusedSections[guide.slug] ?? [];
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

  return [];
}
