export type ForageChopperType =
  | "self_propelled"
  | "pull_type_pto"
  | "precision_chop"
  | "direct_cut"
  | "stationary_blower";

interface ForageChopperData {
  chopQuality: number;
  throughput: number;
  fuelEfficiency: number;
  fieldSpeed: number;
  fcCost: number;
  selfPropelled: boolean;
  forCorn: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<ForageChopperType, ForageChopperData> = {
  self_propelled: {
    chopQuality: 9, throughput: 10, fuelEfficiency: 7, fieldSpeed: 9, fcCost: 10,
    selfPropelled: true, forCorn: true,
    cutterConfig: "drum_cutter_cylinder_kernel_processor_self_propelled_high_hp",
    bestUse: "large_dairy_farm_corn_silage_whole_crop_high_volume_harvest",
  },
  pull_type_pto: {
    chopQuality: 7, throughput: 7, fuelEfficiency: 8, fieldSpeed: 7, fcCost: 5,
    selfPropelled: false, forCorn: true,
    cutterConfig: "flywheel_cutter_pto_driven_tractor_pull_type_chop_blow_wagon",
    bestUse: "small_medium_farm_corn_grass_silage_tractor_mounted_chopper",
  },
  precision_chop: {
    chopQuality: 10, throughput: 8, fuelEfficiency: 7, fieldSpeed: 8, fcCost: 9,
    selfPropelled: true, forCorn: true,
    cutterConfig: "precision_chop_length_shear_bar_adjust_kernel_crack_sensor",
    bestUse: "precision_corn_silage_kernel_processing_score_optimized_chop",
  },
  direct_cut: {
    chopQuality: 6, throughput: 6, fuelEfficiency: 9, fieldSpeed: 8, fcCost: 4,
    selfPropelled: false, forCorn: false,
    cutterConfig: "direct_cut_header_no_windrow_pickup_standing_crop_chop_feed",
    bestUse: "grass_silage_direct_cut_standing_crop_hay_haylage_green_chop",
  },
  stationary_blower: {
    chopQuality: 8, throughput: 5, fuelEfficiency: 6, fieldSpeed: 3, fcCost: 3,
    selfPropelled: false, forCorn: false,
    cutterConfig: "stationary_chopper_blower_pit_silo_fill_bale_processor_fixed",
    bestUse: "farmyard_stationary_bale_processing_pit_silo_filling_blower",
  },
};

function get(t: ForageChopperType): ForageChopperData {
  return DATA[t];
}

export const chopQuality = (t: ForageChopperType) => get(t).chopQuality;
export const throughput = (t: ForageChopperType) => get(t).throughput;
export const fuelEfficiency = (t: ForageChopperType) => get(t).fuelEfficiency;
export const fieldSpeed = (t: ForageChopperType) => get(t).fieldSpeed;
export const fcCost = (t: ForageChopperType) => get(t).fcCost;
export const selfPropelled = (t: ForageChopperType) => get(t).selfPropelled;
export const forCorn = (t: ForageChopperType) => get(t).forCorn;
export const cutterConfig = (t: ForageChopperType) => get(t).cutterConfig;
export const bestUse = (t: ForageChopperType) => get(t).bestUse;
export const forageChopperTypes = (): ForageChopperType[] =>
  Object.keys(DATA) as ForageChopperType[];
