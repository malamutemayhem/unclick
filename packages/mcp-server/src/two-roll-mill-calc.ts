export type TwoRollMillType =
  | "mixing_mill"
  | "warming_mill"
  | "cracker_mill"
  | "refiner_mill"
  | "lab_mill";

interface TwoRollMillData {
  mixingAction: number;
  sheetQuality: number;
  rollSpeed: number;
  frictionRatio: number;
  trmCost: number;
  adjustableGap: boolean;
  forCompounding: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<TwoRollMillType, TwoRollMillData> = {
  mixing_mill: {
    mixingAction: 10, sheetQuality: 7, rollSpeed: 7, frictionRatio: 8, trmCost: 7,
    adjustableGap: true, forCompounding: true,
    millConfig: "two_roll_open_mill_friction_ratio_nip_gap_rubber_compound_mix",
    bestUse: "rubber_compound_mixing_additive_incorporation_open_mill_batch",
  },
  warming_mill: {
    mixingAction: 6, sheetQuality: 8, rollSpeed: 9, frictionRatio: 6, trmCost: 6,
    adjustableGap: true, forCompounding: false,
    millConfig: "warming_mill_preheat_soften_compound_before_calender_extrude",
    bestUse: "preheat_soften_rubber_compound_before_calender_extruder_feed",
  },
  cracker_mill: {
    mixingAction: 5, sheetQuality: 4, rollSpeed: 8, frictionRatio: 10, trmCost: 5,
    adjustableGap: false, forCompounding: false,
    millConfig: "cracker_mill_high_friction_ratio_break_down_reclaim_rubber_scrap",
    bestUse: "reclaim_rubber_scrap_break_down_vulcanized_waste_cracker_mill",
  },
  refiner_mill: {
    mixingAction: 8, sheetQuality: 9, rollSpeed: 7, frictionRatio: 7, trmCost: 8,
    adjustableGap: true, forCompounding: true,
    millConfig: "refiner_mill_tight_nip_fine_dispersion_carbon_black_silica_mix",
    bestUse: "fine_dispersion_carbon_black_silica_filler_refiner_tight_nip",
  },
  lab_mill: {
    mixingAction: 9, sheetQuality: 8, rollSpeed: 6, frictionRatio: 8, trmCost: 4,
    adjustableGap: true, forCompounding: true,
    millConfig: "lab_scale_two_roll_mill_small_batch_r_and_d_formulation_test",
    bestUse: "small_batch_r_and_d_rubber_formulation_lab_scale_two_roll_mill",
  },
};

function get(t: TwoRollMillType): TwoRollMillData {
  return DATA[t];
}

export const mixingAction = (t: TwoRollMillType) => get(t).mixingAction;
export const sheetQuality = (t: TwoRollMillType) => get(t).sheetQuality;
export const rollSpeed = (t: TwoRollMillType) => get(t).rollSpeed;
export const frictionRatio = (t: TwoRollMillType) => get(t).frictionRatio;
export const trmCost = (t: TwoRollMillType) => get(t).trmCost;
export const adjustableGap = (t: TwoRollMillType) => get(t).adjustableGap;
export const forCompounding = (t: TwoRollMillType) => get(t).forCompounding;
export const millConfig = (t: TwoRollMillType) => get(t).millConfig;
export const bestUse = (t: TwoRollMillType) => get(t).bestUse;
export const twoRollMillTypes = (): TwoRollMillType[] =>
  Object.keys(DATA) as TwoRollMillType[];
