export type FrlUnitType =
  | "standard_combination"
  | "micro_fog_lubricator"
  | "coalescing_filter"
  | "precision_regulator"
  | "modular_manifold";

interface FrlUnitData {
  filtrationGrade: number;
  pressureAccuracy: number;
  flowCapacity: number;
  compactness: number;
  frlCost: number;
  autoCondensate: boolean;
  forPrecision: boolean;
  filterMedia: string;
  bestUse: string;
}

const DATA: Record<FrlUnitType, FrlUnitData> = {
  standard_combination: {
    filtrationGrade: 7, pressureAccuracy: 7, flowCapacity: 8, compactness: 7, frlCost: 5,
    autoCondensate: true, forPrecision: false,
    filterMedia: "sintered_bronze_40um_element_general_purpose_water_trap",
    bestUse: "general_pneumatic_tool_cylinder_valve_standard_air_prep",
  },
  micro_fog_lubricator: {
    filtrationGrade: 6, pressureAccuracy: 6, flowCapacity: 7, compactness: 7, frlCost: 4,
    autoCondensate: false, forPrecision: false,
    filterMedia: "oil_reservoir_venturi_atomize_micro_fog_downstream_lube",
    bestUse: "air_tool_cylinder_bearing_lubrication_extend_component_life",
  },
  coalescing_filter: {
    filtrationGrade: 10, pressureAccuracy: 7, flowCapacity: 6, compactness: 6, frlCost: 7,
    autoCondensate: true, forPrecision: true,
    filterMedia: "borosilicate_glass_fiber_0_01um_coalesce_oil_aerosol_remove",
    bestUse: "paint_spray_instrument_air_clean_room_oil_free_air_supply",
  },
  precision_regulator: {
    filtrationGrade: 7, pressureAccuracy: 10, flowCapacity: 5, compactness: 8, frlCost: 8,
    autoCondensate: false, forPrecision: true,
    filterMedia: "diaphragm_sensing_pilot_operated_tight_band_pressure_set",
    bestUse: "laboratory_instrument_test_bench_tight_pressure_tolerance",
  },
  modular_manifold: {
    filtrationGrade: 8, pressureAccuracy: 8, flowCapacity: 9, compactness: 9, frlCost: 6,
    autoCondensate: true, forPrecision: false,
    filterMedia: "modular_block_mount_multi_port_integrated_filter_reg_lube",
    bestUse: "automated_machine_multi_circuit_compact_panel_mount_clean",
  },
};

function get(t: FrlUnitType): FrlUnitData {
  return DATA[t];
}

export const filtrationGrade = (t: FrlUnitType) => get(t).filtrationGrade;
export const pressureAccuracy = (t: FrlUnitType) => get(t).pressureAccuracy;
export const flowCapacity = (t: FrlUnitType) => get(t).flowCapacity;
export const compactness = (t: FrlUnitType) => get(t).compactness;
export const frlCost = (t: FrlUnitType) => get(t).frlCost;
export const autoCondensate = (t: FrlUnitType) => get(t).autoCondensate;
export const forPrecision = (t: FrlUnitType) => get(t).forPrecision;
export const filterMedia = (t: FrlUnitType) => get(t).filterMedia;
export const bestUse = (t: FrlUnitType) => get(t).bestUse;
export const frlUnitTypes = (): FrlUnitType[] =>
  Object.keys(DATA) as FrlUnitType[];
