import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for BondRefund.online.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms" description="Terms for using BondRefund.online calculators and guides.">
      <p>
        By using this website, you agree that the calculators and guides are provided for general educational purposes only. Results are estimates based on the inputs you provide.
      </p>
      <h2>No professional advice</h2>
      <p>
        The website does not provide legal, financial or tenancy advice. You should check official sources or seek advice for your circumstances.
      </p>
      <h2>Accuracy</h2>
      <p>
        We aim to keep content useful and clear, but rental rules, fees and market prices can change. You are responsible for verifying information before relying on it.
      </p>
      <h2>Sponsored links</h2>
      <p>
        The website may include advertisements, sponsored links or affiliate links in future. Commercial relationships do not change the general-information nature of the calculators and guides.
      </p>
    </InfoPage>
  );
}
