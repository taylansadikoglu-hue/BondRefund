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
      <h2>User responsibility</h2>
      <p>
        You are responsible for checking the information you enter, reviewing the assumptions shown on calculator pages and deciding whether a
        result is suitable for your planning. Do not rely on this website as the only source for a bond dispute, lease decision or financial
        commitment.
      </p>
      <h2>Permitted use</h2>
      <p>
        You may use the calculators and guides for personal rental planning, comparison and education. You must not use the website to scrape
        content at scale, interfere with the service, misrepresent results as professional advice or copy pages into another service without
        permission.
      </p>
      <h2>Changes to the site</h2>
      <p>
        Features, calculators, assumptions, sponsored placements and pages may be added, changed or removed over time. Continued use of the website
        after updates means you accept the current terms.
      </p>
    </InfoPage>
  );
}
