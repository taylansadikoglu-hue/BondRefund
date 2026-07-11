import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "General information disclaimer for BondRefund.online.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer" description="Important limits on calculators, guides and estimates.">
      <p>
        BondRefund.online provides general information only. It does not provide legal advice, financial advice, tenant advocacy or dispute resolution services.
      </p>
      <p>
        Calculator results depend entirely on the figures entered and simplified assumptions. Actual rental outcomes may differ because of evidence, lease terms, negotiations, state or territory rules and tribunal decisions.
      </p>
      <p>
        Before making a decision, check your lease, review official tenancy information and consider independent advice.
      </p>
      <h2>Calculator limits</h2>
      <p>
        The calculators use simplified models so renters can understand possible amounts quickly. They do not know every lease clause, local rule,
        tribunal order, invoice, quote, property condition, negotiation history or hardship factor that may apply to a real situation.
      </p>
      <h2>Guide limits</h2>
      <p>
        Guides are written for general education and search clarity. They may help you prepare questions or documents, but they do not tell you
        whether a landlord, agent, cleaner, mover or lender is legally correct in your individual circumstances.
      </p>
      <h2>No adviser relationship</h2>
      <p>
        Using this website, emailing the site or reading a guide does not create a solicitor-client, financial adviser-client, advocate-client or
        agency relationship. If a deadline is approaching or money is significant, seek help from an appropriate service.
      </p>
    </InfoPage>
  );
}
