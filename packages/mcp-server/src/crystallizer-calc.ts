export type CrystallizerType =
  | "cooling_crystallizer"
  | "evaporative_crystallizer"
  | "dtb_draft_tube"
  | "oslo_fluidized"
  | "forced_circulation";

interface CrystallizerData {
  crystalSize: number;
  sizeDistribution: number;
  throughput: number;
  energyEfficiency: number;
  crCost_: number;
  continuous: boolean;
  forSugar: boolean;
  crystallizerConfig: string;
  bestUse: string;
}

const DATA: Record<CrystallizerType, CrystallizerData> = {
  cooling_crystallizer: {
    crystalSize: 7, sizeDistribution: 7, throughput: 6, energyEfficiency: 8, crCost_: 5,
    continuous: false, forSugar: true,
    crystallizerConfig: "cooling_crystallizer_jacketed_tank_slow_cool_supersaturation_grow",
    bestUse: "sugar_refinery_cooling_crystallizer_slow_controlled_crystal_growth",
  },
  evaporative_crystallizer: {
    crystalSize: 8, sizeDistribution: 8, throughput: 8, energyEfficiency: 6, crCost_: 7,
    continuous: true, forSugar: true,
    crystallizerConfig: "evaporative_crystallizer_vacuum_boil_concentrate_supersaturate_grow",
    bestUse: "chemical_salt_sugar_evaporative_crystallizer_vacuum_concentrate",
  },
  dtb_draft_tube: {
    crystalSize: 10, sizeDistribution: 10, throughput: 7, energyEfficiency: 7, crCost_: 9,
    continuous: true, forSugar: false,
    crystallizerConfig: "dtb_draft_tube_baffle_crystallizer_internal_circulation_uniform",
    bestUse: "pharmaceutical_chemical_dtb_crystallizer_uniform_large_crystal_pure",
  },
  oslo_fluidized: {
    crystalSize: 9, sizeDistribution: 9, throughput: 9, energyEfficiency: 7, crCost_: 10,
    continuous: true, forSugar: false,
    crystallizerConfig: "oslo_fluidized_bed_crystallizer_classified_suspension_large_crystal",
    bestUse: "specialty_chemical_oslo_crystallizer_large_uniform_crystal_classified",
  },
  forced_circulation: {
    crystalSize: 6, sizeDistribution: 6, throughput: 10, energyEfficiency: 5, crCost_: 6,
    continuous: true, forSugar: true,
    crystallizerConfig: "forced_circulation_crystallizer_pump_loop_heat_exchanger_high_rate",
    bestUse: "bulk_chemical_sugar_forced_circulation_crystallizer_high_throughput",
  },
};

function get(t: CrystallizerType): CrystallizerData {
  return DATA[t];
}

export const crystalSize = (t: CrystallizerType) => get(t).crystalSize;
export const sizeDistribution = (t: CrystallizerType) => get(t).sizeDistribution;
export const throughput = (t: CrystallizerType) => get(t).throughput;
export const energyEfficiency = (t: CrystallizerType) => get(t).energyEfficiency;
export const crCost_ = (t: CrystallizerType) => get(t).crCost_;
export const continuous = (t: CrystallizerType) => get(t).continuous;
export const forSugar = (t: CrystallizerType) => get(t).forSugar;
export const crystallizerConfig = (t: CrystallizerType) => get(t).crystallizerConfig;
export const bestUse = (t: CrystallizerType) => get(t).bestUse;
export const crystallizerTypes = (): CrystallizerType[] =>
  Object.keys(DATA) as CrystallizerType[];
