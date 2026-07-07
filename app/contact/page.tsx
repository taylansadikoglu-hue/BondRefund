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
    </InfoPage>
  );
}
