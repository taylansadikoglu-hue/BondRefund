export function EmailCapture() {
  return (
    <section className="rounded-md border border-blue-100 bg-[var(--soft-blue)] p-5">
      <h2 className="text-xl font-extrabold">Get the free moving checklist</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Want the checklist or spot something we should add? Send us an email and we’ll reply with the latest version.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--accent)] px-5 font-bold text-white"
          href="mailto:hello@bondrefund.online?subject=Send%20me%20the%20moving%20checklist"
        >
          Email for the checklist
        </a>
        <p className="text-sm text-slate-600">hello@bondrefund.online</p>
      </div>
    </section>
  );
}
