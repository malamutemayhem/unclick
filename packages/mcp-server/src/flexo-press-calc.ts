export type FlexoPressType =
  | "stack_type"
  | "central_impression"
  | "inline_type"
  | "gearless_servo"
  | "wide_web";

interface FlexoPressData {
  printQuality: number;
  throughput: number;
  colorRegistration: number;
  substrateRange: number;
  fpCost: number;
  multiColor: boolean;
  forPackaging: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<FlexoPressType, FlexoPressData> = {
  stack_type: {
    printQuality: 7, throughput: 7, colorRegistration: 6, substrateRange: 9, fpCost: 5,
    multiColor: true, forPackaging: true,
    pressConfig: "stack_type_flexo_press_vertical_stack_print_unit_multi_color",
    bestUse: "corrugated_carton_stack_flexo_press_multicolor_wide_substrate",
  },
  central_impression: {
    printQuality: 9, throughput: 9, colorRegistration: 10, substrateRange: 7, fpCost: 8,
    multiColor: true, forPackaging: true,
    pressConfig: "central_impression_flexo_press_single_drum_all_colors_register",
    bestUse: "flexible_packaging_ci_flexo_press_film_foil_tight_registration",
  },
  inline_type: {
    printQuality: 8, throughput: 8, colorRegistration: 8, substrateRange: 8, fpCost: 7,
    multiColor: true, forPackaging: true,
    pressConfig: "inline_type_flexo_press_horizontal_line_modular_unit_versatile",
    bestUse: "label_carton_inline_flexo_press_modular_versatile_converting",
  },
  gearless_servo: {
    printQuality: 10, throughput: 9, colorRegistration: 10, substrateRange: 8, fpCost: 10,
    multiColor: true, forPackaging: true,
    pressConfig: "gearless_servo_flexo_press_direct_drive_no_gear_precise_repeat",
    bestUse: "high_quality_flexo_gearless_servo_press_repeat_length_variable",
  },
  wide_web: {
    printQuality: 8, throughput: 10, colorRegistration: 8, substrateRange: 10, fpCost: 9,
    multiColor: true, forPackaging: true,
    pressConfig: "wide_web_flexo_press_large_format_high_speed_corrugated_sack",
    bestUse: "industrial_wide_web_flexo_press_sack_corrugated_high_volume",
  },
};

function get(t: FlexoPressType): FlexoPressData {
  return DATA[t];
}

export const printQuality = (t: FlexoPressType) => get(t).printQuality;
export const throughput = (t: FlexoPressType) => get(t).throughput;
export const colorRegistration = (t: FlexoPressType) => get(t).colorRegistration;
export const substrateRange = (t: FlexoPressType) => get(t).substrateRange;
export const fpCost = (t: FlexoPressType) => get(t).fpCost;
export const multiColor = (t: FlexoPressType) => get(t).multiColor;
export const forPackaging = (t: FlexoPressType) => get(t).forPackaging;
export const pressConfig = (t: FlexoPressType) => get(t).pressConfig;
export const bestUse = (t: FlexoPressType) => get(t).bestUse;
export const flexoPressTypes = (): FlexoPressType[] =>
  Object.keys(DATA) as FlexoPressType[];
