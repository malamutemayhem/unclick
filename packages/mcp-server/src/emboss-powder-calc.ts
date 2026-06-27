export type EmbossPowderType = "clear_glossy_shine" | "gold_metallic_lux" | "white_opaque_matte" | "tinsel_sparkle_glitter" | "detail_ultra_fine";

export function glossLevel(t: EmbossPowderType): number {
  const m: Record<EmbossPowderType, number> = {
    clear_glossy_shine: 10, gold_metallic_lux: 8, white_opaque_matte: 4, tinsel_sparkle_glitter: 7, detail_ultra_fine: 6,
  };
  return m[t];
}

export function raiseHeight(t: EmbossPowderType): number {
  const m: Record<EmbossPowderType, number> = {
    clear_glossy_shine: 7, gold_metallic_lux: 8, white_opaque_matte: 9, tinsel_sparkle_glitter: 6, detail_ultra_fine: 5,
  };
  return m[t];
}

export function detailHold(t: EmbossPowderType): number {
  const m: Record<EmbossPowderType, number> = {
    clear_glossy_shine: 7, gold_metallic_lux: 6, white_opaque_matte: 8, tinsel_sparkle_glitter: 5, detail_ultra_fine: 10,
  };
  return m[t];
}

export function colorRange(t: EmbossPowderType): number {
  const m: Record<EmbossPowderType, number> = {
    clear_glossy_shine: 3, gold_metallic_lux: 5, white_opaque_matte: 4, tinsel_sparkle_glitter: 7, detail_ultra_fine: 9,
  };
  return m[t];
}

export function powderCost(t: EmbossPowderType): number {
  const m: Record<EmbossPowderType, number> = {
    clear_glossy_shine: 2, gold_metallic_lux: 3, white_opaque_matte: 1, tinsel_sparkle_glitter: 3, detail_ultra_fine: 2,
  };
  return m[t];
}

export function metallic(t: EmbossPowderType): boolean {
  const m: Record<EmbossPowderType, boolean> = {
    clear_glossy_shine: false, gold_metallic_lux: true, white_opaque_matte: false, tinsel_sparkle_glitter: false, detail_ultra_fine: false,
  };
  return m[t];
}

export function sparkle(t: EmbossPowderType): boolean {
  const m: Record<EmbossPowderType, boolean> = {
    clear_glossy_shine: false, gold_metallic_lux: false, white_opaque_matte: false, tinsel_sparkle_glitter: true, detail_ultra_fine: false,
  };
  return m[t];
}

export function grainSize(t: EmbossPowderType): string {
  const m: Record<EmbossPowderType, string> = {
    clear_glossy_shine: "regular_medium_grain",
    gold_metallic_lux: "fine_metallic_flake",
    white_opaque_matte: "regular_opaque_grain",
    tinsel_sparkle_glitter: "coarse_glitter_mix",
    detail_ultra_fine: "ultra_fine_powder",
  };
  return m[t];
}

export function bestUse(t: EmbossPowderType): string {
  const m: Record<EmbossPowderType, string> = {
    clear_glossy_shine: "resist_technique_base",
    gold_metallic_lux: "elegant_card_accent",
    white_opaque_matte: "dark_paper_stamp",
    tinsel_sparkle_glitter: "festive_holiday_card",
    detail_ultra_fine: "fine_line_detail",
  };
  return m[t];
}

export function embossPowders(): EmbossPowderType[] {
  return ["clear_glossy_shine", "gold_metallic_lux", "white_opaque_matte", "tinsel_sparkle_glitter", "detail_ultra_fine"];
}
