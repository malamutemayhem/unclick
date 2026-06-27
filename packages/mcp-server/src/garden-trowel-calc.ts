export type GardenTrowelType = "stainless_steel_narrow" | "aluminum_light" | "carbon_steel_heavy" | "ergonomic_pistol_grip" | "transplanting_long_blade";

export function diggingPower(t: GardenTrowelType): number {
  const m: Record<GardenTrowelType, number> = {
    stainless_steel_narrow: 8, aluminum_light: 5, carbon_steel_heavy: 10, ergonomic_pistol_grip: 7, transplanting_long_blade: 6,
  };
  return m[t];
}

export function rustResistance(t: GardenTrowelType): number {
  const m: Record<GardenTrowelType, number> = {
    stainless_steel_narrow: 10, aluminum_light: 9, carbon_steel_heavy: 3, ergonomic_pistol_grip: 7, transplanting_long_blade: 8,
  };
  return m[t];
}

export function handComfort(t: GardenTrowelType): number {
  const m: Record<GardenTrowelType, number> = {
    stainless_steel_narrow: 6, aluminum_light: 7, carbon_steel_heavy: 4, ergonomic_pistol_grip: 10, transplanting_long_blade: 5,
  };
  return m[t];
}

export function weightBalance(t: GardenTrowelType): number {
  const m: Record<GardenTrowelType, number> = {
    stainless_steel_narrow: 7, aluminum_light: 9, carbon_steel_heavy: 5, ergonomic_pistol_grip: 8, transplanting_long_blade: 6,
  };
  return m[t];
}

export function trowelCost(t: GardenTrowelType): number {
  const m: Record<GardenTrowelType, number> = {
    stainless_steel_narrow: 4, aluminum_light: 2, carbon_steel_heavy: 5, ergonomic_pistol_grip: 6, transplanting_long_blade: 3,
  };
  return m[t];
}

export function onepiece(t: GardenTrowelType): boolean {
  const m: Record<GardenTrowelType, boolean> = {
    stainless_steel_narrow: true, aluminum_light: false, carbon_steel_heavy: true, ergonomic_pistol_grip: false, transplanting_long_blade: true,
  };
  return m[t];
}

export function depthMarks(t: GardenTrowelType): boolean {
  const m: Record<GardenTrowelType, boolean> = {
    stainless_steel_narrow: true, aluminum_light: false, carbon_steel_heavy: false, ergonomic_pistol_grip: true, transplanting_long_blade: true,
  };
  return m[t];
}

export function bladeShape(t: GardenTrowelType): string {
  const m: Record<GardenTrowelType, string> = {
    stainless_steel_narrow: "narrow_pointed_v",
    aluminum_light: "wide_scoop_flat",
    carbon_steel_heavy: "broad_deep_cup",
    ergonomic_pistol_grip: "curved_scoop_offset",
    transplanting_long_blade: "narrow_long_tapered",
  };
  return m[t];
}

export function bestTask(t: GardenTrowelType): string {
  const m: Record<GardenTrowelType, string> = {
    stainless_steel_narrow: "rocky_clay_soil_dig",
    aluminum_light: "container_potting_light",
    carbon_steel_heavy: "tough_root_removal",
    ergonomic_pistol_grip: "arthritis_ease_garden",
    transplanting_long_blade: "seedling_transplant_deep",
  };
  return m[t];
}

export function gardenTrowels(): GardenTrowelType[] {
  return ["stainless_steel_narrow", "aluminum_light", "carbon_steel_heavy", "ergonomic_pistol_grip", "transplanting_long_blade"];
}
