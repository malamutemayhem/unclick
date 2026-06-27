export type VacuumFurnaceType =
  | "horizontal_hot_wall"
  | "vertical_bottom_load"
  | "vacuum_oil_quench"
  | "vacuum_gas_quench"
  | "vacuum_brazing";

interface VacuumFurnaceData {
  temperature: number;
  uniformity: number;
  cleanProcess: number;
  throughput: number;
  vfCost: number;
  oxFree: boolean;
  forAerospace: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<VacuumFurnaceType, VacuumFurnaceData> = {
  horizontal_hot_wall: {
    temperature: 8, uniformity: 9, cleanProcess: 9, throughput: 8, vfCost: 7,
    oxFree: true, forAerospace: true,
    heating: "graphite_element_hot_zone_horizontal_load_cart_batch",
    bestUse: "tool_steel_hardening_annealing_stress_relief_general_heat",
  },
  vertical_bottom_load: {
    temperature: 9, uniformity: 9, cleanProcess: 10, throughput: 6, vfCost: 8,
    oxFree: true, forAerospace: true,
    heating: "molybdenum_element_vertical_retort_bottom_load_tall_part",
    bestUse: "turbine_blade_long_shaft_vertical_load_uniform_heat_treat",
  },
  vacuum_oil_quench: {
    temperature: 8, uniformity: 8, cleanProcess: 7, throughput: 9, vfCost: 7,
    oxFree: true, forAerospace: false,
    heating: "graphite_hot_zone_integrated_oil_tank_rapid_quench_below",
    bestUse: "bearing_gear_spring_high_volume_hardening_oil_quench_batch",
  },
  vacuum_gas_quench: {
    temperature: 8, uniformity: 9, cleanProcess: 10, throughput: 8, vfCost: 9,
    oxFree: true, forAerospace: true,
    heating: "graphite_hot_zone_high_pressure_nitrogen_gas_fan_quench",
    bestUse: "die_mold_tool_bright_hardening_no_distortion_gas_quench",
  },
  vacuum_brazing: {
    temperature: 7, uniformity: 10, cleanProcess: 10, throughput: 5, vfCost: 10,
    oxFree: true, forAerospace: true,
    heating: "all_metal_hot_zone_high_vacuum_braze_filler_flow_capillary",
    bestUse: "heat_exchanger_honeycomb_panel_aerospace_braze_joint_assembly",
  },
};

function get(t: VacuumFurnaceType): VacuumFurnaceData {
  return DATA[t];
}

export const temperature = (t: VacuumFurnaceType) => get(t).temperature;
export const uniformity = (t: VacuumFurnaceType) => get(t).uniformity;
export const cleanProcess = (t: VacuumFurnaceType) => get(t).cleanProcess;
export const throughput = (t: VacuumFurnaceType) => get(t).throughput;
export const vfCost = (t: VacuumFurnaceType) => get(t).vfCost;
export const oxFree = (t: VacuumFurnaceType) => get(t).oxFree;
export const forAerospace = (t: VacuumFurnaceType) => get(t).forAerospace;
export const heating = (t: VacuumFurnaceType) => get(t).heating;
export const bestUse = (t: VacuumFurnaceType) => get(t).bestUse;
export const vacuumFurnaceTypes = (): VacuumFurnaceType[] =>
  Object.keys(DATA) as VacuumFurnaceType[];
