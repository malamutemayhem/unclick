export type GrainDryerType =
  | "continuous_flow_crossflow"
  | "continuous_flow_mixed"
  | "batch_in_bin_fan"
  | "recirculating_tower"
  | "low_temp_solar_hybrid";

interface GrainDryerData {
  capacity: number;
  efficiency: number;
  uniformity: number;
  quality: number;
  gdCost: number;
  continuous: boolean;
  forLargeFarm: boolean;
  heat: string;
  bestUse: string;
}

const DATA: Record<GrainDryerType, GrainDryerData> = {
  continuous_flow_crossflow: {
    capacity: 9, efficiency: 7, uniformity: 7, quality: 7, gdCost: 7,
    continuous: true, forLargeFarm: true,
    heat: "lp_gas_crossflow_column",
    bestUse: "high_volume_corn_wheat_drying",
  },
  continuous_flow_mixed: {
    capacity: 9, efficiency: 8, uniformity: 9, quality: 8, gdCost: 8,
    continuous: true, forLargeFarm: true,
    heat: "mixed_flow_alternating_air_grain",
    bestUse: "premium_seed_gentle_drying",
  },
  batch_in_bin_fan: {
    capacity: 5, efficiency: 6, uniformity: 6, quality: 9, gdCost: 3,
    continuous: false, forLargeFarm: false,
    heat: "natural_air_supplemental_heat",
    bestUse: "small_farm_storage_drying_combo",
  },
  recirculating_tower: {
    capacity: 10, efficiency: 8, uniformity: 8, quality: 8, gdCost: 9,
    continuous: true, forLargeFarm: true,
    heat: "tower_recirculating_grain_path",
    bestUse: "elevator_commercial_high_throughput",
  },
  low_temp_solar_hybrid: {
    capacity: 4, efficiency: 10, uniformity: 7, quality: 10, gdCost: 5,
    continuous: false, forLargeFarm: false,
    heat: "solar_collector_low_temp_ambient",
    bestUse: "organic_specialty_quality_focus",
  },
};

function get(t: GrainDryerType): GrainDryerData {
  return DATA[t];
}

export const capacity = (t: GrainDryerType) => get(t).capacity;
export const efficiency = (t: GrainDryerType) => get(t).efficiency;
export const uniformity = (t: GrainDryerType) => get(t).uniformity;
export const quality = (t: GrainDryerType) => get(t).quality;
export const gdCost = (t: GrainDryerType) => get(t).gdCost;
export const continuous = (t: GrainDryerType) => get(t).continuous;
export const forLargeFarm = (t: GrainDryerType) => get(t).forLargeFarm;
export const heat = (t: GrainDryerType) => get(t).heat;
export const bestUse = (t: GrainDryerType) => get(t).bestUse;
export const grainDryerTypes = (): GrainDryerType[] =>
  Object.keys(DATA) as GrainDryerType[];
