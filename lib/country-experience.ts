export type CountryCode = "AU" | "US" | "UK";

export type CountryExperience = {
  code: CountryCode;
  label: string;
  audienceLabel: string;
  locale: string;
  currency: string;
  depositWord: string;
  landlordWord: string;
  authorityLabel: string;
  areaLabel: string;
  areas: string[];
  badge: string;
  heroTitle: string;
  heroBody: string;
  commonProblems: { title: string; body: string }[];
  lawChecks: string[];
  quickFacts: string[];
  guidesHeading: string;
  guidesIntro: string;
};

export const countryExperiences: Record<CountryCode, CountryExperience> = {
  AU: {
    code: "AU",
    label: "Australia",
    audienceLabel: "Australian renters",
    locale: "en-AU",
    currency: "AUD",
    depositWord: "bond",
    landlordWord: "agent or landlord",
    authorityLabel: "state or territory tenancy authority",
    areaLabel: "State or territory",
    areas: ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"],
    badge: "Australia",
    heroTitle: "Protect your bond and plan renter costs with more confidence.",
    heroBody:
      "Check your bond, moving costs, rent increase and lease costs in one place.",
    commonProblems: [
      { title: "Bond deductions", body: "Check cleaning or damage claims before you agree." },
      { title: "Break lease costs", body: "See what leaving early could really cost." },
      { title: "Rent increase", body: "Compare the new rent with your budget." },
      { title: "Final inspection", body: "Get your photos and papers ready before you return the keys." },
    ],
    lawChecks: [
      "State or territory tenancy authority",
      "Entry and exit condition reports",
      "Cleaning or repair quotes",
      "Notice periods and dispute steps",
    ],
    quickFacts: ["No signup", "Fast estimates", "Built for Australia"],
    guidesHeading: "Guides by city",
    guidesIntro: "Start with your city. Then look at the simple guides below.",
  },
  US: {
    code: "US",
    label: "United States",
    audienceLabel: "US renters",
    locale: "en-US",
    currency: "USD",
    depositWord: "security deposit",
    landlordWord: "landlord or property manager",
    authorityLabel: "state housing or tenant agency",
    areaLabel: "State",
    areas: ["California", "New York", "Texas", "Florida", "Illinois", "Washington", "Other"],
    badge: "United States",
    heroTitle: "Protect your deposit and plan moving costs without guessing.",
    heroBody:
      "Check your deposit, moving costs, rent changes and move-out costs in one place.",
    commonProblems: [
      { title: "Deposit withheld", body: "Check if the deduction looks fair." },
      { title: "Move-out costs", body: "Estimate truck, cleaning and setup costs." },
      { title: "Leaving early", body: "See the cost of ending the lease now." },
      { title: "Rent increase", body: "Compare the new rent with your income." },
    ],
    lawChecks: [
      "State housing or tenant agency",
      "Deposit return time in your state",
      "Itemised charges and photos",
      "Lease notice rules",
    ],
    quickFacts: ["Simple language", "US deposit terms", "Prices in USD"],
    guidesHeading: "Start with the most common renter problems",
    guidesIntro: "Use the calculators first. More local law pages can come next.",
  },
  UK: {
    code: "UK",
    label: "United Kingdom",
    audienceLabel: "UK renters",
    locale: "en-GB",
    currency: "GBP",
    depositWord: "deposit",
    landlordWord: "landlord or letting agent",
    authorityLabel: "deposit protection scheme or housing advice service",
    areaLabel: "Nation",
    areas: ["England", "Scotland", "Wales", "Northern Ireland"],
    badge: "United Kingdom",
    heroTitle: "Protect your deposit and plan renter costs with less stress.",
    heroBody:
      "Check your deposit, moving costs and rent changes in one place.",
    commonProblems: [
      { title: "Deposit dispute", body: "Check if the deduction looks fair." },
      { title: "Checkout costs", body: "Estimate cleaning and moving costs." },
      { title: "Rent rise", body: "Compare the new rent with your budget." },
      { title: "Moving day", body: "Plan van hire, removals and setup costs." },
    ],
    lawChecks: [
      "Deposit protection scheme",
      "Tenancy agreement and notice rules",
      "Check-in and check-out reports",
      "Itemised deductions and photos",
    ],
    quickFacts: ["Simple language", "UK deposit terms", "Prices in GBP"],
    guidesHeading: "Start with the renter problem you need to solve",
    guidesIntro: "Use the calculators first. More UK-specific help can come next.",
  },
};

export function detectCountryFromBrowser(input: {
  language?: string | null;
  languages?: readonly string[] | null;
  timeZone?: string | null;
}): CountryCode {
  const languagePool = [input.language, ...(input.languages ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const timeZone = (input.timeZone ?? "").toLowerCase();

  if (timeZone.includes("australia") || languagePool.includes("en-au")) return "AU";
  if (
    timeZone.includes("london") ||
    languagePool.includes("en-gb") ||
    languagePool.includes("cy-gb")
  ) return "UK";
  if (
    timeZone.includes("new_york") ||
    timeZone.includes("chicago") ||
    timeZone.includes("denver") ||
    timeZone.includes("los_angeles") ||
    languagePool.includes("en-us")
  ) return "US";

  return "AU";
}

export function formatMoneyForCountry(value: number, country: CountryCode) {
  const safe = Number.isFinite(value) ? value : 0;
  const { locale, currency } = countryExperiences[country];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(safe);
}
