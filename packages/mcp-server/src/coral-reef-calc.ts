export type CoralReefType = "fringing" | "barrier" | "atoll" | "patch" | "bank";

export function biodiversity(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 7, barrier: 10, atoll: 8, patch: 5, bank: 4,
  };
  return m[reef];
}

export function depthMeters(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 15, barrier: 40, atoll: 30, patch: 10, bank: 50,
  };
  return m[reef];
}

export function distanceFromShoreKm(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 0.1, barrier: 30, atoll: 50, patch: 5, bank: 100,
  };
  return m[reef];
}

export function growthRateCmPerYear(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 2, barrier: 1.5, atoll: 1, patch: 2.5, bank: 0.5,
  };
  return m[reef];
}

export function waveProtection(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 7, barrier: 10, atoll: 8, patch: 3, bank: 2,
  };
  return m[reef];
}

export function lagoonPresent(reef: CoralReefType): boolean {
  const m: Record<CoralReefType, boolean> = {
    fringing: false, barrier: true, atoll: true, patch: false, bank: false,
  };
  return m[reef];
}

export function volcanicOrigin(reef: CoralReefType): boolean {
  const m: Record<CoralReefType, boolean> = {
    fringing: false, barrier: false, atoll: true, patch: false, bank: false,
  };
  return m[reef];
}

export function exampleReef(reef: CoralReefType): string {
  const m: Record<CoralReefType, string> = {
    fringing: "red_sea_coast", barrier: "great_barrier_reef", atoll: "maldives",
    patch: "florida_keys_patches", bank: "flower_garden_banks",
  };
  return m[reef];
}

export function bleachingVulnerability(reef: CoralReefType): number {
  const m: Record<CoralReefType, number> = {
    fringing: 8, barrier: 6, atoll: 7, patch: 9, bank: 4,
  };
  return m[reef];
}

export function coralReefTypes(): CoralReefType[] {
  return ["fringing", "barrier", "atoll", "patch", "bank"];
}
