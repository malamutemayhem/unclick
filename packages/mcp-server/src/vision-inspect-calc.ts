export type VisionInspectType =
  | "surface_defect_aoi"
  | "dimensional_gauging"
  | "color_sorting_rgb"
  | "ocr_print_verify"
  | "deep_learn_anomaly";

interface VisionInspectData {
  accuracy: number;
  speed: number;
  adaptability: number;
  falseReject: number;
  viCost: number;
  aiPowered: boolean;
  forHighMix: boolean;
  algorithm: string;
  bestUse: string;
}

const DATA: Record<VisionInspectType, VisionInspectData> = {
  surface_defect_aoi: {
    accuracy: 9, speed: 9, adaptability: 6, falseReject: 7, viCost: 7,
    aiPowered: false, forHighMix: false,
    algorithm: "blob_edge_pattern_match_rule",
    bestUse: "pcb_solder_joint_scratch_dent",
  },
  dimensional_gauging: {
    accuracy: 10, speed: 8, adaptability: 5, falseReject: 9, viCost: 6,
    aiPowered: false, forHighMix: false,
    algorithm: "sub_pixel_edge_caliper_measure",
    bestUse: "machined_part_gap_runout_check",
  },
  color_sorting_rgb: {
    accuracy: 8, speed: 10, adaptability: 6, falseReject: 7, viCost: 5,
    aiPowered: false, forHighMix: false,
    algorithm: "hsi_color_space_threshold_class",
    bestUse: "food_grain_plastic_flake_sort",
  },
  ocr_print_verify: {
    accuracy: 9, speed: 9, adaptability: 7, falseReject: 8, viCost: 6,
    aiPowered: false, forHighMix: true,
    algorithm: "trained_font_ocr_barcode_grade",
    bestUse: "pharma_label_date_code_verify",
  },
  deep_learn_anomaly: {
    accuracy: 9, speed: 7, adaptability: 10, falseReject: 9, viCost: 9,
    aiPowered: true, forHighMix: true,
    algorithm: "autoencoder_anomaly_few_shot",
    bestUse: "cosmetic_textile_novel_defect",
  },
};

function get(t: VisionInspectType): VisionInspectData {
  return DATA[t];
}

export const accuracy = (t: VisionInspectType) => get(t).accuracy;
export const speed = (t: VisionInspectType) => get(t).speed;
export const adaptability = (t: VisionInspectType) => get(t).adaptability;
export const falseReject = (t: VisionInspectType) => get(t).falseReject;
export const viCost = (t: VisionInspectType) => get(t).viCost;
export const aiPowered = (t: VisionInspectType) => get(t).aiPowered;
export const forHighMix = (t: VisionInspectType) => get(t).forHighMix;
export const algorithm = (t: VisionInspectType) => get(t).algorithm;
export const bestUse = (t: VisionInspectType) => get(t).bestUse;
export const visionInspectTypes = (): VisionInspectType[] =>
  Object.keys(DATA) as VisionInspectType[];
