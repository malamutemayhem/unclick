export type CrystallizerOsloType =
  | "oslo_growth_standard"
  | "oslo_vacuum_cooling"
  | "oslo_evaporative_salt"
  | "oslo_reactive_precip"
  | "oslo_melt_crystallizer";

interface CrystallizerOsloData {
  crystalPurity: number;
  yieldRate: number;
  energyUse: number;
  residence: number;
  coCost: number;
  vacuumOp: boolean;
  forUltrapure: boolean;
  supersaturation: string;
  bestUse: string;
}

const DATA: Record<CrystallizerOsloType, CrystallizerOsloData> = {
  oslo_growth_standard: {
    crystalPurity: 9, yieldRate: 8, energyUse: 6, residence: 8, coCost: 7,
    vacuumOp: false, forUltrapure: false,
    supersaturation: "controlled_growth_zone_classified_removal",
    bestUse: "potassium_nitrate_ammonium_sulfate_growth",
  },
  oslo_vacuum_cooling: {
    crystalPurity: 9, yieldRate: 9, energyUse: 8, residence: 7, coCost: 8,
    vacuumOp: true, forUltrapure: false,
    supersaturation: "vacuum_flash_cooling_adiabatic_evaporation",
    bestUse: "sodium_sulfate_glauber_salt_vacuum_cooling",
  },
  oslo_evaporative_salt: {
    crystalPurity: 8, yieldRate: 9, energyUse: 5, residence: 9, coCost: 7,
    vacuumOp: false, forUltrapure: false,
    supersaturation: "multi_effect_evaporation_steam_heated_vessel",
    bestUse: "table_salt_nacl_multi_effect_evaporation",
  },
  oslo_reactive_precip: {
    crystalPurity: 7, yieldRate: 9, energyUse: 8, residence: 5, coCost: 6,
    vacuumOp: false, forUltrapure: false,
    supersaturation: "reagent_addition_rapid_mixing_precipitation",
    bestUse: "calcium_fluoride_metal_hydroxide_precipitation",
  },
  oslo_melt_crystallizer: {
    crystalPurity: 10, yieldRate: 8, energyUse: 7, residence: 8, coCost: 9,
    vacuumOp: false, forUltrapure: true,
    supersaturation: "melt_cooling_zone_refine_fractional_solidify",
    bestUse: "naphthalene_para_xylene_ultra_pure_melt_refine",
  },
};

function get(t: CrystallizerOsloType): CrystallizerOsloData {
  return DATA[t];
}

export const crystalPurity = (t: CrystallizerOsloType) => get(t).crystalPurity;
export const yieldRate = (t: CrystallizerOsloType) => get(t).yieldRate;
export const energyUse = (t: CrystallizerOsloType) => get(t).energyUse;
export const residence = (t: CrystallizerOsloType) => get(t).residence;
export const coCost = (t: CrystallizerOsloType) => get(t).coCost;
export const vacuumOp = (t: CrystallizerOsloType) => get(t).vacuumOp;
export const forUltrapure = (t: CrystallizerOsloType) => get(t).forUltrapure;
export const supersaturation = (t: CrystallizerOsloType) => get(t).supersaturation;
export const bestUse = (t: CrystallizerOsloType) => get(t).bestUse;
export const crystallizerOsloTypes = (): CrystallizerOsloType[] =>
  Object.keys(DATA) as CrystallizerOsloType[];
