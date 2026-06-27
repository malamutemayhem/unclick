export type CrystallizerType =
  | "forced_circulation_fc"
  | "draft_tube_baffle_dtb"
  | "oslo_fluidized_bed"
  | "cooling_surface_scraped"
  | "evaporative_adiabatic_vacuum";

interface CrystallizerData {
  crystalSize: number;
  purity: number;
  throughput: number;
  energy: number;
  crCost: number;
  vacuum: boolean;
  forSalt: boolean;
  nucleation: string;
  bestUse: string;
}

const DATA: Record<CrystallizerType, CrystallizerData> = {
  forced_circulation_fc: {
    crystalSize: 6, purity: 7, throughput: 9, energy: 5, crCost: 6,
    vacuum: false, forSalt: true,
    nucleation: "pump_loop_supersaturation_control",
    bestUse: "salt_sodium_sulfate_bulk_crystal",
  },
  draft_tube_baffle_dtb: {
    crystalSize: 9, purity: 9, throughput: 7, energy: 6, crCost: 8,
    vacuum: false, forSalt: false,
    nucleation: "internal_baffle_fines_removal",
    bestUse: "pharma_specialty_large_uniform",
  },
  oslo_fluidized_bed: {
    crystalSize: 10, purity: 8, throughput: 6, energy: 6, crCost: 7,
    vacuum: false, forSalt: false,
    nucleation: "classified_bed_growth_zone",
    bestUse: "fertilizer_sugar_coarse_crystal",
  },
  cooling_surface_scraped: {
    crystalSize: 5, purity: 6, throughput: 7, energy: 8, crCost: 5,
    vacuum: false, forSalt: false,
    nucleation: "cooled_wall_scraper_blade",
    bestUse: "wax_fat_paraffin_cooling_crystal",
  },
  evaporative_adiabatic_vacuum: {
    crystalSize: 7, purity: 8, throughput: 8, energy: 7, crCost: 9,
    vacuum: true, forSalt: true,
    nucleation: "flash_evaporation_vacuum_cool",
    bestUse: "heat_sensitive_citric_acid_vacuum",
  },
};

function get(t: CrystallizerType): CrystallizerData {
  return DATA[t];
}

export const crystalSize = (t: CrystallizerType) => get(t).crystalSize;
export const purity = (t: CrystallizerType) => get(t).purity;
export const throughput = (t: CrystallizerType) => get(t).throughput;
export const energy = (t: CrystallizerType) => get(t).energy;
export const crCost = (t: CrystallizerType) => get(t).crCost;
export const vacuum = (t: CrystallizerType) => get(t).vacuum;
export const forSalt = (t: CrystallizerType) => get(t).forSalt;
export const nucleation = (t: CrystallizerType) => get(t).nucleation;
export const bestUse = (t: CrystallizerType) => get(t).bestUse;
export const crystallizerTypes = (): CrystallizerType[] =>
  Object.keys(DATA) as CrystallizerType[];
