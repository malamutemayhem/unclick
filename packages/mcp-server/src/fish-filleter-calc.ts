export type FishFilleterType =
  | "whitefish_filleter"
  | "salmon_filleter"
  | "flatfish_filleter"
  | "pelagic_filleter"
  | "manual_fillet";

interface FishFilleterData {
  filletYield: number;
  throughput: number;
  boneRemoval: number;
  cutPrecision: number;
  ffCost: number;
  automated: boolean;
  forSalmon: boolean;
  filleterConfig: string;
  bestUse: string;
}

const DATA: Record<FishFilleterType, FishFilleterData> = {
  whitefish_filleter: {
    filletYield: 8, throughput: 9, boneRemoval: 8, cutPrecision: 8, ffCost: 8,
    automated: true, forSalmon: false,
    filleterConfig: "whitefish_filleter_v_cut_backbone_remove_trim_portion_auto",
    bestUse: "fish_processing_whitefish_filleter_cod_haddock_pollock_high_yield",
  },
  salmon_filleter: {
    filletYield: 9, throughput: 8, boneRemoval: 9, cutPrecision: 9, ffCost: 9,
    automated: true, forSalmon: true,
    filleterConfig: "salmon_filleter_pin_bone_remove_butterfly_portion_skin_trim",
    bestUse: "salmon_processing_plant_filleter_pin_bone_remove_portion_pack",
  },
  flatfish_filleter: {
    filletYield: 7, throughput: 7, boneRemoval: 8, cutPrecision: 9, ffCost: 7,
    automated: true, forSalmon: false,
    filleterConfig: "flatfish_filleter_four_fillet_cut_sole_plaice_turbot_auto",
    bestUse: "flatfish_processing_filleter_sole_plaice_four_fillet_precision",
  },
  pelagic_filleter: {
    filletYield: 7, throughput: 10, boneRemoval: 7, cutPrecision: 7, ffCost: 7,
    automated: true, forSalmon: false,
    filleterConfig: "pelagic_filleter_high_speed_herring_mackerel_butterfly_fillet",
    bestUse: "pelagic_fish_filleter_herring_mackerel_sardine_high_speed_line",
  },
  manual_fillet: {
    filletYield: 10, throughput: 3, boneRemoval: 10, cutPrecision: 10, ffCost: 3,
    automated: false, forSalmon: true,
    filleterConfig: "manual_fillet_fish_skilled_hand_knife_precise_custom_cut",
    bestUse: "premium_fish_manual_fillet_sushi_grade_precise_custom_portion",
  },
};

function get(t: FishFilleterType): FishFilleterData {
  return DATA[t];
}

export const filletYield = (t: FishFilleterType) => get(t).filletYield;
export const throughput = (t: FishFilleterType) => get(t).throughput;
export const boneRemoval = (t: FishFilleterType) => get(t).boneRemoval;
export const cutPrecision = (t: FishFilleterType) => get(t).cutPrecision;
export const ffCost = (t: FishFilleterType) => get(t).ffCost;
export const automated = (t: FishFilleterType) => get(t).automated;
export const forSalmon = (t: FishFilleterType) => get(t).forSalmon;
export const filleterConfig = (t: FishFilleterType) => get(t).filleterConfig;
export const bestUse = (t: FishFilleterType) => get(t).bestUse;
export const fishFilleterTypes = (): FishFilleterType[] =>
  Object.keys(DATA) as FishFilleterType[];
