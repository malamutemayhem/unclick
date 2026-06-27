export type DestemmerType =
  | "rotary_cage"
  | "oscillating_paddle"
  | "centrifugal_destem"
  | "optical_sort"
  | "manual_table";

interface DestemmerData {
  stemRemoval: number;
  berryDamage: number;
  throughput: number;
  sortAccuracy: number;
  dsCost: number;
  automated: boolean;
  forPremium: boolean;
  destemmerConfig: string;
  bestUse: string;
}

const DATA: Record<DestemmerType, DestemmerData> = {
  rotary_cage: {
    stemRemoval: 8, berryDamage: 6, throughput: 9, sortAccuracy: 5, dsCost: 5,
    automated: true, forPremium: false,
    destemmerConfig: "rotary_cage_destemmer_perforated_drum_paddle_shaft_stem_eject",
    bestUse: "standard_winery_rotary_cage_destemmer_efficient_stem_removal",
  },
  oscillating_paddle: {
    stemRemoval: 9, berryDamage: 7, throughput: 8, sortAccuracy: 6, dsCost: 6,
    automated: true, forPremium: false,
    destemmerConfig: "oscillating_paddle_destemmer_gentle_vibration_berry_detach_screen",
    bestUse: "mid_size_winery_oscillating_paddle_destemmer_gentle_berry_detach",
  },
  centrifugal_destem: {
    stemRemoval: 10, berryDamage: 4, throughput: 10, sortAccuracy: 4, dsCost: 7,
    automated: true, forPremium: false,
    destemmerConfig: "centrifugal_destemmer_high_speed_spin_berry_fling_stem_center",
    bestUse: "bulk_production_centrifugal_destemmer_high_speed_stem_separation",
  },
  optical_sort: {
    stemRemoval: 9, berryDamage: 9, throughput: 7, sortAccuracy: 10, dsCost: 10,
    automated: true, forPremium: true,
    destemmerConfig: "optical_sort_destemmer_camera_nir_air_jet_mog_reject_berry_select",
    bestUse: "premium_estate_winery_optical_sort_nir_camera_perfect_berry_select",
  },
  manual_table: {
    stemRemoval: 7, berryDamage: 10, throughput: 3, sortAccuracy: 9, dsCost: 3,
    automated: false, forPremium: true,
    destemmerConfig: "manual_sorting_table_hand_destem_visual_inspect_mog_removal",
    bestUse: "boutique_winery_manual_sorting_table_hand_select_perfect_cluster",
  },
};

function get(t: DestemmerType): DestemmerData {
  return DATA[t];
}

export const stemRemoval = (t: DestemmerType) => get(t).stemRemoval;
export const berryDamage = (t: DestemmerType) => get(t).berryDamage;
export const throughput = (t: DestemmerType) => get(t).throughput;
export const sortAccuracy = (t: DestemmerType) => get(t).sortAccuracy;
export const dsCost = (t: DestemmerType) => get(t).dsCost;
export const automated = (t: DestemmerType) => get(t).automated;
export const forPremium = (t: DestemmerType) => get(t).forPremium;
export const destemmerConfig = (t: DestemmerType) => get(t).destemmerConfig;
export const bestUse = (t: DestemmerType) => get(t).bestUse;
export const destemmerTypes = (): DestemmerType[] =>
  Object.keys(DATA) as DestemmerType[];
