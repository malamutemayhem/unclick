export type SpeedBump = "speed_bump" | "speed_hump" | "speed_table" | "chicane" | "raised_crosswalk";

export function speedReduction(s: SpeedBump): number {
  const m: Record<SpeedBump, number> = {
    speed_bump: 10, speed_hump: 7, speed_table: 6, chicane: 8, raised_crosswalk: 5,
  };
  return m[s];
}

export function driverComfort(s: SpeedBump): number {
  const m: Record<SpeedBump, number> = {
    speed_bump: 2, speed_hump: 5, speed_table: 7, chicane: 4, raised_crosswalk: 8,
  };
  return m[s];
}

export function emergencyVehicleImpact(s: SpeedBump): number {
  const m: Record<SpeedBump, number> = {
    speed_bump: 9, speed_hump: 6, speed_table: 4, chicane: 3, raised_crosswalk: 3,
  };
  return m[s];
}

export function installCost(s: SpeedBump): number {
  const m: Record<SpeedBump, number> = {
    speed_bump: 3, speed_hump: 4, speed_table: 7, chicane: 8, raised_crosswalk: 6,
  };
  return m[s];
}

export function pedestrianBenefit(s: SpeedBump): number {
  const m: Record<SpeedBump, number> = {
    speed_bump: 5, speed_hump: 6, speed_table: 8, chicane: 4, raised_crosswalk: 10,
  };
  return m[s];
}

export function suitableForBusRoute(s: SpeedBump): boolean {
  const m: Record<SpeedBump, boolean> = {
    speed_bump: false, speed_hump: false, speed_table: true, chicane: true, raised_crosswalk: true,
  };
  return m[s];
}

export function requiresSignage(s: SpeedBump): boolean {
  const m: Record<SpeedBump, boolean> = {
    speed_bump: true, speed_hump: true, speed_table: true, chicane: false, raised_crosswalk: false,
  };
  return m[s];
}

export function typicalHeight(s: SpeedBump): string {
  const m: Record<SpeedBump, string> = {
    speed_bump: "75mm_to_100mm", speed_hump: "75mm_gradual",
    speed_table: "75mm_flat_top", chicane: "curb_height_lateral",
    raised_crosswalk: "75mm_marked_surface",
  };
  return m[s];
}

export function bestLocation(s: SpeedBump): string {
  const m: Record<SpeedBump, string> = {
    speed_bump: "parking_lot_private", speed_hump: "residential_street",
    speed_table: "collector_road_school", chicane: "neighborhood_cut_through",
    raised_crosswalk: "school_zone_downtown",
  };
  return m[s];
}

export function speedBumps(): SpeedBump[] {
  return ["speed_bump", "speed_hump", "speed_table", "chicane", "raised_crosswalk"];
}
