export type MasonJarType = "regular_mouth_pint" | "wide_mouth_quart" | "half_gallon_storage" | "quilted_jelly_small" | "elite_spiral_decor";

export function capacity(t: MasonJarType): number {
  const m: Record<MasonJarType, number> = {
    regular_mouth_pint: 5, wide_mouth_quart: 8, half_gallon_storage: 10, quilted_jelly_small: 3, elite_spiral_decor: 6,
  };
  return m[t];
}

export function fillEase(t: MasonJarType): number {
  const m: Record<MasonJarType, number> = {
    regular_mouth_pint: 6, wide_mouth_quart: 10, half_gallon_storage: 9, quilted_jelly_small: 5, elite_spiral_decor: 7,
  };
  return m[t];
}

export function stackability(t: MasonJarType): number {
  const m: Record<MasonJarType, number> = {
    regular_mouth_pint: 8, wide_mouth_quart: 7, half_gallon_storage: 4, quilted_jelly_small: 9, elite_spiral_decor: 6,
  };
  return m[t];
}

export function aestheticAppeal(t: MasonJarType): number {
  const m: Record<MasonJarType, number> = {
    regular_mouth_pint: 7, wide_mouth_quart: 6, half_gallon_storage: 5, quilted_jelly_small: 9, elite_spiral_decor: 10,
  };
  return m[t];
}

export function jarCost(t: MasonJarType): number {
  const m: Record<MasonJarType, number> = {
    regular_mouth_pint: 3, wide_mouth_quart: 4, half_gallon_storage: 6, quilted_jelly_small: 4, elite_spiral_decor: 7,
  };
  return m[t];
}

export function canningApproved(t: MasonJarType): boolean {
  const m: Record<MasonJarType, boolean> = {
    regular_mouth_pint: true, wide_mouth_quart: true, half_gallon_storage: false, quilted_jelly_small: true, elite_spiral_decor: false,
  };
  return m[t];
}

export function freezerSafe(t: MasonJarType): boolean {
  const m: Record<MasonJarType, boolean> = {
    regular_mouth_pint: true, wide_mouth_quart: true, half_gallon_storage: true, quilted_jelly_small: true, elite_spiral_decor: false,
  };
  return m[t];
}

export function glassMaterial(t: MasonJarType): string {
  const m: Record<MasonJarType, string> = {
    regular_mouth_pint: "soda_lime_glass_tempered",
    wide_mouth_quart: "thick_wall_borosilicate",
    half_gallon_storage: "heavy_duty_clear_glass",
    quilted_jelly_small: "embossed_diamond_pattern",
    elite_spiral_decor: "decorative_spiral_pressed",
  };
  return m[t];
}

export function bestUse(t: MasonJarType): string {
  const m: Record<MasonJarType, string> = {
    regular_mouth_pint: "jam_preserve_water_bath",
    wide_mouth_quart: "pickles_ferment_meal_prep",
    half_gallon_storage: "bulk_dry_goods_flour",
    quilted_jelly_small: "gift_jelly_sauce_spread",
    elite_spiral_decor: "centerpiece_drink_display",
  };
  return m[t];
}

export function masonJars(): MasonJarType[] {
  return ["regular_mouth_pint", "wide_mouth_quart", "half_gallon_storage", "quilted_jelly_small", "elite_spiral_decor"];
}
