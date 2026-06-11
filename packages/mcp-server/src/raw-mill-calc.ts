export type RawMillType =
  | "ball_mill"
  | "vertical_roller"
  | "horizontal_roller"
  | "attritor_mill"
  | "ring_roller";

interface RawMillData {
  grindFineness: number;
  throughput: number;
  energyEfficiency: number;
  dryingCapability: number;
  rmCost_: number;
  integrated: boolean;
  forCement: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<RawMillType, RawMillData> = {
  ball_mill: {
    grindFineness: 8, throughput: 8, energyEfficiency: 5, dryingCapability: 5, rmCost_: 5,
    integrated: false, forCement: true,
    millConfig: "ball_mill_raw_grinding_steel_ball_charge_tumble_impact_abrade",
    bestUse: "cement_plant_ball_mill_raw_grinding_reliable_proven_technology",
  },
  vertical_roller: {
    grindFineness: 9, throughput: 10, energyEfficiency: 9, dryingCapability: 10, rmCost_: 9,
    integrated: true, forCement: true,
    millConfig: "vertical_roller_mill_raw_table_roller_compress_classify_dry",
    bestUse: "modern_cement_plant_vertical_roller_mill_grind_dry_classify_one",
  },
  horizontal_roller: {
    grindFineness: 9, throughput: 9, energyEfficiency: 8, dryingCapability: 7, rmCost_: 8,
    integrated: false, forCement: true,
    millConfig: "horizontal_roller_mill_raw_press_roller_bed_high_pressure_grind",
    bestUse: "cement_plant_horizontal_roller_mill_high_pressure_pre_grind",
  },
  attritor_mill: {
    grindFineness: 10, throughput: 5, energyEfficiency: 6, dryingCapability: 4, rmCost_: 7,
    integrated: false, forCement: false,
    millConfig: "attritor_mill_raw_stirred_media_ultra_fine_grind_wet_slurry",
    bestUse: "specialty_mineral_attritor_mill_ultra_fine_grinding_wet_process",
  },
  ring_roller: {
    grindFineness: 7, throughput: 7, energyEfficiency: 7, dryingCapability: 8, rmCost_: 6,
    integrated: true, forCement: false,
    millConfig: "ring_roller_mill_raw_pendulum_roller_ring_centrifugal_classify",
    bestUse: "mineral_processing_ring_roller_mill_moderate_fineness_dry_grind",
  },
};

function get(t: RawMillType): RawMillData {
  return DATA[t];
}

export const grindFineness = (t: RawMillType) => get(t).grindFineness;
export const throughput = (t: RawMillType) => get(t).throughput;
export const energyEfficiency = (t: RawMillType) => get(t).energyEfficiency;
export const dryingCapability = (t: RawMillType) => get(t).dryingCapability;
export const rmCost_ = (t: RawMillType) => get(t).rmCost_;
export const integrated = (t: RawMillType) => get(t).integrated;
export const forCement = (t: RawMillType) => get(t).forCement;
export const millConfig = (t: RawMillType) => get(t).millConfig;
export const bestUse = (t: RawMillType) => get(t).bestUse;
export const rawMillTypes = (): RawMillType[] =>
  Object.keys(DATA) as RawMillType[];
