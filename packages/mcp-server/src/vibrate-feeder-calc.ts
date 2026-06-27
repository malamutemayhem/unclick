export type VibrateFeederType =
  | "electromagnetic_tray"
  | "electromechanical_motor"
  | "grizzly_scalping_heavy"
  | "bowl_feeder_parts"
  | "linear_feeder_orient";

interface VibrateFeederData {
  throughput: number;
  precision: number;
  range: number;
  durability: number;
  vfCost: number;
  variableRate: boolean;
  forParts: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<VibrateFeederType, VibrateFeederData> = {
  electromagnetic_tray: {
    throughput: 7, precision: 9, range: 8, durability: 8, vfCost: 6,
    variableRate: true, forParts: false,
    drive: "electromagnetic_coil_spring_tray",
    bestUse: "pharma_food_fine_powder_dosing",
  },
  electromechanical_motor: {
    throughput: 9, precision: 6, range: 9, durability: 9, vfCost: 5,
    variableRate: false, forParts: false,
    drive: "eccentric_weight_motor_vibrate",
    bestUse: "mining_aggregate_heavy_bulk_feed",
  },
  grizzly_scalping_heavy: {
    throughput: 10, precision: 4, range: 7, durability: 10, vfCost: 7,
    variableRate: false, forParts: false,
    drive: "heavy_duty_motor_bar_screen_scalp",
    bestUse: "quarry_crusher_feed_oversize_remove",
  },
  bowl_feeder_parts: {
    throughput: 5, precision: 10, range: 5, durability: 7, vfCost: 7,
    variableRate: true, forParts: true,
    drive: "base_vibrate_spiral_track_orient",
    bestUse: "assembly_line_small_part_orient_feed",
  },
  linear_feeder_orient: {
    throughput: 5, precision: 10, range: 4, durability: 7, vfCost: 6,
    variableRate: true, forParts: true,
    drive: "linear_track_vibrate_inline_orient",
    bestUse: "pick_place_robot_part_singulate",
  },
};

function get(t: VibrateFeederType): VibrateFeederData {
  return DATA[t];
}

export const throughput = (t: VibrateFeederType) => get(t).throughput;
export const precision = (t: VibrateFeederType) => get(t).precision;
export const range = (t: VibrateFeederType) => get(t).range;
export const durability = (t: VibrateFeederType) => get(t).durability;
export const vfCost = (t: VibrateFeederType) => get(t).vfCost;
export const variableRate = (t: VibrateFeederType) => get(t).variableRate;
export const forParts = (t: VibrateFeederType) => get(t).forParts;
export const drive = (t: VibrateFeederType) => get(t).drive;
export const bestUse = (t: VibrateFeederType) => get(t).bestUse;
export const vibrateFeederTypes = (): VibrateFeederType[] =>
  Object.keys(DATA) as VibrateFeederType[];
