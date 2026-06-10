export type CampChairType = "folding_quad_standard" | "backpacking_ultralight" | "rocking_camp_rocker" | "zero_gravity_recline" | "stool_tripod_compact";

export function comfort(t: CampChairType): number {
  const m: Record<CampChairType, number> = {
    folding_quad_standard: 7, backpacking_ultralight: 4, rocking_camp_rocker: 9, zero_gravity_recline: 10, stool_tripod_compact: 3,
  };
  return m[t];
}

export function portability(t: CampChairType): number {
  const m: Record<CampChairType, number> = {
    folding_quad_standard: 5, backpacking_ultralight: 10, rocking_camp_rocker: 4, zero_gravity_recline: 2, stool_tripod_compact: 9,
  };
  return m[t];
}

export function weightCapacity(t: CampChairType): number {
  const m: Record<CampChairType, number> = {
    folding_quad_standard: 7, backpacking_ultralight: 4, rocking_camp_rocker: 6, zero_gravity_recline: 9, stool_tripod_compact: 5,
  };
  return m[t];
}

export function setupSpeed(t: CampChairType): number {
  const m: Record<CampChairType, number> = {
    folding_quad_standard: 10, backpacking_ultralight: 6, rocking_camp_rocker: 7, zero_gravity_recline: 5, stool_tripod_compact: 9,
  };
  return m[t];
}

export function chairCost(t: CampChairType): number {
  const m: Record<CampChairType, number> = {
    folding_quad_standard: 4, backpacking_ultralight: 8, rocking_camp_rocker: 7, zero_gravity_recline: 9, stool_tripod_compact: 3,
  };
  return m[t];
}

export function hasCupHolder(t: CampChairType): boolean {
  const m: Record<CampChairType, boolean> = {
    folding_quad_standard: true, backpacking_ultralight: false, rocking_camp_rocker: true, zero_gravity_recline: true, stool_tripod_compact: false,
  };
  return m[t];
}

export function hasBackRest(t: CampChairType): boolean {
  const m: Record<CampChairType, boolean> = {
    folding_quad_standard: true, backpacking_ultralight: true, rocking_camp_rocker: true, zero_gravity_recline: true, stool_tripod_compact: false,
  };
  return m[t];
}

export function frameMaterial(t: CampChairType): string {
  const m: Record<CampChairType, string> = {
    folding_quad_standard: "powder_coated_steel",
    backpacking_ultralight: "dac_aluminum_alloy",
    rocking_camp_rocker: "steel_spring_runner",
    zero_gravity_recline: "textilene_steel_frame",
    stool_tripod_compact: "aluminum_three_leg",
  };
  return m[t];
}

export function bestScene(t: CampChairType): string {
  const m: Record<CampChairType, string> = {
    folding_quad_standard: "car_camp_tailgate",
    backpacking_ultralight: "backpack_trail_summit",
    rocking_camp_rocker: "campfire_porch_relax",
    zero_gravity_recline: "beach_patio_stargazing",
    stool_tripod_compact: "festival_fishing_quick",
  };
  return m[t];
}

export function campChairs(): CampChairType[] {
  return ["folding_quad_standard", "backpacking_ultralight", "rocking_camp_rocker", "zero_gravity_recline", "stool_tripod_compact"];
}
