import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-20 text-center sm:text-left">
        <p className="text-sm uppercase tracking-widest text-[var(--color-muted)] mb-4">
          Open source &middot; interactive
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          Partial differential equations,
          <br />
          made interactive.
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl mb-8 mx-auto sm:mx-0">
          A self-paced introduction to PDEs. Read the theory, then play with the
          numerical methods right in your browser. No installs, no Python,
          no MATLAB &mdash; just sliders and plots.
        </p>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <Link
            href="/learn/"
            className="inline-flex items-center px-5 py-3 rounded-full bg-[var(--color-accent)] text-white font-medium hover:opacity-90"
          >
            Start learning
          </Link>
          <Link
            href="/about/"
            className="inline-flex items-center px-5 py-3 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface)]"
          >
            About this project
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="Theory first"
          body="Each chapter starts with the math: derivation, intuition, and the solution methods you can apply by hand."
        />
        <FeatureCard
          title="Numerics in the browser"
          body="Every interactive solver runs as JavaScript in your browser. Tweak parameters and see the answer update instantly."
        />
        <FeatureCard
          title="Built to extend"
          body="New chapters are MDX files with embeddable React widgets. Fork the repo and add your own."
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-6 bg-[var(--color-surface)]">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{body}</p>
    </div>
  );
}
