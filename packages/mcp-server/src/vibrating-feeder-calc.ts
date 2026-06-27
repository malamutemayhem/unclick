export type VibratingFeederType =
  | "electromagnetic_vib"
  | "electromechanical_vib"
  | "grizzly_vib"
  | "pan_vib"
  | "tube_vib";

interface VibratingFeederData {
  feedAccuracy: number;
  throughput: number;
  materialRange: number;
  controlResponse: number;
  vfCost: number;
  variable: boolean;
  forBulk: boolean;
  feederConfig: string;
  bestUse: string;
}

const DATA: Record<VibratingFeederType, VibratingFeederData> = {
  electromagnetic_vib: {
    feedAccuracy: 9, throughput: 7, materialRange: 7, controlResponse: 10, vfCost: 7,
    variable: true, forBulk: false,
    feederConfig: "electromagnetic_vibrating_feeder_coil_armature_instant_start_stop",
    bestUse: "parts_orient_electromagnetic_vibrating_feeder_precise_bowl_feed",
  },
  electromechanical_vib: {
    feedAccuracy: 7, throughput: 9, materialRange: 9, controlResponse: 6, vfCost: 6,
    variable: false, forBulk: true,
    feederConfig: "electromechanical_vibrating_feeder_motor_eccentric_weight_robust",
    bestUse: "mining_ore_electromechanical_vibrating_feeder_heavy_duty_bulk",
  },
  grizzly_vib: {
    feedAccuracy: 5, throughput: 10, materialRange: 8, controlResponse: 4, vfCost: 5,
    variable: false, forBulk: true,
    feederConfig: "grizzly_vibrating_feeder_bar_screen_scalp_oversize_pre_screen",
    bestUse: "quarry_feed_grizzly_vibrating_feeder_scalp_oversize_crusher_feed",
  },
  pan_vib: {
    feedAccuracy: 8, throughput: 8, materialRange: 8, controlResponse: 7, vfCost: 5,
    variable: true, forBulk: true,
    feederConfig: "pan_vibrating_feeder_flat_tray_vibrate_spread_even_layer_feed",
    bestUse: "food_process_pan_vibrating_feeder_spread_even_layer_weigher",
  },
  tube_vib: {
    feedAccuracy: 9, throughput: 5, materialRange: 5, controlResponse: 9, vfCost: 4,
    variable: true, forBulk: false,
    feederConfig: "tube_vibrating_feeder_enclosed_tube_dust_free_fine_powder_dose",
    bestUse: "pharma_powder_tube_vibrating_feeder_enclosed_dust_free_micro_dose",
  },
};

function get(t: VibratingFeederType): VibratingFeederData {
  return DATA[t];
}

export const feedAccuracy = (t: VibratingFeederType) => get(t).feedAccuracy;
export const throughput = (t: VibratingFeederType) => get(t).throughput;
export const materialRange = (t: VibratingFeederType) => get(t).materialRange;
export const controlResponse = (t: VibratingFeederType) => get(t).controlResponse;
export const vfCost = (t: VibratingFeederType) => get(t).vfCost;
export const variable = (t: VibratingFeederType) => get(t).variable;
export const forBulk = (t: VibratingFeederType) => get(t).forBulk;
export const feederConfig = (t: VibratingFeederType) => get(t).feederConfig;
export const bestUse = (t: VibratingFeederType) => get(t).bestUse;
export const vibratingFeederTypes = (): VibratingFeederType[] =>
  Object.keys(DATA) as VibratingFeederType[];
