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
      <h2>Independence</h2>
      <p>
        BondRefund.online is independent and is not affiliated with a tenancy authority, tribunal, real estate agency or government department.
        Where a situation is urgent, disputed or high value, renters should check official state or territory information and consider independent
        support.
      </p>
    </InfoPage>
  );
}
