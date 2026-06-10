export type ClayOvenType = "cob_oven" | "brick_oven" | "tandoori" | "horno" | "taboon";

export function maxTempCelsius(oven: ClayOvenType): number {
  const t: Record<ClayOvenType, number> = {
    cob_oven: 400, brick_oven: 500, tandoori: 480, horno: 350, taboon: 300,
  };
  return t[oven];
}

export function heatRetentionHours(oven: ClayOvenType): number {
  const h: Record<ClayOvenType, number> = {
    cob_oven: 4, brick_oven: 8, tandoori: 3, horno: 6, taboon: 2,
  };
  return h[oven];
}

export function preheatTimeMinutes(oven: ClayOvenType): number {
  const m: Record<ClayOvenType, number> = {
    cob_oven: 90, brick_oven: 120, tandoori: 60, horno: 90, taboon: 45,
  };
  return m[oven];
}

export function wallThicknessCm(oven: ClayOvenType): number {
  const w: Record<ClayOvenType, number> = {
    cob_oven: 15, brick_oven: 20, tandoori: 8, horno: 18, taboon: 10,
  };
  return w[oven];
}

export function cookingCapacity(oven: ClayOvenType): number {
  const c: Record<ClayOvenType, number> = {
    cob_oven: 6, brick_oven: 9, tandoori: 5, horno: 7, taboon: 4,
  };
  return c[oven];
}

export function portability(oven: ClayOvenType): boolean {
  return oven === "taboon" || oven === "tandoori";
}

export function buildTimedays(oven: ClayOvenType): number {
  const d: Record<ClayOvenType, number> = {
    cob_oven: 3, brick_oven: 14, tandoori: 2, horno: 7, taboon: 1,
  };
  return d[oven];
}

export function bestForFood(oven: ClayOvenType): string {
  const f: Record<ClayOvenType, string> = {
    cob_oven: "bread", brick_oven: "pizza", tandoori: "flatbread",
    horno: "slow_roast", taboon: "pita",
  };
  return f[oven];
}

export function costEstimate(oven: ClayOvenType): number {
  const c: Record<ClayOvenType, number> = {
    cob_oven: 100, brick_oven: 2000, tandoori: 300, horno: 500, taboon: 50,
  };
  return c[oven];
}

export function clayOvenTypes(): ClayOvenType[] {
  return ["cob_oven", "brick_oven", "tandoori", "horno", "taboon"];
}
