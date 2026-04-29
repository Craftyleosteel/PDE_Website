export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-[var(--color-muted)] flex flex-col sm:flex-row gap-2 justify-between">
        <span>PDE Playground &middot; open source educational project</span>
        <a
          href="https://github.com/Craftyleosteel/PDE_Website"
          className="hover:text-[var(--color-accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
