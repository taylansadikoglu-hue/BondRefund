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
    </InfoPage>
  );
}
