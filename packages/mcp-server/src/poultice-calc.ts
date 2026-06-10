export type PoulticeType = "clay" | "charcoal" | "bread" | "herbal" | "mustard";

export function drawingPower(poultice: PoulticeType): number {
  const d: Record<PoulticeType, number> = {
    clay: 9, charcoal: 10, bread: 5, herbal: 6, mustard: 7,
  };
  return d[poultice];
}

export function applicationMinutes(poultice: PoulticeType): number {
  const a: Record<PoulticeType, number> = {
    clay: 30, charcoal: 20, bread: 60, herbal: 45, mustard: 15,
  };
  return a[poultice];
}

export function heatGeneration(poultice: PoulticeType): number {
  const h: Record<PoulticeType, number> = {
    clay: 3, charcoal: 2, bread: 4, herbal: 5, mustard: 9,
  };
  return h[poultice];
}

export function prepTimeMinutes(poultice: PoulticeType): number {
  const p: Record<PoulticeType, number> = {
    clay: 5, charcoal: 10, bread: 15, herbal: 20, mustard: 10,
  };
  return p[poultice];
}

export function reusable(poultice: PoulticeType): boolean {
  const r: Record<PoulticeType, boolean> = {
    clay: true, charcoal: false, bread: false, herbal: false, mustard: false,
  };
  return r[poultice];
}

export function skinSensitivity(poultice: PoulticeType): number {
  const s: Record<PoulticeType, number> = {
    clay: 2, charcoal: 1, bread: 1, herbal: 4, mustard: 8,
  };
  return s[poultice];
}

export function traditionalUse(poultice: PoulticeType): string {
  const t: Record<PoulticeType, string> = {
    clay: "insect_bites", charcoal: "poison_draw", bread: "splinters",
    herbal: "inflammation", mustard: "chest_congestion",
  };
  return t[poultice];
}

export function ingredientAvailability(poultice: PoulticeType): number {
  const i: Record<PoulticeType, number> = {
    clay: 6, charcoal: 7, bread: 10, herbal: 5, mustard: 8,
  };
  return i[poultice];
}

export function costRating(poultice: PoulticeType): number {
  const c: Record<PoulticeType, number> = {
    clay: 3, charcoal: 4, bread: 1, herbal: 6, mustard: 2,
  };
  return c[poultice];
}

export function poulticeTypes(): PoulticeType[] {
  return ["clay", "charcoal", "bread", "herbal", "mustard"];
}
