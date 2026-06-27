export type IceCubeTrayType = "silicone_flex_pop" | "stainless_lever_release" | "large_sphere_mold" | "nugget_pebble_mini" | "clear_ice_insulated";

export function cubeCount(t: IceCubeTrayType): number {
  const m: Record<IceCubeTrayType, number> = {
    silicone_flex_pop: 8, stainless_lever_release: 7, large_sphere_mold: 2, nugget_pebble_mini: 10, clear_ice_insulated: 3,
  };
  return m[t];
}

export function releaseEase(t: IceCubeTrayType): number {
  const m: Record<IceCubeTrayType, number> = {
    silicone_flex_pop: 9, stainless_lever_release: 10, large_sphere_mold: 7, nugget_pebble_mini: 6, clear_ice_insulated: 5,
  };
  return m[t];
}

export function iceClarity(t: IceCubeTrayType): number {
  const m: Record<IceCubeTrayType, number> = {
    silicone_flex_pop: 3, stainless_lever_release: 4, large_sphere_mold: 5, nugget_pebble_mini: 2, clear_ice_insulated: 10,
  };
  return m[t];
}

export function meltSpeed(t: IceCubeTrayType): number {
  const m: Record<IceCubeTrayType, number> = {
    silicone_flex_pop: 5, stainless_lever_release: 5, large_sphere_mold: 9, nugget_pebble_mini: 2, clear_ice_insulated: 10,
  };
  return m[t];
}

export function trayCost(t: IceCubeTrayType): number {
  const m: Record<IceCubeTrayType, number> = {
    silicone_flex_pop: 2, stainless_lever_release: 4, large_sphere_mold: 3, nugget_pebble_mini: 3, clear_ice_insulated: 7,
  };
  return m[t];
}

export function hasLid(t: IceCubeTrayType): boolean {
  const m: Record<IceCubeTrayType, boolean> = {
    silicone_flex_pop: true, stainless_lever_release: false, large_sphere_mold: true, nugget_pebble_mini: false, clear_ice_insulated: true,
  };
  return m[t];
}

export function stackable(t: IceCubeTrayType): boolean {
  const m: Record<IceCubeTrayType, boolean> = {
    silicone_flex_pop: true, stainless_lever_release: true, large_sphere_mold: false, nugget_pebble_mini: true, clear_ice_insulated: false,
  };
  return m[t];
}

export function trayMaterial(t: IceCubeTrayType): string {
  const m: Record<IceCubeTrayType, string> = {
    silicone_flex_pop: "food_grade_silicone",
    stainless_lever_release: "chrome_steel_lever",
    large_sphere_mold: "silicone_sphere_two_piece",
    nugget_pebble_mini: "plastic_mini_cavity",
    clear_ice_insulated: "insulated_box_slow_freeze",
  };
  return m[t];
}

export function bestDrink(t: IceCubeTrayType): string {
  const m: Record<IceCubeTrayType, string> = {
    silicone_flex_pop: "everyday_water_soda",
    stainless_lever_release: "retro_cocktail_party",
    large_sphere_mold: "whiskey_old_fashioned",
    nugget_pebble_mini: "blended_smoothie_chew",
    clear_ice_insulated: "craft_cocktail_bar",
  };
  return m[t];
}

export function iceCubeTrays(): IceCubeTrayType[] {
  return ["silicone_flex_pop", "stainless_lever_release", "large_sphere_mold", "nugget_pebble_mini", "clear_ice_insulated"];
}
