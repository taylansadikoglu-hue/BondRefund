import { adsense } from "@/lib/monetisation";

export function GET() {
  const body = adsense.client
    ? `google.com, ${adsense.client.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`
    : [
        "# Add your AdSense publisher ID in Vercel as NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX",
        "# This route will then emit the Google ads.txt line automatically.",
        "",
      ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
