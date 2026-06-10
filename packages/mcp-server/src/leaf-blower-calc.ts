export type LeafBlowerType = "gas_backpack" | "electric_corded" | "battery_handheld" | "wheeled_walk_behind" | "blower_vacuum_combo";

export function airSpeed(t: LeafBlowerType): number {
  const m: Record<LeafBlowerType, number> = {
    gas_backpack: 10, electric_corded: 5, battery_handheld: 6, wheeled_walk_behind: 9, blower_vacuum_combo: 7,
  };
  return m[t];
}

export function airVolumeCfm(t: LeafBlowerType): number {
  const m: Record<LeafBlowerType, number> = {
    gas_backpack: 10, electric_corded: 4, battery_handheld: 5, wheeled_walk_behind: 10, blower_vacuum_combo: 6,
  };
  return m[t];
}

export function noiseOutput(t: LeafBlowerType): number {
  const m: Record<LeafBlowerType, number> = {
    gas_backpack: 10, electric_corded: 4, battery_handheld: 3, wheeled_walk_behind: 9, blower_vacuum_combo: 5,
  };
  return m[t];
}

export function portability(t: LeafBlowerType): number {
  const m: Record<LeafBlowerType, number> = {
    gas_backpack: 7, electric_corded: 5, battery_handheld: 10, wheeled_walk_behind: 2, blower_vacuum_combo: 6,
  };
  return m[t];
}

export function blowerCost(t: LeafBlowerType): number {
  const m: Record<LeafBlowerType, number> = {
    gas_backpack: 8, electric_corded: 2, battery_handheld: 5, wheeled_walk_behind: 10, blower_vacuum_combo: 4,
  };
  return m[t];
}

export function canVacuum(t: LeafBlowerType): boolean {
  const m: Record<LeafBlowerType, boolean> = {
    gas_backpack: false, electric_corded: false, battery_handheld: false, wheeled_walk_behind: false, blower_vacuum_combo: true,
  };
  return m[t];
}

export function emissionFree(t: LeafBlowerType): boolean {
  const m: Record<LeafBlowerType, boolean> = {
    gas_backpack: false, electric_corded: true, battery_handheld: true, wheeled_walk_behind: false, blower_vacuum_combo: true,
  };
  return m[t];
}

export function motorType(t: LeafBlowerType): string {
  const m: Record<LeafBlowerType, string> = {
    gas_backpack: "two_stroke_high_rpm", electric_corded: "ac_universal_motor",
    battery_handheld: "brushless_dc_turbine", wheeled_walk_behind: "four_stroke_impeller",
    blower_vacuum_combo: "electric_mulch_impeller",
  };
  return m[t];
}

export function bestScenario(t: LeafBlowerType): string {
  const m: Record<LeafBlowerType, string> = {
    gas_backpack: "commercial_large_property", electric_corded: "small_patio_driveway",
    battery_handheld: "quick_deck_walkway_sweep", wheeled_walk_behind: "massive_parking_lot",
    blower_vacuum_combo: "mulch_collect_garden_bed",
  };
  return m[t];
}

export function leafBlowers(): LeafBlowerType[] {
  return ["gas_backpack", "electric_corded", "battery_handheld", "wheeled_walk_behind", "blower_vacuum_combo"];
}
