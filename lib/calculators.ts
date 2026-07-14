export type CalculatorKind =
  | "bond-refund"
  | "break-lease"
  | "rent-increase"
  | "moving-cost"
  | "rental-affordability"
  | "end-of-lease-cleaning"
  | "bond-loan";

export type Calculator = {
  slug: string;
  kind: CalculatorKind;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  example: string;
  guideText: string;
  relatedGuides: string[];
  faqs: { question: string; answer: string }[];
};

export const calculators: Calculator[] = [
  {
    slug: "bond-refund-calculator",
    kind: "bond-refund",
    title: "Bond Refund Calculator",
    shortTitle: "Bond refund",
    description: "Estimate how much of your rental bond you may get back after cleaning, damage, rent or other claimed deductions.",
    metaTitle: "Bond Refund Calculator Australia | Estimate Your Bond Back",
    metaDescription: "Use a free Australian bond refund calculator to estimate how much bond you may get back after claimed deductions.",
    example: "If you paid a $2,400 bond and the agent claims $350 in deductions, the estimated refund is $2,050.",
    guideText:
      "Your refund usually depends on the bond paid, the deductions being claimed, and the evidence on both sides. Use this as a planning estimate first, then compare the numbers with your condition report, photos, receipts and written messages before agreeing to any money being kept.",
    relatedGuides: ["how-long-does-bond-refund-take", "how-to-dispute-bond-deductions", "fair-wear-and-tear-australia"],
    faqs: [
      {
        question: "Can this calculator tell me what I am legally owed?",
        answer: "No. It is a general estimate based on the numbers entered and does not decide legal entitlement.",
      },
      {
        question: "What counts as a deduction?",
        answer: "Common claimed deductions include cleaning, unpaid rent, damage repairs and replacement costs, but each claim should be supported by evidence.",
      },
      {
        question: "What should I do before accepting deductions?",
        answer: "Ask for an itemised list, invoices or quotes, and compare the claim with your entry and exit condition evidence.",
      },
    ],
  },
  {
    slug: "break-lease-calculator",
    kind: "break-lease",
    title: "Break Lease Calculator",
    shortTitle: "Break lease",
    description: "Estimate possible break lease costs using uncovered rent, advertising, reletting fees and other costs.",
    metaTitle: "Break Lease Calculator Australia | Estimate Lease Exit Costs",
    metaDescription: "Use a free Australian break lease calculator to estimate uncovered rent, advertising, reletting fees and other likely exit costs.",
    example: "If rent is $600 per week, two weeks are uncovered, and fees total $900, the estimated cost is $2,100.",
    guideText:
      "Break lease costs can vary by state, lease type and how quickly a replacement tenant is found. Use this estimate as a planning tool and check your local tenancy authority.",
    relatedGuides: ["break-lease-costs-australia", "breaking-lease-without-penalty", "rental-bond-dispute-guide"],
    faqs: [
      {
        question: "Do I always pay rent for every remaining week?",
        answer: "Not necessarily. In many cases costs depend on reletting efforts, vacancy time and local rules.",
      },
      {
        question: "Can advertising and letting fees be included?",
        answer: "They may be claimed in some circumstances, so this calculator lets you include them as separate inputs.",
      },
      {
        question: "Is this a legal assessment?",
        answer: "No. It is a transparent estimate for planning and comparison only.",
      },
    ],
  },
  {
    slug: "rent-increase-calculator",
    kind: "rent-increase",
    title: "Rent Increase Calculator",
    shortTitle: "Rent increase",
    description: "Compare current and new weekly rent to see weekly, monthly and annual increases.",
    metaTitle: "Rent Increase Calculator Australia",
    metaDescription: "Calculate weekly, monthly, annual and percentage rent increases for Australian renters.",
    example: "A rise from $550 to $610 per week is $60 weekly, about $260.71 monthly, and $3,120 annually.",
    guideText:
      "Rent increases can affect your budget quickly. Compare the increase against your income, savings and moving costs before deciding whether to stay, negotiate or move.",
    relatedGuides: ["rent-increase-rules-australia", "rent-affordability-guide", "moving-costs-australia"],
    faqs: [
      {
        question: "How is monthly rent increase estimated?",
        answer: "The weekly increase is multiplied by 52 weeks and divided by 12 months.",
      },
      {
        question: "Does this check whether a rent increase is valid?",
        answer: "No. Notice periods and rules vary, so check your state or territory tenancy authority.",
      },
      {
        question: "What percentage is considered high?",
        answer: "There is no single threshold for everyone. Compare it with local rents and your income.",
      },
    ],
  },
  {
    slug: "moving-cost-calculator",
    kind: "moving-cost",
    title: "Moving Cost Calculator",
    shortTitle: "Moving cost",
    description: "Estimate moving costs based on bedrooms, distance, removalist rates, hours and extras.",
    metaTitle: "Moving Cost Calculator Australia",
    metaDescription: "Estimate moving costs in Australia, including Brisbane moving costs, removalist hours, bedrooms, distance, packing and extras.",
    example: "A two-bedroom local move at $160 per hour for five hours plus $250 extras estimates around $1,050.",
    guideText:
      "Moving costs often change with access, stairs, parking, packing, storage and travel time. Get written quotes and check what is included.",
    relatedGuides: ["moving-house-checklist", "moving-costs-australia", "end-of-lease-cleaning-checklist"],
    faqs: [
      {
        question: "Why does the result show a range?",
        answer: "Moves are variable, so the range allows for small changes in time, access and travel complexity.",
      },
      {
        question: "Should I include packing materials?",
        answer: "Yes. Add packing, storage and other extras so the estimate is closer to your real budget.",
      },
      {
        question: "Are long-distance moves calculated differently?",
        answer: "This simple tool adds a distance allowance, but interstate moves usually need fixed quotes.",
      },
    ],
  },
  {
    slug: "rental-affordability-calculator",
    kind: "rental-affordability",
    title: "Rental Affordability Calculator",
    shortTitle: "Affordability",
    description: "See whether a rent payment looks manageable by comparing it with annual household income in seconds.",
    metaTitle: "How Much Rent Can I Afford? | Australia Rent Calculator",
    metaDescription: "Calculate how much rent you can afford in Australia by comparing weekly rent with annual household income and a rent-to-income benchmark.",
    example: "A $550 weekly rent on an $85,000 annual income is about 33.6% of gross income.",
    guideText:
      "A common rule of thumb is that rent above 30% of gross income can feel stretched, but the real answer depends on debt, household size, commute costs and how much moving would cost instead. Use the result as a fast pressure test before applying or renewing.",
    relatedGuides: ["rent-affordability-guide", "first-time-renter-guide", "rental-application-costs"],
    faqs: [
      {
        question: "Does this use gross or take-home income?",
        answer: "It uses annual gross income. Your take-home budget may be tighter after tax and deductions.",
      },
      {
        question: "Is 30% always unaffordable?",
        answer: "No. It is a broad benchmark, not a rule for every renter.",
      },
      {
        question: "Can households use combined income?",
        answer: "Yes. Enter the combined annual income for the people contributing to rent.",
      },
    ],
  },
  {
    slug: "end-of-lease-cleaning-calculator",
    kind: "end-of-lease-cleaning",
    title: "End of Lease Cleaning Cost Calculator",
    shortTitle: "Cleaning cost",
    description: "Estimate end-of-lease cleaning costs by bedrooms, bathrooms, carpet and furnishing.",
    metaTitle: "End of Lease Cleaning Cost Calculator Australia",
    metaDescription: "Estimate end-of-lease cleaning cost and compare cleaning quotes by bedrooms, bathrooms, carpet, furnishing and property condition.",
    example: "A three-bedroom, two-bathroom home with carpet cleaning may estimate around $520 to $720.",
    guideText:
      "Cleaning costs depend on property condition, inclusions, carpet, appliances and location. Compare inclusions carefully before booking.",
    relatedGuides: ["end-of-lease-cleaning-checklist", "bond-cleaning-cost-guide", "can-landlord-charge-for-carpet-cleaning"],
    faqs: [
      {
        question: "Is professional cleaning always required?",
        answer: "Not always. Requirements depend on your lease, property condition and local rules.",
      },
      {
        question: "Why include furnished property?",
        answer: "Furniture can add time for cleaning, moving items and checking inventory condition.",
      },
      {
        question: "Can carpet cleaning be deducted from bond?",
        answer: "It depends on evidence, lease terms and local tenancy rules. This calculator only estimates possible cost.",
      },
    ],
  },
  {
    slug: "bond-loan-calculator",
    kind: "bond-loan",
    title: "Bond Loan Calculator",
    shortTitle: "Bond loan",
    description: "Estimate total repayment and weekly repayment for a rental bond loan.",
    metaTitle: "Bond Loan Calculator Australia | Weekly Repayment Estimate",
    metaDescription: "Estimate rental bond loan repayments, total fees and weekly repayment before you commit to a bond loan.",
    example: "A $2,000 bond loan repaid over 20 weeks with $120 fees is about $106 per week.",
    guideText:
      "Bond loans may include fees, interest or eligibility rules. Compare the total repayment with other options before applying.",
    relatedGuides: ["bond-loans-explained", "first-time-renter-guide", "rental-application-costs"],
    faqs: [
      {
        question: "Does this compare loan products?",
        answer: "No. It only estimates repayment from the loan amount, period and fees you enter.",
      },
      {
        question: "Should I include all fees and interest?",
        answer: "Yes. Add any known establishment fees, account fees and interest so the total is clearer.",
      },
      {
        question: "Is a bond loan financial advice?",
        answer: "No. Consider your budget and get independent support if you are unsure.",
      },
    ],
  },
];

export function getCalculator(slug: string) {
  return calculators.find((calculator) => calculator.slug === slug);
}
