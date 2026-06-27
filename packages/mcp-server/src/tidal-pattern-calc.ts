export type TidalPattern = "semidiurnal" | "diurnal" | "mixed" | "spring" | "neap";

export function cyclesPerDay(t: TidalPattern): number {
  const m: Record<TidalPattern, number> = {
    semidiurnal: 2, diurnal: 1, mixed: 2, spring: 2, neap: 2,
  };
  return m[t];
}

export function tidalRangeM(t: TidalPattern): number {
  const m: Record<TidalPattern, number> = {
    semidiurnal: 3, diurnal: 1, mixed: 2, spring: 5, neap: 1,
  };
  return m[t];
}

export function predictability(t: TidalPattern): number {
  const m: Record<TidalPattern, number> = {
    semidiurnal: 9, diurnal: 9, mixed: 6, spring: 10, neap: 10,
  };
  return m[t];
}

export function currentStrength(t: TidalPattern): number {
  const m: Record<TidalPattern, number> = {
    semidiurnal: 6, diurnal: 4, mixed: 5, spring: 9, neap: 2,
  };
  return m[t];
}

export function ecologicalImpact(t: TidalPattern): number {
  const m: Record<TidalPattern, number> = {
    semidiurnal: 7, diurnal: 5, mixed: 6, spring: 9, neap: 3,
  };
  return m[t];
}

export function lunarDependent(t: TidalPattern): boolean {
  const m: Record<TidalPattern, boolean> = {
    semidiurnal: true, diurnal: true, mixed: true, spring: true, neap: true,
  };
  return m[t];
}

export function sunAligned(t: TidalPattern): boolean {
  const m: Record<TidalPattern, boolean> = {
    semidiurnal: false, diurnal: false, mixed: false, spring: true, neap: false,
  };
  return m[t];
}

export function commonLocation(t: TidalPattern): string {
  const m: Record<TidalPattern, string> = {
    semidiurnal: "atlantic_coast", diurnal: "gulf_of_mexico",
    mixed: "pacific_coast", spring: "bay_of_fundy",
    neap: "open_ocean",
  };
  return m[t];
}

export function drivingForce(t: TidalPattern): string {
  const m: Record<TidalPattern, string> = {
    semidiurnal: "lunar_gravity", diurnal: "lunar_declination",
    mixed: "combined_forces", spring: "sun_moon_aligned",
    neap: "sun_moon_perpendicular",
  };
  return m[t];
}

export function tidalPatterns(): TidalPattern[] {
  return ["semidiurnal", "diurnal", "mixed", "spring", "neap"];
}
