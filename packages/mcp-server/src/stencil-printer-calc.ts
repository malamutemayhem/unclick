export type StencilPrinterType =
  | "manual_frame"
  | "semi_auto"
  | "full_auto_inline"
  | "jet_printer"
  | "dual_platform";

interface StencilPrinterData {
  printAccuracy: number;
  speed: number;
  repeatability: number;
  flexibility: number;
  stCost: number;
  automated: boolean;
  forFinePitch: boolean;
  print: string;
  bestUse: string;
}

const DATA: Record<StencilPrinterType, StencilPrinterData> = {
  manual_frame: {
    printAccuracy: 4, speed: 3, repeatability: 3, flexibility: 8, stCost: 2,
    automated: false, forFinePitch: false,
    print: "manual_squeegee_hand_frame_clamp_visual_alignment_simple",
    bestUse: "prototype_lab_low_volume_hobby_simple_board_solder_paste",
  },
  semi_auto: {
    printAccuracy: 7, speed: 5, repeatability: 7, flexibility: 7, stCost: 5,
    automated: false, forFinePitch: false,
    print: "pneumatic_squeegee_vision_align_manual_load_auto_print",
    bestUse: "small_production_run_rework_depot_moderate_accuracy_need",
  },
  full_auto_inline: {
    printAccuracy: 9, speed: 9, repeatability: 9, flexibility: 6, stCost: 8,
    automated: true, forFinePitch: true,
    print: "auto_load_vision_align_closed_loop_2d_inspection_feedback",
    bestUse: "high_volume_smt_line_fine_pitch_consistent_paste_deposit",
  },
  jet_printer: {
    printAccuracy: 10, speed: 6, repeatability: 10, flexibility: 10, stCost: 10,
    automated: true, forFinePitch: true,
    print: "non_contact_jet_dispense_no_stencil_digital_pattern_paste",
    bestUse: "stencil_free_prototype_3d_board_step_stencil_alternative",
  },
  dual_platform: {
    printAccuracy: 9, speed: 10, repeatability: 9, flexibility: 7, stCost: 9,
    automated: true, forFinePitch: true,
    print: "dual_table_simultaneous_load_print_no_idle_time_pipeline",
    bestUse: "ultra_high_volume_line_zero_idle_time_maximum_throughput",
  },
};

function get(t: StencilPrinterType): StencilPrinterData {
  return DATA[t];
}

export const printAccuracy = (t: StencilPrinterType) => get(t).printAccuracy;
export const speed = (t: StencilPrinterType) => get(t).speed;
export const repeatability = (t: StencilPrinterType) => get(t).repeatability;
export const flexibility = (t: StencilPrinterType) => get(t).flexibility;
export const stCost = (t: StencilPrinterType) => get(t).stCost;
export const automated = (t: StencilPrinterType) => get(t).automated;
export const forFinePitch = (t: StencilPrinterType) => get(t).forFinePitch;
export const print = (t: StencilPrinterType) => get(t).print;
export const bestUse = (t: StencilPrinterType) => get(t).bestUse;
export const stencilPrinterTypes = (): StencilPrinterType[] =>
  Object.keys(DATA) as StencilPrinterType[];
