export type VibrationIsolatorType =
  | "steel_spring_mount"
  | "rubber_pad_element"
  | "air_spring_pneumatic"
  | "wire_rope_isolator"
  | "inertia_base_block";

interface VibrationIsolatorData {
  isolation: number;
  deflection: number;
  damping: number;
  loadCapacity: number;
  viCost: number;
  adjustable: boolean;
  forHeavyEquip: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<VibrationIsolatorType, VibrationIsolatorData> = {
  steel_spring_mount: {
    isolation: 9, deflection: 9, damping: 3, loadCapacity: 9, viCost: 6,
    adjustable: true, forHeavyEquip: true,
    element: "housed_steel_coil_spring_leveling_bolt_cap",
    bestUse: "large_chiller_compressor_generator_heavy_duty",
  },
  rubber_pad_element: {
    isolation: 6, deflection: 5, damping: 8, loadCapacity: 7, viCost: 3,
    adjustable: false, forHeavyEquip: false,
    element: "molded_neoprene_natural_rubber_pad_sandwich",
    bestUse: "small_fan_pump_motor_general_purpose_mount",
  },
  air_spring_pneumatic: {
    isolation: 10, deflection: 10, damping: 5, loadCapacity: 8, viCost: 9,
    adjustable: true, forHeavyEquip: true,
    element: "pressurized_air_bag_bellows_servo_leveling",
    bestUse: "precision_instrument_cmm_electron_microscope",
  },
  wire_rope_isolator: {
    isolation: 7, deflection: 7, damping: 9, loadCapacity: 6, viCost: 5,
    adjustable: false, forHeavyEquip: false,
    element: "stainless_wire_rope_helical_cable_mount",
    bestUse: "military_marine_shock_vibration_ruggedized",
  },
  inertia_base_block: {
    isolation: 8, deflection: 8, damping: 6, loadCapacity: 10, viCost: 7,
    adjustable: false, forHeavyEquip: true,
    element: "concrete_steel_inertia_block_spring_supported",
    bestUse: "reciprocating_compressor_press_heavy_machine",
  },
};

function get(t: VibrationIsolatorType): VibrationIsolatorData {
  return DATA[t];
}

export const isolation = (t: VibrationIsolatorType) => get(t).isolation;
export const deflection = (t: VibrationIsolatorType) => get(t).deflection;
export const damping = (t: VibrationIsolatorType) => get(t).damping;
export const loadCapacity = (t: VibrationIsolatorType) => get(t).loadCapacity;
export const viCost = (t: VibrationIsolatorType) => get(t).viCost;
export const adjustable = (t: VibrationIsolatorType) => get(t).adjustable;
export const forHeavyEquip = (t: VibrationIsolatorType) => get(t).forHeavyEquip;
export const element = (t: VibrationIsolatorType) => get(t).element;
export const bestUse = (t: VibrationIsolatorType) => get(t).bestUse;
export const vibrationIsolatorTypes = (): VibrationIsolatorType[] =>
  Object.keys(DATA) as VibrationIsolatorType[];
