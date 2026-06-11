export type CaneCrusherType =
  | "three_roller"
  | "four_roller"
  | "five_roller"
  | "six_roller"
  | "diffuser";

interface CaneCrusherData {
  extractionRate: number;
  throughput: number;
  fiberHandling: number;
  energyEfficiency: number;
  ccCost_: number;
  continuous: boolean;
  forRaw: boolean;
  crusherConfig: string;
  bestUse: string;
}

const DATA: Record<CaneCrusherType, CaneCrusherData> = {
  three_roller: {
    extractionRate: 6, throughput: 7, fiberHandling: 7, energyEfficiency: 6, ccCost_: 5,
    continuous: true, forRaw: true,
    crusherConfig: "three_roller_cane_crusher_grooved_roll_hydraulic_pressure_juice",
    bestUse: "small_sugar_mill_three_roller_crusher_basic_juice_extraction_cane",
  },
  four_roller: {
    extractionRate: 7, throughput: 8, fiberHandling: 8, energyEfficiency: 7, ccCost_: 6,
    continuous: true, forRaw: true,
    crusherConfig: "four_roller_cane_crusher_feed_delivery_top_bottom_discharge_roll",
    bestUse: "mid_size_sugar_mill_four_roller_crusher_improved_feed_extraction",
  },
  five_roller: {
    extractionRate: 8, throughput: 9, fiberHandling: 9, energyEfficiency: 7, ccCost_: 8,
    continuous: true, forRaw: true,
    crusherConfig: "five_roller_cane_crusher_underfeed_re_absorption_high_extraction",
    bestUse: "commercial_sugar_mill_five_roller_crusher_re_absorption_high_yield",
  },
  six_roller: {
    extractionRate: 9, throughput: 10, fiberHandling: 10, energyEfficiency: 8, ccCost_: 9,
    continuous: true, forRaw: true,
    crusherConfig: "six_roller_cane_crusher_tandem_mill_maximum_extraction_bagasse_dry",
    bestUse: "large_sugar_factory_six_roller_tandem_mill_maximum_juice_extraction",
  },
  diffuser: {
    extractionRate: 10, throughput: 10, fiberHandling: 8, energyEfficiency: 9, ccCost_: 10,
    continuous: true, forRaw: true,
    crusherConfig: "diffuser_cane_counter_current_hot_water_wash_extract_sucrose_max",
    bestUse: "modern_sugar_factory_diffuser_counter_current_wash_maximum_sucrose",
  },
};

function get(t: CaneCrusherType): CaneCrusherData {
  return DATA[t];
}

export const extractionRate = (t: CaneCrusherType) => get(t).extractionRate;
export const throughput = (t: CaneCrusherType) => get(t).throughput;
export const fiberHandling = (t: CaneCrusherType) => get(t).fiberHandling;
export const energyEfficiency = (t: CaneCrusherType) => get(t).energyEfficiency;
export const ccCost_ = (t: CaneCrusherType) => get(t).ccCost_;
export const continuous = (t: CaneCrusherType) => get(t).continuous;
export const forRaw = (t: CaneCrusherType) => get(t).forRaw;
export const crusherConfig = (t: CaneCrusherType) => get(t).crusherConfig;
export const bestUse = (t: CaneCrusherType) => get(t).bestUse;
export const caneCrusherTypes = (): CaneCrusherType[] =>
  Object.keys(DATA) as CaneCrusherType[];
