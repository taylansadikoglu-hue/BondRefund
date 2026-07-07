import Link from "next/link";
import { calculatorLinks } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="focus-ring flex items-center gap-2 text-lg font-extrabold tracking-tight text-[var(--brand-dark)]">
          <span className="grid size-9 place-items-center rounded-md bg-[var(--brand-dark)] text-sm font-black text-white">BR</span>
          <span>
            BondRefund<span className="text-[var(--brand)]">.online</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 md:flex">
          <Link className="focus-ring hover:text-[var(--brand)]" href="/calculators/bond-refund-calculator">
            Calculators
          </Link>
          <Link className="focus-ring hover:text-[var(--brand)]" href="/guides">
            Guides
          </Link>
          <Link className="focus-ring hover:text-[var(--brand)]" href="/about">
            About
          </Link>
          <Link className="focus-ring hover:text-[var(--brand)]" href="/contact">
            Contact
          </Link>
        </nav>
        <Link
          className="focus-ring rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--brand-dark)]"
          href={calculatorLinks[0].href}
        >
          Start calculating
        </Link>
      </div>
    </header>
  );
}
