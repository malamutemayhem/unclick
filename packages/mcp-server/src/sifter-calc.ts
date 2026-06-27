export type SifterType =
  | "plansifter_box"
  | "centrifugal_sifter"
  | "vibrating_screen"
  | "rotary_drum"
  | "air_classifier";

interface SifterData {
  separationAccuracy: number;
  throughput: number;
  meshRange: number;
  cleanability: number;
  sfCost: number;
  enclosed: boolean;
  forFlour: boolean;
  sifterConfig: string;
  bestUse: string;
}

const DATA: Record<SifterType, SifterData> = {
  plansifter_box: {
    separationAccuracy: 10, throughput: 9, meshRange: 9, cleanability: 7, sfCost: 8,
    enclosed: true, forFlour: true,
    sifterConfig: "plansifter_box_sifter_gyrating_multi_deck_sieve_classify_flour",
    bestUse: "flour_mill_plansifter_multi_passage_classify_flour_semolina_bran",
  },
  centrifugal_sifter: {
    separationAccuracy: 8, throughput: 10, meshRange: 7, cleanability: 9, sfCost: 7,
    enclosed: true, forFlour: true,
    sifterConfig: "centrifugal_sifter_rotating_paddle_screen_high_speed_classify",
    bestUse: "food_processing_centrifugal_sifter_check_sieve_deagglomerate",
  },
  vibrating_screen: {
    separationAccuracy: 7, throughput: 8, meshRange: 8, cleanability: 8, sfCost: 5,
    enclosed: false, forFlour: false,
    sifterConfig: "vibrating_screen_sifter_linear_circular_motion_coarse_classify",
    bestUse: "grain_cleaning_vibrating_screen_scalp_classify_coarse_material",
  },
  rotary_drum: {
    separationAccuracy: 6, throughput: 9, meshRange: 6, cleanability: 8, sfCost: 6,
    enclosed: true, forFlour: false,
    sifterConfig: "rotary_drum_sifter_tumbling_cylinder_screen_bulk_classify",
    bestUse: "bulk_grain_rotary_drum_sifter_precleaning_scalping_coarse_screen",
  },
  air_classifier: {
    separationAccuracy: 10, throughput: 7, meshRange: 10, cleanability: 6, sfCost: 10,
    enclosed: true, forFlour: true,
    sifterConfig: "air_classifier_sifter_cyclone_vane_separate_fine_ultrafine_particle",
    bestUse: "specialty_flour_air_classifier_ultrafine_separation_starch_protein",
  },
};

function get(t: SifterType): SifterData {
  return DATA[t];
}

export const separationAccuracy = (t: SifterType) => get(t).separationAccuracy;
export const throughput = (t: SifterType) => get(t).throughput;
export const meshRange = (t: SifterType) => get(t).meshRange;
export const cleanability = (t: SifterType) => get(t).cleanability;
export const sfCost = (t: SifterType) => get(t).sfCost;
export const enclosed = (t: SifterType) => get(t).enclosed;
export const forFlour = (t: SifterType) => get(t).forFlour;
export const sifterConfig = (t: SifterType) => get(t).sifterConfig;
export const bestUse = (t: SifterType) => get(t).bestUse;
export const sifterTypes = (): SifterType[] =>
  Object.keys(DATA) as SifterType[];
