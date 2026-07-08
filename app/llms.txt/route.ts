import { site } from "@/lib/site";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";

export function GET() {
  const topCalculators = calculators
    .map((calculator) => `- ${calculator.title}: ${site.url}/calculators/${calculator.slug}`)
    .join("\n");

  const topGuides = guides
    .slice(0, 20)
    .map((guide) => `- ${guide.title}: ${site.url}/guides/${guide.slug}`)
    .join("\n");

  const body = `# ${site.name}

${site.description}

This website helps renters understand:
- bond or deposit refunds
- break lease costs
- rent increases
- moving costs
- end of lease cleaning costs
- rental affordability

Important note:
- This site provides general information and simple estimates.
- It is not legal or financial advice.
- Users should still check their lease and official local housing or tenancy authorities.

Top calculators:
${topCalculators}

Top guides:
${topGuides}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
