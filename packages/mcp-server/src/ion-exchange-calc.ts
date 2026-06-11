export type IonExchangeType =
  | "strong_acid_cation_sac"
  | "weak_acid_cation_wac"
  | "strong_base_anion_sba"
  | "weak_base_anion_wba"
  | "mixed_bed_cation_anion";

interface IonExchangeData {
  capacity: number;
  selectivity: number;
  regeneration: number;
  purity: number;
  ieCost: number;
  acidRegen: boolean;
  forDemin: boolean;
  resin: string;
  bestUse: string;
}

const DATA: Record<IonExchangeType, IonExchangeData> = {
  strong_acid_cation_sac: {
    capacity: 8, selectivity: 6, regeneration: 5, purity: 7, ieCost: 5,
    acidRegen: true, forDemin: true,
    resin: "sulfonated_polystyrene_dvb_gel",
    bestUse: "softening_demin_first_stage_cation",
  },
  weak_acid_cation_wac: {
    capacity: 9, selectivity: 4, regeneration: 9, purity: 5, ieCost: 4,
    acidRegen: true, forDemin: false,
    resin: "carboxylic_acrylic_macroporous",
    bestUse: "dealkalization_high_hardness_efficient",
  },
  strong_base_anion_sba: {
    capacity: 7, selectivity: 7, regeneration: 4, purity: 9, ieCost: 7,
    acidRegen: false, forDemin: true,
    resin: "quaternary_amine_polystyrene_type1",
    bestUse: "demin_second_stage_silica_co2_remove",
  },
  weak_base_anion_wba: {
    capacity: 8, selectivity: 5, regeneration: 8, purity: 6, ieCost: 4,
    acidRegen: false, forDemin: false,
    resin: "tertiary_amine_acrylic_free_base",
    bestUse: "acid_absorb_mineral_acid_neutralize",
  },
  mixed_bed_cation_anion: {
    capacity: 5, selectivity: 8, regeneration: 3, purity: 10, ieCost: 9,
    acidRegen: true, forDemin: true,
    resin: "mixed_sac_sba_single_vessel",
    bestUse: "polishing_ultrapure_boiler_condensate",
  },
};

function get(t: IonExchangeType): IonExchangeData {
  return DATA[t];
}

export const capacity = (t: IonExchangeType) => get(t).capacity;
export const selectivity = (t: IonExchangeType) => get(t).selectivity;
export const regeneration = (t: IonExchangeType) => get(t).regeneration;
export const purity = (t: IonExchangeType) => get(t).purity;
export const ieCost = (t: IonExchangeType) => get(t).ieCost;
export const acidRegen = (t: IonExchangeType) => get(t).acidRegen;
export const forDemin = (t: IonExchangeType) => get(t).forDemin;
export const resin = (t: IonExchangeType) => get(t).resin;
export const bestUse = (t: IonExchangeType) => get(t).bestUse;
export const ionExchangeTypes = (): IonExchangeType[] =>
  Object.keys(DATA) as IonExchangeType[];
