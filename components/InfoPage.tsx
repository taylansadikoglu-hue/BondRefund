import Link from "next/link";
import { site } from "@/lib/site";

export function InfoPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="text-sm font-semibold text-slate-500">
        <Link className="focus-ring hover:text-[var(--brand)]" href="/">
          Home
        </Link>
      </nav>
      <header className="mt-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
      </header>
      <section className="content-prose mt-8 rounded-md border border-[var(--line)] bg-white p-6">
        {children}
        <h2>General information disclaimer</h2>
        <p>{site.disclaimer}</p>
      </section>
    </main>
  );
}
