export type UltrasonicWelderType =
  | "lateral_vibration"
  | "torsional_vibration"
  | "ultrasonic_spot"
  | "continuous_seam"
  | "ultrasonic_metal";

interface UltrasonicWelderData {
  weldSpeed: number;
  weldPrecision: number;
  materialRange: number;
  jointClean: number;
  uwCost: number;
  forPlastic: boolean;
  forMetal: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<UltrasonicWelderType, UltrasonicWelderData> = {
  lateral_vibration: {
    weldSpeed: 9, weldPrecision: 8, materialRange: 8, jointClean: 9, uwCost: 7,
    forPlastic: true, forMetal: false,
    welderConfig: "lateral_vibration_horn_anvil_plastic_part_high_freq_weld_fuse",
    bestUse: "plastic_assembly_automotive_medical_lateral_vibration_weld_fuse",
  },
  torsional_vibration: {
    weldSpeed: 8, weldPrecision: 9, materialRange: 7, jointClean: 9, uwCost: 8,
    forPlastic: true, forMetal: false,
    welderConfig: "torsional_vibration_rotary_horn_round_part_plastic_spin_weld",
    bestUse: "round_plastic_part_filter_cap_torsional_rotary_ultrasonic_weld",
  },
  ultrasonic_spot: {
    weldSpeed: 10, weldPrecision: 7, materialRange: 6, jointClean: 8, uwCost: 5,
    forPlastic: true, forMetal: false,
    welderConfig: "ultrasonic_spot_weld_gun_handheld_tack_plastic_fabric_nonwoven",
    bestUse: "plastic_fabric_nonwoven_tack_weld_spot_gun_handheld_quick_join",
  },
  continuous_seam: {
    weldSpeed: 8, weldPrecision: 8, materialRange: 7, jointClean: 10, uwCost: 8,
    forPlastic: true, forMetal: false,
    welderConfig: "continuous_seam_rotary_horn_roller_film_fabric_seal_pouch_bag",
    bestUse: "film_fabric_pouch_bag_continuous_seam_rotary_horn_seal_weld",
  },
  ultrasonic_metal: {
    weldSpeed: 7, weldPrecision: 9, materialRange: 5, jointClean: 10, uwCost: 9,
    forPlastic: false, forMetal: true,
    welderConfig: "ultrasonic_metal_weld_sonotrode_anvil_copper_aluminum_foil_tab",
    bestUse: "battery_tab_wire_terminal_copper_aluminum_ultrasonic_metal_weld",
  },
};

function get(t: UltrasonicWelderType): UltrasonicWelderData {
  return DATA[t];
}

export const weldSpeed = (t: UltrasonicWelderType) => get(t).weldSpeed;
export const weldPrecision = (t: UltrasonicWelderType) => get(t).weldPrecision;
export const materialRange = (t: UltrasonicWelderType) => get(t).materialRange;
export const jointClean = (t: UltrasonicWelderType) => get(t).jointClean;
export const uwCost = (t: UltrasonicWelderType) => get(t).uwCost;
export const forPlastic = (t: UltrasonicWelderType) => get(t).forPlastic;
export const forMetal = (t: UltrasonicWelderType) => get(t).forMetal;
export const welderConfig = (t: UltrasonicWelderType) => get(t).welderConfig;
export const bestUse = (t: UltrasonicWelderType) => get(t).bestUse;
export const ultrasonicWelderTypes = (): UltrasonicWelderType[] =>
  Object.keys(DATA) as UltrasonicWelderType[];
