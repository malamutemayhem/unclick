export type WeighFeederType =
  | "belt_weigh_continuous"
  | "loss_in_weight_batch"
  | "screw_weigh_volumetric"
  | "vibrating_weigh_tray"
  | "gravimetric_belt_prec";

interface WeighFeederData {
  accuracy: number;
  feedRate: number;
  rangeability: number;
  reliability: number;
  wfCost: number;
  continuous: boolean;
  forMicroDosing: boolean;
  metering: string;
  bestUse: string;
}

const DATA: Record<WeighFeederType, WeighFeederData> = {
  belt_weigh_continuous: {
    accuracy: 8, feedRate: 10, rangeability: 8, reliability: 8, wfCost: 6,
    continuous: true, forMicroDosing: false,
    metering: "belt_load_cell_speed_sensor_continuous_weigh",
    bestUse: "cement_mining_aggregate_high_tonnage_metering",
  },
  loss_in_weight_batch: {
    accuracy: 10, feedRate: 6, rangeability: 10, reliability: 9, wfCost: 8,
    continuous: false, forMicroDosing: true,
    metering: "hopper_weigh_loss_rate_control_refill_cycle",
    bestUse: "pharma_additive_micro_ingredient_precision",
  },
  screw_weigh_volumetric: {
    accuracy: 7, feedRate: 7, rangeability: 7, reliability: 9, wfCost: 4,
    continuous: true, forMicroDosing: false,
    metering: "screw_auger_speed_control_volumetric_weigh",
    bestUse: "plastic_pellet_powder_chemical_basic_dosing",
  },
  vibrating_weigh_tray: {
    accuracy: 8, feedRate: 8, rangeability: 8, reliability: 8, wfCost: 5,
    continuous: true, forMicroDosing: false,
    metering: "vibrating_tray_electromagnetic_drive_loadcell",
    bestUse: "food_snack_tobacco_fragile_product_gentle_feed",
  },
  gravimetric_belt_prec: {
    accuracy: 9, feedRate: 9, rangeability: 9, reliability: 8, wfCost: 7,
    continuous: true, forMicroDosing: false,
    metering: "precision_belt_dual_idler_loadcell_closed_loop",
    bestUse: "glass_batch_chemical_reactor_precise_continuous",
  },
};

function get(t: WeighFeederType): WeighFeederData {
  return DATA[t];
}

export const accuracy = (t: WeighFeederType) => get(t).accuracy;
export const feedRate = (t: WeighFeederType) => get(t).feedRate;
export const rangeability = (t: WeighFeederType) => get(t).rangeability;
export const reliability = (t: WeighFeederType) => get(t).reliability;
export const wfCost = (t: WeighFeederType) => get(t).wfCost;
export const continuous = (t: WeighFeederType) => get(t).continuous;
export const forMicroDosing = (t: WeighFeederType) => get(t).forMicroDosing;
export const metering = (t: WeighFeederType) => get(t).metering;
export const bestUse = (t: WeighFeederType) => get(t).bestUse;
export const weighFeederTypes = (): WeighFeederType[] =>
  Object.keys(DATA) as WeighFeederType[];
