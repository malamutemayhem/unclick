export type BarrelType = "oak_new" | "oak_used" | "bourbon" | "wine" | "sherry";

export function agingMonthsMin(type: BarrelType): number {
  const m: Record<BarrelType, number> = {
    oak_new: 3, oak_used: 6, bourbon: 4, wine: 6, sherry: 12,
  };
  return m[type];
}

export function flavorIntensity(type: BarrelType): number {
  const f: Record<BarrelType, number> = {
    oak_new: 9, oak_used: 4, bourbon: 8, wine: 6, sherry: 7,
  };
  return f[type];
}

export function vanillinContribution(type: BarrelType): number {
  const v: Record<BarrelType, number> = {
    oak_new: 9, oak_used: 3, bourbon: 7, wine: 2, sherry: 4,
  };
  return v[type];
}

export function tanninLevel(type: BarrelType): number {
  const t: Record<BarrelType, number> = {
    oak_new: 8, oak_used: 3, bourbon: 5, wine: 6, sherry: 4,
  };
  return t[type];
}

export function volumeGallons(type: BarrelType): number {
  const v: Record<BarrelType, number> = {
    oak_new: 53, oak_used: 53, bourbon: 53, wine: 59, sherry: 132,
  };
  return v[type];
}

export function charLevel(type: BarrelType): number {
  const c: Record<BarrelType, number> = {
    oak_new: 4, oak_used: 1, bourbon: 4, wine: 0, sherry: 0,
  };
  return c[type];
}

export function usesRemaining(type: BarrelType): number {
  const u: Record<BarrelType, number> = {
    oak_new: 3, oak_used: 1, bourbon: 2, wine: 2, sherry: 3,
  };
  return u[type];
}

export function oxygenPermeability(type: BarrelType): number {
  const o: Record<BarrelType, number> = {
    oak_new: 3, oak_used: 5, bourbon: 4, wine: 4, sherry: 6,
  };
  return o[type];
}

export function costEstimate(type: BarrelType): number {
  const c: Record<BarrelType, number> = {
    oak_new: 400, oak_used: 100, bourbon: 150, wine: 200, sherry: 500,
  };
  return c[type];
}

export function barrelTypes(): BarrelType[] {
  return ["oak_new", "oak_used", "bourbon", "wine", "sherry"];
}
