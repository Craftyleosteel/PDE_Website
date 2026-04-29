import Link from "next/link";

type Chapter = {
  slug: string;
  title: string;
  blurb: string;
  status: "ready" | "draft" | "planned";
};

const chapters: Chapter[] = [
  {
    slug: "heat-equation-1d",
    title: "The 1D heat equation",
    blurb:
      "Derivation, separation of variables, and an explicit finite-difference solver you can play with.",
    status: "ready",
  },
  {
    slug: "wave-equation-1d",
    title: "The 1D wave equation",
    blurb: "D'Alembert's formula, characteristics, and a leapfrog solver.",
    status: "planned",
  },
  {
    slug: "laplace-equation-2d",
    title: "Laplace's equation in 2D",
    blurb: "Boundary value problems, harmonic functions, and Jacobi iteration.",
    status: "planned",
  },
  {
    slug: "burgers-equation",
    title: "Burgers' equation",
    blurb: "Nonlinear advection, shock formation, and upwind schemes.",
    status: "planned",
  },
];

export default function LearnIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Chapters</h1>
      <p className="text-[var(--color-muted)] mb-10">
        Work through them in order, or jump straight to the topic you need.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((c) => (
          <ChapterCard key={c.slug} chapter={c} />
        ))}
      </div>
    </div>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const ready = chapter.status === "ready";
  const inner = (
    <div
      className={`h-full rounded-xl border border-[var(--color-border)] p-5 transition ${
        ready
          ? "bg-[var(--color-surface)] hover:border-[var(--color-accent)]"
          : "opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">{chapter.title}</h2>
        <StatusBadge status={chapter.status} />
      </div>
      <p className="text-sm text-[var(--color-muted)]">{chapter.blurb}</p>
    </div>
  );

  return ready ? (
    <Link href={`/learn/${chapter.slug}/`}>{inner}</Link>
  ) : (
    <div>{inner}</div>
  );
}

function StatusBadge({ status }: { status: Chapter["status"] }) {
  const map = {
    ready: { text: "Ready", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
    draft: { text: "Draft", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
    planned: { text: "Planned", cls: "bg-slate-500/15 text-slate-600 dark:text-slate-400" },
  } as const;
  const m = map[status];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.cls}`}>
      {m.text}
    </span>
  );
}
