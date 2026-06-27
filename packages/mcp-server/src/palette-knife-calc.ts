export type PaletteKnife = "straight_mixing" | "offset_painting" | "trowel_wide" | "diamond_point" | "cranked_spatula";

export function paintSpread(p: PaletteKnife): number {
  const m: Record<PaletteKnife, number> = {
    straight_mixing: 7, offset_painting: 9, trowel_wide: 10, diamond_point: 4, cranked_spatula: 8,
  };
  return m[p];
}

export function textureCreation(p: PaletteKnife): number {
  const m: Record<PaletteKnife, number> = {
    straight_mixing: 4, offset_painting: 9, trowel_wide: 7, diamond_point: 10, cranked_spatula: 8,
  };
  return m[p];
}

export function mixingAbility(p: PaletteKnife): number {
  const m: Record<PaletteKnife, number> = {
    straight_mixing: 10, offset_painting: 5, trowel_wide: 8, diamond_point: 3, cranked_spatula: 7,
  };
  return m[p];
}

export function detailControl(p: PaletteKnife): number {
  const m: Record<PaletteKnife, number> = {
    straight_mixing: 3, offset_painting: 7, trowel_wide: 2, diamond_point: 10, cranked_spatula: 6,
  };
  return m[p];
}

export function knifeCost(p: PaletteKnife): number {
  const m: Record<PaletteKnife, number> = {
    straight_mixing: 2, offset_painting: 4, trowel_wide: 3, diamond_point: 5, cranked_spatula: 4,
  };
  return m[p];
}

export function flexibleBlade(p: PaletteKnife): boolean {
  const m: Record<PaletteKnife, boolean> = {
    straight_mixing: true, offset_painting: true, trowel_wide: false, diamond_point: true, cranked_spatula: true,
  };
  return m[p];
}

export function offsetHandle(p: PaletteKnife): boolean {
  const m: Record<PaletteKnife, boolean> = {
    straight_mixing: false, offset_painting: true, trowel_wide: false, diamond_point: false, cranked_spatula: true,
  };
  return m[p];
}

export function bladeMaterial(p: PaletteKnife): string {
  const m: Record<PaletteKnife, string> = {
    straight_mixing: "stainless_steel_flat_blade", offset_painting: "spring_steel_cranked_offset",
    trowel_wide: "carbon_steel_wide_flat", diamond_point: "tempered_steel_tapered_point",
    cranked_spatula: "stainless_angled_spatula_bend",
  };
  return m[p];
}

export function bestUse(p: PaletteKnife): string {
  const m: Record<PaletteKnife, string> = {
    straight_mixing: "palette_color_mixing_only", offset_painting: "impasto_thick_paint_apply",
    trowel_wide: "large_area_smooth_spread", diamond_point: "fine_detail_sgraffito_scrape",
    cranked_spatula: "cake_icing_paint_scrape",
  };
  return m[p];
}

export function paletteKnives(): PaletteKnife[] {
  return ["straight_mixing", "offset_painting", "trowel_wide", "diamond_point", "cranked_spatula"];
}
