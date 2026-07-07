import { adsense } from "@/lib/monetisation";

export function GET() {
  const publisherId = adsense.client.replace("ca-", "") || "pub-9404887139180084";
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
