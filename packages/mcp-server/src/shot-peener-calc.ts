export type ShotPeenerType =
  | "air_blast_peen"
  | "wheel_peen"
  | "ultrasonic_peen"
  | "laser_peen"
  | "flapper_peen";

interface ShotPeenerData {
  coverageControl: number;
  throughput: number;
  intensityRange: number;
  surfaceFinish: number;
  spCost: number;
  contactFree: boolean;
  forAerospace: boolean;
  peenerConfig: string;
  bestUse: string;
}

const DATA: Record<ShotPeenerType, ShotPeenerData> = {
  air_blast_peen: {
    coverageControl: 8, throughput: 7, intensityRange: 8, surfaceFinish: 7, spCost: 5,
    contactFree: false, forAerospace: true,
    peenerConfig: "air_blast_shot_peener_nozzle_steel_media_almen_strip_stress",
    bestUse: "spring_gear_air_blast_shot_peener_nozzle_steel_media_fatigue",
  },
  wheel_peen: {
    coverageControl: 7, throughput: 10, intensityRange: 7, surfaceFinish: 6, spCost: 4,
    contactFree: false, forAerospace: false,
    peenerConfig: "wheel_shot_peener_centrifugal_throw_high_volume_auto_convey",
    bestUse: "auto_part_wheel_shot_peener_centrifugal_high_volume_stress",
  },
  ultrasonic_peen: {
    coverageControl: 9, throughput: 4, intensityRange: 9, surfaceFinish: 9, spCost: 8,
    contactFree: false, forAerospace: true,
    peenerConfig: "ultrasonic_shot_peener_sonotrode_pin_vibrate_deep_compress",
    bestUse: "weld_toe_ultrasonic_shot_peener_sonotrode_pin_deep_compress",
  },
  laser_peen: {
    coverageControl: 10, throughput: 3, intensityRange: 10, surfaceFinish: 10, spCost: 10,
    contactFree: true, forAerospace: true,
    peenerConfig: "laser_shot_peener_pulse_ablate_plasma_shock_deep_residual",
    bestUse: "turbine_blade_laser_shot_peener_pulse_plasma_deep_compress",
  },
  flapper_peen: {
    coverageControl: 6, throughput: 5, intensityRange: 6, surfaceFinish: 7, spCost: 3,
    contactFree: false, forAerospace: false,
    peenerConfig: "flapper_shot_peener_rotary_flap_strip_hand_tool_field_repair",
    bestUse: "field_repair_flapper_shot_peener_rotary_flap_hand_tool_weld",
  },
};

function get(t: ShotPeenerType): ShotPeenerData {
  return DATA[t];
}

export const coverageControl = (t: ShotPeenerType) => get(t).coverageControl;
export const throughput = (t: ShotPeenerType) => get(t).throughput;
export const intensityRange = (t: ShotPeenerType) => get(t).intensityRange;
export const surfaceFinish = (t: ShotPeenerType) => get(t).surfaceFinish;
export const spCost = (t: ShotPeenerType) => get(t).spCost;
export const contactFree = (t: ShotPeenerType) => get(t).contactFree;
export const forAerospace = (t: ShotPeenerType) => get(t).forAerospace;
export const peenerConfig = (t: ShotPeenerType) => get(t).peenerConfig;
export const bestUse = (t: ShotPeenerType) => get(t).bestUse;
export const shotPeenerTypes = (): ShotPeenerType[] =>
  Object.keys(DATA) as ShotPeenerType[];
