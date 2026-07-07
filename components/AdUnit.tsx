"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdUnit({
  client,
  slot,
  format,
}: {
  client: string;
  slot: string;
  format: "auto" | "fluid";
}) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense loading can throw; the page should remain usable.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={client}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
    />
  );
}
