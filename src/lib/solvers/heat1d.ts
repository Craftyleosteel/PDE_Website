/**
 * 1D heat equation: u_t = alpha * u_xx on x in [0, L].
 * Explicit FTCS scheme. Stable when r = alpha*dt/dx^2 <= 0.5.
 */

export type Heat1DParams = {
  alpha: number;
  L: number;
  nx: number;
  tFinal: number;
  initialCondition: (x: number) => number;
  boundary?: { left: number; right: number };
  framesToKeep?: number;
};

export type Heat1DResult = {
  x: number[];
  t: number[];
  u: number[][];
  r: number;
  stable: boolean;
};

export function solveHeat1D(params: Heat1DParams): Heat1DResult {
  const {
    alpha,
    L,
    nx,
    tFinal,
    initialCondition,
    boundary = { left: 0, right: 0 },
    framesToKeep = 60,
  } = params;

  const dx = L / (nx - 1);
  const safetyFactor = 0.4;
  const dt = (safetyFactor * dx * dx) / alpha;
  const nt = Math.max(2, Math.ceil(tFinal / dt));
  const r = (alpha * dt) / (dx * dx);

  const x = Array.from({ length: nx }, (_, i) => i * dx);
  let u = x.map(initialCondition);
  u[0] = boundary.left;
  u[nx - 1] = boundary.right;

  const stride = Math.max(1, Math.floor(nt / framesToKeep));
  const tSamples: number[] = [0];
  const uSamples: number[][] = [u.slice()];

  const next = new Array(nx);
  for (let n = 1; n <= nt; n++) {
    next[0] = boundary.left;
    next[nx - 1] = boundary.right;
    for (let i = 1; i < nx - 1; i++) {
      next[i] = u[i] + r * (u[i + 1] - 2 * u[i] + u[i - 1]);
    }
    u = next.slice();
    if (n % stride === 0 || n === nt) {
      tSamples.push(n * dt);
      uSamples.push(u.slice());
    }
  }

  return { x, t: tSamples, u: uSamples, r, stable: r <= 0.5 };
}

export const initialConditions = {
  hotSpot: (x: number, L = 1) => (Math.abs(x - L / 2) < L / 10 ? 1 : 0),
  sineWave: (x: number, L = 1) => Math.sin((Math.PI * x) / L),
  twoBumps: (x: number, L = 1) =>
    Math.exp(-100 * (x - L / 4) ** 2) + 0.6 * Math.exp(-100 * (x - (3 * L) / 4) ** 2),
};
