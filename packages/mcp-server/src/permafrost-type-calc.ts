export type PermafrostType = "continuous" | "discontinuous" | "sporadic" | "subsea" | "alpine";

export function groundIceContent(p: PermafrostType): number {
  const m: Record<PermafrostType, number> = {
    continuous: 9, discontinuous: 6, sporadic: 4, subsea: 7, alpine: 5,
  };
  return m[p];
}

export function thermalStability(p: PermafrostType): number {
  const m: Record<PermafrostType, number> = {
    continuous: 10, discontinuous: 5, sporadic: 3, subsea: 7, alpine: 4,
  };
  return m[p];
}

export function carbonStorage(p: PermafrostType): number {
  const m: Record<PermafrostType, number> = {
    continuous: 10, discontinuous: 7, sporadic: 4, subsea: 8, alpine: 3,
  };
  return m[p];
}

export function thawVulnerability(p: PermafrostType): number {
  const m: Record<PermafrostType, number> = {
    continuous: 3, discontinuous: 7, sporadic: 9, subsea: 6, alpine: 8,
  };
  return m[p];
}

export function infrastructureRisk(p: PermafrostType): number {
  const m: Record<PermafrostType, number> = {
    continuous: 7, discontinuous: 9, sporadic: 6, subsea: 4, alpine: 8,
  };
  return m[p];
}

export function yearRound(p: PermafrostType): boolean {
  const m: Record<PermafrostType, boolean> = {
    continuous: true, discontinuous: false, sporadic: false, subsea: true, alpine: false,
  };
  return m[p];
}

export function accessibleByRoad(p: PermafrostType): boolean {
  const m: Record<PermafrostType, boolean> = {
    continuous: true, discontinuous: true, sporadic: true, subsea: false, alpine: false,
  };
  return m[p];
}

export function typicalLocation(p: PermafrostType): string {
  const m: Record<PermafrostType, string> = {
    continuous: "high_arctic_siberia", discontinuous: "subarctic_taiga",
    sporadic: "boreal_forest_margin", subsea: "arctic_continental_shelf",
    alpine: "mountain_high_elevation",
  };
  return m[p];
}

export function meanAnnualTemp(p: PermafrostType): string {
  const m: Record<PermafrostType, string> = {
    continuous: "below_minus_5c", discontinuous: "minus_2_to_minus_5c",
    sporadic: "minus_1_to_minus_2c", subsea: "around_minus_1c",
    alpine: "variable_elevation_dependent",
  };
  return m[p];
}

export function permafrostTypes(): PermafrostType[] {
  return ["continuous", "discontinuous", "sporadic", "subsea", "alpine"];
}
