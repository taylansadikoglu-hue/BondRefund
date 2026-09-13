import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { getCalculator } from "@/lib/calculators";
import { getGuide, guides, guideFaqs, guideSections } from "@/lib/guides";
import { isIndexableGuide } from "@/lib/index-policy";
import { officialResourceForSlug } from "@/lib/official-resources";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const guideUpgrades: Record<
  string,
  {
    eyebrow: string;
    heroTitle?: string;
    heroBody: string;
    quickChecks: string[];
    actionTitle: string;
    actions: string[];
    extraLinks: { href: string; label: string }[];
    officialFacts?: { label: string; body: string }[];
  }
> = {
  "sydney-moving-costs": {
    eyebrow: "Sydney moving guide",
    heroTitle: "What does moving in Sydney really cost?",
    heroBody:
      "This page helps you think beyond the truck quote so you do not get surprised by packing, access, timing, storage or cleaning costs.",
    quickChecks: [
      "Removalist hours can blow out with stairs, lifts or tight parking",
      "Packing, boxes and cleaning often get missed in the first budget",
      "A cheaper rent can still cost more if moving is rushed or complex",
    ],
    actionTitle: "Before you book",
    actions: [
      "Get at least two written quotes and ask exactly what is included.",
      "Check whether stairs, long walks, lifts or parking restrictions add time.",
      "Compare the move cost with the rent savings over 6 to 12 months.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Estimate the move cost" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent" },
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the cleaning checklist" },
    ],
  },
  "fair-wear-and-tear-australia": {
    eyebrow: "Wear and tear guide",
    heroTitle: "Is it fair wear and tear, or renter damage?",
    heroBody:
      "Use the age, starting condition, length of the tenancy and normal use of the item to organise the facts before agreeing to a bond deduction.",
    quickChecks: [
      "Old and gradually worn is different from sudden or careless damage",
      "The entry report and dated photos show where the condition started",
      "A claimed replacement cost still needs evidence and context",
    ],
    actionTitle: "Check the claim calmly",
    actions: [
      "Compare the issue with the entry report and your final photos.",
      "Write down the item's age, original condition and how the change happened.",
      "Ask for an itemised cost, invoice or quote before accepting a deduction.",
    ],
    extraLinks: [
      { href: "/guides/normal-wear-and-tear-examples", label: "See practical examples" },
      { href: "/calculators/bond-refund-calculator", label: "Estimate the refund impact" },
      { href: "/guides/how-to-dispute-bond-deductions", label: "Prepare a deduction response" },
    ],
  },
  "end-of-lease-cleaning-checklist": {
    eyebrow: "Room-by-room cleaning guide",
    heroTitle: "A final cleaning checklist that protects your time and your proof",
    heroBody:
      "Work through the rental one area at a time, photograph the finished condition and keep any professional-cleaning invoice with the exit report.",
    quickChecks: [
      "Use the entry condition as the starting point, not a brand-new-home standard",
      "Photograph each room after the work is finished",
      "Check carpet, oven, windows and outdoor areas separately",
    ],
    actionTitle: "Finish the clean in the right order",
    actions: [
      "Remove belongings and rubbish before doing the detailed clean.",
      "Complete kitchens, bathrooms, floors, windows and outdoor areas from a written list.",
      "Take dated final photos and save invoices before returning the keys.",
    ],
    extraLinks: [
      { href: "/calculators/end-of-lease-cleaning-calculator", label: "Estimate the cleaning cost" },
      { href: "/guides/end-of-lease-photo-checklist", label: "Take the right final photos" },
      { href: "/guides/how-to-prepare-for-final-inspection", label: "Prepare for final inspection" },
    ],
  },
  "rental-bond-dispute-guide": {
    eyebrow: "Bond dispute guide",
    heroTitle: "Turn a bond disagreement into a clear evidence file",
    heroBody:
      "A useful response links each claimed deduction to the entry condition, final condition, dates, messages and actual cost. This guide helps you organise that before a deadline passes.",
    quickChecks: [
      "Record the amount and reason for every claimed deduction",
      "Keep the entry report, exit photos and messages together",
      "Check the official deadline for your state or territory",
    ],
    actionTitle: "Build the response",
    actions: [
      "Ask for an itemised claim and the evidence supporting each amount.",
      "Match each issue with the relevant condition report, photo, receipt or message.",
      "Use the official bond authority or tribunal process if agreement is not possible.",
    ],
    extraLinks: [
      { href: "/guides/rental-bond-refund-letter-template", label: "Use the letter template" },
      { href: "/guides/landlord-deduction-examples", label: "Check common deduction examples" },
      { href: "/calculators/bond-refund-calculator", label: "Calculate the amount in dispute" },
    ],
  },
  "break-lease-costs-australia": {
    eyebrow: "Break-lease cost guide",
    heroTitle: "Work out what leaving early could cost before you commit",
    heroBody:
      "Separate rent exposure, reletting or advertising charges, moving, cleaning and the new-home cash requirement. Then compare leaving now with staying longer.",
    quickChecks: [
      "The lease, state rules and date it ends can change the calculation",
      "Vacancy-related rent should use real dates rather than a vague total",
      "Moving and new-bond costs sit outside the agent's lease-exit figure",
    ],
    actionTitle: "Make the decision with a full number",
    actions: [
      "Read the break clause and ask for a written itemised estimate.",
      "Run a low, likely and high timing scenario in the calculator.",
      "Add moving, cleaning, rent overlap and the cash needed for the next rental.",
    ],
    extraLinks: [
      { href: "/calculators/break-lease-calculator", label: "Estimate break-lease costs" },
      { href: "/calculators/moving-cost-calculator", label: "Add the moving cost" },
      { href: "/guides/breaking-lease-without-penalty", label: "Check possible exceptions" },
    ],
  },
  "rent-affordability-guide": {
    eyebrow: "Rent affordability guide",
    heroTitle: "Can this rent fit your real weekly budget?",
    heroBody:
      "Start with take-home income, then allow for bills, transport, food, debt, children, savings and irregular costs. A percentage is a warning light, not a personal approval decision.",
    quickChecks: [
      "Use income that actually reaches the household bank account",
      "Add regular bills and irregular yearly costs before judging the spare amount",
      "Test the budget after a rent rise or loss of one income",
    ],
    actionTitle: "Run a safer affordability check",
    actions: [
      "Enter the household's normal take-home income and proposed rent.",
      "List essential costs and a realistic buffer for irregular expenses.",
      "Compare the result with a cheaper rent, a different suburb or a shared home.",
    ],
    extraLinks: [
      { href: "/calculators/rental-affordability-calculator", label: "Check rent affordability" },
      { href: "/calculators/rent-increase-calculator", label: "Measure a rent increase" },
      { href: "/guides/moving-costs-australia", label: "Include the cost of moving" },
    ],
  },
  "how-much-rent-can-i-afford-australia": {
    eyebrow: "Rent budget guide",
    heroTitle: "How much rent can you afford without guessing?",
    heroBody:
      "Use your normal take-home pay and real household costs to find a range that leaves room for food, bills, transport, debt, savings and surprises.",
    quickChecks: [
      "Gross salary is not the money available for rent",
      "A second income only helps if it is stable and genuinely shared",
      "Bond, advance rent and moving costs affect the first-month decision",
    ],
    actionTitle: "Find a workable rent range",
    actions: [
      "Start with average take-home income across several normal pay periods.",
      "Subtract essential spending and a basic emergency buffer.",
      "Test the remaining rent against a bad month, not only the best month.",
    ],
    extraLinks: [
      { href: "/calculators/rental-affordability-calculator", label: "Find your rent range" },
      { href: "/guides/30-percent-rent-rule-australia", label: "Understand the 30% rule" },
      { href: "/guides/rental-application-costs", label: "Plan upfront rental costs" },
    ],
  },
  "sydney-end-of-lease-cleaning-costs": {
    eyebrow: "Sydney cleaning-cost guide",
    heroTitle: "Plan a Sydney end-of-lease clean before comparing quotes",
    heroBody:
      "Build the job from bedrooms, bathrooms, kitchen, carpet, windows, balconies, furniture and condition so every cleaner is pricing the same work.",
    quickChecks: [
      "Apartment access, parking and lifts can affect time and price",
      "Carpet, windows and oven work may be separate extras",
      "Final photos and an invoice help if cleaning is later questioned",
    ],
    actionTitle: "Get a quote you can understand",
    actions: [
      "Send the same room and condition details to each cleaner.",
      "Ask for inclusions, exclusions, GST and return-clean terms in writing.",
      "Photograph the completed work before keys are returned.",
    ],
    extraLinks: [
      { href: "/calculators/end-of-lease-cleaning-calculator", label: "Estimate the cleaning range" },
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the room checklist" },
      { href: "/guides/how-to-get-your-bond-back-nsw", label: "Prepare the NSW bond claim" },
    ],
  },
  "brisbane-moving-costs": {
    eyebrow: "Brisbane moving guide",
    heroTitle: "Build a Brisbane moving budget that includes the hidden lines",
    heroBody:
      "Removalist time is only the start. Include travel, access, packing, cleaning, storage, utility changes, bond, advance rent and overlap before choosing the move date.",
    quickChecks: [
      "Long travel, stairs and difficult parking can extend a quoted job",
      "Bond and rent overlap can be larger than the moving invoice",
      "A written list of inclusions makes quotes easier to compare",
    ],
    actionTitle: "Plan the move in layers",
    actions: [
      "Estimate removalist hours, travel and access at both homes.",
      "Add packing, cleaning, storage, utilities and likely rent overlap.",
      "Keep a buffer for delays, extra work and last-minute supplies.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Estimate the full move" },
      { href: "/guides/moving-house-checklist", label: "Use the moving checklist" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent" },
    ],
  },
  "how-to-get-your-bond-back-nsw": {
    eyebrow: "NSW bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in NSW",
    heroBody:
      "This page is designed for renters who want a calm, practical checklist before the final inspection and before agreeing to any deductions.",
    quickChecks: [
      "Take final photos before handing back keys",
      "Keep entry condition reports, emails and receipts together",
      "Do not agree to deductions until you understand what they are for",
    ],
    actionTitle: "Best next steps",
    actions: [
      "Compare the claimed issue with your entry report and exit photos.",
      "Ask for an itemised list, invoice or quote for any money being kept.",
      "Use the calculator first so you understand the size of the deduction clearly.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/how-to-dispute-bond-deductions", label: "Read the dispute guide" },
      { href: "/guides/fair-wear-and-tear-australia", label: "See wear and tear examples" },
    ],
    officialFacts: [
      {
        label: "You can start the claim",
        body: "NSW Government guidance says a renter can claim through Rental Bonds Online after the tenancy ends. You do not need to wait for the landlord to release it.",
      },
      {
        label: "The response window matters",
        body: "The landlord or agent generally has up to 14 days to accept or dispute a renter's claim. Watch your email, SMS and claim status during that period.",
      },
      {
        label: "Ask for the evidence",
        body: "For a claim made without your agreement, NSW guidance says the landlord or agent must provide the exit condition report and supporting estimates, quotes, invoices or receipts within 7 days of making the claim.",
      },
      {
        label: "Agreed online claims can be quick",
        body: "When an online claim is accepted and the details are correct, NSW guidance says the refund should usually reach the nominated account within two business days.",
      },
    ],
  },
  "how-to-get-your-bond-back-vic": {
    eyebrow: "Victoria bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in Victoria",
    heroBody:
      "This page helps Victorian renters prepare before the final inspection, organise proof clearly, and avoid saying yes to deductions too early.",
    quickChecks: [
      "Keep entry reports, exit photos and cleaning receipts together",
      "Ask for a clear breakdown before agreeing to money being kept",
      "Use a simple estimate first so the deduction size is obvious",
    ],
    actionTitle: "What to do next",
    actions: [
      "Check the claimed issue against your entry condition report and exit photos.",
      "Ask for itemised evidence, invoices or quotes if the amount feels vague.",
      "Use the bond refund calculator so you can see the real impact on the final refund.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/how-to-dispute-bond-deductions", label: "Read the dispute guide" },
      { href: "/guides/melbourne-bond-refund-guide", label: "See the Melbourne renter guide" },
    ],
    officialFacts: [
      {
        label: "Claims go through the RTBA",
        body: "Victorian bond claims are made through the Residential Tenancies Bond Authority. A renter named on the bond can start a claim after the rental agreement ends.",
      },
      {
        label: "A renter-started claim has a notice period",
        body: "The RTBA gives the other parties 14 days to contest a renter-started claim through the stated dispute process. The bond can be repaid sooner if everyone agrees.",
      },
      {
        label: "The provider also has a deadline",
        body: "Consumer Affairs Victoria says rental providers must start their claim within 14 days of the agreement ending unless a renter starts the claim first.",
      },
      {
        label: "Agreed claims are usually faster",
        body: "Once everyone accepts an RTBA claim, Consumer Affairs Victoria says repayment is usually made within one business day.",
      },
    ],
  },
  "how-to-get-your-bond-back-qld": {
    eyebrow: "Queensland bond guide",
    heroTitle: "How to give yourself the best chance of getting your bond back in Queensland",
    heroBody:
      "This page helps Queensland renters keep the process simple: organise evidence, understand the claimed deduction, and do not rush into agreeing before the numbers make sense.",
    quickChecks: [
      "Take clear final photos before keys are returned",
      "Keep cleaning receipts, emails and condition reports in one folder",
      "Check any claim against a simple refund estimate first",
    ],
    actionTitle: "Best next moves",
    actions: [
      "Match each claimed cost to real evidence, not just a broad statement from the agent.",
      "Ask for invoices or quotes if cleaning, repairs or rent are being deducted.",
      "Use the calculator to see whether the missing bond amount is small, serious or worth disputing further.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate your bond back" },
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
      { href: "/guides/brisbane-bond-refund-guide", label: "See the Brisbane renter guide" },
    ],
    officialFacts: [
      {
        label: "Either side can request the refund",
        body: "Queensland RTA guidance says a party to the bond can lodge a refund request without every other party signing when agreement has not been reached.",
      },
      {
        label: "Undisputed money can be released",
        body: "When parties disagree, the RTA can refund the undisputed amount and send the other parties a Notice of claim for the disputed part.",
      },
      {
        label: "You have 14 days to respond",
        body: "A person receiving a Notice of claim has 14 days to dispute, agree or take no action. If no action is taken, the RTA pays according to the original request after that period.",
      },
      {
        label: "Keep your address current",
        body: "The RTA warns that notices may go to the last address it holds. Update your forwarding details so you do not miss a claim deadline.",
      },
    ],
  },
  "how-long-does-bond-refund-take": {
    eyebrow: "Bond timeline guide",
    heroTitle: "How long does a bond refund usually take?",
    heroBody:
      "This page gives renters a simple way to think about the bond refund timeline, what can slow it down, and what to do if the process starts dragging out.",
    quickChecks: [
      "Simple refunds can move quickly when both sides agree",
      "Disputes, missing evidence or slow replies usually add time",
      "A clear paper trail often speeds up the next step",
    ],
    actionTitle: "If it feels slow",
    actions: [
      "Check whether both sides have actually agreed on the deduction or refund amount.",
      "Put your photos, receipts, emails and condition reports into one folder before chasing an update.",
      "Ask for a written breakdown if money is being kept and the reason is still unclear.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Estimate what should come back" },
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
      { href: "/guides/rental-bond-refund-letter-template", label: "Use the refund letter template" },
    ],
  },
  "sydney-bond-refund-guide": {
    eyebrow: "Sydney renter guide",
    heroTitle: "Sydney bond refund guide for renters who want fewer surprises",
    heroBody:
      "If you are ending a lease in Sydney, this page helps you prepare for deductions, final inspection pressure and the real-world costs that often appear at the last minute.",
    quickChecks: [
      "Take photos before cleaners, agents or owners re-enter the property",
      "Keep receipts for cleaning, repairs and any agreed services",
      "Check the claim against Sydney quote ranges before saying yes",
    ],
    actionTitle: "Use this before handover",
    actions: [
      "Run the bond refund calculator so you know what each deduction does to the final amount.",
      "Compare any Sydney cleaning or repair claim with a real quote or invoice, not just a vague estimate.",
      "Keep emails, photos and the entry report together in case the claim changes later.",
    ],
    extraLinks: [
      { href: "/calculators/bond-refund-calculator", label: "Check your refund amount" },
      { href: "/guides/sydney-end-of-lease-cleaning-costs", label: "Compare Sydney cleaning costs" },
      { href: "/guides/how-to-get-your-bond-back-nsw", label: "Read the NSW bond checklist" },
    ],
  },
  "brisbane-break-lease-costs": {
    eyebrow: "Brisbane lease exit guide",
    heroTitle: "What could breaking a lease in Brisbane really cost?",
    heroBody:
      "This page helps Brisbane renters estimate the likely cost before accepting uncovered rent, advertising charges or reletting fees at face value.",
    quickChecks: [
      "Separate uncovered rent from one-off fees",
      "Check whether the property was actually re-let quickly",
      "Compare the break cost with moving and staying costs",
    ],
    actionTitle: "Before you agree",
    actions: [
      "Ask for dates, invoices and evidence of reletting activity if the figure feels high.",
      "Use the break lease calculator with your own assumptions first, not just the agent number.",
      "Compare the result with moving cost, bond and cleaning costs before deciding the best next step.",
    ],
    extraLinks: [
      { href: "/calculators/break-lease-calculator", label: "Estimate break lease costs" },
      { href: "/calculators/moving-cost-calculator", label: "Compare moving costs" },
      { href: "/guides/break-lease-costs-australia", label: "Read the national guide" },
    ],
  },
  "melbourne-rent-increase-guide": {
    eyebrow: "Melbourne rent guide",
    heroTitle: "Should you accept this rent increase in Melbourne?",
    heroBody:
      "This page helps Melbourne renters compare the new rent with income, moving costs and the real cost of staying versus leaving.",
    quickChecks: [
      "Check the yearly cost, not just the weekly jump",
      "Compare the increase with your real household budget",
      "Do not ignore moving costs when a cheaper place looks tempting",
    ],
    actionTitle: "Use it well",
    actions: [
      "Run the rent increase calculator so the weekly, monthly and annual jump is clear.",
      "Check the result against affordability and likely moving costs in Melbourne.",
      "If the increase feels too high, compare the cost of staying with the cost of moving over the next year.",
    ],
    extraLinks: [
      { href: "/calculators/rent-increase-calculator", label: "Compare the rent increase" },
      { href: "/calculators/rental-affordability-calculator", label: "Check affordability" },
      { href: "/guides/melbourne-moving-costs", label: "See Melbourne moving costs" },
    ],
  },
  "melbourne-moving-costs": {
    eyebrow: "Melbourne moving guide",
    heroTitle: "Plan the full cost of moving in Melbourne",
    heroBody:
      "A removalist quote is only one line in the moving budget. Use this guide to include access, packing, cleaning, storage, rent overlap and the cost of getting the new home ready.",
    quickChecks: [
      "Apartment lifts, loading access and parking can change removalist time",
      "Bond, rent in advance and overlap can be larger than the truck cost",
      "Written quote inclusions matter more than one cheap hourly rate",
    ],
    actionTitle: "Build a safer moving budget",
    actions: [
      "List the fixed costs first: bond, advance rent, cleaning and booked services.",
      "Ask movers about travel time, minimum hours, stairs, lifts, parking and GST.",
      "Add a buffer for delays, extra boxes and a longer handover than planned.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Estimate the full move" },
      { href: "/guides/melbourne-end-of-lease-cleaning-costs", label: "Plan the final clean" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent" },
    ],
  },
  "moving-house-checklist": {
    eyebrow: "Moving checklist",
    heroTitle: "A moving-house checklist built around money, proof and timing",
    heroBody:
      "Use this checklist from the moment you accept a new rental until the old keys are returned. It keeps the budget, bookings, condition evidence and address changes in one order.",
    quickChecks: [
      "Book the move only after checking access at both properties",
      "Photograph the old home before cleaners or agents re-enter",
      "Keep enough cash for bond, rent overlap and last-minute costs",
    ],
    actionTitle: "Work through it in order",
    actions: [
      "Confirm dates, access, keys, utilities and the final-inspection plan.",
      "Book removalists and cleaning with written prices and inclusions.",
      "Save condition reports, final photos, invoices and key-return proof together.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Build the moving budget" },
      { href: "/guides/end-of-lease-photo-checklist", label: "Take the right photos" },
      { href: "/guides/how-to-prepare-for-final-inspection", label: "Prepare for inspection" },
    ],
  },
  "melbourne-end-of-lease-cleaning-costs": {
    eyebrow: "Melbourne cleaning guide",
    heroTitle: "Compare Melbourne end-of-lease cleaning quotes properly",
    heroBody:
      "Use the property size and actual condition to build a planning range, then check whether carpet, oven, windows, balconies, furnished items and return cleans are really included.",
    quickChecks: [
      "The cheapest quote may exclude carpet, windows or the oven",
      "Apartment access and parking can affect time and call-out costs",
      "A bond claim should still be checked against condition evidence",
    ],
    actionTitle: "Before you book or agree",
    actions: [
      "Send every cleaner the same property details and requested inclusions.",
      "Ask whether GST, equipment, carpet and a return clean are included.",
      "Keep the invoice and final photos in case cleaning is later claimed from bond.",
    ],
    extraLinks: [
      { href: "/calculators/end-of-lease-cleaning-calculator", label: "Estimate the cleaning range" },
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the room checklist" },
      { href: "/calculators/bond-refund-calculator", label: "Check any bond claim" },
    ],
  },
  "brisbane-end-of-lease-cleaning-costs": {
    eyebrow: "Brisbane cleaning guide",
    heroTitle: "Plan a Brisbane bond clean without paying for vague extras",
    heroBody:
      "Build a simple range from bedrooms, bathrooms, carpet, furniture and condition, then compare every quote against the same checklist before choosing a cleaner.",
    quickChecks: [
      "Confirm whether carpet and pest treatment are separate items",
      "Ask what a return-clean promise actually covers",
      "Keep photos and receipts before discussing a bond deduction",
    ],
    actionTitle: "Make quotes comparable",
    actions: [
      "List rooms, carpet, appliances, balconies and furnished items in writing.",
      "Ask each cleaner for inclusions, exclusions, GST and possible extra fees.",
      "Compare any later agent claim with the exit condition and the work invoiced.",
    ],
    extraLinks: [
      { href: "/calculators/end-of-lease-cleaning-calculator", label: "Estimate the cleaning range" },
      { href: "/guides/can-landlord-charge-for-carpet-cleaning", label: "Check carpet claims" },
      { href: "/guides/how-to-get-your-bond-back-qld", label: "Read the Queensland bond steps" },
    ],
  },
  "melbourne-break-lease-costs": {
    eyebrow: "Melbourne lease exit guide",
    heroTitle: "Estimate Melbourne break-lease costs before agreeing to a total",
    heroBody:
      "Separate vacancy-related rent from advertising, reletting and moving costs so you can ask what each amount covers and compare leaving now with staying longer.",
    quickChecks: [
      "Vacancy time and one-off charges should be shown separately",
      "Dates, invoices and reletting activity make a claim easier to check",
      "Moving and cleaning costs still sit outside the lease-exit estimate",
    ],
    actionTitle: "Check the claim step by step",
    actions: [
      "Enter your own rent and timing assumptions before using an agent total.",
      "Ask for an itemised explanation and supporting dates or documents.",
      "Compare leaving now with rent, moving and cleaning costs under a later exit.",
    ],
    extraLinks: [
      { href: "/calculators/break-lease-calculator", label: "Estimate the exit cost" },
      { href: "/guides/breaking-lease-without-penalty", label: "Check possible exceptions" },
      { href: "/calculators/moving-cost-calculator", label: "Add the moving cost" },
    ],
  },
  "moving-costs-australia": {
    eyebrow: "Australia moving-cost guide",
    heroTitle: "What should an Australian moving budget actually include?",
    heroBody:
      "Use one budget for removalists, access, packing, cleaning, storage, utilities, bond, advance rent and rent overlap. That gives you a fairer comparison between staying and moving.",
    quickChecks: [
      "Hourly quotes can exclude travel, minimum time or access charges",
      "Move-in cash needs can be much larger than the removalist invoice",
      "A buffer matters when timing, lifts, parking or keys go wrong",
    ],
    actionTitle: "Build the number in layers",
    actions: [
      "Start with removalist time, travel and known extras.",
      "Add bond, advance rent, cleaning, storage, utilities and overlap.",
      "Compare written quotes using the same list of inclusions and assumptions.",
    ],
    extraLinks: [
      { href: "/calculators/moving-cost-calculator", label: "Build your moving estimate" },
      { href: "/guides/moving-house-checklist", label: "Use the moving checklist" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rental budget" },
    ],
  },
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle ?? guide.title,
    description: guide.metaDescription ?? guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    robots: isIndexableGuide(guide.slug) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: guide.metaTitle ?? guide.title,
      description: guide.metaDescription ?? guide.description,
      url: `${site.url}/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const upgrade = guideUpgrades[guide.slug];
  const officialResource = officialResourceForSlug(guide.slug);
  const defaultChecks = [
    "Read the lease or notice before replying.",
    "Keep photos, emails, receipts and condition reports together.",
    "Use a calculator to understand the rough money impact.",
  ];
  const defaultActions = [
    "Turn the issue into a clear dollar estimate.",
    "Ask for written evidence if a cost or claim feels vague.",
    "Check official local guidance if the amount is large or disputed.",
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    datePublished: "2026-07-08",
    dateModified: isIndexableGuide(guide.slug) ? "2026-09-13" : "2026-07-08",
  };
  const faqs = guideFaqs(guide);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${site.url}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${site.url}/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <article>
        <nav className="text-sm font-semibold text-slate-500">
          <Link className="focus-ring hover:text-[var(--brand)]" href="/">
            Home
          </Link>
          <span> / </span>
          <Link className="focus-ring hover:text-[var(--brand)]" href="/guides">
            Guides
          </Link>
        </nav>
        <header className="mt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">
            {upgrade?.eyebrow ?? guide.category}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            {upgrade?.heroTitle ?? guide.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {upgrade?.heroBody ?? guide.description}
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-500">Published by {site.name} · General information · Page reviewed 13 September 2026</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(upgrade?.quickChecks ?? defaultChecks).map((point) => (
              <div key={point} className="rounded-xl border border-[var(--line)] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {point}
              </div>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-800">
              {upgrade?.actionTitle ?? "What to do next"}
            </p>
            <div className="mt-4 grid gap-3">
              {(upgrade?.actions ?? defaultActions).map((step, index) => (
                <div key={step} className="rounded-xl bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700">
                  <strong className="mr-2 text-[var(--brand-dark)]">0{index + 1}</strong>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">Useful next clicks</p>
            <div className="mt-4 grid gap-3">
              {(upgrade?.extraLinks ?? guide.relatedCalculators.map((relatedSlug) => {
                const calculator = getCalculator(relatedSlug);
                return calculator ? { href: `/calculators/${calculator.slug}`, label: calculator.title } : null;
              }).filter((link): link is { href: string; label: string } => Boolean(link))).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[var(--brand)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">What to prepare</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              "Lease or notice",
              "Photos and condition reports",
              "Receipts, quotes or invoices",
              "Emails and key dates",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        {upgrade?.officialFacts ? (
          <section className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-sky-800">Official process at a glance</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Deadlines and steps worth knowing</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              These points summarise the official {officialResource.region} guidance linked on this page. They were checked on 8 September 2026. Follow the official page if your claim is disputed or a deadline is close.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {upgrade.officialFacts.map((fact) => (
                <div key={fact.label} className="rounded-xl border border-sky-200 bg-white p-4">
                  <h3 className="font-bold text-slate-950">{fact.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{fact.body}</p>
                </div>
              ))}
            </div>
            <a
              className="focus-ring mt-5 inline-flex font-bold text-[var(--brand-dark)] underline"
              href={officialResource.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the full official {officialResource.region} guidance
            </a>
          </section>
        ) : null}

        <section className="content-prose mt-8 rounded-md border border-[var(--line)] bg-white p-6">
          <h2>Quick answer</h2>
          <p>{guide.description}</p>
          {guideSections(guide).map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <h2>Renter action planner</h2>
          <div className="not-prose grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Estimate</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Use the related calculator to turn the issue into a rough dollar range before replying.</p>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Collect proof</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Keep photos, condition reports, receipts, quotes, invoices, emails and key dates together.</p>
            </div>
            <div className="rounded-md border border-[var(--line)] bg-[var(--paper)] p-4">
              <h3 className="font-bold text-slate-950">Compare</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Compare any claimed amount with the evidence, the quote detail and the actual property condition.</p>
            </div>
          </div>
          <h2>Related calculators</h2>
          <ul>
            {guide.relatedCalculators.map((slug) => {
              const calculator = getCalculator(slug);
              if (!calculator) return null;
              return (
                <li key={slug}>
                  <Link className="font-bold text-[var(--brand-dark)] hover:underline" href={`/calculators/${calculator.slug}`}>
                    {calculator.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <h2>Frequently asked questions</h2>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
          <h2>Disclaimer</h2>
          <p>{site.disclaimer}</p>
        </section>
        <div className="mt-8">
          <AdSlot label="Sponsored content" format="fluid" />
        </div>
      </article>
      <aside className="grid content-start gap-5">
        <AdSlot />
        <EmailCapture />
        <section className="rounded-md border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Official source</p>
          <h2 className="mt-2 text-xl font-extrabold">{officialResource.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{officialResource.body}</p>
          <a className="focus-ring mt-4 inline-flex font-bold text-[var(--brand-dark)] underline" href={officialResource.href} rel="noopener noreferrer" target="_blank">
            Check {officialResource.region} guidance
          </a>
        </section>
        <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-extrabold">General information only</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Rental rules can vary by location and situation. Use this guide to prepare, then check official tenancy information if money is being disputed.
          </p>
          <Link className="mt-4 inline-flex font-bold text-[var(--brand-dark)] hover:underline" href="/disclaimer">
            Read the disclaimer
          </Link>
        </section>
      </aside>
    </main>
  );
}
