export type FiringType = "oxidation" | "reduction" | "salt" | "soda" | "wood_fired";

export function peakTempCelsius(firing: FiringType): number {
  const t: Record<FiringType, number> = {
    oxidation: 1260, reduction: 1280, salt: 1300, soda: 1280, wood_fired: 1350,
  };
  return t[firing];
}

export function firingHours(firing: FiringType): number {
  const h: Record<FiringType, number> = {
    oxidation: 10, reduction: 12, salt: 14, soda: 13, wood_fired: 48,
  };
  return h[firing];
}

export function atmosphereControl(firing: FiringType): number {
  const a: Record<FiringType, number> = {
    oxidation: 8, reduction: 9, salt: 6, soda: 7, wood_fired: 3,
  };
  return a[firing];
}

export function surfaceEffects(firing: FiringType): number {
  const s: Record<FiringType, number> = {
    oxidation: 4, reduction: 7, salt: 9, soda: 8, wood_fired: 10,
  };
  return s[firing];
}

export function fuelType(firing: FiringType): string {
  const f: Record<FiringType, string> = {
    oxidation: "electric", reduction: "gas", salt: "gas",
    soda: "gas", wood_fired: "wood",
  };
  return f[firing];
}

export function predictability(firing: FiringType): number {
  const p: Record<FiringType, number> = {
    oxidation: 9, reduction: 6, salt: 4, soda: 5, wood_fired: 2,
  };
  return p[firing];
}

export function environmentalImpact(firing: FiringType): number {
  const e: Record<FiringType, number> = {
    oxidation: 3, reduction: 5, salt: 8, soda: 6, wood_fired: 7,
  };
  return e[firing];
}

export function skillRequired(firing: FiringType): number {
  const s: Record<FiringType, number> = {
    oxidation: 3, reduction: 6, salt: 8, soda: 7, wood_fired: 9,
  };
  return s[firing];
}

export function costPerFiring(firing: FiringType): number {
  const c: Record<FiringType, number> = {
    oxidation: 50, reduction: 80, salt: 120, soda: 100, wood_fired: 200,
  };
  return c[firing];
}

export function firingTypes(): FiringType[] {
  return ["oxidation", "reduction", "salt", "soda", "wood_fired"];
}
