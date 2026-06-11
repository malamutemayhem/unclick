export type RubberSheeterType =
  | "batch_off_cooler"
  | "two_roll_sheeter"
  | "four_roll_sheeter"
  | "festoon_cooler"
  | "wig_wag_stacker";

interface RubberSheeterData {
  sheetUniformity: number;
  throughput: number;
  coolingRate: number;
  thicknessControl: number;
  rsCost: number;
  inline: boolean;
  forCompound: boolean;
  sheeterConfig: string;
  bestUse: string;
}

const DATA: Record<RubberSheeterType, RubberSheeterData> = {
  batch_off_cooler: {
    sheetUniformity: 8, throughput: 9, coolingRate: 9, thicknessControl: 7, rsCost: 7,
    inline: true, forCompound: true,
    sheeterConfig: "batch_off_cooler_rubber_sheeter_anti_tack_dip_festoon_cool_stack",
    bestUse: "rubber_mixing_line_batch_off_cooler_anti_tack_cool_stack_sheet",
  },
  two_roll_sheeter: {
    sheetUniformity: 7, throughput: 7, coolingRate: 6, thicknessControl: 8, rsCost: 4,
    inline: false, forCompound: true,
    sheeterConfig: "two_roll_sheeter_rubber_nip_gap_adjust_sheet_thickness_control",
    bestUse: "rubber_lab_two_roll_sheeter_sheet_compound_thickness_adjust",
  },
  four_roll_sheeter: {
    sheetUniformity: 9, throughput: 9, coolingRate: 7, thicknessControl: 10, rsCost: 8,
    inline: true, forCompound: true,
    sheeterConfig: "four_roll_sheeter_rubber_precision_nip_calender_thin_uniform",
    bestUse: "precision_rubber_four_roll_sheeter_thin_uniform_sheet_production",
  },
  festoon_cooler: {
    sheetUniformity: 7, throughput: 10, coolingRate: 10, thicknessControl: 6, rsCost: 6,
    inline: true, forCompound: true,
    sheeterConfig: "festoon_cooler_rubber_sheeter_loop_hang_air_cool_anti_tack",
    bestUse: "high_volume_rubber_festoon_cooler_rapid_cool_continuous_line",
  },
  wig_wag_stacker: {
    sheetUniformity: 8, throughput: 8, coolingRate: 8, thicknessControl: 7, rsCost: 7,
    inline: true, forCompound: false,
    sheeterConfig: "wig_wag_stacker_rubber_sheeter_oscillate_layer_pallet_stack",
    bestUse: "rubber_warehouse_wig_wag_stacker_automated_pallet_layer_stack",
  },
};

function get(t: RubberSheeterType): RubberSheeterData {
  return DATA[t];
}

export const sheetUniformity = (t: RubberSheeterType) => get(t).sheetUniformity;
export const throughput = (t: RubberSheeterType) => get(t).throughput;
export const coolingRate = (t: RubberSheeterType) => get(t).coolingRate;
export const thicknessControl = (t: RubberSheeterType) => get(t).thicknessControl;
export const rsCost = (t: RubberSheeterType) => get(t).rsCost;
export const inline = (t: RubberSheeterType) => get(t).inline;
export const forCompound = (t: RubberSheeterType) => get(t).forCompound;
export const sheeterConfig = (t: RubberSheeterType) => get(t).sheeterConfig;
export const bestUse = (t: RubberSheeterType) => get(t).bestUse;
export const rubberSheeterTypes = (): RubberSheeterType[] =>
  Object.keys(DATA) as RubberSheeterType[];
