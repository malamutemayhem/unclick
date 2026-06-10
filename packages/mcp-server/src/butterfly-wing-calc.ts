export type ButterflyWing = "monarch" | "morpho" | "swallowtail" | "painted_lady" | "glasswing";

export function wingspanCm(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 10, morpho: 15, swallowtail: 12, painted_lady: 7, glasswing: 6,
  };
  return m[wing];
}

export function colorIntensity(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 8, morpho: 10, swallowtail: 7, painted_lady: 6, glasswing: 2,
  };
  return m[wing];
}

export function iridescence(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 3, morpho: 10, swallowtail: 4, painted_lady: 2, glasswing: 5,
  };
  return m[wing];
}

export function migrationDistanceKm(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 4000, morpho: 0, swallowtail: 500, painted_lady: 15000, glasswing: 0,
  };
  return m[wing];
}

export function lifespanWeeks(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 8, morpho: 12, swallowtail: 4, painted_lady: 4, glasswing: 10,
  };
  return m[wing];
}

export function transparentWings(wing: ButterflyWing): boolean {
  const m: Record<ButterflyWing, boolean> = {
    monarch: false, morpho: false, swallowtail: false, painted_lady: false, glasswing: true,
  };
  return m[wing];
}

export function migratory(wing: ButterflyWing): boolean {
  const m: Record<ButterflyWing, boolean> = {
    monarch: true, morpho: false, swallowtail: false, painted_lady: true, glasswing: false,
  };
  return m[wing];
}

export function habitat(wing: ButterflyWing): string {
  const m: Record<ButterflyWing, string> = {
    monarch: "meadow", morpho: "tropical_rainforest", swallowtail: "garden",
    painted_lady: "diverse", glasswing: "cloud_forest",
  };
  return m[wing];
}

export function conservationConcern(wing: ButterflyWing): number {
  const m: Record<ButterflyWing, number> = {
    monarch: 8, morpho: 5, swallowtail: 4, painted_lady: 2, glasswing: 6,
  };
  return m[wing];
}

export function butterflyWings(): ButterflyWing[] {
  return ["monarch", "morpho", "swallowtail", "painted_lady", "glasswing"];
}
