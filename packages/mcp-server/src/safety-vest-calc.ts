export type SafetyVestType = "class_2_standard_mesh" | "class_3_full_coverage" | "surveyor_multi_pocket" | "breakaway_traffic_snap" | "flame_resistant_modacrylic";

export function visibility(t: SafetyVestType): number {
  const m: Record<SafetyVestType, number> = {
    class_2_standard_mesh: 7, class_3_full_coverage: 10, surveyor_multi_pocket: 8, breakaway_traffic_snap: 7, flame_resistant_modacrylic: 8,
  };
  return m[t];
}

export function breathability(t: SafetyVestType): number {
  const m: Record<SafetyVestType, number> = {
    class_2_standard_mesh: 10, class_3_full_coverage: 5, surveyor_multi_pocket: 6, breakaway_traffic_snap: 9, flame_resistant_modacrylic: 4,
  };
  return m[t];
}

export function pocketCount(t: SafetyVestType): number {
  const m: Record<SafetyVestType, number> = {
    class_2_standard_mesh: 4, class_3_full_coverage: 6, surveyor_multi_pocket: 10, breakaway_traffic_snap: 3, flame_resistant_modacrylic: 5,
  };
  return m[t];
}

export function durability(t: SafetyVestType): number {
  const m: Record<SafetyVestType, number> = {
    class_2_standard_mesh: 5, class_3_full_coverage: 7, surveyor_multi_pocket: 8, breakaway_traffic_snap: 4, flame_resistant_modacrylic: 10,
  };
  return m[t];
}

export function vestCost(t: SafetyVestType): number {
  const m: Record<SafetyVestType, number> = {
    class_2_standard_mesh: 2, class_3_full_coverage: 5, surveyor_multi_pocket: 6, breakaway_traffic_snap: 3, flame_resistant_modacrylic: 8,
  };
  return m[t];
}

export function breakaway(t: SafetyVestType): boolean {
  const m: Record<SafetyVestType, boolean> = {
    class_2_standard_mesh: false, class_3_full_coverage: false, surveyor_multi_pocket: false, breakaway_traffic_snap: true, flame_resistant_modacrylic: false,
  };
  return m[t];
}

export function flameResist(t: SafetyVestType): boolean {
  const m: Record<SafetyVestType, boolean> = {
    class_2_standard_mesh: false, class_3_full_coverage: false, surveyor_multi_pocket: false, breakaway_traffic_snap: false, flame_resistant_modacrylic: true,
  };
  return m[t];
}

export function fabricType(t: SafetyVestType): string {
  const m: Record<SafetyVestType, string> = {
    class_2_standard_mesh: "polyester_mesh_reflective",
    class_3_full_coverage: "solid_poly_360_reflective",
    surveyor_multi_pocket: "heavy_poly_cotton_blend",
    breakaway_traffic_snap: "lightweight_mesh_snap_away",
    flame_resistant_modacrylic: "modacrylic_aramid_blend",
  };
  return m[t];
}

export function bestJob(t: SafetyVestType): string {
  const m: Record<SafetyVestType, string> = {
    class_2_standard_mesh: "general_warehouse_parking",
    class_3_full_coverage: "highway_road_night_work",
    surveyor_multi_pocket: "surveyor_inspector_tools",
    breakaway_traffic_snap: "traffic_control_entangle",
    flame_resistant_modacrylic: "oil_gas_welding_site",
  };
  return m[t];
}

export function safetyVests(): SafetyVestType[] {
  return ["class_2_standard_mesh", "class_3_full_coverage", "surveyor_multi_pocket", "breakaway_traffic_snap", "flame_resistant_modacrylic"];
}
