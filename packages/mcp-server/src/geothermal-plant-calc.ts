export type GeothermalPlantType =
  | "dry_steam_direct"
  | "flash_steam_single"
  | "binary_cycle_orc"
  | "enhanced_geothermal"
  | "ground_source_heat";

interface GeothermalPlantData {
  efficiency: number;
  resourceTemp: number;
  capacity: number;
  envImpact: number;
  gpCost: number;
  directSteam: boolean;
  forElectricity: boolean;
  cycle: string;
  bestUse: string;
}

const DATA: Record<GeothermalPlantType, GeothermalPlantData> = {
  dry_steam_direct: {
    efficiency: 9, resourceTemp: 10, capacity: 9, envImpact: 8, gpCost: 7,
    directSteam: true, forElectricity: true,
    cycle: "natural_dry_steam_direct_to_turbine_condenser",
    bestUse: "high_enthalpy_vapor_dominated_geysers_field_power",
  },
  flash_steam_single: {
    efficiency: 8, resourceTemp: 8, capacity: 9, envImpact: 7, gpCost: 8,
    directSteam: false, forElectricity: true,
    cycle: "pressure_reduction_flash_separator_steam_turbine",
    bestUse: "liquid_dominated_high_temp_reservoir_utility_power",
  },
  binary_cycle_orc: {
    efficiency: 7, resourceTemp: 5, capacity: 6, envImpact: 10, gpCost: 7,
    directSteam: false, forElectricity: true,
    cycle: "organic_rankine_cycle_secondary_working_fluid_closed",
    bestUse: "moderate_temp_resource_zero_emission_closed_loop",
  },
  enhanced_geothermal: {
    efficiency: 6, resourceTemp: 7, capacity: 7, envImpact: 5, gpCost: 10,
    directSteam: false, forElectricity: true,
    cycle: "hydraulic_stimulation_engineered_reservoir_binary",
    bestUse: "hot_dry_rock_no_natural_permeability_research_frontier",
  },
  ground_source_heat: {
    efficiency: 10, resourceTemp: 2, capacity: 3, envImpact: 10, gpCost: 5,
    directSteam: false, forElectricity: false,
    cycle: "ground_loop_heat_pump_coefficient_of_performance",
    bestUse: "building_heating_cooling_shallow_ground_exchange",
  },
};

function get(t: GeothermalPlantType): GeothermalPlantData {
  return DATA[t];
}

export const efficiency = (t: GeothermalPlantType) => get(t).efficiency;
export const resourceTemp = (t: GeothermalPlantType) => get(t).resourceTemp;
export const capacity = (t: GeothermalPlantType) => get(t).capacity;
export const envImpact = (t: GeothermalPlantType) => get(t).envImpact;
export const gpCost = (t: GeothermalPlantType) => get(t).gpCost;
export const directSteam = (t: GeothermalPlantType) => get(t).directSteam;
export const forElectricity = (t: GeothermalPlantType) => get(t).forElectricity;
export const cycle = (t: GeothermalPlantType) => get(t).cycle;
export const bestUse = (t: GeothermalPlantType) => get(t).bestUse;
export const geothermalPlantTypes = (): GeothermalPlantType[] =>
  Object.keys(DATA) as GeothermalPlantType[];
