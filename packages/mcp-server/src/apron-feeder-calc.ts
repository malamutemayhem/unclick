export type ApronFeederType =
  | "light_duty_drag_chain"
  | "medium_duty_overlap"
  | "heavy_duty_mining"
  | "reciprocating_plate"
  | "belt_feeder_weigh";

interface ApronFeederData {
  capacity: number;
  lumpSize: number;
  precision: number;
  durability: number;
  afCost: number;
  variable: boolean;
  forMining: boolean;
  pan: string;
  bestUse: string;
}

const DATA: Record<ApronFeederType, ApronFeederData> = {
  light_duty_drag_chain: {
    capacity: 5, lumpSize: 5, precision: 6, durability: 6, afCost: 4,
    variable: true, forMining: false,
    pan: "flat_steel_pan_chain_link_light",
    bestUse: "foundry_casting_small_material_move",
  },
  medium_duty_overlap: {
    capacity: 7, lumpSize: 7, precision: 6, durability: 8, afCost: 6,
    variable: true, forMining: false,
    pan: "overlapping_steel_pan_sealed_joint",
    bestUse: "cement_aggregate_reclaim_hopper_feed",
  },
  heavy_duty_mining: {
    capacity: 10, lumpSize: 10, precision: 5, durability: 10, afCost: 9,
    variable: true, forMining: true,
    pan: "manganese_steel_pan_heavy_chain",
    bestUse: "primary_crusher_feed_run_of_mine",
  },
  reciprocating_plate: {
    capacity: 8, lumpSize: 8, precision: 7, durability: 7, afCost: 5,
    variable: false, forMining: false,
    pan: "reciprocating_plate_shuttle_stroke",
    bestUse: "bin_hopper_discharge_controlled_rate",
  },
  belt_feeder_weigh: {
    capacity: 7, lumpSize: 6, precision: 10, durability: 7, afCost: 7,
    variable: true, forMining: false,
    pan: "continuous_belt_load_cell_weigh",
    bestUse: "batch_plant_dosing_precise_weight",
  },
};

function get(t: ApronFeederType): ApronFeederData {
  return DATA[t];
}

export const capacity = (t: ApronFeederType) => get(t).capacity;
export const lumpSize = (t: ApronFeederType) => get(t).lumpSize;
export const precision = (t: ApronFeederType) => get(t).precision;
export const durability = (t: ApronFeederType) => get(t).durability;
export const afCost = (t: ApronFeederType) => get(t).afCost;
export const variable = (t: ApronFeederType) => get(t).variable;
export const forMining = (t: ApronFeederType) => get(t).forMining;
export const pan = (t: ApronFeederType) => get(t).pan;
export const bestUse = (t: ApronFeederType) => get(t).bestUse;
export const apronFeederTypes = (): ApronFeederType[] =>
  Object.keys(DATA) as ApronFeederType[];
