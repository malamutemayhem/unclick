export type EnroberCoaterType =
  | "chocolate_enrober"
  | "batter_breading"
  | "sugar_panning"
  | "spray_coating"
  | "fluidized_bed_coat";

interface EnroberCoaterData {
  coatingUniformity: number;
  throughput: number;
  coatingThickness: number;
  productRange: number;
  ecCost: number;
  continuous: boolean;
  forConfectionery: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<EnroberCoaterType, EnroberCoaterData> = {
  chocolate_enrober: {
    coatingUniformity: 9, throughput: 9, coatingThickness: 8, productRange: 7, ecCost: 7,
    continuous: true, forConfectionery: true,
    coaterConfig: "chocolate_enrober_curtain_flow_bottom_coat_vibrate_excess_temper",
    bestUse: "candy_bar_chocolate_enrober_curtain_coat_temper_gloss_snap_finish",
  },
  batter_breading: {
    coatingUniformity: 7, throughput: 10, coatingThickness: 9, productRange: 8, ecCost: 6,
    continuous: true, forConfectionery: false,
    coaterConfig: "batter_breading_coater_wet_batter_dry_crumb_press_roll_adhere",
    bestUse: "frozen_food_batter_breading_coater_wet_dry_apply_crispy_coating",
  },
  sugar_panning: {
    coatingUniformity: 10, throughput: 5, coatingThickness: 10, productRange: 4, ecCost: 5,
    continuous: false, forConfectionery: true,
    coaterConfig: "sugar_panning_coater_rotating_drum_spray_syrup_dry_layer_build",
    bestUse: "dragee_candy_sugar_panning_coater_multi_layer_shell_color_polish",
  },
  spray_coating: {
    coatingUniformity: 8, throughput: 8, coatingThickness: 6, productRange: 9, ecCost: 8,
    continuous: true, forConfectionery: false,
    coaterConfig: "spray_coating_system_atomize_nozzle_precise_dose_thin_even_layer",
    bestUse: "snack_seasoning_spray_coating_system_atomize_precise_flavor_dose",
  },
  fluidized_bed_coat: {
    coatingUniformity: 10, throughput: 6, coatingThickness: 7, productRange: 6, ecCost: 9,
    continuous: false, forConfectionery: false,
    coaterConfig: "fluidized_bed_coater_air_suspend_spray_encapsulate_dry_in_chamber",
    bestUse: "nutraceutical_fluidized_bed_coater_encapsulate_taste_mask_release",
  },
};

function get(t: EnroberCoaterType): EnroberCoaterData {
  return DATA[t];
}

export const coatingUniformity = (t: EnroberCoaterType) => get(t).coatingUniformity;
export const throughput = (t: EnroberCoaterType) => get(t).throughput;
export const coatingThickness = (t: EnroberCoaterType) => get(t).coatingThickness;
export const productRange = (t: EnroberCoaterType) => get(t).productRange;
export const ecCost = (t: EnroberCoaterType) => get(t).ecCost;
export const continuous = (t: EnroberCoaterType) => get(t).continuous;
export const forConfectionery = (t: EnroberCoaterType) => get(t).forConfectionery;
export const coaterConfig = (t: EnroberCoaterType) => get(t).coaterConfig;
export const bestUse = (t: EnroberCoaterType) => get(t).bestUse;
export const enroberCoaterTypes = (): EnroberCoaterType[] =>
  Object.keys(DATA) as EnroberCoaterType[];
