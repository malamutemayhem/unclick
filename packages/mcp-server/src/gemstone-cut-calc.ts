export type GemstoneCut = "brilliant" | "step" | "cabochon" | "rose" | "mixed";

export function facetCount(cut: GemstoneCut): number {
  const f: Record<GemstoneCut, number> = {
    brilliant: 58, step: 25, cabochon: 0, rose: 24, mixed: 40,
  };
  return f[cut];
}

export function brilliance(cut: GemstoneCut): number {
  const b: Record<GemstoneCut, number> = {
    brilliant: 10, step: 6, cabochon: 3, rose: 5, mixed: 8,
  };
  return b[cut];
}

export function fireDispersion(cut: GemstoneCut): number {
  const d: Record<GemstoneCut, number> = {
    brilliant: 10, step: 4, cabochon: 1, rose: 3, mixed: 7,
  };
  return d[cut];
}

export function weightRetentionPercent(cut: GemstoneCut): number {
  const w: Record<GemstoneCut, number> = {
    brilliant: 40, step: 55, cabochon: 70, rose: 45, mixed: 50,
  };
  return w[cut];
}

export function cuttingDifficulty(cut: GemstoneCut): number {
  const d: Record<GemstoneCut, number> = {
    brilliant: 8, step: 6, cabochon: 3, rose: 7, mixed: 9,
  };
  return d[cut];
}

export function showsInclusions(cut: GemstoneCut): boolean {
  const s: Record<GemstoneCut, boolean> = {
    brilliant: false, step: true, cabochon: false, rose: false, mixed: false,
  };
  return s[cut];
}

export function bestGemstone(cut: GemstoneCut): string {
  const b: Record<GemstoneCut, string> = {
    brilliant: "diamond", step: "emerald", cabochon: "opal",
    rose: "garnet", mixed: "sapphire",
  };
  return b[cut];
}

export function symmetryImportance(cut: GemstoneCut): number {
  const s: Record<GemstoneCut, number> = {
    brilliant: 10, step: 9, cabochon: 4, rose: 7, mixed: 8,
  };
  return s[cut];
}

export function costMultiplier(cut: GemstoneCut): number {
  const c: Record<GemstoneCut, number> = {
    brilliant: 2, step: 1.5, cabochon: 1, rose: 1.3, mixed: 1.8,
  };
  return c[cut];
}

export function gemstoneCuts(): GemstoneCut[] {
  return ["brilliant", "step", "cabochon", "rose", "mixed"];
}
