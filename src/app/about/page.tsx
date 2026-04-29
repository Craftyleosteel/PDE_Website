export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 prose">
      <h1>About PDE Playground</h1>
      <p>
        PDE Playground is an open source project that teaches partial
        differential equations through a tight loop of theory and computation.
        Read the math, then play with a numerical solver right next to it.
      </p>

      <h2>What you&rsquo;ll find here</h2>
      <ul>
        <li>A brief refresher on solving ODEs as a launching point.</li>
        <li>The classical PDE theory &mdash; heat, wave, and Laplace equations.</li>
        <li>Numerical methods (finite differences, spectral methods, finite elements) you can run in your browser.</li>
        <li>Worked exercises with full solutions.</li>
      </ul>

      <h2>How it&rsquo;s built</h2>
      <p>
        The site is a Next.js app written in TypeScript. Chapters are MDX files
        that mix prose, math (rendered with KaTeX), and interactive React
        widgets. Numerical solvers run client-side in JavaScript, with
        visualizations powered by Plotly. The whole thing is statically
        exported and deployed to GitHub Pages.
      </p>

      <h2>Contributing</h2>
      <p>
        Issues, pull requests, and chapter contributions are welcome. The
        repository lives on GitHub.
      </p>
    </article>
  );
}
