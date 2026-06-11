export type HeatPumpHvacType =
  | "air_source_split"
  | "water_source_geo"
  | "absorption_gas_fired"
  | "co2_transcritical"
  | "cascade_two_stage";

interface HeatPumpHvacData {
  heatingCop: number;
  coolingEer: number;
  coldClimatePerf: number;
  hotWaterCapable: number;
  hpCost: number;
  reversible: boolean;
  forColdClimate: boolean;
  refrigerant: string;
  bestUse: string;
}

const DATA: Record<HeatPumpHvacType, HeatPumpHvacData> = {
  air_source_split: {
    heatingCop: 7, coolingEer: 8, coldClimatePerf: 5, hotWaterCapable: 6, hpCost: 5,
    reversible: true, forColdClimate: false,
    refrigerant: "r410a_r32_inverter_scroll_outdoor_indoor_split",
    bestUse: "residential_light_commercial_mild_climate_retrofit",
  },
  water_source_geo: {
    heatingCop: 10, coolingEer: 9, coldClimatePerf: 10, hotWaterCapable: 8, hpCost: 9,
    reversible: true, forColdClimate: true,
    refrigerant: "r410a_ground_loop_water_to_water_or_water_to_air",
    bestUse: "new_build_campus_stable_ground_temp_all_climate",
  },
  absorption_gas_fired: {
    heatingCop: 6, coolingEer: 5, coldClimatePerf: 7, hotWaterCapable: 9, hpCost: 8,
    reversible: true, forColdClimate: true,
    refrigerant: "ammonia_water_or_libr_water_gas_burner_generator",
    bestUse: "commercial_large_no_electric_capacity_gas_available",
  },
  co2_transcritical: {
    heatingCop: 8, coolingEer: 6, coldClimatePerf: 8, hotWaterCapable: 10, hpCost: 8,
    reversible: false, forColdClimate: true,
    refrigerant: "r744_co2_transcritical_cycle_gas_cooler_high_press",
    bestUse: "domestic_hot_water_heating_sanitary_low_gwp_natural",
  },
  cascade_two_stage: {
    heatingCop: 9, coolingEer: 7, coldClimatePerf: 9, hotWaterCapable: 8, hpCost: 9,
    reversible: true, forColdClimate: true,
    refrigerant: "two_stage_cascade_low_temp_co2_high_temp_hfc_hfo",
    bestUse: "extreme_cold_region_commercial_high_temp_supply",
  },
};

function get(t: HeatPumpHvacType): HeatPumpHvacData {
  return DATA[t];
}

export const heatingCop = (t: HeatPumpHvacType) => get(t).heatingCop;
export const coolingEer = (t: HeatPumpHvacType) => get(t).coolingEer;
export const coldClimatePerf = (t: HeatPumpHvacType) => get(t).coldClimatePerf;
export const hotWaterCapable = (t: HeatPumpHvacType) => get(t).hotWaterCapable;
export const hpCost = (t: HeatPumpHvacType) => get(t).hpCost;
export const reversible = (t: HeatPumpHvacType) => get(t).reversible;
export const forColdClimate = (t: HeatPumpHvacType) => get(t).forColdClimate;
export const refrigerant = (t: HeatPumpHvacType) => get(t).refrigerant;
export const bestUse = (t: HeatPumpHvacType) => get(t).bestUse;
export const heatPumpHvacTypes = (): HeatPumpHvacType[] =>
  Object.keys(DATA) as HeatPumpHvacType[];
