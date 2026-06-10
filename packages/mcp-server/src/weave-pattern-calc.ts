export type WeavePattern = "plain" | "twill" | "satin" | "basket" | "herringbone";

export function threadCount(pattern: WeavePattern): number {
  const t: Record<WeavePattern, number> = {
    plain: 40, twill: 60, satin: 80, basket: 30, herringbone: 70,
  };
  return t[pattern];
}

export function drapeability(pattern: WeavePattern): number {
  const d: Record<WeavePattern, number> = {
    plain: 4, twill: 7, satin: 10, basket: 2, herringbone: 6,
  };
  return d[pattern];
}

export function durability(pattern: WeavePattern): number {
  const d: Record<WeavePattern, number> = {
    plain: 8, twill: 9, satin: 4, basket: 7, herringbone: 8,
  };
  return d[pattern];
}

export function sheenLevel(pattern: WeavePattern): number {
  const s: Record<WeavePattern, number> = {
    plain: 2, twill: 5, satin: 10, basket: 1, herringbone: 4,
  };
  return s[pattern];
}

export function reversible(pattern: WeavePattern): boolean {
  const r: Record<WeavePattern, boolean> = {
    plain: true, twill: false, satin: false, basket: true, herringbone: true,
  };
  return r[pattern];
}

export function weavingDifficulty(pattern: WeavePattern): number {
  const w: Record<WeavePattern, number> = {
    plain: 1, twill: 4, satin: 7, basket: 2, herringbone: 5,
  };
  return w[pattern];
}

export function minShafts(pattern: WeavePattern): number {
  const m: Record<WeavePattern, number> = {
    plain: 2, twill: 3, satin: 5, basket: 2, herringbone: 4,
  };
  return m[pattern];
}

export function bestApplication(pattern: WeavePattern): string {
  const b: Record<WeavePattern, string> = {
    plain: "towels", twill: "denim", satin: "evening_wear",
    basket: "placemats", herringbone: "suiting",
  };
  return b[pattern];
}

export function yarnWastePercent(pattern: WeavePattern): number {
  const y: Record<WeavePattern, number> = {
    plain: 5, twill: 8, satin: 12, basket: 6, herringbone: 10,
  };
  return y[pattern];
}

export function weavePatterns(): WeavePattern[] {
  return ["plain", "twill", "satin", "basket", "herringbone"];
}
