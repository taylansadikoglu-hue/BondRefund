import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for BondRefund.online.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy" description="How this website plans to handle privacy as features are added.">
      <p>
        BondRefund.online is designed as a static, low-maintenance website. Calculator inputs are processed in your browser and are not intentionally stored by this website.
      </p>
      <h2>Email capture</h2>
      <p>
        The checklist email form is a placeholder. If connected later, this policy should be updated to name the email provider, describe what is collected and explain unsubscribe options.
      </p>
      <h2>Analytics and advertising</h2>
      <p>
        Analytics and advertising code are not active by default. If Google Analytics, Plausible, AdSense or affiliate tracking is added, this policy should be updated before launch with provider names and opt-out information where relevant.
      </p>
      <h2>Affiliate links and lead forms</h2>
      <p>
        Some future links may be sponsored or affiliate links. If activated, sponsored links should be labelled and may generate revenue when users click, request a quote or sign up with a partner.
      </p>
    </InfoPage>
  );
}
