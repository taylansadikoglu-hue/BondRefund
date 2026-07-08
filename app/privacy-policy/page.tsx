import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for BondRefund.online.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy" description="How BondRefund.online handles calculator use, email contact and future monetisation.">
      <p>
        BondRefund.online is designed as a static, low-maintenance website. Calculator inputs are processed in your browser and are not intentionally stored by this website.
      </p>
      <h2>Email capture</h2>
      <p>
        If you enter your email to receive a free checklist, BondRefund.online may store your email address, the page you signed up from and the guide requested so the checklist or related updates can be sent to you.
      </p>
      <p>
        If you choose to email BondRefund.online directly for a checklist or a general question, the information you include in that email will be used only to reply to your request.
      </p>
      <h2>Analytics and advertising</h2>
      <p>
        BondRefund.online may use Google AdSense and clearly marked sponsored placements on pages where advertising is enabled. If analytics, affiliate tracking or additional ad providers are added later, this policy should be updated before those services are switched on.
      </p>
      <h2>Affiliate links and lead forms</h2>
      <p>
        Some links may become sponsored or affiliate links in future. If activated, sponsored links should be labelled and may generate revenue when users click, request a quote or sign up with a partner.
      </p>
    </InfoPage>
  );
}
