export type RotaryScreenPrintType =
  | "nickel_galvano"
  | "lacquer_mesh"
  | "magnetic_rod"
  | "high_mesh_fine"
  | "multi_color_inline";

interface RotaryScreenPrintData {
  printSpeed: number;
  colorRegistration: number;
  detailResolution: number;
  repeatLength: number;
  rspCost: number;
  continuous: boolean;
  forStretch: boolean;
  screenConfig: string;
  bestUse: string;
}

const DATA: Record<RotaryScreenPrintType, RotaryScreenPrintData> = {
  nickel_galvano: {
    printSpeed: 9, colorRegistration: 8, detailResolution: 8, repeatLength: 8, rspCost: 7,
    continuous: true, forStretch: false,
    screenConfig: "electroformed_nickel_screen_cylinder_precise_opening_pattern",
    bestUse: "high_volume_fashion_fabric_all_over_print_continuous_yardage",
  },
  lacquer_mesh: {
    printSpeed: 8, colorRegistration: 7, detailResolution: 7, repeatLength: 7, rspCost: 5,
    continuous: true, forStretch: false,
    screenConfig: "woven_mesh_cylinder_lacquer_coated_stencil_pattern_opening",
    bestUse: "home_textile_bedding_curtain_medium_detail_cost_effective_run",
  },
  magnetic_rod: {
    printSpeed: 9, colorRegistration: 9, detailResolution: 7, repeatLength: 9, rspCost: 8,
    continuous: true, forStretch: true,
    screenConfig: "magnetic_squeegee_rod_inside_screen_adjustable_pressure_paste",
    bestUse: "stretch_knit_lycra_swim_active_wear_print_flexible_substrate",
  },
  high_mesh_fine: {
    printSpeed: 7, colorRegistration: 9, detailResolution: 10, repeatLength: 7, rspCost: 9,
    continuous: true, forStretch: false,
    screenConfig: "ultra_fine_mesh_125_plus_high_detail_halftone_photographic",
    bestUse: "photographic_print_fine_detail_halftone_gradient_silk_scarf",
  },
  multi_color_inline: {
    printSpeed: 10, colorRegistration: 10, detailResolution: 8, repeatLength: 8, rspCost: 10,
    continuous: true, forStretch: false,
    screenConfig: "16_plus_color_station_inline_auto_register_high_speed_multi",
    bestUse: "complex_multi_color_design_fashion_print_16_color_production",
  },
};

function get(t: RotaryScreenPrintType): RotaryScreenPrintData {
  return DATA[t];
}

export const printSpeed = (t: RotaryScreenPrintType) => get(t).printSpeed;
export const colorRegistration = (t: RotaryScreenPrintType) => get(t).colorRegistration;
export const detailResolution = (t: RotaryScreenPrintType) => get(t).detailResolution;
export const repeatLength = (t: RotaryScreenPrintType) => get(t).repeatLength;
export const rspCost = (t: RotaryScreenPrintType) => get(t).rspCost;
export const continuous = (t: RotaryScreenPrintType) => get(t).continuous;
export const forStretch = (t: RotaryScreenPrintType) => get(t).forStretch;
export const screenConfig = (t: RotaryScreenPrintType) => get(t).screenConfig;
export const bestUse = (t: RotaryScreenPrintType) => get(t).bestUse;
export const rotaryScreenPrintTypes = (): RotaryScreenPrintType[] =>
  Object.keys(DATA) as RotaryScreenPrintType[];
