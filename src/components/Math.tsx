"use client";

import { InlineMath, BlockMath } from "react-katex";

export function Math({ children }: { children: string }) {
  return <InlineMath math={children} />;
}

export function MathBlock({ children }: { children: string }) {
  return <BlockMath math={children} />;
}
