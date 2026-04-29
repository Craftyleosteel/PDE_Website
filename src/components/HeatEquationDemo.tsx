"use client";

import { useMemo, useState } from "react";
import PlotlyChart from "./PlotlyChart";
import { solveHeat1D, initialConditions } from "@/lib/solvers/heat1d";

type ICKey = keyof typeof initialConditions;

export default function HeatEquationDemo() {
  const [alpha, setAlpha] = useState(0.01);
  const [tFinal, setTFinal] = useState(2);
  const [icKey, setIcKey] = useState<ICKey>("hotSpot");
  const L = 1;

  const result = useMemo(() => {
    const ic = initialConditions[icKey];
    return solveHeat1D({
      alpha,
      L,
      nx: 101,
      tFinal,
      initialCondition: (x) => ic(x, L),
      boundary: { left: 0, right: 0 },
      framesToKeep: 80,
    });
  }, [alpha, tFinal, icKey]);

  const heatmap = useMemo(
    () => [
      {
        z: result.u,
        x: result.x,
        y: result.t,
        type: "heatmap" as const,
        colorscale: "Hot" as const,
        colorbar: { title: { text: "u(x,t)" } },
      },
    ],
    [result],
  );

  const profile = useMemo(() => {
    const traces = [0, Math.floor(result.t.length / 4), Math.floor(result.t.length / 2), result.t.length - 1].map(
      (idx) => ({
        x: result.x,
        y: result.u[idx],
        type: "scatter" as const,
        mode: "lines" as const,
        name: `t = ${result.t[idx].toFixed(3)}`,
      }),
    );
    return traces;
  }, [result]);

  return (
    <div className="my-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="mb-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <label className="flex flex-col gap-1">
          <span>
            Diffusivity <code>α = {alpha.toFixed(3)}</code>
          </span>
          <input
            type="range"
            min={0.001}
            max={0.05}
            step={0.001}
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>
            Final time <code>t = {tFinal.toFixed(2)}</code>
          </span>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={tFinal}
            onChange={(e) => setTFinal(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Initial condition</span>
          <select
            value={icKey}
            onChange={(e) => setIcKey(e.target.value as ICKey)}
            className="border border-[var(--color-border)] rounded px-2 py-1 bg-[var(--background)]"
          >
            <option value="hotSpot">Hot spot in middle</option>
            <option value="sineWave">Sine wave</option>
            <option value="twoBumps">Two Gaussian bumps</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PlotlyChart
          data={heatmap}
          layout={{
            title: { text: "u(x, t)" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "t" } },
            height: 360,
          }}
        />
        <PlotlyChart
          data={profile}
          layout={{
            title: { text: "Solution profiles at selected times" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "u" } },
            height: 360,
            legend: { orientation: "h", y: -0.25 },
          }}
        />
      </div>

      <p className="text-xs text-[var(--color-muted)] mt-3">
        Stability ratio r = α·Δt/Δx² = {result.r.toFixed(3)} (need r ≤ 0.5 for the explicit scheme).
      </p>
    </div>
  );
}
