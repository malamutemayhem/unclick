export type SalvageMethod = "crane_barge" | "cofferdam" | "pontoon_lift" | "compressed_air" | "cutting_parbuckle";

export function liftCapacity(s: SalvageMethod): number {
  const m: Record<SalvageMethod, number> = {
    crane_barge: 10, cofferdam: 7, pontoon_lift: 8, compressed_air: 6, cutting_parbuckle: 9,
  };
  return m[s];
}

export function depthCapability(s: SalvageMethod): number {
  const m: Record<SalvageMethod, number> = {
    crane_barge: 6, cofferdam: 3, pontoon_lift: 7, compressed_air: 8, cutting_parbuckle: 5,
  };
  return m[s];
}

export function operationSpeed(s: SalvageMethod): number {
  const m: Record<SalvageMethod, number> = {
    crane_barge: 8, cofferdam: 3, pontoon_lift: 5, compressed_air: 6, cutting_parbuckle: 4,
  };
  return m[s];
}

export function environmentalRisk(s: SalvageMethod): number {
  const m: Record<SalvageMethod, number> = {
    crane_barge: 4, cofferdam: 3, pontoon_lift: 5, compressed_air: 6, cutting_parbuckle: 7,
  };
  return m[s];
}

export function projectCost(s: SalvageMethod): number {
  const m: Record<SalvageMethod, number> = {
    crane_barge: 8, cofferdam: 10, pontoon_lift: 7, compressed_air: 5, cutting_parbuckle: 9,
  };
  return m[s];
}

export function requiresDivers(s: SalvageMethod): boolean {
  const m: Record<SalvageMethod, boolean> = {
    crane_barge: true, cofferdam: true, pontoon_lift: true, compressed_air: true, cutting_parbuckle: true,
  };
  return m[s];
}

export function preservesHull(s: SalvageMethod): boolean {
  const m: Record<SalvageMethod, boolean> = {
    crane_barge: true, cofferdam: true, pontoon_lift: true, compressed_air: true, cutting_parbuckle: false,
  };
  return m[s];
}

export function primaryEquipment(s: SalvageMethod): string {
  const m: Record<SalvageMethod, string> = {
    crane_barge: "floating_crane_derrick", cofferdam: "steel_watertight_enclosure",
    pontoon_lift: "inflatable_buoyancy_tank", compressed_air: "air_injection_pump_system",
    cutting_parbuckle: "wire_rope_winch_roller",
  };
  return m[s];
}

export function bestScenario(s: SalvageMethod): string {
  const m: Record<SalvageMethod, string> = {
    crane_barge: "heavy_vessel_shallow_water", cofferdam: "historic_wreck_in_situ",
    pontoon_lift: "medium_vessel_moderate_depth", compressed_air: "intact_hull_refloat",
    cutting_parbuckle: "capsized_vessel_rotation",
  };
  return m[s];
}

export function salvageMethods(): SalvageMethod[] {
  return ["crane_barge", "cofferdam", "pontoon_lift", "compressed_air", "cutting_parbuckle"];
}
