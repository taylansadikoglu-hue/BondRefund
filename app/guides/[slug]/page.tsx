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
    example?: { title: string; intro: string; lines: string[] };
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
  "can-landlord-charge-for-painting": {
    eyebrow: "Painting deduction guide",
    heroTitle: "Check a painting claim before it comes out of your bond",
    heroBody:
      "A wall mark does not automatically prove that a renter should pay for repainting. Start with the entry condition, the age of the paint, normal use, the damaged area and evidence of the actual work claimed.",
    quickChecks: [
      "Compare the wall with the signed entry report and dated photos",
      "Ask how old the paint was and why a full repaint is claimed",
      "Request an itemised quote or invoice for the affected area",
    ],
    actionTitle: "Questions to ask before agreeing",
    actions: [
      "Which exact wall or room is included in the claim?",
      "What evidence shows its condition at the beginning and end of the tenancy?",
      "Is the amount for a local repair, one wall or a larger repaint, and why?",
    ],
    extraLinks: [
      { href: "/guides/fair-wear-and-tear-australia", label: "Understand fair wear and tear" },
      { href: "/guides/landlord-deduction-examples", label: "Check deduction examples" },
      { href: "/calculators/bond-refund-calculator", label: "Calculate the refund impact" },
    ],
    example: {
      title: "Example: one marked wall in an older rental",
      intro:
        "A renter is shown a quote to repaint a whole room after the agent identifies marks on one wall. A useful response does not argue from memory. It asks for the entry photo, identifies the marked area, records the age and prior condition of the paint, and asks why the proposed scope is larger than the affected section.",
      lines: [
        "Proof to collect: entry report, entry photo, final photo and the written claim.",
        "Cost to clarify: preparation, one-wall work, whole-room work and any claimed labour.",
        "Next step: compare the evidence before accepting or disputing the amount.",
      ],
    },
  },
  "can-landlord-charge-for-carpet-cleaning": {
    eyebrow: "Carpet cleaning deduction guide",
    heroTitle: "Does the carpet really need a bond deduction?",
    heroBody:
      "Separate ordinary cleaning, a specific stain, damage and an automatic professional-cleaning demand. Check the lease wording, entry condition, final photos and the work actually invoiced.",
    quickChecks: [
      "Do not treat every carpet claim as the same problem",
      "Compare stains and condition with the entry report",
      "Ask for the cleaner's invoice and the reason the work was required",
    ],
    actionTitle: "Break the claim into facts",
    actions: [
      "Ask whether the claim is for general cleaning, stain treatment, repair or replacement.",
      "Match the claimed area with entry and exit evidence.",
      "Check official local guidance before accepting a blanket cleaning requirement.",
    ],
    extraLinks: [
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the final cleaning checklist" },
      { href: "/calculators/end-of-lease-cleaning-calculator", label: "Compare a cleaning quote" },
      { href: "/guides/rental-bond-dispute-guide", label: "Prepare a deduction response" },
    ],
    example: {
      title: "Example: a general clean versus one specific stain",
      intro:
        "If the final photos show clean carpet except for one marked area, ask for a claim that identifies that area and the treatment performed. That is easier to check than a broad charge labelled only as carpet cleaning.",
      lines: [
        "Identify: room, location, size and type of issue.",
        "Compare: entry condition, final condition and any previous damage.",
        "Verify: service date, treatment and itemised cost.",
      ],
    },
  },
  "normal-wear-and-tear-examples": {
    eyebrow: "Practical condition examples",
    heroTitle: "Wear and tear examples you can compare with your own rental",
    heroBody:
      "The useful question is how the condition changed over time. Age, ordinary use, starting condition and a specific incident all matter more than a label on its own.",
    quickChecks: [
      "Fading and gradual wear are different from a fresh impact or burn",
      "An old item should not be described as though it started new",
      "Photos and dates make a condition comparison much clearer",
    ],
    actionTitle: "Describe the condition properly",
    actions: [
      "Write what the item looked like at the start of the tenancy.",
      "Explain whether the change was gradual or linked to a specific event.",
      "Attach the clearest before-and-after photos and ask how the cost was calculated.",
    ],
    extraLinks: [
      { href: "/guides/fair-wear-and-tear-australia", label: "Read the main wear-and-tear guide" },
      { href: "/guides/landlord-deduction-examples", label: "See deduction-checking examples" },
      { href: "/calculators/bond-refund-calculator", label: "Estimate your remaining bond" },
    ],
    example: {
      title: "Three comparisons that make the difference clearer",
      intro:
        "A lightly faded curtain after years of sunlight is not the same fact pattern as a torn curtain. Flattened carpet on a normal walkway is different from a new burn. Small scuffs after ordinary occupation are different from a hole caused by an impact.",
      lines: [
        "Gradual change: consider age, ordinary use and the starting condition.",
        "Specific damage: record what happened, the affected area and repair evidence.",
        "Unclear claim: ask for photos and an itemised amount before responding.",
      ],
    },
  },
  "landlord-deduction-examples": {
    eyebrow: "Bond deduction examples",
    heroTitle: "How to check common bond deductions one by one",
    heroBody:
      "Do not judge a single total. Split the claim into rent, cleaning, damage, missing items and other charges, then attach evidence and a clear response to each line.",
    quickChecks: [
      "Every deduction needs a reason and a dollar amount",
      "The evidence should match the exact item being claimed",
      "Old condition, ordinary wear and actual repair scope still matter",
    ],
    actionTitle: "Turn one total into a checkable table",
    actions: [
      "List each claimed item, amount and supporting document.",
      "Add your entry evidence, exit evidence and response beside it.",
      "Agree only to the lines you understand and check the dispute deadline for the rest.",
    ],
    extraLinks: [
      { href: "/guides/rental-bond-dispute-guide", label: "Build a dispute evidence file" },
      { href: "/guides/rental-bond-refund-letter-template", label: "Write a clear response" },
      { href: "/calculators/bond-refund-calculator", label: "Total the disputed deductions" },
    ],
    example: {
      title: "Example deduction-checking table",
      intro:
        "For a claim containing $180 cleaning, $260 painting and $90 unpaid rent, keep three separate rows. A cleaning invoice cannot prove the painting amount, and a painting quote cannot prove unpaid rent. Check each line against the right records.",
      lines: [
        "Cleaning: condition photos, cleaner invoice and claimed task.",
        "Painting: entry condition, affected wall, paint age and quote scope.",
        "Rent: ledger, dates, payment receipts and the tenancy end date.",
      ],
    },
  },
  "rental-bond-refund-letter-template": {
    eyebrow: "Bond refund message template",
    heroTitle: "Write a bond refund request that is short, clear and easy to answer",
    heroBody:
      "State the property, tenancy end date, refund requested and evidence attached. If deductions are claimed, ask for an itemised response and supporting documents rather than arguing in broad terms.",
    quickChecks: [
      "Use the property address and exact tenancy dates",
      "State the refund amount or the deductions you dispute",
      "Attach only clearly named, relevant evidence",
    ],
    actionTitle: "Build the message in four parts",
    actions: [
      "Identify the tenancy and confirm that keys have been returned.",
      "State the bond outcome you are requesting.",
      "List attachments and ask for any deduction to be itemised with evidence.",
    ],
    extraLinks: [
      { href: "/guides/rental-bond-dispute-guide", label: "Organise dispute evidence" },
      { href: "/guides/end-of-lease-photo-checklist", label: "Choose useful photos" },
      { href: "/calculators/bond-refund-calculator", label: "Calculate the requested refund" },
    ],
    example: {
      title: "Copy and adapt this simple message",
      intro:
        "Subject: Bond refund request — [property address]. The tenancy ended on [date] and the keys were returned on [date]. I am requesting return of $[amount] from the bond. I have attached the entry condition report, final photos and relevant receipts. If any deduction is proposed, please send an itemised amount, the reason for it and the supporting invoice, quote or other evidence. Please reply in writing by [reasonable date].",
      lines: [
        "Replace every bracketed field before sending.",
        "Keep the tone factual and avoid claims you cannot support.",
        "Save the sent message and attachments with your other tenancy records.",
      ],
    },
  },
  "end-of-lease-photo-checklist": {
    eyebrow: "Exit photo checklist",
    heroTitle: "Take final photos that show condition, not just a tidy room",
    heroBody:
      "Photograph the whole room first, then the details that are commonly questioned. Keep original files, dates and a simple room list so the evidence is easy to follow later.",
    quickChecks: [
      "Take wide photos and close-ups in the same session",
      "Include floors, walls, appliances, windows and outdoor areas",
      "Keep the original files until the bond is fully resolved",
    ],
    actionTitle: "Use a repeatable photo order",
    actions: [
      "Start at the front door and move through the home room by room.",
      "Take a wide view, then photograph relevant surfaces and fixtures.",
      "Name or group the files by room and save a backup before handing back keys.",
    ],
    extraLinks: [
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Complete the cleaning checklist" },
      { href: "/guides/how-to-prepare-for-final-inspection", label: "Prepare for final inspection" },
      { href: "/guides/rental-bond-dispute-guide", label: "Organise the evidence file" },
    ],
    example: {
      title: "A simple room photo sequence",
      intro:
        "For a kitchen, take one image from the doorway, then the benchtops, sink, stovetop, oven interior, rangehood, cupboards, floor and any existing marks. Repeat the same pattern for each room so nothing important is hidden in a random camera roll.",
      lines: [
        "Wide view: shows the overall room and where details are located.",
        "Detail view: shows the condition of the specific surface or fixture.",
        "File record: preserves the original image date and a clear room order.",
      ],
    },
  },
  "how-to-prepare-for-final-inspection": {
    eyebrow: "Final inspection guide",
    heroTitle: "Prepare for the final inspection before the pressure starts",
    heroBody:
      "Use the entry report as your checklist, finish agreed cleaning and repairs, photograph the result, and keep the key-return and inspection arrangements in writing.",
    quickChecks: [
      "Read the entry condition report before the final clean",
      "Complete small agreed tasks while there is still time",
      "Photograph the final condition before access is handed back",
    ],
    actionTitle: "Plan the last 48 hours",
    actions: [
      "Walk through with the entry report and mark items that need attention.",
      "Finish cleaning, remove belongings and collect invoices or receipts.",
      "Take final photos, record meter readings and confirm key return in writing.",
    ],
    extraLinks: [
      { href: "/guides/end-of-lease-cleaning-checklist", label: "Use the cleaning checklist" },
      { href: "/guides/end-of-lease-photo-checklist", label: "Take the final photos" },
      { href: "/calculators/bond-refund-calculator", label: "Prepare a refund estimate" },
    ],
    example: {
      title: "A practical final-inspection pack",
      intro:
        "Keep one folder containing the signed entry report, your completed exit checklist, final photos by room, cleaning or repair invoices, meter readings, the key-return message and the bond claim details. This makes a later question much easier to answer.",
      lines: [
        "Before cleaning: check the starting condition and agreed obligations.",
        "After cleaning: photograph the property before anyone else re-enters.",
        "At handover: keep written proof of keys, dates and the next bond step.",
      ],
    },
  },
  "rent-increase-rules-australia": {
    eyebrow: "Rent increase guide",
    heroTitle: "Check a rent increase using the rules for your location",
    heroBody:
      "Australia does not have one simple rent-increase process for every renter. Use the notice, dates, tenancy type and the official authority for the state or territory where the property is located.",
    quickChecks: [
      "Confirm the notice is written and records the proposed rent and start date",
      "Check the last increase date and your tenancy agreement",
      "Use the official local authority before relying on a national summary",
    ],
    actionTitle: "Check the notice in order",
    actions: [
      "Record the current rent, proposed rent, notice date and start date.",
      "Check the agreement and the official state or territory guidance.",
      "Measure the weekly, monthly and annual impact before deciding what to do next.",
    ],
    extraLinks: [
      { href: "/calculators/rent-increase-calculator", label: "Calculate the increase" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new budget" },
      { href: "/guides/moving-costs-australia", label: "Compare the cost of moving" },
    ],
    example: {
      title: "Example: turn the notice into four checkable facts",
      intro:
        "If rent is proposed to move from $600 to $650 a week, write down the $50 weekly change, the annual change, the notice date and the proposed start date. Then check those dates against the agreement and the official rules where the property is located.",
      lines: [
        "Money: $50 a week is $2,600 across 52 weeks.",
        "Timing: notice date and effective date should be checked separately.",
        "Decision: compare the new budget with the full upfront cost of moving.",
      ],
    },
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
      { href: "/guides/rental-bond-dispute-guide", label: "Prepare a deduction response" },
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
      { href: "/guides/rental-bond-dispute-guide", label: "Organise supporting evidence" },
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
      { href: "/guides/rent-affordability-guide", label: "Understand the affordability check" },
      { href: "/guides/moving-costs-australia", label: "Plan upfront moving costs" },
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
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
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
      { href: "/guides/rental-bond-dispute-guide", label: "Read the dispute guide" },
      { href: "/guides/fair-wear-and-tear-australia", label: "Check wear and tear examples" },
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
      { href: "/guides/fair-wear-and-tear-australia", label: "Check wear and tear examples" },
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
  "sydney-rent-increase-guide": {
    eyebrow: "Sydney rent increase guide",
    heroTitle: "Check a Sydney rent increase before changing your budget",
    heroBody:
      "Put the current rent, proposed rent, notice date and start date in one place. Then check the NSW process and compare the annual increase with the real cost of staying or moving.",
    quickChecks: [
      "Measure the annual change as well as the weekly amount",
      "Keep the written notice and check its dates",
      "Compare the new rent with income and the upfront cost of moving",
    ],
    actionTitle: "Make the notice easier to judge",
    actions: [
      "Calculate the weekly, monthly and annual increase.",
      "Check the notice and tenancy details against current NSW guidance.",
      "Compare twelve months at the new rent with moving, cleaning, bond and overlap costs.",
    ],
    extraLinks: [
      { href: "/calculators/rent-increase-calculator", label: "Calculate the rent increase" },
      { href: "/calculators/rental-affordability-calculator", label: "Check the new rent against income" },
      { href: "/guides/sydney-moving-costs", label: "Compare Sydney moving costs" },
    ],
    example: {
      title: "Example: a $40 weekly increase",
      intro:
        "A move from $620 to $660 a week adds $40 a week, about $173 a month on average and $2,080 across 52 weeks. Those figures do not decide whether the notice is valid, but they make the budget decision clear before checking the NSW rules and dates.",
      lines: [
        "Current and new rent: keep both figures from the written notice.",
        "Annual impact: compare $2,080 with the full cost of moving.",
        "Process check: use the official NSW source if dates or frequency are unclear.",
      ],
    },
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
      { href: "/guides/rental-bond-dispute-guide", label: "Organise supporting evidence" },
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

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.filter((guide) => isIndexableGuide(guide.slug)).map((guide) => ({ slug: guide.slug }));
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
    dateModified: isIndexableGuide(guide.slug) ? "2026-09-15" : "2026-07-08",
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
          <p className="mt-3 text-sm font-semibold text-slate-500">Published by {site.name} · General information · Page reviewed 15 September 2026</p>
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

        {!upgrade ? (
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
        ) : null}

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

        {upgrade?.example ? (
          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-amber-800">Practical example</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{upgrade.example.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">{upgrade.example.intro}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {upgrade.example.lines.map((line) => (
                <p key={line} className="rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                  {line}
                </p>
              ))}
            </div>
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
          {!upgrade ? (
            <>
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
            </>
          ) : null}
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
