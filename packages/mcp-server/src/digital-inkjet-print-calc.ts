export type DigitalInkjetPrintType =
  | "scanning_carriage"
  | "single_pass_inline"
  | "hybrid_screen_digital"
  | "sublimation_transfer"
  | "direct_to_fabric";

interface DigitalInkjetPrintData {
  printResolution: number;
  printSpeed: number;
  colorGamut: number;
  inkEfficiency: number;
  dipCost: number;
  singlePass: boolean;
  forSample: boolean;
  headConfig: string;
  bestUse: string;
}

const DATA: Record<DigitalInkjetPrintType, DigitalInkjetPrintData> = {
  scanning_carriage: {
    printResolution: 9, printSpeed: 5, colorGamut: 9, inkEfficiency: 7, dipCost: 6,
    singlePass: false, forSample: true,
    headConfig: "scanning_carriage_multi_pass_piezo_head_bidirectional_print",
    bestUse: "sample_short_run_fashion_print_high_detail_low_volume_design",
  },
  single_pass_inline: {
    printResolution: 8, printSpeed: 10, colorGamut: 8, inkEfficiency: 9, dipCost: 10,
    singlePass: true, forSample: false,
    headConfig: "fixed_head_array_full_width_single_pass_inline_high_speed",
    bestUse: "high_volume_production_print_continuous_yardage_fast_output",
  },
  hybrid_screen_digital: {
    printResolution: 7, printSpeed: 8, colorGamut: 7, inkEfficiency: 6, dipCost: 8,
    singlePass: false, forSample: false,
    headConfig: "rotary_screen_ground_color_plus_digital_detail_overlay_combo",
    bestUse: "combination_screen_base_digital_detail_high_volume_patterned",
  },
  sublimation_transfer: {
    printResolution: 10, printSpeed: 7, colorGamut: 10, inkEfficiency: 8, dipCost: 7,
    singlePass: false, forSample: true,
    headConfig: "paper_transfer_sublimation_ink_heat_press_polyester_transfer",
    bestUse: "polyester_sportswear_sublimation_vivid_color_photographic_dye",
  },
  direct_to_fabric: {
    printResolution: 8, printSpeed: 6, colorGamut: 8, inkEfficiency: 10, dipCost: 5,
    singlePass: false, forSample: true,
    headConfig: "direct_print_reactive_pigment_ink_pretreated_fabric_surface",
    bestUse: "cotton_direct_print_reactive_ink_no_transfer_paper_eco_print",
  },
};

function get(t: DigitalInkjetPrintType): DigitalInkjetPrintData {
  return DATA[t];
}

export const printResolution = (t: DigitalInkjetPrintType) => get(t).printResolution;
export const printSpeed = (t: DigitalInkjetPrintType) => get(t).printSpeed;
export const colorGamut = (t: DigitalInkjetPrintType) => get(t).colorGamut;
export const inkEfficiency = (t: DigitalInkjetPrintType) => get(t).inkEfficiency;
export const dipCost = (t: DigitalInkjetPrintType) => get(t).dipCost;
export const singlePass = (t: DigitalInkjetPrintType) => get(t).singlePass;
export const forSample = (t: DigitalInkjetPrintType) => get(t).forSample;
export const headConfig = (t: DigitalInkjetPrintType) => get(t).headConfig;
export const bestUse = (t: DigitalInkjetPrintType) => get(t).bestUse;
export const digitalInkjetPrintTypes = (): DigitalInkjetPrintType[] =>
  Object.keys(DATA) as DigitalInkjetPrintType[];
