export type RubbleType = "random" | "coursed" | "squared" | "polygonal" | "flint";

export function wallThicknessCm(type: RubbleType): number {
  const t: Record<RubbleType, number> = {
    random: 60, coursed: 50, squared: 45, polygonal: 55, flint: 40,
  };
  return t[type];
}

export function stonesPerM2(type: RubbleType): number {
  const s: Record<RubbleType, number> = {
    random: 80, coursed: 60, squared: 40, polygonal: 50, flint: 100,
  };
  return s[type];
}

export function mortarPercent(type: RubbleType): number {
  const m: Record<RubbleType, number> = {
    random: 35, coursed: 25, squared: 15, polygonal: 10, flint: 30,
  };
  return m[type];
}

export function dressLevelRequired(type: RubbleType): number {
  const d: Record<RubbleType, number> = {
    random: 1, coursed: 3, squared: 7, polygonal: 8, flint: 2,
  };
  return d[type];
}

export function loadBearingRating(type: RubbleType): number {
  const l: Record<RubbleType, number> = {
    random: 5, coursed: 7, squared: 9, polygonal: 8, flint: 4,
  };
  return l[type];
}

export function weatherResistance(type: RubbleType): number {
  const w: Record<RubbleType, number> = {
    random: 6, coursed: 7, squared: 8, polygonal: 9, flint: 10,
  };
  return w[type];
}

export function buildSpeedM2PerDay(type: RubbleType): number {
  const s: Record<RubbleType, number> = {
    random: 3, coursed: 2.5, squared: 1.5, polygonal: 1, flint: 2,
  };
  return s[type];
}

export function aestheticRating(type: RubbleType): number {
  const a: Record<RubbleType, number> = {
    random: 5, coursed: 7, squared: 8, polygonal: 9, flint: 8,
  };
  return a[type];
}

export function costPerM2(type: RubbleType): number {
  const c: Record<RubbleType, number> = {
    random: 150, coursed: 250, squared: 400, polygonal: 500, flint: 350,
  };
  return c[type];
}

export function rubbleTypes(): RubbleType[] {
  return ["random", "coursed", "squared", "polygonal", "flint"];
}
