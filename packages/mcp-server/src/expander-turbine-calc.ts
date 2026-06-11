export type ExpanderTurbineType =
  | "radial_inflow_cryo"
  | "axial_flow_multistage"
  | "organic_rankine_orc"
  | "turboexpander_gen"
  | "wet_gas_expander";

interface ExpanderTurbineData {
  efficiency: number;
  powerRecovery: number;
  temperatureRange: number;
  reliability: number;
  etCost: number;
  generatorCoupled: boolean;
  forCryogenic: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<ExpanderTurbineType, ExpanderTurbineData> = {
  radial_inflow_cryo: {
    efficiency: 9, powerRecovery: 7, temperatureRange: 10, reliability: 9, etCost: 7,
    generatorCoupled: false, forCryogenic: true,
    design: "radial_inflow_wheel_cryogenic_bearing_seal",
    bestUse: "air_separation_lng_plant_cryogenic_cooling",
  },
  axial_flow_multistage: {
    efficiency: 9, powerRecovery: 9, temperatureRange: 7, reliability: 8, etCost: 9,
    generatorCoupled: true, forCryogenic: false,
    design: "multi_stage_axial_blading_high_pressure_ratio",
    bestUse: "fcc_catalyst_cracker_hot_gas_energy_recovery",
  },
  organic_rankine_orc: {
    efficiency: 7, powerRecovery: 6, temperatureRange: 6, reliability: 8, etCost: 6,
    generatorCoupled: true, forCryogenic: false,
    design: "organic_fluid_low_temp_heat_scroll_or_radial",
    bestUse: "waste_heat_recovery_geothermal_biomass_low_t",
  },
  turboexpander_gen: {
    efficiency: 8, powerRecovery: 10, temperatureRange: 8, reliability: 9, etCost: 8,
    generatorCoupled: true, forCryogenic: false,
    design: "let_down_station_expander_generator_coupled",
    bestUse: "natural_gas_pressure_let_down_power_recovery",
  },
  wet_gas_expander: {
    efficiency: 7, powerRecovery: 8, temperatureRange: 7, reliability: 7, etCost: 8,
    generatorCoupled: true, forCryogenic: false,
    design: "two_phase_flow_liquid_tolerant_erosion_resist",
    bestUse: "geothermal_flash_wet_steam_two_phase_expand",
  },
};

function get(t: ExpanderTurbineType): ExpanderTurbineData {
  return DATA[t];
}

export const efficiency = (t: ExpanderTurbineType) => get(t).efficiency;
export const powerRecovery = (t: ExpanderTurbineType) => get(t).powerRecovery;
export const temperatureRange = (t: ExpanderTurbineType) => get(t).temperatureRange;
export const reliability = (t: ExpanderTurbineType) => get(t).reliability;
export const etCost = (t: ExpanderTurbineType) => get(t).etCost;
export const generatorCoupled = (t: ExpanderTurbineType) => get(t).generatorCoupled;
export const forCryogenic = (t: ExpanderTurbineType) => get(t).forCryogenic;
export const design = (t: ExpanderTurbineType) => get(t).design;
export const bestUse = (t: ExpanderTurbineType) => get(t).bestUse;
export const expanderTurbineTypes = (): ExpanderTurbineType[] =>
  Object.keys(DATA) as ExpanderTurbineType[];
