export type LabelApplicatorType =
  | "pressure_sensitive_wipe"
  | "shrink_sleeve_steam"
  | "glue_applied_cold"
  | "hot_melt_rotary"
  | "print_and_apply_thermal";

interface LabelApplicatorData {
  speed: number;
  accuracy: number;
  versatility: number;
  labelCost: number;
  laCost: number;
  fullWrap: boolean;
  forContour: boolean;
  adhesion: string;
  bestUse: string;
}

const DATA: Record<LabelApplicatorType, LabelApplicatorData> = {
  pressure_sensitive_wipe: {
    speed: 9, accuracy: 9, versatility: 9, labelCost: 6, laCost: 6,
    fullWrap: false, forContour: false,
    adhesion: "pressure_sensitive_peel_stick",
    bestUse: "bottle_box_pouch_variable_print",
  },
  shrink_sleeve_steam: {
    speed: 8, accuracy: 7, versatility: 7, labelCost: 7, laCost: 8,
    fullWrap: true, forContour: true,
    adhesion: "heat_shrink_film_conform",
    bestUse: "contour_bottle_tamper_evident_360",
  },
  glue_applied_cold: {
    speed: 10, accuracy: 7, versatility: 6, labelCost: 3, laCost: 5,
    fullWrap: true, forContour: false,
    adhesion: "cold_glue_wet_adhesive_paper",
    bestUse: "beer_wine_glass_bottle_paper",
  },
  hot_melt_rotary: {
    speed: 10, accuracy: 8, versatility: 7, labelCost: 4, laCost: 7,
    fullWrap: true, forContour: false,
    adhesion: "hot_melt_opp_film_wrap",
    bestUse: "water_soda_pet_bottle_high_speed",
  },
  print_and_apply_thermal: {
    speed: 6, accuracy: 10, versatility: 10, labelCost: 8, laCost: 9,
    fullWrap: false, forContour: false,
    adhesion: "thermal_transfer_barcode_print",
    bestUse: "warehouse_pallet_case_label_track",
  },
};

function get(t: LabelApplicatorType): LabelApplicatorData {
  return DATA[t];
}

export const speed = (t: LabelApplicatorType) => get(t).speed;
export const accuracy = (t: LabelApplicatorType) => get(t).accuracy;
export const versatility = (t: LabelApplicatorType) => get(t).versatility;
export const labelCost = (t: LabelApplicatorType) => get(t).labelCost;
export const laCost = (t: LabelApplicatorType) => get(t).laCost;
export const fullWrap = (t: LabelApplicatorType) => get(t).fullWrap;
export const forContour = (t: LabelApplicatorType) => get(t).forContour;
export const adhesion = (t: LabelApplicatorType) => get(t).adhesion;
export const bestUse = (t: LabelApplicatorType) => get(t).bestUse;
export const labelApplicatorTypes = (): LabelApplicatorType[] =>
  Object.keys(DATA) as LabelApplicatorType[];
