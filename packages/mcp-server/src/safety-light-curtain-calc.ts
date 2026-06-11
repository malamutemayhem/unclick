export type SafetyLightCurtainType =
  | "type_2_finger"
  | "type_4_finger"
  | "type_4_hand"
  | "type_4_body"
  | "muting_blanking";

interface SafetyLightCurtainData {
  resolution: number;
  range: number;
  responseTime: number;
  silLevel: number;
  slCost: number;
  type4: boolean;
  forPressSafety: boolean;
  optics: string;
  bestUse: string;
}

const DATA: Record<SafetyLightCurtainType, SafetyLightCurtainData> = {
  type_2_finger: {
    resolution: 10, range: 5, responseTime: 9, silLevel: 6, slCost: 4,
    type4: false, forPressSafety: false,
    optics: "14mm_beam_spacing_finger_detection_short_range",
    bestUse: "small_machine_opening_finger_trap_prevention_light",
  },
  type_4_finger: {
    resolution: 10, range: 6, responseTime: 9, silLevel: 9, slCost: 6,
    type4: true, forPressSafety: true,
    optics: "14mm_beam_spacing_sil3_ple_finger_safe_distance",
    bestUse: "press_brake_punch_press_finger_protection_critical",
  },
  type_4_hand: {
    resolution: 7, range: 8, responseTime: 8, silLevel: 9, slCost: 5,
    type4: true, forPressSafety: true,
    optics: "30mm_beam_spacing_hand_detection_medium_range",
    bestUse: "robot_cell_entry_machine_perimeter_hand_detect",
  },
  type_4_body: {
    resolution: 4, range: 10, responseTime: 7, silLevel: 9, slCost: 7,
    type4: true, forPressSafety: false,
    optics: "90mm_beam_spacing_body_detection_long_range_area",
    bestUse: "large_machine_perimeter_warehouse_aisle_body_guard",
  },
  muting_blanking: {
    resolution: 7, range: 7, responseTime: 8, silLevel: 8, slCost: 8,
    type4: true, forPressSafety: false,
    optics: "configurable_beam_muting_sensor_material_pass_thru",
    bestUse: "conveyor_entry_exit_pallet_pass_through_automated",
  },
};

function get(t: SafetyLightCurtainType): SafetyLightCurtainData {
  return DATA[t];
}

export const resolution = (t: SafetyLightCurtainType) => get(t).resolution;
export const range = (t: SafetyLightCurtainType) => get(t).range;
export const responseTime = (t: SafetyLightCurtainType) => get(t).responseTime;
export const silLevel = (t: SafetyLightCurtainType) => get(t).silLevel;
export const slCost = (t: SafetyLightCurtainType) => get(t).slCost;
export const type4 = (t: SafetyLightCurtainType) => get(t).type4;
export const forPressSafety = (t: SafetyLightCurtainType) => get(t).forPressSafety;
export const optics = (t: SafetyLightCurtainType) => get(t).optics;
export const bestUse = (t: SafetyLightCurtainType) => get(t).bestUse;
export const safetyLightCurtainTypes = (): SafetyLightCurtainType[] =>
  Object.keys(DATA) as SafetyLightCurtainType[];
