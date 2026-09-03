const adsTxt = "google.com, pub-9404887139180084, DIRECT, f08c47fec0942fa0\n";

export function GET() {
  return new Response(adsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
