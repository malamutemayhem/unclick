export type TumblerType = "stainless_vacuum_insulated" | "glass_double_wall" | "plastic_bpa_free_straw" | "ceramic_coated_steel" | "titanium_ultralight_camp";

export function heatRetention(t: TumblerType): number {
  const m: Record<TumblerType, number> = {
    stainless_vacuum_insulated: 10, glass_double_wall: 6, plastic_bpa_free_straw: 3, ceramic_coated_steel: 9, titanium_ultralight_camp: 8,
  };
  return m[t];
}

export function coldRetention(t: TumblerType): number {
  const m: Record<TumblerType, number> = {
    stainless_vacuum_insulated: 10, glass_double_wall: 5, plastic_bpa_free_straw: 4, ceramic_coated_steel: 9, titanium_ultralight_camp: 7,
  };
  return m[t];
}

export function durability(t: TumblerType): number {
  const m: Record<TumblerType, number> = {
    stainless_vacuum_insulated: 9, glass_double_wall: 3, plastic_bpa_free_straw: 6, ceramic_coated_steel: 8, titanium_ultralight_camp: 10,
  };
  return m[t];
}

export function tasteNeutral(t: TumblerType): number {
  const m: Record<TumblerType, number> = {
    stainless_vacuum_insulated: 7, glass_double_wall: 10, plastic_bpa_free_straw: 5, ceramic_coated_steel: 9, titanium_ultralight_camp: 8,
  };
  return m[t];
}

export function tumblerCost(t: TumblerType): number {
  const m: Record<TumblerType, number> = {
    stainless_vacuum_insulated: 6, glass_double_wall: 5, plastic_bpa_free_straw: 2, ceramic_coated_steel: 7, titanium_ultralight_camp: 10,
  };
  return m[t];
}

export function dishwasherSafe(t: TumblerType): boolean {
  const m: Record<TumblerType, boolean> = {
    stainless_vacuum_insulated: true, glass_double_wall: true, plastic_bpa_free_straw: true, ceramic_coated_steel: false, titanium_ultralight_camp: false,
  };
  return m[t];
}

export function spillProofLid(t: TumblerType): boolean {
  const m: Record<TumblerType, boolean> = {
    stainless_vacuum_insulated: true, glass_double_wall: false, plastic_bpa_free_straw: true, ceramic_coated_steel: true, titanium_ultralight_camp: true,
  };
  return m[t];
}

export function wallConstruction(t: TumblerType): string {
  const m: Record<TumblerType, string> = {
    stainless_vacuum_insulated: "double_wall_vacuum_seal",
    glass_double_wall: "borosilicate_double_wall",
    plastic_bpa_free_straw: "single_wall_tritan",
    ceramic_coated_steel: "vacuum_ceramic_interior",
    titanium_ultralight_camp: "double_wall_titanium",
  };
  return m[t];
}

export function bestUse(t: TumblerType): string {
  const m: Record<TumblerType, string> = {
    stainless_vacuum_insulated: "commute_office_daily",
    glass_double_wall: "home_desk_tea_coffee",
    plastic_bpa_free_straw: "gym_kids_casual",
    ceramic_coated_steel: "premium_taste_sensitive",
    titanium_ultralight_camp: "backpacking_outdoor_travel",
  };
  return m[t];
}

export function tumblers(): TumblerType[] {
  return ["stainless_vacuum_insulated", "glass_double_wall", "plastic_bpa_free_straw", "ceramic_coated_steel", "titanium_ultralight_camp"];
}
