export type CrystallizerDtbType =
  | "draft_tube_baffle_std"
  | "forced_circulation_fc"
  | "oslo_fluidized_bed"
  | "cooling_disc_surface"
  | "reaction_crystallizer";

interface CrystallizerDtbData {
  crystalSize: number;
  sizeDistribution: number;
  throughput: number;
  scaleUp: number;
  cdCost: number;
  evaporative: boolean;
  forLargeCrystal: boolean;
  circulation: string;
  bestUse: string;
}

const DATA: Record<CrystallizerDtbType, CrystallizerDtbData> = {
  draft_tube_baffle_std: {
    crystalSize: 9, sizeDistribution: 9, throughput: 8, scaleUp: 8, cdCost: 7,
    evaporative: true, forLargeCrystal: true,
    circulation: "internal_draft_tube_propeller_classified_fines",
    bestUse: "ammonium_sulfate_sodium_chloride_large_crystal",
  },
  forced_circulation_fc: {
    crystalSize: 7, sizeDistribution: 7, throughput: 10, scaleUp: 9, cdCost: 6,
    evaporative: true, forLargeCrystal: false,
    circulation: "external_pump_loop_heat_exchanger_flash_zone",
    bestUse: "high_tonnage_salt_sugar_citric_acid_evaporative",
  },
  oslo_fluidized_bed: {
    crystalSize: 10, sizeDistribution: 10, throughput: 7, scaleUp: 7, cdCost: 8,
    evaporative: true, forLargeCrystal: true,
    circulation: "fluidized_classified_bed_supersaturation_feed",
    bestUse: "potassium_chloride_large_uniform_crystal_growth",
  },
  cooling_disc_surface: {
    crystalSize: 6, sizeDistribution: 6, throughput: 7, scaleUp: 8, cdCost: 5,
    evaporative: false, forLargeCrystal: false,
    circulation: "cooling_surface_disc_or_drum_scraped_slurry",
    bestUse: "wax_paraffin_fatty_acid_cooling_crystallization",
  },
  reaction_crystallizer: {
    crystalSize: 5, sizeDistribution: 5, throughput: 8, scaleUp: 7, cdCost: 6,
    evaporative: false, forLargeCrystal: false,
    circulation: "reagent_mixing_zone_precipitation_reaction",
    bestUse: "calcium_carbonate_barium_sulfate_precipitation",
  },
};

function get(t: CrystallizerDtbType): CrystallizerDtbData {
  return DATA[t];
}

export const crystalSize = (t: CrystallizerDtbType) => get(t).crystalSize;
export const sizeDistribution = (t: CrystallizerDtbType) => get(t).sizeDistribution;
export const throughput = (t: CrystallizerDtbType) => get(t).throughput;
export const scaleUp = (t: CrystallizerDtbType) => get(t).scaleUp;
export const cdCost = (t: CrystallizerDtbType) => get(t).cdCost;
export const evaporative = (t: CrystallizerDtbType) => get(t).evaporative;
export const forLargeCrystal = (t: CrystallizerDtbType) => get(t).forLargeCrystal;
export const circulation = (t: CrystallizerDtbType) => get(t).circulation;
export const bestUse = (t: CrystallizerDtbType) => get(t).bestUse;
export const crystallizerDtbTypes = (): CrystallizerDtbType[] =>
  Object.keys(DATA) as CrystallizerDtbType[];
