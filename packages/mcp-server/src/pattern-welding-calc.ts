export type PatternType = "twist" | "ladder" | "herringbone" | "serpent" | "star";

export function layerCount(type: PatternType): number {
  const l: Record<PatternType, number> = {
    twist: 200, ladder: 150, herringbone: 300, serpent: 250, star: 400,
  };
  return l[type];
}

export function foldCycles(type: PatternType): number {
  const f: Record<PatternType, number> = {
    twist: 8, ladder: 6, herringbone: 10, serpent: 9, star: 12,
  };
  return f[type];
}

export function weldTempCelsius(type: PatternType): number {
  const t: Record<PatternType, number> = {
    twist: 1200, ladder: 1150, herringbone: 1250, serpent: 1200, star: 1300,
  };
  return t[type];
}

export function etchingTimeMins(type: PatternType): number {
  const e: Record<PatternType, number> = {
    twist: 15, ladder: 10, herringbone: 20, serpent: 18, star: 25,
  };
  return e[type];
}

export function patternVisibility(type: PatternType): number {
  const v: Record<PatternType, number> = {
    twist: 7, ladder: 8, herringbone: 6, serpent: 9, star: 10,
  };
  return v[type];
}

export function steelTypesRequired(type: PatternType): number {
  const s: Record<PatternType, number> = {
    twist: 2, ladder: 2, herringbone: 3, serpent: 2, star: 4,
  };
  return s[type];
}

export function difficultyRating(type: PatternType): number {
  const d: Record<PatternType, number> = {
    twist: 5, ladder: 4, herringbone: 7, serpent: 6, star: 9,
  };
  return d[type];
}

export function forgeTimeHours(type: PatternType): number {
  const h: Record<PatternType, number> = {
    twist: 8, ladder: 6, herringbone: 12, serpent: 10, star: 16,
  };
  return h[type];
}

export function costMultiplier(type: PatternType): number {
  const c: Record<PatternType, number> = {
    twist: 2, ladder: 1.5, herringbone: 3, serpent: 2.5, star: 5,
  };
  return c[type];
}

export function patternTypes(): PatternType[] {
  return ["twist", "ladder", "herringbone", "serpent", "star"];
}
