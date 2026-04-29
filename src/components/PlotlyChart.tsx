"use client";

import dynamic from "next/dynamic";
import type { Data, Layout, Config } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center text-sm text-[var(--color-muted)] border border-[var(--color-border)] rounded-lg">
      Loading plot…
    </div>
  ),
});

type PlotlyChartProps = {
  data: Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  className?: string;
};

export default function PlotlyChart({
  data,
  layout,
  config,
  className,
}: PlotlyChartProps) {
  return (
    <div className={className}>
      <Plot
        data={data}
        layout={{
          autosize: true,
          margin: { l: 50, r: 20, t: 30, b: 40 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { family: "var(--font-geist-sans), system-ui, sans-serif" },
          ...layout,
        }}
        config={{ responsive: true, displaylogo: false, ...config }}
        style={{ width: "100%", height: layout?.height ?? 400 }}
        useResizeHandler
      />
    </div>
  );
}
