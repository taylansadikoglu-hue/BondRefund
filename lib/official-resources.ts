export const officialResources = [
  {
    region: "Australia",
    title: "Tenancy rules by state and territory",
    body: "Rental rules are set locally. Start with the authority for the state or territory where the property is located.",
    href: "https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/where-to-go-for-consumer-help"
  },
  {
    region: "New South Wales",
    title: "Getting your bond back",
    body: "NSW Government guidance on Rental Bonds Online, final checks, claims and refund timing.",
    href: "https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/getting-your-bond-back"
  },
  {
    region: "Victoria",
    title: "Bond claims and refunds",
    body: "Consumer Affairs Victoria guidance on RTBA claims, deductions, disputes and repayment.",
    href: "https://www.consumer.vic.gov.au/housing/renting/rent-bond-bills-and-condition-reports/bond/bond-claims-and-refunds"
  },
  {
    region: "Queensland",
    title: "Bond refunds",
    body: "Residential Tenancies Authority guidance on agreed and disputed bond refunds and supporting evidence.",
    href: "https://www.rta.qld.gov.au/refund"
  },
  {
    region: "Western Australia",
    title: "Releasing a rental bond",
    body: "WA Consumer Protection guidance on bond release applications, claims, evidence and disputes.",
    href: "https://www.consumerprotection.wa.gov.au/releasing-bond"
  },
  {
    region: "South Australia",
    title: "Residential bonds",
    body: "SA Government guidance on lodging, managing and refunding a residential bond.",
    href: "https://www.sa.gov.au/topics/housing/renting-and-letting/residential-bonds"
  },
  {
    region: "Australian Capital Territory",
    title: "Rental bonds",
    body: "ACT Revenue Office guidance on rental bonds, refund requests, forms and the Rental Bonds Portal.",
    href: "https://www.revenue.act.gov.au/rental-bonds"
  },
  {
    region: "Tasmania",
    title: "Claim a rental bond",
    body: "Service Tasmania guidance on MyBond claims, responses, disputes and payment timing.",
    href: "https://www.service.tas.gov.au/services/housing-and-property/renting-a-home/claim-a-rental-bond/"
  },
  {
    region: "Northern Territory",
    title: "When you are owed bond money",
    body: "NT Government guidance on bond returns, possible claims and unclaimed bond money.",
    href: "https://nt.gov.au/property/private-renters/moving-out/when-you-are-owed-bond-money"
  }
] as const;

export function officialResourceForSlug(slug: string) {
  const tokens = slug.split("-");
  if (tokens.includes("nsw") || tokens.includes("sydney") || tokens.includes("newcastle") || tokens.includes("wollongong")) return officialResources[1];
  if (tokens.includes("vic") || tokens.includes("melbourne") || tokens.includes("geelong")) return officialResources[2];
  if (tokens.includes("qld") || tokens.includes("brisbane") || slug.includes("gold-coast") || tokens.includes("townsville")) return officialResources[3];
  if (tokens.includes("wa") || tokens.includes("perth")) return officialResources[4];
  if (tokens.includes("sa") || tokens.includes("adelaide")) return officialResources[5];
  if (tokens.includes("act") || tokens.includes("canberra")) return officialResources[6];
  if (tokens.includes("tas") || tokens.includes("tasmania") || tokens.includes("hobart")) return officialResources[7];
  if (tokens.includes("nt") || tokens.includes("darwin")) return officialResources[8];
  return officialResources[0];
}
