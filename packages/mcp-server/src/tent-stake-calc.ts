export type TentStakeType = "aluminum_hook_standard" | "titanium_shepherd_light" | "steel_nail_heavy" | "sand_snow_anchor_wide" | "screw_in_spiral";

export function holdingPower(t: TentStakeType): number {
  const m: Record<TentStakeType, number> = {
    aluminum_hook_standard: 6, titanium_shepherd_light: 7, steel_nail_heavy: 9, sand_snow_anchor_wide: 8, screw_in_spiral: 10,
  };
  return m[t];
}

export function weightSave(t: TentStakeType): number {
  const m: Record<TentStakeType, number> = {
    aluminum_hook_standard: 7, titanium_shepherd_light: 10, steel_nail_heavy: 3, sand_snow_anchor_wide: 4, screw_in_spiral: 5,
  };
  return m[t];
}

export function durability(t: TentStakeType): number {
  const m: Record<TentStakeType, number> = {
    aluminum_hook_standard: 5, titanium_shepherd_light: 9, steel_nail_heavy: 10, sand_snow_anchor_wide: 6, screw_in_spiral: 8,
  };
  return m[t];
}

export function groundPenetration(t: TentStakeType): number {
  const m: Record<TentStakeType, number> = {
    aluminum_hook_standard: 7, titanium_shepherd_light: 8, steel_nail_heavy: 10, sand_snow_anchor_wide: 3, screw_in_spiral: 6,
  };
  return m[t];
}

export function stakeCost(t: TentStakeType): number {
  const m: Record<TentStakeType, number> = {
    aluminum_hook_standard: 3, titanium_shepherd_light: 9, steel_nail_heavy: 4, sand_snow_anchor_wide: 5, screw_in_spiral: 6,
  };
  return m[t];
}

export function reflective(t: TentStakeType): boolean {
  const m: Record<TentStakeType, boolean> = {
    aluminum_hook_standard: false, titanium_shepherd_light: true, steel_nail_heavy: false, sand_snow_anchor_wide: false, screw_in_spiral: false,
  };
  return m[t];
}

export function needsHammer(t: TentStakeType): boolean {
  const m: Record<TentStakeType, boolean> = {
    aluminum_hook_standard: true, titanium_shepherd_light: true, steel_nail_heavy: true, sand_snow_anchor_wide: false, screw_in_spiral: false,
  };
  return m[t];
}

export function stakeMaterial(t: TentStakeType): string {
  const m: Record<TentStakeType, string> = {
    aluminum_hook_standard: "anodized_aluminum_y",
    titanium_shepherd_light: "grade_5_titanium",
    steel_nail_heavy: "galvanized_steel_nail",
    sand_snow_anchor_wide: "aluminum_broad_blade",
    screw_in_spiral: "zinc_plated_auger",
  };
  return m[t];
}

export function bestGround(t: TentStakeType): string {
  const m: Record<TentStakeType, string> = {
    aluminum_hook_standard: "packed_dirt_general",
    titanium_shepherd_light: "ultralight_backpack",
    steel_nail_heavy: "rocky_hard_ground",
    sand_snow_anchor_wide: "sand_beach_snow",
    screw_in_spiral: "soft_loam_grass",
  };
  return m[t];
}

export function tentStakes(): TentStakeType[] {
  return ["aluminum_hook_standard", "titanium_shepherd_light", "steel_nail_heavy", "sand_snow_anchor_wide", "screw_in_spiral"];
}
