export type ArrowRestType = "whisker_biscuit_full" | "drop_away_limb" | "blade_spring_steel" | "containment_cage_hunt" | "pressure_plunger_recurve";

export function arrowSupport(t: ArrowRestType): number {
  const m: Record<ArrowRestType, number> = {
    whisker_biscuit_full: 10, drop_away_limb: 6, blade_spring_steel: 5, containment_cage_hunt: 9, pressure_plunger_recurve: 4,
  };
  return m[t];
}

export function fletchingClearance(t: ArrowRestType): number {
  const m: Record<ArrowRestType, number> = {
    whisker_biscuit_full: 5, drop_away_limb: 10, blade_spring_steel: 9, containment_cage_hunt: 6, pressure_plunger_recurve: 8,
  };
  return m[t];
}

export function accuracy(t: ArrowRestType): number {
  const m: Record<ArrowRestType, number> = {
    whisker_biscuit_full: 7, drop_away_limb: 10, blade_spring_steel: 9, containment_cage_hunt: 7, pressure_plunger_recurve: 8,
  };
  return m[t];
}

export function setupEase(t: ArrowRestType): number {
  const m: Record<ArrowRestType, number> = {
    whisker_biscuit_full: 9, drop_away_limb: 4, blade_spring_steel: 6, containment_cage_hunt: 8, pressure_plunger_recurve: 5,
  };
  return m[t];
}

export function restCost(t: ArrowRestType): number {
  const m: Record<ArrowRestType, number> = {
    whisker_biscuit_full: 5, drop_away_limb: 9, blade_spring_steel: 7, containment_cage_hunt: 6, pressure_plunger_recurve: 4,
  };
  return m[t];
}

export function fullContainment(t: ArrowRestType): boolean {
  const m: Record<ArrowRestType, boolean> = {
    whisker_biscuit_full: true, drop_away_limb: false, blade_spring_steel: false, containment_cage_hunt: true, pressure_plunger_recurve: false,
  };
  return m[t];
}

export function needsTiming(t: ArrowRestType): boolean {
  const m: Record<ArrowRestType, boolean> = {
    whisker_biscuit_full: false, drop_away_limb: true, blade_spring_steel: false, containment_cage_hunt: false, pressure_plunger_recurve: false,
  };
  return m[t];
}

export function restMechanism(t: ArrowRestType): string {
  const m: Record<ArrowRestType, string> = {
    whisker_biscuit_full: "bristle_ring_surround",
    drop_away_limb: "cable_driven_fall_away",
    blade_spring_steel: "launcher_blade_spring",
    containment_cage_hunt: "wire_prong_capture",
    pressure_plunger_recurve: "button_plunger_cushion",
  };
  return m[t];
}

export function bestShooter(t: ArrowRestType): string {
  const m: Record<ArrowRestType, string> = {
    whisker_biscuit_full: "beginner_hunter_reliable",
    drop_away_limb: "tournament_target_pro",
    blade_spring_steel: "competitive_3d_shoot",
    containment_cage_hunt: "treestand_spot_stalk",
    pressure_plunger_recurve: "olympic_recurve_archer",
  };
  return m[t];
}

export function arrowRests(): ArrowRestType[] {
  return ["whisker_biscuit_full", "drop_away_limb", "blade_spring_steel", "containment_cage_hunt", "pressure_plunger_recurve"];
}
