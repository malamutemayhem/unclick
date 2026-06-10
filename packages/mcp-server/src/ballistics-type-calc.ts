export type BallisticsType = "internal" | "external" | "terminal" | "forensic" | "transitional";

export function complexityScore(b: BallisticsType): number {
  const m: Record<BallisticsType, number> = {
    internal: 8, external: 9, terminal: 7, forensic: 10, transitional: 6,
  };
  return m[b];
}

export function fieldApplications(b: BallisticsType): number {
  const m: Record<BallisticsType, number> = {
    internal: 6, external: 8, terminal: 7, forensic: 10, transitional: 4,
  };
  return m[b];
}

export function instrumentationCost(b: BallisticsType): number {
  const m: Record<BallisticsType, number> = {
    internal: 7, external: 6, terminal: 5, forensic: 9, transitional: 8,
  };
  return m[b];
}

export function dataPointsGenerated(b: BallisticsType): number {
  const m: Record<BallisticsType, number> = {
    internal: 7, external: 10, terminal: 6, forensic: 8, transitional: 5,
  };
  return m[b];
}

export function courtRelevance(b: BallisticsType): number {
  const m: Record<BallisticsType, number> = {
    internal: 4, external: 5, terminal: 6, forensic: 10, transitional: 3,
  };
  return m[b];
}

export function requiresLabFacility(b: BallisticsType): boolean {
  const m: Record<BallisticsType, boolean> = {
    internal: true, external: false, terminal: true, forensic: true, transitional: true,
  };
  return m[b];
}

export function usedInCriminalCases(b: BallisticsType): boolean {
  const m: Record<BallisticsType, boolean> = {
    internal: false, external: false, terminal: true, forensic: true, transitional: false,
  };
  return m[b];
}

export function primaryFocus(b: BallisticsType): string {
  const m: Record<BallisticsType, string> = {
    internal: "barrel_chamber_propellant", external: "trajectory_flight_path",
    terminal: "impact_penetration", forensic: "firearm_identification",
    transitional: "muzzle_exit_behavior",
  };
  return m[b];
}

export function keyMeasurement(b: BallisticsType): string {
  const m: Record<BallisticsType, string> = {
    internal: "chamber_pressure", external: "velocity_drop_angle",
    terminal: "energy_transfer", forensic: "rifling_marks",
    transitional: "muzzle_velocity",
  };
  return m[b];
}

export function ballisticsTypes(): BallisticsType[] {
  return ["internal", "external", "terminal", "forensic", "transitional"];
}
