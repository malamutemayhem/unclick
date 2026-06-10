export type CatFountainType = "ceramic_flower" | "stainless_steel_tower" | "plastic_gravity_flow" | "glass_bubble_stream" | "cordless_battery_pump";

export function waterCapacity(t: CatFountainType): number {
  const m: Record<CatFountainType, number> = {
    ceramic_flower: 6, stainless_steel_tower: 8, plastic_gravity_flow: 10, glass_bubble_stream: 5, cordless_battery_pump: 4,
  };
  return m[t];
}

export function filterQuality(t: CatFountainType): number {
  const m: Record<CatFountainType, number> = {
    ceramic_flower: 8, stainless_steel_tower: 9, plastic_gravity_flow: 5, glass_bubble_stream: 7, cordless_battery_pump: 6,
  };
  return m[t];
}

export function noiseLevel(t: CatFountainType): number {
  const m: Record<CatFountainType, number> = {
    ceramic_flower: 8, stainless_steel_tower: 7, plastic_gravity_flow: 9, glass_bubble_stream: 6, cordless_battery_pump: 10,
  };
  return m[t];
}

export function cleanEase(t: CatFountainType): number {
  const m: Record<CatFountainType, number> = {
    ceramic_flower: 7, stainless_steel_tower: 9, plastic_gravity_flow: 6, glass_bubble_stream: 5, cordless_battery_pump: 8,
  };
  return m[t];
}

export function fountainCost(t: CatFountainType): number {
  const m: Record<CatFountainType, number> = {
    ceramic_flower: 5, stainless_steel_tower: 7, plastic_gravity_flow: 2, glass_bubble_stream: 6, cordless_battery_pump: 8,
  };
  return m[t];
}

export function dishwasherSafe(t: CatFountainType): boolean {
  const m: Record<CatFountainType, boolean> = {
    ceramic_flower: true, stainless_steel_tower: true, plastic_gravity_flow: false, glass_bubble_stream: false, cordless_battery_pump: false,
  };
  return m[t];
}

export function cordFree(t: CatFountainType): boolean {
  const m: Record<CatFountainType, boolean> = {
    ceramic_flower: false, stainless_steel_tower: false, plastic_gravity_flow: false, glass_bubble_stream: false, cordless_battery_pump: true,
  };
  return m[t];
}

export function pumpType(t: CatFountainType): string {
  const m: Record<CatFountainType, string> = {
    ceramic_flower: "submersible_quiet_motor",
    stainless_steel_tower: "replaceable_carbon_pump",
    plastic_gravity_flow: "gravity_no_pump_passive",
    glass_bubble_stream: "decorative_air_stone_pump",
    cordless_battery_pump: "usb_rechargeable_silent",
  };
  return m[t];
}

export function bestCat(t: CatFountainType): string {
  const m: Record<CatFountainType, string> = {
    ceramic_flower: "chin_acne_sensitive",
    stainless_steel_tower: "multi_cat_household",
    plastic_gravity_flow: "budget_first_fountain",
    glass_bubble_stream: "decorative_living_room",
    cordless_battery_pump: "travel_portable_use",
  };
  return m[t];
}

export function catFountains(): CatFountainType[] {
  return ["ceramic_flower", "stainless_steel_tower", "plastic_gravity_flow", "glass_bubble_stream", "cordless_battery_pump"];
}
