export type IceMoldType = "sphere_large_whiskey" | "cube_king_clear" | "crushed_bag_lewis" | "nugget_pebble_tray" | "diamond_gem_novelty";

export function meltRate(t: IceMoldType): number {
  const m: Record<IceMoldType, number> = {
    sphere_large_whiskey: 10, cube_king_clear: 9, crushed_bag_lewis: 2, nugget_pebble_tray: 3, diamond_gem_novelty: 7,
  };
  return m[t];
}

export function dilutionControl(t: IceMoldType): number {
  const m: Record<IceMoldType, number> = {
    sphere_large_whiskey: 10, cube_king_clear: 9, crushed_bag_lewis: 3, nugget_pebble_tray: 4, diamond_gem_novelty: 7,
  };
  return m[t];
}

export function visualAppeal(t: IceMoldType): number {
  const m: Record<IceMoldType, number> = {
    sphere_large_whiskey: 9, cube_king_clear: 8, crushed_bag_lewis: 3, nugget_pebble_tray: 5, diamond_gem_novelty: 10,
  };
  return m[t];
}

export function makeEase(t: IceMoldType): number {
  const m: Record<IceMoldType, number> = {
    sphere_large_whiskey: 6, cube_king_clear: 4, crushed_bag_lewis: 8, nugget_pebble_tray: 9, diamond_gem_novelty: 5,
  };
  return m[t];
}

export function moldCost(t: IceMoldType): number {
  const m: Record<IceMoldType, number> = {
    sphere_large_whiskey: 4, cube_king_clear: 6, crushed_bag_lewis: 2, nugget_pebble_tray: 3, diamond_gem_novelty: 5,
  };
  return m[t];
}

export function clearIce(t: IceMoldType): boolean {
  const m: Record<IceMoldType, boolean> = {
    sphere_large_whiskey: false, cube_king_clear: true, crushed_bag_lewis: false, nugget_pebble_tray: false, diamond_gem_novelty: false,
  };
  return m[t];
}

export function stackable(t: IceMoldType): boolean {
  const m: Record<IceMoldType, boolean> = {
    sphere_large_whiskey: true, cube_king_clear: false, crushed_bag_lewis: false, nugget_pebble_tray: true, diamond_gem_novelty: true,
  };
  return m[t];
}

export function moldMaterial(t: IceMoldType): string {
  const m: Record<IceMoldType, string> = {
    sphere_large_whiskey: "food_grade_silicone_sphere",
    cube_king_clear: "insulated_directional_freeze",
    crushed_bag_lewis: "canvas_bag_mallet_crush",
    nugget_pebble_tray: "flexible_silicone_mini_tray",
    diamond_gem_novelty: "polycarbonate_gem_facet",
  };
  return m[t];
}

export function bestDrink(t: IceMoldType): string {
  const m: Record<IceMoldType, string> = {
    sphere_large_whiskey: "neat_whiskey_old_fashioned",
    cube_king_clear: "craft_cocktail_presentation",
    crushed_bag_lewis: "julep_swizzle_tiki",
    nugget_pebble_tray: "highball_soda_iced_coffee",
    diamond_gem_novelty: "party_entertaining_show",
  };
  return m[t];
}

export function iceMolds(): IceMoldType[] {
  return ["sphere_large_whiskey", "cube_king_clear", "crushed_bag_lewis", "nugget_pebble_tray", "diamond_gem_novelty"];
}
