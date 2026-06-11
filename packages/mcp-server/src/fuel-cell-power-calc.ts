export type FuelCellPowerType =
  | "pem_hydrogen"
  | "sofc_solid_oxide"
  | "mcfc_molten_carbonate"
  | "pafc_phosphoric"
  | "dmfc_direct_methanol";

interface FuelCellPowerData {
  efficiency: number;
  capacity: number;
  startupSpeed: number;
  durability: number;
  fcpCost: number;
  highTemp: boolean;
  forMobile: boolean;
  electrolyte: string;
  bestUse: string;
}

const DATA: Record<FuelCellPowerType, FuelCellPowerData> = {
  pem_hydrogen: {
    efficiency: 7, capacity: 7, startupSpeed: 10, durability: 7, fcpCost: 7,
    highTemp: false, forMobile: true,
    electrolyte: "proton_exchange_membrane_nafion_platinum_catalyst_80c",
    bestUse: "fuel_cell_vehicle_bus_truck_forklift_backup_power_portable",
  },
  sofc_solid_oxide: {
    efficiency: 10, capacity: 8, startupSpeed: 3, durability: 8, fcpCost: 8,
    highTemp: true, forMobile: false,
    electrolyte: "yttria_stabilized_zirconia_ceramic_electrolyte_800_1000c",
    bestUse: "combined_heat_power_data_center_base_load_natural_gas_chp",
  },
  mcfc_molten_carbonate: {
    efficiency: 9, capacity: 9, startupSpeed: 2, durability: 7, fcpCost: 7,
    highTemp: true, forMobile: false,
    electrolyte: "lithium_potassium_carbonate_molten_salt_matrix_650c",
    bestUse: "large_stationary_power_plant_utility_scale_base_load_mw",
  },
  pafc_phosphoric: {
    efficiency: 7, capacity: 6, startupSpeed: 4, durability: 9, fcpCost: 6,
    highTemp: false, forMobile: false,
    electrolyte: "phosphoric_acid_silicon_carbide_matrix_platinum_150_200c",
    bestUse: "commercial_building_hospital_chp_proven_reliable_stationary",
  },
  dmfc_direct_methanol: {
    efficiency: 4, capacity: 3, startupSpeed: 9, durability: 6, fcpCost: 5,
    highTemp: false, forMobile: true,
    electrolyte: "nafion_membrane_methanol_feed_direct_no_reformer_60_90c",
    bestUse: "portable_electronics_military_field_sensor_remote_low_power",
  },
};

function get(t: FuelCellPowerType): FuelCellPowerData {
  return DATA[t];
}

export const efficiency = (t: FuelCellPowerType) => get(t).efficiency;
export const capacity = (t: FuelCellPowerType) => get(t).capacity;
export const startupSpeed = (t: FuelCellPowerType) => get(t).startupSpeed;
export const durability = (t: FuelCellPowerType) => get(t).durability;
export const fcpCost = (t: FuelCellPowerType) => get(t).fcpCost;
export const highTemp = (t: FuelCellPowerType) => get(t).highTemp;
export const forMobile = (t: FuelCellPowerType) => get(t).forMobile;
export const electrolyte = (t: FuelCellPowerType) => get(t).electrolyte;
export const bestUse = (t: FuelCellPowerType) => get(t).bestUse;
export const fuelCellPowerTypes = (): FuelCellPowerType[] =>
  Object.keys(DATA) as FuelCellPowerType[];
