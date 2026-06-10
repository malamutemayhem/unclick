export type QuernType = "saddle" | "rotary_hand" | "beehive" | "flat_disc" | "pompeian";

export function grindRateKgPerHour(type: QuernType): number {
  const r: Record<QuernType, number> = {
    saddle: 2, rotary_hand: 5, beehive: 4, flat_disc: 3, pompeian: 15,
  };
  return r[type];
}

export function stoneWeightKg(type: QuernType): number {
  const w: Record<QuernType, number> = {
    saddle: 5, rotary_hand: 12, beehive: 20, flat_disc: 8, pompeian: 100,
  };
  return w[type];
}

export function flourFineness(type: QuernType): number {
  const f: Record<QuernType, number> = {
    saddle: 3, rotary_hand: 7, beehive: 6, flat_disc: 5, pompeian: 9,
  };
  return f[type];
}

export function operatorsNeeded(type: QuernType): number {
  const o: Record<QuernType, number> = {
    saddle: 1, rotary_hand: 1, beehive: 1, flat_disc: 1, pompeian: 2,
  };
  return o[type];
}

export function portability(type: QuernType): boolean {
  return type === "saddle" || type === "flat_disc";
}

export function dressingIntervalHours(type: QuernType): number {
  const d: Record<QuernType, number> = {
    saddle: 20, rotary_hand: 40, beehive: 50, flat_disc: 30, pompeian: 80,
  };
  return d[type];
}

export function grainTypes(type: QuernType): number {
  const g: Record<QuernType, number> = {
    saddle: 3, rotary_hand: 5, beehive: 4, flat_disc: 3, pompeian: 6,
  };
  return g[type];
}

export function effortRating(type: QuernType): number {
  const e: Record<QuernType, number> = {
    saddle: 8, rotary_hand: 5, beehive: 6, flat_disc: 7, pompeian: 4,
  };
  return e[type];
}

export function costEstimate(type: QuernType): number {
  const c: Record<QuernType, number> = {
    saddle: 20, rotary_hand: 80, beehive: 100, flat_disc: 50, pompeian: 500,
  };
  return c[type];
}

export function quernTypes(): QuernType[] {
  return ["saddle", "rotary_hand", "beehive", "flat_disc", "pompeian"];
}
