export type SubmersibleType = "rov" | "auv" | "manned_sub" | "hybrid_rov" | "glider";

export function depthRating(s: SubmersibleType): number {
  const m: Record<SubmersibleType, number> = {
    rov: 8, auv: 7, manned_sub: 10, hybrid_rov: 9, glider: 5,
  };
  return m[s];
}

export function missionDuration(s: SubmersibleType): number {
  const m: Record<SubmersibleType, number> = {
    rov: 6, auv: 9, manned_sub: 4, hybrid_rov: 7, glider: 10,
  };
  return m[s];
}

export function maneuverability(s: SubmersibleType): number {
  const m: Record<SubmersibleType, number> = {
    rov: 9, auv: 6, manned_sub: 7, hybrid_rov: 10, glider: 3,
  };
  return m[s];
}

export function payloadCapacity(s: SubmersibleType): number {
  const m: Record<SubmersibleType, number> = {
    rov: 7, auv: 5, manned_sub: 10, hybrid_rov: 8, glider: 2,
  };
  return m[s];
}

export function operatingCost(s: SubmersibleType): number {
  const m: Record<SubmersibleType, number> = {
    rov: 6, auv: 4, manned_sub: 10, hybrid_rov: 7, glider: 2,
  };
  return m[s];
}

export function requiresTether(s: SubmersibleType): boolean {
  const m: Record<SubmersibleType, boolean> = {
    rov: true, auv: false, manned_sub: false, hybrid_rov: true, glider: false,
  };
  return m[s];
}

export function requiresCrew(s: SubmersibleType): boolean {
  const m: Record<SubmersibleType, boolean> = {
    rov: false, auv: false, manned_sub: true, hybrid_rov: false, glider: false,
  };
  return m[s];
}

export function propulsionSystem(s: SubmersibleType): string {
  const m: Record<SubmersibleType, string> = {
    rov: "electric_thruster_array", auv: "propeller_battery_pack",
    manned_sub: "battery_electric_ballast", hybrid_rov: "thruster_with_tether_power",
    glider: "buoyancy_engine_wing",
  };
  return m[s];
}

export function bestMission(s: SubmersibleType): string {
  const m: Record<SubmersibleType, string> = {
    rov: "inspection_manipulation_repair", auv: "survey_mapping_autonomous",
    manned_sub: "deep_exploration_research", hybrid_rov: "complex_intervention_task",
    glider: "long_range_oceanographic_data",
  };
  return m[s];
}

export function submersibleTypes(): SubmersibleType[] {
  return ["rov", "auv", "manned_sub", "hybrid_rov", "glider"];
}
