import { AdUnit } from "@/components/AdUnit";
import { adsense } from "@/lib/monetisation";

type AdSlotProps = {
  label?: string;
  format?: "auto" | "fluid";
  slot?: string;
};

export function AdSlot({ label = "Advertisement", format = "auto", slot }: AdSlotProps) {
  const adSlot = slot || adsense.displaySlot;
  const isActive = Boolean(adsense.client && adSlot);

  return (
    <aside className="ad-shell rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-semibold text-slate-500">
      {isActive ? (
        <AdUnit client={adsense.client} format={format} slot={adSlot} />
      ) : (
        <div>
          <p>{label} placeholder</p>
          <p className="mt-2 text-xs font-normal text-slate-400">Add AdSense environment variables to activate this slot.</p>
        </div>
      )}
    </aside>
  );
}
