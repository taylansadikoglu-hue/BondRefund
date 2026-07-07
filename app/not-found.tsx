import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-4 leading-7 text-slate-600">The page may have moved, or the link may be incorrect.</p>
      <Link className="focus-ring mt-6 inline-block rounded-md bg-[var(--brand)] px-5 py-3 font-bold text-white" href="/">
        Go home
      </Link>
    </main>
  );
}
