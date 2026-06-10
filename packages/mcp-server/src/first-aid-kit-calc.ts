export type FirstAidKitType = "basic_home_25pc" | "outdoor_adventure" | "vehicle_roadside" | "industrial_workplace" | "travel_compact";

export function itemCount(t: FirstAidKitType): number {
  const m: Record<FirstAidKitType, number> = {
    basic_home_25pc: 4, outdoor_adventure: 8, vehicle_roadside: 6, industrial_workplace: 10, travel_compact: 3,
  };
  return m[t];
}

export function traumaReady(t: FirstAidKitType): number {
  const m: Record<FirstAidKitType, number> = {
    basic_home_25pc: 3, outdoor_adventure: 8, vehicle_roadside: 6, industrial_workplace: 10, travel_compact: 2,
  };
  return m[t];
}

export function portability(t: FirstAidKitType): number {
  const m: Record<FirstAidKitType, number> = {
    basic_home_25pc: 6, outdoor_adventure: 7, vehicle_roadside: 4, industrial_workplace: 2, travel_compact: 10,
  };
  return m[t];
}

export function weatherResist(t: FirstAidKitType): number {
  const m: Record<FirstAidKitType, number> = {
    basic_home_25pc: 4, outdoor_adventure: 10, vehicle_roadside: 7, industrial_workplace: 6, travel_compact: 5,
  };
  return m[t];
}

export function kitCost(t: FirstAidKitType): number {
  const m: Record<FirstAidKitType, number> = {
    basic_home_25pc: 2, outdoor_adventure: 5, vehicle_roadside: 4, industrial_workplace: 8, travel_compact: 3,
  };
  return m[t];
}

export function hasManual(t: FirstAidKitType): boolean {
  const m: Record<FirstAidKitType, boolean> = {
    basic_home_25pc: true, outdoor_adventure: true, vehicle_roadside: true, industrial_workplace: true, travel_compact: false,
  };
  return m[t];
}

export function oshaCompliant(t: FirstAidKitType): boolean {
  const m: Record<FirstAidKitType, boolean> = {
    basic_home_25pc: false, outdoor_adventure: false, vehicle_roadside: false, industrial_workplace: true, travel_compact: false,
  };
  return m[t];
}

export function caseType(t: FirstAidKitType): string {
  const m: Record<FirstAidKitType, string> = {
    basic_home_25pc: "plastic_snap_lid",
    outdoor_adventure: "nylon_molle_waterproof",
    vehicle_roadside: "hard_shell_reflective",
    industrial_workplace: "wall_mount_metal_cabinet",
    travel_compact: "zip_pouch_flat_pack",
  };
  return m[t];
}

export function bestScenario(t: FirstAidKitType): string {
  const m: Record<FirstAidKitType, string> = {
    basic_home_25pc: "household_minor_injury",
    outdoor_adventure: "hiking_camping_remote",
    vehicle_roadside: "car_trunk_accident",
    industrial_workplace: "factory_warehouse_site",
    travel_compact: "carry_on_hotel_trip",
  };
  return m[t];
}

export function firstAidKits(): FirstAidKitType[] {
  return ["basic_home_25pc", "outdoor_adventure", "vehicle_roadside", "industrial_workplace", "travel_compact"];
}
