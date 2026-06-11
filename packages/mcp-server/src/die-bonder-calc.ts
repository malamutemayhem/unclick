export type DieBonderType =
  | "epoxy_die_attach"
  | "eutectic_solder"
  | "thermocompression"
  | "flip_chip"
  | "uv_adhesive";

interface DieBonderData {
  placementSpeed: number;
  placementAccuracy: number;
  bondStrength: number;
  thermalPerformance: number;
  dbCost: number;
  fluxless: boolean;
  forPower: boolean;
  bonderConfig: string;
  bestUse: string;
}

const DATA: Record<DieBonderType, DieBonderData> = {
  epoxy_die_attach: {
    placementSpeed: 9, placementAccuracy: 7, bondStrength: 7, thermalPerformance: 6, dbCost: 5,
    fluxless: true, forPower: false,
    bonderConfig: "epoxy_dispense_die_pick_place_cure_oven_standard_ic_packaging",
    bestUse: "standard_ic_led_sensor_epoxy_die_attach_high_volume_packaging",
  },
  eutectic_solder: {
    placementSpeed: 7, placementAccuracy: 8, bondStrength: 9, thermalPerformance: 10, dbCost: 8,
    fluxless: false, forPower: true,
    bonderConfig: "eutectic_solder_preform_reflow_die_bond_power_device_thermal",
    bestUse: "power_semiconductor_rf_device_eutectic_solder_die_bond_thermal",
  },
  thermocompression: {
    placementSpeed: 6, placementAccuracy: 10, bondStrength: 9, thermalPerformance: 8, dbCost: 9,
    fluxless: true, forPower: false,
    bonderConfig: "thermocompression_bond_heat_force_copper_pillar_fine_pitch_3d",
    bestUse: "fine_pitch_3d_stack_hbm_memory_thermocompression_copper_pillar",
  },
  flip_chip: {
    placementSpeed: 8, placementAccuracy: 9, bondStrength: 8, thermalPerformance: 8, dbCost: 8,
    fluxless: false, forPower: false,
    bonderConfig: "flip_chip_bump_bond_solder_ball_underfill_high_io_processor",
    bestUse: "high_io_processor_gpu_flip_chip_solder_bump_underfill_package",
  },
  uv_adhesive: {
    placementSpeed: 10, placementAccuracy: 7, bondStrength: 5, thermalPerformance: 4, dbCost: 4,
    fluxless: true, forPower: false,
    bonderConfig: "uv_cure_adhesive_dispense_die_bond_fast_cure_optical_sensor",
    bestUse: "optical_sensor_mems_microphone_uv_adhesive_fast_cure_die_bond",
  },
};

function get(t: DieBonderType): DieBonderData {
  return DATA[t];
}

export const placementSpeed = (t: DieBonderType) => get(t).placementSpeed;
export const placementAccuracy = (t: DieBonderType) => get(t).placementAccuracy;
export const bondStrength = (t: DieBonderType) => get(t).bondStrength;
export const thermalPerformance = (t: DieBonderType) => get(t).thermalPerformance;
export const dbCost = (t: DieBonderType) => get(t).dbCost;
export const fluxless = (t: DieBonderType) => get(t).fluxless;
export const forPower = (t: DieBonderType) => get(t).forPower;
export const bonderConfig = (t: DieBonderType) => get(t).bonderConfig;
export const bestUse = (t: DieBonderType) => get(t).bestUse;
export const dieBonderTypes = (): DieBonderType[] =>
  Object.keys(DATA) as DieBonderType[];
