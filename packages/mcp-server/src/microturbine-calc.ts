export type MicroturbineType =
  | "single_shaft_recuperated"
  | "two_shaft"
  | "oil_free_air_bearing"
  | "multi_pack_array"
  | "biogas_fueled";

interface MicroturbineData {
  efficiency: number;
  capacity: number;
  reliability: number;
  emissions: number;
  mtCost: number;
  chpCapable: boolean;
  forDistributed: boolean;
  turbine: string;
  bestUse: string;
}

const DATA: Record<MicroturbineType, MicroturbineData> = {
  single_shaft_recuperated: {
    efficiency: 8, capacity: 5, reliability: 9, emissions: 9, mtCost: 6,
    chpCapable: true, forDistributed: true,
    turbine: "single_shaft_radial_compressor_recuperator_30_65kw_unit",
    bestUse: "small_commercial_building_restaurant_hotel_chp_prime_power",
  },
  two_shaft: {
    efficiency: 7, capacity: 6, reliability: 8, emissions: 8, mtCost: 7,
    chpCapable: true, forDistributed: true,
    turbine: "two_shaft_power_turbine_variable_speed_mechanical_drive",
    bestUse: "oil_gas_wellhead_compression_mechanical_drive_remote_site",
  },
  oil_free_air_bearing: {
    efficiency: 8, capacity: 5, reliability: 10, emissions: 9, mtCost: 8,
    chpCapable: true, forDistributed: true,
    turbine: "air_foil_bearing_no_oil_no_coolant_single_moving_part",
    bestUse: "critical_facility_clean_room_hospital_zero_oil_contamination",
  },
  multi_pack_array: {
    efficiency: 8, capacity: 9, reliability: 9, emissions: 9, mtCost: 9,
    chpCapable: true, forDistributed: true,
    turbine: "modular_array_multiple_units_n_plus_1_redundancy_scalable",
    bestUse: "campus_microgrid_district_energy_scalable_modular_mw_class",
  },
  biogas_fueled: {
    efficiency: 7, capacity: 5, reliability: 8, emissions: 10, mtCost: 6,
    chpCapable: true, forDistributed: true,
    turbine: "modified_fuel_system_biogas_landfill_gas_digester_gas_feed",
    bestUse: "wastewater_plant_landfill_dairy_farm_biogas_to_power_chp",
  },
};

function get(t: MicroturbineType): MicroturbineData {
  return DATA[t];
}

export const efficiency = (t: MicroturbineType) => get(t).efficiency;
export const capacity = (t: MicroturbineType) => get(t).capacity;
export const reliability = (t: MicroturbineType) => get(t).reliability;
export const emissions = (t: MicroturbineType) => get(t).emissions;
export const mtCost = (t: MicroturbineType) => get(t).mtCost;
export const chpCapable = (t: MicroturbineType) => get(t).chpCapable;
export const forDistributed = (t: MicroturbineType) => get(t).forDistributed;
export const turbine = (t: MicroturbineType) => get(t).turbine;
export const bestUse = (t: MicroturbineType) => get(t).bestUse;
export const microturbineTypes = (): MicroturbineType[] =>
  Object.keys(DATA) as MicroturbineType[];
