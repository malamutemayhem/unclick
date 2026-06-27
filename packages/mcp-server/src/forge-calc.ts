export type ForgeType = "coal" | "charcoal" | "gas" | "induction" | "electric";

export function maxTempCelsius(type: ForgeType): number {
  const t: Record<ForgeType, number> = {
    coal: 1500, charcoal: 1300, gas: 1260, induction: 1600, electric: 1200,
  };
  return t[type];
}

export function heatupTimeMinutes(type: ForgeType): number {
  const t: Record<ForgeType, number> = {
    coal: 20, charcoal: 25, gas: 10, induction: 2, electric: 30,
  };
  return t[type];
}

export function fuelCostRating(type: ForgeType): number {
  const c: Record<ForgeType, number> = {
    coal: 4, charcoal: 6, gas: 5, induction: 3, electric: 7,
  };
  return c[type];
}

export function portability(type: ForgeType): number {
  const p: Record<ForgeType, number> = {
    coal: 3, charcoal: 4, gas: 7, induction: 8, electric: 6,
  };
  return p[type];
}

export function ventilationRequired(type: ForgeType): boolean {
  return type === "coal" || type === "charcoal" || type === "gas";
}

export function tempControlPrecision(type: ForgeType): number {
  const tc: Record<ForgeType, number> = {
    coal: 3, charcoal: 2, gas: 6, induction: 9, electric: 8,
  };
  return tc[type];
}

export function smokeLevel(type: ForgeType): number {
  const s: Record<ForgeType, number> = {
    coal: 9, charcoal: 7, gas: 2, induction: 0, electric: 0,
  };
  return s[type];
}

export function noiseLevel(type: ForgeType): number {
  const n: Record<ForgeType, number> = {
    coal: 4, charcoal: 3, gas: 6, induction: 7, electric: 2,
  };
  return n[type];
}

export function costEstimate(type: ForgeType): number {
  const c: Record<ForgeType, number> = {
    coal: 300, charcoal: 200, gas: 500, induction: 2000, electric: 800,
  };
  return c[type];
}

export function forgeTypes(): ForgeType[] {
  return ["coal", "charcoal", "gas", "induction", "electric"];
}
