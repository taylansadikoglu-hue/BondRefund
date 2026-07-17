import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How BondRefund.online builds calculators, guide assumptions and renter planning content.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <InfoPage title="Methodology" description="How BondRefund.online builds simple renter calculators and practical guides.">
      <p>
        BondRefund.online is built to help renters think more clearly before they reply to an agent, accept a quote, compare a rent increase or
        decide whether moving still makes sense. The site does not try to predict tribunal outcomes or replace official state information.
      </p>

      <h2>What the calculators are designed to do</h2>
      <p>
        Each calculator is designed as a planning tool. The goal is to turn a confusing rental question into a simple estimate that helps a renter
        ask better questions. For example, the bond refund calculator helps a renter see the effect of deductions on the final refund amount. The
        moving cost calculator helps a renter compare truck, packing and overlap costs with the cost of staying.
      </p>

      <h2>How the calculator assumptions work</h2>
      <p>
        Calculator assumptions are deliberately simple. Inputs usually cover the biggest drivers first, such as weekly rent, uncovered weeks,
        removalist hours, bedrooms, bathrooms, bond amount or annual household income. Where a result is best treated as a range, the guide text
        says so clearly. The numbers are meant to support planning, not to create false certainty.
      </p>

      <h2>How guides are written</h2>
      <p>
        Guides are written in plain English for renters who want quick clarity. Many users are under pressure, short on time, or reading in a
        second language. That is why most pages start with a short answer, then move into the practical checks, common mistakes and next actions a
        renter can actually use.
      </p>

      <h2>What the site checks and what it does not</h2>
      <p>
        BondRefund.online checks for internal consistency, simple arithmetic, page clarity and whether the guide and calculator really answer the
        search question. The site does not attempt to decide legal entitlement, local tribunal outcomes, exact quote fairness or whether one side
        of a rental dispute will win.
      </p>

      <h2>How to use the site well</h2>
      <p>
        The best way to use the site is to start with the simplest calculator, save the result, then compare it with your lease, condition report,
        photos, written messages, invoices, quotes and official tenancy information. If the amount is large or the facts are disputed, use the site
        as preparation, not as the final answer.
      </p>
    </InfoPage>
  );
}
