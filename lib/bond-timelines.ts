// Bond refund timing by state and territory.
// Every figure here was read from the official page linked in `source` on 26 November 2026.
// Where the official page gives no number, the entry says so rather than guessing.

export type BondTimeline = {
  region: string;
  heldBy: string;
  howToClaim: string;
  otherPartyResponse: string;
  paymentTiming: string;
  ifDisputed: string;
  source: string;
};

export const bondTimelinesCheckedOn = "26 November 2026";

export const bondTimelines: BondTimeline[] = [
  {
    region: "New South Wales",
    heldBy: "NSW Fair Trading",
    howToClaim: "Rental Bonds Online, or the paper Claim for Bond Refund form.",
    otherPartyResponse: "The landlord or agent has up to 14 days to accept or dispute the claim.",
    paymentTiming:
      "Online: about two business days after the claim is accepted. Paper claim that is not disputed: paid after 14 days.",
    ifDisputed: "NSW Civil and Administrative Tribunal (NCAT).",
    source: "https://www.nsw.gov.au/housing-and-construction/renting-a-place-to-live/getting-your-bond-back",
  },
  {
    region: "Victoria",
    heldBy: "Residential Tenancies Bond Authority (RTBA)",
    howToClaim: "RTBA website, after verifying your identity with Service Victoria.",
    otherPartyResponse:
      "Other parties have 14 days to contest a claim by applying to VCAT or Rental Dispute Resolution Victoria.",
    paymentTiming:
      "Usually within one business day once everyone accepts. If no one contests, paid at the end of the 14 days.",
    ifDisputed: "Rental Dispute Resolution Victoria first, then VCAT.",
    source:
      "https://www.consumer.vic.gov.au/housing/renting/rent-bond-bills-and-condition-reports/bond/bond-claims-and-refunds",
  },
  {
    region: "Queensland",
    heldBy: "Residential Tenancies Authority (RTA)",
    howToClaim: "RTA Web Services online form, or the paper Form 4 (posted, not emailed).",
    otherPartyResponse: "The other party has 14 days to lodge a dispute (Form 16).",
    paymentTiming:
      "Agreed refunds are processed the day they are received. Allow up to 3 business days to reach your bank.",
    ifDisputed: "RTA dispute resolution. The RTA also explains how bond disputes go to QCAT.",
    source: "https://www.rta.qld.gov.au/refund",
  },
  {
    region: "Western Australia",
    heldBy: "Consumer Protection WA",
    howToClaim: "Tenants use the bond release application form. Agents use Bond Online.",
    otherPartyResponse:
      "Anyone who has not signed is notified and must respond by the date on the notice. The official page does not give a set number of days.",
    paymentTiming: "Paid once everyone agrees. The official page does not give a processing time.",
    ifDisputed: "Referred for a Commissioner determination. The bond is held until that is decided.",
    source: "https://www.consumerprotection.wa.gov.au/releasing-bond",
  },
  {
    region: "South Australia",
    heldBy: "Consumer and Business Services (CBS Bonds)",
    howToClaim: "Residential Bonds Online. Paper forms are available but slower.",
    otherPartyResponse:
      "All tenants who paid the bond and the landlord or agent must agree on the amount before money is released.",
    paymentTiming:
      "The official page does not give a processing time. Refunds go by bank transfer, or by cheque if no bank details are held.",
    ifDisputed: "CBS bond dispute process.",
    source: "https://www.sa.gov.au/topics/housing/renting-and-letting/residential-bonds/bond-refunds",
  },
  {
    region: "Australian Capital Territory",
    heldBy: "ACT Revenue Office (ACT Rental Bonds)",
    howToClaim: "Bond Refund form emailed to ACT Rental Bonds, or through the Rental Bonds Portal.",
    otherPartyResponse: "The responding party has 14 days to accept or dispute the refund request.",
    paymentTiming: "Any undisputed part of the bond is refunded at that stage.",
    ifDisputed: "ACT Rental Bonds refers the dispute to the ACT Civil and Administrative Tribunal (ACAT).",
    source: "https://www.revenue.act.gov.au/rental-bonds/how-to-request-a-bond-refund/lessors-and-agencies",
  },
  {
    region: "Tasmania",
    heldBy: "Consumer, Building and Occupational Services (MyBond)",
    howToClaim: "MyBond online. The owner or agent has three working days after keys are returned to start a claim.",
    otherPartyResponse:
      "You approve or dispute the claim in MyBond. Money is not released to the owner unless you approve.",
    paymentTiming: "3 to 5 working days to reach your bank once the claim is approved or a dispute is finalised.",
    ifDisputed: "The claim moves into the MyBond dispute process.",
    source: "https://www.service.tas.gov.au/services/housing-and-property/renting-a-home/claim-a-rental-bond/",
  },
  {
    region: "Northern Territory",
    heldBy: "Your landlord or agent, in a trust account. There is no central bond authority.",
    howToClaim: "Ask the landlord or agent when you move out. Leave your new address or bank details.",
    otherPartyResponse: "The landlord has seven business days after you move out to return the security deposit.",
    paymentTiming: "Within seven business days, less any claims for rent, cleaning, repairs or lease break.",
    ifDisputed: "NT Consumer Affairs for help, then the NT Civil and Administrative Tribunal (NTCAT).",
    source: "https://nt.gov.au/property/renters/renters-your-rights-and-responsibilities/common-tenancy-disputes",
  },
];
