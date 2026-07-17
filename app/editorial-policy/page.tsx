import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How BondRefund.online approaches clarity, independence, updates and commercial content.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <InfoPage title="Editorial Policy" description="How BondRefund.online writes, updates and labels renter content.">
      <p>
        BondRefund.online is built for renters who need simple, practical help. The editorial goal is not to sound legal. The goal is to explain a
        rental problem clearly enough that a renter can organise their next step with less stress and fewer surprises.
      </p>

      <h2>Plain language first</h2>
      <p>
        Pages are written for real people, not industry insiders. Where possible, the site uses short sentences, familiar words and direct
        explanations. This matters because many renters read under time pressure, on mobile, or in English as a second language.
      </p>

      <h2>Search intent must match page value</h2>
      <p>
        Every guide should answer the search question in a useful way. A page should not exist only to repeat a keyword. If a page targets “how to
        get your bond back in NSW”, it should give a renter a practical checklist, a simple explanation of the process and sensible next actions.
      </p>

      <h2>Independence and conflicts</h2>
      <p>
        BondRefund.online is independent. The site may use advertising, sponsored placements or affiliate links in the future, but commercial
        relationships do not change the basic editorial rule: the page should still help the renter even if they never click an ad or partner link.
      </p>

      <h2>Updates and corrections</h2>
      <p>
        Content can be updated when calculator assumptions change, a page is unclear, a better explanation is available or a reader spots a real
        issue. Where a correction affects how a page should be understood, the goal is to fix it quickly and clearly rather than hide it behind
        vague wording.
      </p>

      <h2>What the site does not do</h2>
      <p>
        The site does not claim to be a law firm, tenancy authority, tribunal, financial adviser or dispute service. It does not invent state
        rules, guarantee outcomes or suggest that a calculator can decide who is right in a real dispute.
      </p>

      <h2>Commercial quality standard</h2>
      <p>
        A page is only worth publishing if it gives the renter a useful next step. That may be a better estimate, a cleaner checklist, a clearer
        comparison number, or a better question to ask the agent or service provider. Thin pages that do not help the user should be improved or
        removed.
      </p>
    </InfoPage>
  );
}
