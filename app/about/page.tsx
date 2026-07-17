import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description: "About BondRefund.online and its free Australian rental calculators.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage title="About BondRefund.online" description="Free calculators and guides built for Australian renters.">
      <p>
        BondRefund.online helps renters estimate common rental costs before, during and after a move. The site focuses on simple calculators,
        plain-English guides and transparent assumptions.
      </p>
      <p>
        The goal is to make rental decisions easier to plan, without pretending that a calculator can replace state-specific tenancy advice.
      </p>
      <h2>Who the site is for</h2>
      <p>
        The site is written for renters who need a fast answer before they reply to an agent, compare a quote, decide whether a rent increase is
        manageable or work out whether moving is still worth it. It is especially designed to stay easy to read when someone is stressed or when
        English is not their first language.
      </p>
      <h2>What the site covers</h2>
      <p>
        The calculators cover bond refund estimates, possible break lease costs, rent increases, moving costs, end-of-lease cleaning, rental
        affordability and bond loan repayments. Guides add practical context around quotes, deductions, condition reports, photos, timelines and
        common renter decisions.
      </p>
      <h2>How to use the estimates</h2>
      <p>
        Treat each estimate as a planning range. It can help you ask better questions, compare quotes or organise documents before replying to an
        agent, landlord, cleaner, mover or support service. It should not be treated as a final legal outcome.
      </p>
      <h2>How pages are chosen</h2>
      <p>
        New pages are usually built around real renter problems: claimed bond deductions, break lease pressure, moving cost confusion, rent
        increases and affordability checks. The test is simple: if a renter lands on the page, can they leave with a clearer number, a better
        checklist or a more useful next step?
      </p>
      <h2>Independence</h2>
      <p>
        BondRefund.online is independent and is not affiliated with a tenancy authority, tribunal, real estate agency or government department.
        Where a situation is urgent, disputed or high value, renters should check official state or territory information and consider independent
        support.
      </p>
    </InfoPage>
  );
}
