export type PadFinishType =
  | "hasl_tin_lead"
  | "enig_gold_nickel"
  | "osp_organic_coat"
  | "immersion_silver"
  | "immersion_tin";

const DATA: Record<PadFinishType, {
  solderability: number; shelfLife: number; flatness: number;
  contactResist: number; finishCost: number; leadFree: boolean;
  forFinePitch: boolean; platingMethod: string; bestUse: string;
}> = {
  hasl_tin_lead: { solderability: 9, shelfLife: 8, flatness: 4, contactResist: 5, finishCost: 2, leadFree: false, forFinePitch: false, platingMethod: "hot_air_solder_level", bestUse: "standard_through_hole_board" },
  enig_gold_nickel: { solderability: 8, shelfLife: 10, flatness: 10, contactResist: 10, finishCost: 8, leadFree: true, forFinePitch: true, platingMethod: "electroless_nickel_gold", bestUse: "bga_fine_pitch_contact" },
  osp_organic_coat: { solderability: 7, shelfLife: 4, flatness: 9, contactResist: 3, finishCost: 1, leadFree: true, forFinePitch: true, platingMethod: "organic_solderability_preserve", bestUse: "cost_sensitive_smt_board" },
  immersion_silver: { solderability: 9, shelfLife: 6, flatness: 9, contactResist: 8, finishCost: 4, leadFree: true, forFinePitch: true, platingMethod: "chemical_silver_deposit", bestUse: "rf_high_frequency_board" },
  immersion_tin: { solderability: 8, shelfLife: 5, flatness: 9, contactResist: 6, finishCost: 3, leadFree: true, forFinePitch: true, platingMethod: "chemical_tin_immersion", bestUse: "press_fit_connector_board" },
};

const get = (t: PadFinishType) => DATA[t];

export const solderability = (t: PadFinishType) => get(t).solderability;
export const shelfLife = (t: PadFinishType) => get(t).shelfLife;
export const flatness = (t: PadFinishType) => get(t).flatness;
export const contactResist = (t: PadFinishType) => get(t).contactResist;
export const finishCost = (t: PadFinishType) => get(t).finishCost;
export const leadFree = (t: PadFinishType) => get(t).leadFree;
export const forFinePitch = (t: PadFinishType) => get(t).forFinePitch;
export const platingMethod = (t: PadFinishType) => get(t).platingMethod;
export const bestUse = (t: PadFinishType) => get(t).bestUse;
export const padFinishes = (): PadFinishType[] => Object.keys(DATA) as PadFinishType[];
