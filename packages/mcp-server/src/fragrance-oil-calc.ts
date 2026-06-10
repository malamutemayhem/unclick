export type FragranceOilType = "essential_pure_plant" | "synthetic_fragrance_blend" | "absolute_solvent_extract" | "nature_identical_lab" | "infused_botanical_steep";

export function scentThrow(t: FragranceOilType): number {
  const m: Record<FragranceOilType, number> = {
    essential_pure_plant: 6, synthetic_fragrance_blend: 10, absolute_solvent_extract: 8, nature_identical_lab: 9, infused_botanical_steep: 5,
  };
  return m[t];
}

export function scentComplexity(t: FragranceOilType): number {
  const m: Record<FragranceOilType, number> = {
    essential_pure_plant: 7, synthetic_fragrance_blend: 10, absolute_solvent_extract: 9, nature_identical_lab: 8, infused_botanical_steep: 6,
  };
  return m[t];
}

export function naturalPurity(t: FragranceOilType): number {
  const m: Record<FragranceOilType, number> = {
    essential_pure_plant: 10, synthetic_fragrance_blend: 2, absolute_solvent_extract: 8, nature_identical_lab: 5, infused_botanical_steep: 9,
  };
  return m[t];
}

export function flashPoint(t: FragranceOilType): number {
  const m: Record<FragranceOilType, number> = {
    essential_pure_plant: 5, synthetic_fragrance_blend: 8, absolute_solvent_extract: 6, nature_identical_lab: 9, infused_botanical_steep: 4,
  };
  return m[t];
}

export function oilCost(t: FragranceOilType): number {
  const m: Record<FragranceOilType, number> = {
    essential_pure_plant: 3, synthetic_fragrance_blend: 1, absolute_solvent_extract: 4, nature_identical_lab: 2, infused_botanical_steep: 2,
  };
  return m[t];
}

export function allNatural(t: FragranceOilType): boolean {
  const m: Record<FragranceOilType, boolean> = {
    essential_pure_plant: true, synthetic_fragrance_blend: false, absolute_solvent_extract: true, nature_identical_lab: false, infused_botanical_steep: true,
  };
  return m[t];
}

export function skinSafe(t: FragranceOilType): boolean {
  const m: Record<FragranceOilType, boolean> = {
    essential_pure_plant: true, synthetic_fragrance_blend: true, absolute_solvent_extract: false, nature_identical_lab: true, infused_botanical_steep: true,
  };
  return m[t];
}

export function extractMethod(t: FragranceOilType): string {
  const m: Record<FragranceOilType, string> = {
    essential_pure_plant: "steam_distillation",
    synthetic_fragrance_blend: "chemical_synthesis_blend",
    absolute_solvent_extract: "solvent_extraction_wash",
    nature_identical_lab: "lab_recreation_molecule",
    infused_botanical_steep: "carrier_oil_maceration",
  };
  return m[t];
}

export function bestProduct(t: FragranceOilType): string {
  const m: Record<FragranceOilType, string> = {
    essential_pure_plant: "soy_candle_natural",
    synthetic_fragrance_blend: "paraffin_candle_strong",
    absolute_solvent_extract: "luxury_perfume_candle",
    nature_identical_lab: "wax_melt_consistent",
    infused_botanical_steep: "beeswax_candle_gentle",
  };
  return m[t];
}

export function fragranceOils(): FragranceOilType[] {
  return ["essential_pure_plant", "synthetic_fragrance_blend", "absolute_solvent_extract", "nature_identical_lab", "infused_botanical_steep"];
}
