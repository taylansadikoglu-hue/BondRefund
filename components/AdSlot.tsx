import { AdUnit } from "@/components/AdUnit";
import { adsense } from "@/lib/monetisation";

type AdSlotProps = {
  label?: string;
  format?: "auto" | "fluid";
  slot?: string;
};

export function AdSlot({ label = "Advertisement", format = "auto", slot }: AdSlotProps) {
  const adSlot = slot || (format === "fluid" ? adsense.inArticleSlot : adsense.displaySlot);
  const isActive = Boolean(adsense.client && adSlot);

  if (!isActive) {
    return null;
  }

  return (
    <aside className="ad-shell rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-semibold text-slate-500">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <AdUnit client={adsense.client} format={format} slot={adSlot} />
    </aside>
  );
}
