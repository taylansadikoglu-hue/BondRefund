import { bondTimelines, bondTimelinesCheckedOn } from "@/lib/bond-timelines";

export function BondTimelineTable() {
  return (
    <section className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-6" aria-labelledby="timeline-heading">
      <p className="text-sm font-bold uppercase tracking-wide text-sky-800">State and territory comparison</p>
      <h2 id="timeline-heading" className="mt-2 text-2xl font-extrabold text-slate-950">
        Bond refund timing in each state and territory
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">
        Each row summarises the official bond page for that state or territory, checked on {bondTimelinesCheckedOn}.
        Where the official page does not give a number, we say so. Rules change, so open the official link before you rely on a date.
      </p>
      <div className="mt-5 grid gap-4">
        {bondTimelines.map((row) => (
          <article key={row.region} className="rounded-xl border border-sky-200 bg-white p-4">
            <h3 className="text-lg font-extrabold text-slate-950">{row.region}</h3>
            <dl className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
              <div>
                <dt className="font-bold text-slate-900">Who holds the bond</dt>
                <dd>{row.heldBy}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">How to claim</dt>
                <dd>{row.howToClaim}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">Time for the other side to respond</dt>
                <dd>{row.otherPartyResponse}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">When the money arrives</dt>
                <dd>{row.paymentTiming}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-bold text-slate-900">If the amount is disputed</dt>
                <dd>{row.ifDisputed}</dd>
              </div>
            </dl>
            <a className="focus-ring mt-3 inline-flex text-sm font-bold text-[var(--brand-dark)] underline" href={row.source} target="_blank" rel="noopener noreferrer">
              Official {row.region} page ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
