export type BobbinLaceStyle = "torchon" | "cluny" | "honiton" | "bruges" | "chantilly";

export function bobbinsRequired(style: BobbinLaceStyle): number {
  const b: Record<BobbinLaceStyle, number> = {
    torchon: 20, cluny: 16, honiton: 12, bruges: 24, chantilly: 30,
  };
  return b[style];
}

export function threadWeightTex(style: BobbinLaceStyle): number {
  const t: Record<BobbinLaceStyle, number> = {
    torchon: 30, cluny: 40, honiton: 10, bruges: 25, chantilly: 8,
  };
  return t[style];
}

export function gridAngleDeg(style: BobbinLaceStyle): number {
  const g: Record<BobbinLaceStyle, number> = {
    torchon: 45, cluny: 60, honiton: 0, bruges: 45, chantilly: 30,
  };
  return g[style];
}

export function detailLevel(style: BobbinLaceStyle): number {
  const d: Record<BobbinLaceStyle, number> = {
    torchon: 5, cluny: 4, honiton: 9, bruges: 7, chantilly: 10,
  };
  return d[style];
}

export function freeformDesign(style: BobbinLaceStyle): boolean {
  return style === "honiton" || style === "bruges";
}

export function hoursPerCm2(style: BobbinLaceStyle): number {
  const h: Record<BobbinLaceStyle, number> = {
    torchon: 0.5, cluny: 0.4, honiton: 2.0, bruges: 1.2, chantilly: 2.5,
  };
  return h[style];
}

export function pinDensityPerCm2(style: BobbinLaceStyle): number {
  const p: Record<BobbinLaceStyle, number> = {
    torchon: 4, cluny: 3, honiton: 8, bruges: 5, chantilly: 10,
  };
  return p[style];
}

export function difficultyRating(style: BobbinLaceStyle): number {
  const d: Record<BobbinLaceStyle, number> = {
    torchon: 3, cluny: 4, honiton: 8, bruges: 6, chantilly: 9,
  };
  return d[style];
}

export function costPerM(style: BobbinLaceStyle): number {
  const c: Record<BobbinLaceStyle, number> = {
    torchon: 50, cluny: 40, honiton: 300, bruges: 150, chantilly: 500,
  };
  return c[style];
}

export function bobbinLaceStyles(): BobbinLaceStyle[] {
  return ["torchon", "cluny", "honiton", "bruges", "chantilly"];
}
