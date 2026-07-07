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
    </InfoPage>
  );
}
