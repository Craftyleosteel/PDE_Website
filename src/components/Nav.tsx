import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--background)]/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          PDE Playground
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/" className="hover:text-[var(--color-accent)]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/learn/" className="hover:text-[var(--color-accent)]">
              Learn
            </Link>
          </li>
          <li>
            <Link href="/about/" className="hover:text-[var(--color-accent)]">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
