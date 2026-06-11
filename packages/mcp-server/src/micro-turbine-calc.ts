export type MicroTurbineType =
  | "natural_gas_recuperated"
  | "biogas_landfill_fuel"
  | "oil_field_flare_gas"
  | "chp_combined_heat"
  | "multi_pack_array";

interface MicroTurbineData {
  efficiency: number;
  emissions: number;
  reliability: number;
  fuelFlex: number;
  mtCost: number;
  chpCapable: boolean;
  forDistributed: boolean;
  cycle: string;
  bestUse: string;
}

const DATA: Record<MicroTurbineType, MicroTurbineData> = {
  natural_gas_recuperated: {
    efficiency: 8, emissions: 9, reliability: 8, fuelFlex: 5, mtCost: 7,
    chpCapable: true, forDistributed: true,
    cycle: "brayton_cycle_recuperator_air_bearing_single_shaft",
    bestUse: "commercial_building_baseload_distributed_generation",
  },
  biogas_landfill_fuel: {
    efficiency: 7, emissions: 8, reliability: 7, fuelFlex: 9, mtCost: 7,
    chpCapable: true, forDistributed: true,
    cycle: "modified_combustor_fuel_treatment_siloxane_removal",
    bestUse: "landfill_wastewater_digester_gas_to_energy_project",
  },
  oil_field_flare_gas: {
    efficiency: 6, emissions: 8, reliability: 7, fuelFlex: 8, mtCost: 6,
    chpCapable: false, forDistributed: true,
    cycle: "simple_cycle_variable_btu_gas_flare_reduction",
    bestUse: "oil_field_associated_gas_flare_elimination_power",
  },
  chp_combined_heat: {
    efficiency: 10, emissions: 9, reliability: 8, fuelFlex: 6, mtCost: 8,
    chpCapable: true, forDistributed: true,
    cycle: "recuperated_cycle_exhaust_heat_recovery_hot_water",
    bestUse: "hospital_hotel_pool_heating_high_thermal_demand_site",
  },
  multi_pack_array: {
    efficiency: 8, emissions: 9, reliability: 9, fuelFlex: 5, mtCost: 9,
    chpCapable: true, forDistributed: true,
    cycle: "multiple_units_parallel_n_plus_1_redundancy_scalable",
    bestUse: "campus_microgrid_scalable_reliable_multi_mw_plant",
  },
};

function get(t: MicroTurbineType): MicroTurbineData {
  return DATA[t];
}

export const efficiency = (t: MicroTurbineType) => get(t).efficiency;
export const emissions = (t: MicroTurbineType) => get(t).emissions;
export const reliability = (t: MicroTurbineType) => get(t).reliability;
export const fuelFlex = (t: MicroTurbineType) => get(t).fuelFlex;
export const mtCost = (t: MicroTurbineType) => get(t).mtCost;
export const chpCapable = (t: MicroTurbineType) => get(t).chpCapable;
export const forDistributed = (t: MicroTurbineType) => get(t).forDistributed;
export const cycle = (t: MicroTurbineType) => get(t).cycle;
export const bestUse = (t: MicroTurbineType) => get(t).bestUse;
export const microTurbineTypes = (): MicroTurbineType[] =>
  Object.keys(DATA) as MicroTurbineType[];
