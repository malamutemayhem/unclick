export type LoadCellType =
  | "strain_gauge_lc"
  | "hydraulic_lc"
  | "pneumatic_lc"
  | "capacitive_lc"
  | "piezoelectric_lc";

interface LoadCellData {
  accuracy: number;
  throughput: number;
  capacityRange: number;
  durability: number;
  lcCost: number;
  digitalOutput: boolean;
  forHighTemp: boolean;
  cellConfig: string;
  bestUse: string;
}

const DATA: Record<LoadCellType, LoadCellData> = {
  strain_gauge_lc: {
    accuracy: 9, throughput: 9, capacityRange: 8, durability: 7, lcCost: 5,
    digitalOutput: true, forHighTemp: false,
    cellConfig: "strain_gauge_load_cell_wheatstone_bridge_bonded_foil_mv_per_v",
    bestUse: "platform_scale_strain_gauge_load_cell_precise_versatile_standard",
  },
  hydraulic_lc: {
    accuracy: 6, throughput: 7, capacityRange: 10, durability: 9, lcCost: 7,
    digitalOutput: false, forHighTemp: true,
    cellConfig: "hydraulic_load_cell_piston_cylinder_fluid_pressure_bourdon_read",
    bestUse: "heavy_industry_hydraulic_load_cell_high_capacity_no_electric",
  },
  pneumatic_lc: {
    accuracy: 7, throughput: 6, capacityRange: 6, durability: 8, lcCost: 6,
    digitalOutput: false, forHighTemp: false,
    cellConfig: "pneumatic_load_cell_air_pressure_balance_nozzle_flapper_safe",
    bestUse: "hazardous_area_pneumatic_load_cell_intrinsic_safe_no_electric",
  },
  capacitive_lc: {
    accuracy: 10, throughput: 8, capacityRange: 5, durability: 6, lcCost: 8,
    digitalOutput: true, forHighTemp: false,
    cellConfig: "capacitive_load_cell_parallel_plate_gap_change_high_resolution",
    bestUse: "laboratory_capacitive_load_cell_ultra_precise_micro_force_measure",
  },
  piezoelectric_lc: {
    accuracy: 8, throughput: 10, capacityRange: 7, durability: 8, lcCost: 9,
    digitalOutput: true, forHighTemp: true,
    cellConfig: "piezoelectric_load_cell_quartz_crystal_charge_dynamic_fast_response",
    bestUse: "impact_test_piezoelectric_load_cell_dynamic_fast_response_crash",
  },
};

function get(t: LoadCellType): LoadCellData {
  return DATA[t];
}

export const accuracy = (t: LoadCellType) => get(t).accuracy;
export const throughput = (t: LoadCellType) => get(t).throughput;
export const capacityRange = (t: LoadCellType) => get(t).capacityRange;
export const durability = (t: LoadCellType) => get(t).durability;
export const lcCost = (t: LoadCellType) => get(t).lcCost;
export const digitalOutput = (t: LoadCellType) => get(t).digitalOutput;
export const forHighTemp = (t: LoadCellType) => get(t).forHighTemp;
export const cellConfig = (t: LoadCellType) => get(t).cellConfig;
export const bestUse = (t: LoadCellType) => get(t).bestUse;
export const loadCellTypes = (): LoadCellType[] =>
  Object.keys(DATA) as LoadCellType[];
