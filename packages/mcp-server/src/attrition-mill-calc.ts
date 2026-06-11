export type AttritionMillType =
  | "single_runner"
  | "double_runner"
  | "vertical_attritor"
  | "horizontal_attritor"
  | "circulation_attritor";

interface AttritionMillData {
  grindFineness: number;
  throughput: number;
  mediaWear: number;
  tempControl: number;
  amCost: number;
  wetGrind: boolean;
  forCeramic: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<AttritionMillType, AttritionMillData> = {
  single_runner: {
    grindFineness: 6, throughput: 8, mediaWear: 5, tempControl: 6, amCost: 4,
    wetGrind: false, forCeramic: false,
    millConfig: "single_runner_attrition_mill_one_disc_rotate_shear_grind_fiber",
    bestUse: "pulp_refine_single_runner_attrition_mill_fiber_shear_defiber",
  },
  double_runner: {
    grindFineness: 7, throughput: 7, mediaWear: 6, tempControl: 6, amCost: 5,
    wetGrind: false, forCeramic: false,
    millConfig: "double_runner_attrition_mill_two_disc_counter_rotate_intense_shear",
    bestUse: "grain_flour_double_runner_attrition_mill_counter_rotate_fine_grind",
  },
  vertical_attritor: {
    grindFineness: 8, throughput: 6, mediaWear: 7, tempControl: 7, amCost: 7,
    wetGrind: true, forCeramic: true,
    millConfig: "vertical_attritor_mill_stirred_ball_media_grind_slurry_disperse",
    bestUse: "ceramic_slip_vertical_attritor_mill_stirred_media_fine_disperse",
  },
  horizontal_attritor: {
    grindFineness: 9, throughput: 7, mediaWear: 7, tempControl: 8, amCost: 8,
    wetGrind: true, forCeramic: true,
    millConfig: "horizontal_attritor_mill_disc_stir_media_jacket_cool_fine_grind",
    bestUse: "ink_pigment_horizontal_attritor_mill_disc_stir_jacket_cool_fine",
  },
  circulation_attritor: {
    grindFineness: 9, throughput: 8, mediaWear: 8, tempControl: 8, amCost: 9,
    wetGrind: true, forCeramic: false,
    millConfig: "circulation_attritor_mill_pump_recirculate_tank_multi_pass_grind",
    bestUse: "paint_disperse_circulation_attritor_mill_recirculate_multi_pass",
  },
};

function get(t: AttritionMillType): AttritionMillData {
  return DATA[t];
}

export const grindFineness = (t: AttritionMillType) => get(t).grindFineness;
export const throughput = (t: AttritionMillType) => get(t).throughput;
export const mediaWear = (t: AttritionMillType) => get(t).mediaWear;
export const tempControl = (t: AttritionMillType) => get(t).tempControl;
export const amCost = (t: AttritionMillType) => get(t).amCost;
export const wetGrind = (t: AttritionMillType) => get(t).wetGrind;
export const forCeramic = (t: AttritionMillType) => get(t).forCeramic;
export const millConfig = (t: AttritionMillType) => get(t).millConfig;
export const bestUse = (t: AttritionMillType) => get(t).bestUse;
export const attritionMillTypes = (): AttritionMillType[] =>
  Object.keys(DATA) as AttritionMillType[];
