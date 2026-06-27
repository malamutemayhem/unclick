export type CandleDyeType = "liquid_dye_drop" | "dye_block_chip" | "mica_powder_shimmer" | "natural_botanical_herb" | "uv_glow_pigment";

export function colorIntensity(t: CandleDyeType): number {
  const m: Record<CandleDyeType, number> = {
    liquid_dye_drop: 9, dye_block_chip: 10, mica_powder_shimmer: 6, natural_botanical_herb: 4, uv_glow_pigment: 7,
  };
  return m[t];
}

export function mixEase(t: CandleDyeType): number {
  const m: Record<CandleDyeType, number> = {
    liquid_dye_drop: 10, dye_block_chip: 7, mica_powder_shimmer: 5, natural_botanical_herb: 4, uv_glow_pigment: 6,
  };
  return m[t];
}

export function burnClean(t: CandleDyeType): number {
  const m: Record<CandleDyeType, number> = {
    liquid_dye_drop: 8, dye_block_chip: 9, mica_powder_shimmer: 4, natural_botanical_herb: 10, uv_glow_pigment: 5,
  };
  return m[t];
}

export function colorStability(t: CandleDyeType): number {
  const m: Record<CandleDyeType, number> = {
    liquid_dye_drop: 8, dye_block_chip: 9, mica_powder_shimmer: 7, natural_botanical_herb: 3, uv_glow_pigment: 6,
  };
  return m[t];
}

export function dyeCost(t: CandleDyeType): number {
  const m: Record<CandleDyeType, number> = {
    liquid_dye_drop: 2, dye_block_chip: 2, mica_powder_shimmer: 3, natural_botanical_herb: 3, uv_glow_pigment: 4,
  };
  return m[t];
}

export function allNatural(t: CandleDyeType): boolean {
  const m: Record<CandleDyeType, boolean> = {
    liquid_dye_drop: false, dye_block_chip: false, mica_powder_shimmer: false, natural_botanical_herb: true, uv_glow_pigment: false,
  };
  return m[t];
}

export function glowsUV(t: CandleDyeType): boolean {
  const m: Record<CandleDyeType, boolean> = {
    liquid_dye_drop: false, dye_block_chip: false, mica_powder_shimmer: false, natural_botanical_herb: false, uv_glow_pigment: true,
  };
  return m[t];
}

export function dyeForm(t: CandleDyeType): string {
  const m: Record<CandleDyeType, string> = {
    liquid_dye_drop: "concentrated_liquid",
    dye_block_chip: "solid_wax_chip",
    mica_powder_shimmer: "fine_metallic_powder",
    natural_botanical_herb: "dried_plant_matter",
    uv_glow_pigment: "phosphorescent_powder",
  };
  return m[t];
}

export function bestCandle(t: CandleDyeType): string {
  const m: Record<CandleDyeType, string> = {
    liquid_dye_drop: "pillar_solid_color",
    dye_block_chip: "container_deep_shade",
    mica_powder_shimmer: "wax_melt_shimmer",
    natural_botanical_herb: "beeswax_herbal_tint",
    uv_glow_pigment: "novelty_party_glow",
  };
  return m[t];
}

export function candleDyes(): CandleDyeType[] {
  return ["liquid_dye_drop", "dye_block_chip", "mica_powder_shimmer", "natural_botanical_herb", "uv_glow_pigment"];
}
