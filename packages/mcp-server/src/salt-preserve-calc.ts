export type SaltPreserve = "dry_salt" | "wet_brine" | "sugar_cure" | "nitrate_cure" | "smoke_salt";

export function saltConcentrationPercent(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 25, wet_brine: 15, sugar_cure: 10, nitrate_cure: 8, smoke_salt: 20,
  };
  return m[method];
}

export function cureTimeDays(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 14, wet_brine: 7, sugar_cure: 10, nitrate_cure: 21, smoke_salt: 5,
  };
  return m[method];
}

export function moistureExtraction(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 9, wet_brine: 5, sugar_cure: 6, nitrate_cure: 4, smoke_salt: 8,
  };
  return m[method];
}

export function flavorDevelopment(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 5, wet_brine: 6, sugar_cure: 7, nitrate_cure: 8, smoke_salt: 9,
  };
  return m[method];
}

export function shelfLifeMonths(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 12, wet_brine: 6, sugar_cure: 4, nitrate_cure: 8, smoke_salt: 10,
  };
  return m[method];
}

export function colorPreservation(method: SaltPreserve): boolean {
  const m: Record<SaltPreserve, boolean> = {
    dry_salt: false, wet_brine: false, sugar_cure: false, nitrate_cure: true, smoke_salt: false,
  };
  return m[method];
}

export function additionalEquipment(method: SaltPreserve): boolean {
  const m: Record<SaltPreserve, boolean> = {
    dry_salt: false, wet_brine: false, sugar_cure: false, nitrate_cure: false, smoke_salt: true,
  };
  return m[method];
}

export function bestProtein(method: SaltPreserve): string {
  const m: Record<SaltPreserve, string> = {
    dry_salt: "cod_fish", wet_brine: "pork_loin", sugar_cure: "salmon",
    nitrate_cure: "bacon", smoke_salt: "jerky",
  };
  return m[method];
}

export function costPerKg(method: SaltPreserve): number {
  const m: Record<SaltPreserve, number> = {
    dry_salt: 2, wet_brine: 1.5, sugar_cure: 4, nitrate_cure: 6, smoke_salt: 8,
  };
  return m[method];
}

export function saltPreserves(): SaltPreserve[] {
  return ["dry_salt", "wet_brine", "sugar_cure", "nitrate_cure", "smoke_salt"];
}
