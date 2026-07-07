export function EmailCapture() {
  return (
    <section className="rounded-md border border-blue-100 bg-[var(--soft-blue)] p-5">
      <h2 className="text-xl font-extrabold">Get the free moving checklist</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Email capture placeholder. Connect this form to your email platform when you are ready.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="email-checklist">
          Email address
        </label>
        <input
          id="email-checklist"
          type="email"
          placeholder="you@example.com"
          className="focus-ring min-h-11 flex-1 rounded-md border border-slate-300 px-3"
        />
        <button className="focus-ring min-h-11 rounded-md bg-[var(--accent)] px-5 font-bold text-white" type="button">
          Send checklist
        </button>
      </form>
    </section>
  );
}
