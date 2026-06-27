export type WeibullParam =
  | "infant_mortality_dec"
  | "random_constant_rate"
  | "early_wearout_inc"
  | "normal_wearout_steep"
  | "mixed_competing_modes";

const DATA: Record<WeibullParam, {
  betaShape: number; predictability: number; screenEff: number;
  dataReq: number; wpCost: number; increasing: boolean;
  forWarranty: boolean; distribution: string; bestUse: string;
}> = {
  infant_mortality_dec: {
    betaShape: 2, predictability: 6, screenEff: 10,
    dataReq: 6, wpCost: 3, increasing: false,
    forWarranty: true, distribution: "decreasing_hazard_beta_lt1",
    bestUse: "burn_in_screen_duration",
  },
  random_constant_rate: {
    betaShape: 5, predictability: 5, screenEff: 1,
    dataReq: 4, wpCost: 2, increasing: false,
    forWarranty: false, distribution: "exponential_beta_eq1",
    bestUse: "field_random_failure_rate",
  },
  early_wearout_inc: {
    betaShape: 7, predictability: 8, screenEff: 3,
    dataReq: 7, wpCost: 4, increasing: true,
    forWarranty: true, distribution: "increasing_hazard_beta_2_4",
    bestUse: "bearing_fatigue_predict",
  },
  normal_wearout_steep: {
    betaShape: 9, predictability: 10, screenEff: 2,
    dataReq: 8, wpCost: 5, increasing: true,
    forWarranty: true, distribution: "steep_hazard_beta_gt4",
    bestUse: "preventive_maint_schedule",
  },
  mixed_competing_modes: {
    betaShape: 5, predictability: 4, screenEff: 5,
    dataReq: 10, wpCost: 7, increasing: false,
    forWarranty: false, distribution: "bimodal_mixture_fit",
    bestUse: "multi_mode_root_cause",
  },
};

const get = (t: WeibullParam) => DATA[t];

export const betaShape = (t: WeibullParam) => get(t).betaShape;
export const predictability = (t: WeibullParam) => get(t).predictability;
export const screenEff = (t: WeibullParam) => get(t).screenEff;
export const dataReq = (t: WeibullParam) => get(t).dataReq;
export const wpCost = (t: WeibullParam) => get(t).wpCost;
export const increasing = (t: WeibullParam) => get(t).increasing;
export const forWarranty = (t: WeibullParam) => get(t).forWarranty;
export const distribution = (t: WeibullParam) => get(t).distribution;
export const bestUse = (t: WeibullParam) => get(t).bestUse;
export const weibullParams = (): WeibullParam[] => Object.keys(DATA) as WeibullParam[];
