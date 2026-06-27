export type MacrameBeadType = "wood_round_large" | "ceramic_handmade_glaze" | "gemstone_natural_drill" | "metal_spacer_tube" | "glass_pony_color";

export function holeSize(t: MacrameBeadType): number {
  const m: Record<MacrameBeadType, number> = {
    wood_round_large: 9, ceramic_handmade_glaze: 7, gemstone_natural_drill: 4, metal_spacer_tube: 8, glass_pony_color: 10,
  };
  return m[t];
}

export function visualWeight(t: MacrameBeadType): number {
  const m: Record<MacrameBeadType, number> = {
    wood_round_large: 7, ceramic_handmade_glaze: 9, gemstone_natural_drill: 10, metal_spacer_tube: 5, glass_pony_color: 6,
  };
  return m[t];
}

export function colorVariety(t: MacrameBeadType): number {
  const m: Record<MacrameBeadType, number> = {
    wood_round_large: 5, ceramic_handmade_glaze: 8, gemstone_natural_drill: 7, metal_spacer_tube: 4, glass_pony_color: 10,
  };
  return m[t];
}

export function durability(t: MacrameBeadType): number {
  const m: Record<MacrameBeadType, number> = {
    wood_round_large: 7, ceramic_handmade_glaze: 5, gemstone_natural_drill: 10, metal_spacer_tube: 9, glass_pony_color: 6,
  };
  return m[t];
}

export function beadCost(t: MacrameBeadType): number {
  const m: Record<MacrameBeadType, number> = {
    wood_round_large: 1, ceramic_handmade_glaze: 3, gemstone_natural_drill: 4, metal_spacer_tube: 2, glass_pony_color: 1,
  };
  return m[t];
}

export function lightweight(t: MacrameBeadType): boolean {
  const m: Record<MacrameBeadType, boolean> = {
    wood_round_large: true, ceramic_handmade_glaze: false, gemstone_natural_drill: false, metal_spacer_tube: false, glass_pony_color: true,
  };
  return m[t];
}

export function handcrafted(t: MacrameBeadType): boolean {
  const m: Record<MacrameBeadType, boolean> = {
    wood_round_large: false, ceramic_handmade_glaze: true, gemstone_natural_drill: false, metal_spacer_tube: false, glass_pony_color: false,
  };
  return m[t];
}

export function beadMaterial(t: MacrameBeadType): string {
  const m: Record<MacrameBeadType, string> = {
    wood_round_large: "turned_hardwood_ball",
    ceramic_handmade_glaze: "kiln_fired_clay",
    gemstone_natural_drill: "polished_stone_drilled",
    metal_spacer_tube: "plated_alloy_tube",
    glass_pony_color: "pressed_glass_pony",
  };
  return m[t];
}

export function bestProject(t: MacrameBeadType): string {
  const m: Record<MacrameBeadType, string> = {
    wood_round_large: "curtain_tieback_knot",
    ceramic_handmade_glaze: "artisan_necklace_focal",
    gemstone_natural_drill: "crystal_grid_hanger",
    metal_spacer_tube: "modern_keychain_accent",
    glass_pony_color: "kids_bracelet_color",
  };
  return m[t];
}

export function macrameBeads(): MacrameBeadType[] {
  return ["wood_round_large", "ceramic_handmade_glaze", "gemstone_natural_drill", "metal_spacer_tube", "glass_pony_color"];
}
