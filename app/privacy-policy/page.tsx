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
        BondRefund.online uses Google AdSense to show ads, and may show clearly marked sponsored placements. If analytics, affiliate tracking or additional ad providers are added later, this policy will be updated before those services are switched on.
      </p>
      <h2>Google advertising cookies</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.
        Google&apos;s use of advertising cookies lets it and its partners serve ads to you based on your visits to this site and other sites on the internet.
      </p>
      <p>
        You can opt out of personalised advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. You can also opt out of some
        third-party vendors&apos; use of cookies for personalised advertising at{" "}
        <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">aboutads.info</a>. To learn more, see{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from sites that use its services</a>.
      </p>
      <h2>Affiliate links and lead forms</h2>
      <p>
        Some links may become sponsored or affiliate links in future. If activated, sponsored links should be labelled and may generate revenue when users click, request a quote or sign up with a partner.
      </p>
      <h2>Server logs</h2>
      <p>
        Like most websites, hosting and security providers may process basic technical information such as IP address, browser type, requested URL,
        referrer, date, time and error logs. This information is used to operate the website, investigate faults and protect against abuse.
      </p>
      <h2>Cookies</h2>
      <p>
        Advertising, analytics or affiliate tools may use cookies or similar technologies if enabled. These tools can help measure traffic, prevent
        fraud, personalise or limit ads and understand whether sponsored placements are useful.
      </p>
      <h2>Data minimisation</h2>
      <p>
        The site is designed to collect as little personal information as practical. Avoid entering private dispute details into any form unless it
        is clearly necessary for the feature you are using.
      </p>
      <h2>Policy updates</h2>
      <p>
        This policy may be updated as the site adds analytics, advertising, affiliate relationships, email tools or new calculators. Material
        changes should be reflected on this page.
      </p>
    </InfoPage>
  );
}
