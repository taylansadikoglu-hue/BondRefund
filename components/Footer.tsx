import Link from "next/link";
import { calculatorLinks, legalLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-extrabold text-[var(--brand-dark)]">{site.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{site.description}</p>
          <p className="mt-4 text-xs font-semibold text-slate-500">{site.disclaimer}</p>
        </div>
        <div>
          <p className="font-bold">Calculators</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            {calculatorLinks.slice(0, 5).map((link) => (
              <Link className="focus-ring hover:text-[var(--brand)]" key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold">Company</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            {legalLinks.map((link) => (
              <Link className="focus-ring hover:text-[var(--brand)]" key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
