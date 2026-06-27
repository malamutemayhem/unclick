export type CurdCutterType =
  | "manual_harp"
  | "horizontal_wire"
  | "vertical_knife"
  | "automated_column"
  | "ultrasonic_blade";

interface CurdCutterData {
  cutUniformity: number;
  cutSpeed: number;
  curdDamage: number;
  sizeRange: number;
  ccCost: number;
  automated: boolean;
  forSoft: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<CurdCutterType, CurdCutterData> = {
  manual_harp: {
    cutUniformity: 5, cutSpeed: 3, curdDamage: 8, sizeRange: 6, ccCost: 2,
    automated: false, forSoft: true,
    cutterConfig: "manual_harp_curd_cutter_wire_frame_hand_draw_traditional_artisan",
    bestUse: "artisan_creamery_manual_harp_curd_cutter_hand_drawn_traditional",
  },
  horizontal_wire: {
    cutUniformity: 7, cutSpeed: 7, curdDamage: 7, sizeRange: 7, ccCost: 5,
    automated: true, forSoft: true,
    cutterConfig: "horizontal_wire_curd_cutter_frame_traverse_vat_parallel_wire_cut",
    bestUse: "mid_size_creamery_horizontal_wire_cutter_consistent_curd_size",
  },
  vertical_knife: {
    cutUniformity: 8, cutSpeed: 8, curdDamage: 6, sizeRange: 8, ccCost: 6,
    automated: true, forSoft: false,
    cutterConfig: "vertical_knife_curd_cutter_rotating_blade_vat_integrated_agitator",
    bestUse: "commercial_cheese_plant_vertical_knife_cutter_integrated_agitator",
  },
  automated_column: {
    cutUniformity: 10, cutSpeed: 10, curdDamage: 5, sizeRange: 9, ccCost: 9,
    automated: true, forSoft: false,
    cutterConfig: "automated_column_curd_cutter_programmable_blade_speed_size_adjust",
    bestUse: "large_cheese_factory_automated_column_cutter_programmable_precise",
  },
  ultrasonic_blade: {
    cutUniformity: 10, cutSpeed: 9, curdDamage: 10, sizeRange: 10, ccCost: 10,
    automated: true, forSoft: true,
    cutterConfig: "ultrasonic_blade_curd_cutter_vibration_clean_cut_zero_smear_loss",
    bestUse: "premium_soft_cheese_ultrasonic_blade_zero_smear_clean_cut_delicate",
  },
};

function get(t: CurdCutterType): CurdCutterData {
  return DATA[t];
}

export const cutUniformity = (t: CurdCutterType) => get(t).cutUniformity;
export const cutSpeed = (t: CurdCutterType) => get(t).cutSpeed;
export const curdDamage = (t: CurdCutterType) => get(t).curdDamage;
export const sizeRange = (t: CurdCutterType) => get(t).sizeRange;
export const ccCost = (t: CurdCutterType) => get(t).ccCost;
export const automated = (t: CurdCutterType) => get(t).automated;
export const forSoft = (t: CurdCutterType) => get(t).forSoft;
export const cutterConfig = (t: CurdCutterType) => get(t).cutterConfig;
export const bestUse = (t: CurdCutterType) => get(t).bestUse;
export const curdCutterTypes = (): CurdCutterType[] =>
  Object.keys(DATA) as CurdCutterType[];
