export type KilnPostType = "cordierite_square_standard" | "mullite_round_high_temp" | "silicon_carbide_heavy" | "alumina_tube_hollow" | "stacking_t_pin_support";

export function heatResist(t: KilnPostType): number {
  const m: Record<KilnPostType, number> = {
    cordierite_square_standard: 7, mullite_round_high_temp: 9, silicon_carbide_heavy: 10, alumina_tube_hollow: 9, stacking_t_pin_support: 6,
  };
  return m[t];
}

export function loadCapacity(t: KilnPostType): number {
  const m: Record<KilnPostType, number> = {
    cordierite_square_standard: 8, mullite_round_high_temp: 9, silicon_carbide_heavy: 10, alumina_tube_hollow: 5, stacking_t_pin_support: 4,
  };
  return m[t];
}

export function thermalShock(t: KilnPostType): number {
  const m: Record<KilnPostType, number> = {
    cordierite_square_standard: 10, mullite_round_high_temp: 7, silicon_carbide_heavy: 6, alumina_tube_hollow: 8, stacking_t_pin_support: 9,
  };
  return m[t];
}

export function sizeVariety(t: KilnPostType): number {
  const m: Record<KilnPostType, number> = {
    cordierite_square_standard: 10, mullite_round_high_temp: 8, silicon_carbide_heavy: 6, alumina_tube_hollow: 7, stacking_t_pin_support: 9,
  };
  return m[t];
}

export function postCost(t: KilnPostType): number {
  const m: Record<KilnPostType, number> = {
    cordierite_square_standard: 1, mullite_round_high_temp: 2, silicon_carbide_heavy: 3, alumina_tube_hollow: 2, stacking_t_pin_support: 1,
  };
  return m[t];
}

export function reusable(t: KilnPostType): boolean {
  const m: Record<KilnPostType, boolean> = {
    cordierite_square_standard: true, mullite_round_high_temp: true, silicon_carbide_heavy: true, alumina_tube_hollow: true, stacking_t_pin_support: true,
  };
  return m[t];
}

export function stackable(t: KilnPostType): boolean {
  const m: Record<KilnPostType, boolean> = {
    cordierite_square_standard: true, mullite_round_high_temp: true, silicon_carbide_heavy: true, alumina_tube_hollow: false, stacking_t_pin_support: true,
  };
  return m[t];
}

export function postMaterial(t: KilnPostType): string {
  const m: Record<KilnPostType, string> = {
    cordierite_square_standard: "cordierite_ceramic_block",
    mullite_round_high_temp: "mullite_refractory_rod",
    silicon_carbide_heavy: "sic_dense_cylinder",
    alumina_tube_hollow: "alumina_hollow_pipe",
    stacking_t_pin_support: "wire_t_pin_stilts",
  };
  return m[t];
}

export function bestFiring(t: KilnPostType): string {
  const m: Record<KilnPostType, string> = {
    cordierite_square_standard: "general_shelf_spacing",
    mullite_round_high_temp: "cone_10_reduction",
    silicon_carbide_heavy: "salt_soda_firing",
    alumina_tube_hollow: "raku_fast_cool",
    stacking_t_pin_support: "small_tile_spacing",
  };
  return m[t];
}

export function kilnPosts(): KilnPostType[] {
  return ["cordierite_square_standard", "mullite_round_high_temp", "silicon_carbide_heavy", "alumina_tube_hollow", "stacking_t_pin_support"];
}
