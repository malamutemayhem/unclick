export type BonsaiStyle = "formal_upright" | "informal_upright" | "slanting" | "cascade" | "literati";

export function trunkTaperRequired(style: BonsaiStyle): number {
  const t: Record<BonsaiStyle, number> = {
    formal_upright: 10, informal_upright: 8, slanting: 7, cascade: 5, literati: 3,
  };
  return t[style];
}

export function branchLevels(style: BonsaiStyle): number {
  const b: Record<BonsaiStyle, number> = {
    formal_upright: 7, informal_upright: 6, slanting: 5, cascade: 4, literati: 2,
  };
  return b[style];
}

export function potDepthCm(style: BonsaiStyle): number {
  const p: Record<BonsaiStyle, number> = {
    formal_upright: 5, informal_upright: 5, slanting: 6, cascade: 15, literati: 4,
  };
  return p[style];
}

export function wiringComplexity(style: BonsaiStyle): number {
  const w: Record<BonsaiStyle, number> = {
    formal_upright: 6, informal_upright: 7, slanting: 8, cascade: 9, literati: 5,
  };
  return w[style];
}

export function pruningFrequencyPerYear(style: BonsaiStyle): number {
  const p: Record<BonsaiStyle, number> = {
    formal_upright: 6, informal_upright: 5, slanting: 4, cascade: 5, literati: 3,
  };
  return p[style];
}

export function apexRequired(style: BonsaiStyle): boolean {
  return style === "formal_upright" || style === "informal_upright";
}

export function yearsToMature(style: BonsaiStyle): number {
  const y: Record<BonsaiStyle, number> = {
    formal_upright: 15, informal_upright: 10, slanting: 8, cascade: 12, literati: 7,
  };
  return y[style];
}

export function difficultyRating(style: BonsaiStyle): number {
  const d: Record<BonsaiStyle, number> = {
    formal_upright: 9, informal_upright: 5, slanting: 6, cascade: 8, literati: 7,
  };
  return d[style];
}

export function costEstimate(style: BonsaiStyle): number {
  const c: Record<BonsaiStyle, number> = {
    formal_upright: 200, informal_upright: 100, slanting: 120, cascade: 250, literati: 150,
  };
  return c[style];
}

export function bonsaiStyles(): BonsaiStyle[] {
  return ["formal_upright", "informal_upright", "slanting", "cascade", "literati"];
}
