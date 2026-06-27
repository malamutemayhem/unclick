export type BallMillType =
  | "overflow_wet_grind"
  | "grate_discharge_coarse"
  | "sag_semi_autogenous"
  | "cement_tube_long"
  | "planetary_lab_fine";

interface BallMillData {
  fineness: number;
  throughput: number;
  energyEfficiency: number;
  flexibility: number;
  bmCost: number;
  wetGrind: boolean;
  forMining: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<BallMillType, BallMillData> = {
  overflow_wet_grind: {
    fineness: 8, throughput: 8, energyEfficiency: 6, flexibility: 7, bmCost: 6,
    wetGrind: true, forMining: true,
    media: "forged_steel_ball_wet_overflow",
    bestUse: "gold_copper_ore_concentrate_grind",
  },
  grate_discharge_coarse: {
    fineness: 6, throughput: 9, energyEfficiency: 7, flexibility: 6, bmCost: 7,
    wetGrind: true, forMining: true,
    media: "cast_steel_ball_grate_diaphragm",
    bestUse: "coarse_grind_circuit_sag_secondary",
  },
  sag_semi_autogenous: {
    fineness: 5, throughput: 10, energyEfficiency: 8, flexibility: 5, bmCost: 10,
    wetGrind: true, forMining: true,
    media: "ore_self_grind_plus_steel_ball",
    bestUse: "primary_mine_grind_high_tonnage",
  },
  cement_tube_long: {
    fineness: 9, throughput: 8, energyEfficiency: 5, flexibility: 4, bmCost: 8,
    wetGrind: false, forMining: false,
    media: "graduated_steel_ball_multi_chamber",
    bestUse: "cement_clinker_raw_meal_dry_grind",
  },
  planetary_lab_fine: {
    fineness: 10, throughput: 2, energyEfficiency: 4, flexibility: 10, bmCost: 5,
    wetGrind: true, forMining: false,
    media: "zirconia_agate_ball_planetary_jar",
    bestUse: "lab_nano_material_sample_fine_grind",
  },
};

function get(t: BallMillType): BallMillData {
  return DATA[t];
}

export const fineness = (t: BallMillType) => get(t).fineness;
export const throughput = (t: BallMillType) => get(t).throughput;
export const energyEfficiency = (t: BallMillType) => get(t).energyEfficiency;
export const flexibility = (t: BallMillType) => get(t).flexibility;
export const bmCost = (t: BallMillType) => get(t).bmCost;
export const wetGrind = (t: BallMillType) => get(t).wetGrind;
export const forMining = (t: BallMillType) => get(t).forMining;
export const media = (t: BallMillType) => get(t).media;
export const bestUse = (t: BallMillType) => get(t).bestUse;
export const ballMillTypes = (): BallMillType[] =>
  Object.keys(DATA) as BallMillType[];
