import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact BondRefund.online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact" description="Questions, corrections or partnership enquiries can be sent by email.">
      <p>
        Email: <a className="font-bold text-[var(--brand-dark)] hover:underline" href="mailto:hello@bondrefund.online">hello@bondrefund.online</a>
      </p>
      <p>
        For tenancy disputes, urgent legal questions or financial hardship, contact your state or territory tenancy authority or an independent support service.
      </p>
      <h2>What to include</h2>
      <p>
        If you are reporting a correction, please include the page URL, the sentence or calculator result you are questioning, and any source that
        helps us review it. If you are asking about a partnership or sponsored placement, include the organisation name, website and the type of
        renter service involved.
      </p>
      <h2>What not to send</h2>
      <p>
        Please do not send full leases, tribunal documents, identity documents, bank details or private information about another person. This site
        cannot act for renters, negotiate with agents or provide advice about a specific dispute.
      </p>
      <h2>Response expectations</h2>
      <p>
        BondRefund.online is a small independent website, so email replies may not be immediate. Calculator and guide corrections are prioritised
        when they affect accuracy, clarity, privacy or advertising disclosure.
      </p>
    </InfoPage>
  );
}
