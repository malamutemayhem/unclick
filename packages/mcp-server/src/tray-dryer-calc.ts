export type TrayDryerType =
  | "cabinet_batch_static"
  | "vacuum_tray_low_temp"
  | "through_circulation_perf"
  | "truck_in_tunnel_semi"
  | "multi_tier_gravity_feed";

interface TrayDryerData {
  uniformity: number;
  gentleness: number;
  flexibility: number;
  throughput: number;
  tdCost: number;
  batch: boolean;
  forHeatSens: boolean;
  airPath: string;
  bestUse: string;
}

const DATA: Record<TrayDryerType, TrayDryerData> = {
  cabinet_batch_static: {
    uniformity: 6, gentleness: 7, flexibility: 9, throughput: 3, tdCost: 3,
    batch: true, forHeatSens: false,
    airPath: "cross_flow_shelf_baffle_recirculate",
    bestUse: "lab_pilot_small_batch_multi_product",
  },
  vacuum_tray_low_temp: {
    uniformity: 8, gentleness: 10, flexibility: 7, throughput: 3, tdCost: 8,
    batch: true, forHeatSens: true,
    airPath: "vacuum_conduction_shelf_heat_no_air",
    bestUse: "pharma_api_heat_sensitive_powder",
  },
  through_circulation_perf: {
    uniformity: 9, gentleness: 6, flexibility: 6, throughput: 7, tdCost: 6,
    batch: true, forHeatSens: false,
    airPath: "upward_through_perforated_tray_bed",
    bestUse: "herb_leaf_granule_even_bed_dry",
  },
  truck_in_tunnel_semi: {
    uniformity: 7, gentleness: 7, flexibility: 8, throughput: 8, tdCost: 5,
    batch: false, forHeatSens: false,
    airPath: "counter_flow_tunnel_truck_advance",
    bestUse: "ceramic_brick_lumber_large_batch_dry",
  },
  multi_tier_gravity_feed: {
    uniformity: 7, gentleness: 5, flexibility: 5, throughput: 9, tdCost: 7,
    batch: false, forHeatSens: false,
    airPath: "gravity_cascade_tier_hot_air_cross",
    bestUse: "grain_seed_pellet_continuous_gentle",
  },
};

function get(t: TrayDryerType): TrayDryerData {
  return DATA[t];
}

export const uniformity = (t: TrayDryerType) => get(t).uniformity;
export const gentleness = (t: TrayDryerType) => get(t).gentleness;
export const flexibility = (t: TrayDryerType) => get(t).flexibility;
export const throughput = (t: TrayDryerType) => get(t).throughput;
export const tdCost = (t: TrayDryerType) => get(t).tdCost;
export const batch = (t: TrayDryerType) => get(t).batch;
export const forHeatSens = (t: TrayDryerType) => get(t).forHeatSens;
export const airPath = (t: TrayDryerType) => get(t).airPath;
export const bestUse = (t: TrayDryerType) => get(t).bestUse;
export const trayDryerTypes = (): TrayDryerType[] =>
  Object.keys(DATA) as TrayDryerType[];
