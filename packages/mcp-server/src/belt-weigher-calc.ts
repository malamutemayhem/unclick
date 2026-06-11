export type BeltWeigherType =
  | "single_idler"
  | "multi_idler"
  | "weigh_belt_feeder"
  | "nuclear_gauge"
  | "impact_plate";

interface BeltWeigherData {
  accuracy: number;
  throughput: number;
  speedRange: number;
  durability: number;
  bwCost: number;
  contactFree: boolean;
  forTradeApproved: boolean;
  weigherConfig: string;
  bestUse: string;
}

const DATA: Record<BeltWeigherType, BeltWeigherData> = {
  single_idler: {
    accuracy: 6, throughput: 9, speedRange: 8, durability: 8, bwCost: 4,
    contactFree: false, forTradeApproved: false,
    weigherConfig: "single_idler_belt_weigher_one_load_cell_simple_install_monitor",
    bestUse: "process_monitor_single_idler_belt_weigher_simple_flow_rate_check",
  },
  multi_idler: {
    accuracy: 8, throughput: 9, speedRange: 8, durability: 8, bwCost: 6,
    contactFree: false, forTradeApproved: true,
    weigherConfig: "multi_idler_belt_weigher_two_four_load_cell_accurate_custody",
    bestUse: "custody_transfer_multi_idler_belt_weigher_trade_certified_batch",
  },
  weigh_belt_feeder: {
    accuracy: 9, throughput: 7, speedRange: 9, durability: 7, bwCost: 7,
    contactFree: false, forTradeApproved: false,
    weigherConfig: "weigh_belt_feeder_short_belt_load_cell_gravimetric_feed_control",
    bestUse: "ingredient_dose_weigh_belt_feeder_gravimetric_rate_control_blend",
  },
  nuclear_gauge: {
    accuracy: 5, throughput: 10, speedRange: 10, durability: 9, bwCost: 9,
    contactFree: true, forTradeApproved: false,
    weigherConfig: "nuclear_gauge_belt_weigher_gamma_source_detector_non_contact",
    bestUse: "coal_flow_nuclear_gauge_belt_weigher_non_contact_harsh_environ",
  },
  impact_plate: {
    accuracy: 6, throughput: 8, speedRange: 7, durability: 9, bwCost: 5,
    contactFree: false, forTradeApproved: false,
    weigherConfig: "impact_plate_belt_weigher_deflect_plate_force_sensor_robust",
    bestUse: "aggregate_flow_impact_plate_belt_weigher_robust_dusty_environ",
  },
};

function get(t: BeltWeigherType): BeltWeigherData {
  return DATA[t];
}

export const accuracy = (t: BeltWeigherType) => get(t).accuracy;
export const throughput = (t: BeltWeigherType) => get(t).throughput;
export const speedRange = (t: BeltWeigherType) => get(t).speedRange;
export const durability = (t: BeltWeigherType) => get(t).durability;
export const bwCost = (t: BeltWeigherType) => get(t).bwCost;
export const contactFree = (t: BeltWeigherType) => get(t).contactFree;
export const forTradeApproved = (t: BeltWeigherType) => get(t).forTradeApproved;
export const weigherConfig = (t: BeltWeigherType) => get(t).weigherConfig;
export const bestUse = (t: BeltWeigherType) => get(t).bestUse;
export const beltWeigherTypes = (): BeltWeigherType[] =>
  Object.keys(DATA) as BeltWeigherType[];
