export type PulpBleacherType =
  | "chlorine_dioxide"
  | "oxygen_delignification"
  | "hydrogen_peroxide"
  | "ozone_bleach"
  | "totally_chlorine_free";

interface PulpBleacherData {
  brightnessGain: number;
  strengthRetention: number;
  chemicalCost: number;
  environmentalScore: number;
  pbCost: number;
  chlorineFree: boolean;
  forPrinting: boolean;
  bleacherConfig: string;
  bestUse: string;
}

const DATA: Record<PulpBleacherType, PulpBleacherData> = {
  chlorine_dioxide: {
    brightnessGain: 10, strengthRetention: 9, chemicalCost: 6, environmentalScore: 6, pbCost: 7,
    chlorineFree: false, forPrinting: true,
    bleacherConfig: "chlorine_dioxide_pulp_bleacher_ecf_selective_lignin_oxidize",
    bestUse: "kraft_mill_chlorine_dioxide_bleach_ecf_high_brightness_printing",
  },
  oxygen_delignification: {
    brightnessGain: 6, strengthRetention: 8, chemicalCost: 8, environmentalScore: 9, pbCost: 8,
    chlorineFree: true, forPrinting: false,
    bleacherConfig: "oxygen_delignification_pulp_bleacher_reactor_pressure_cook_o2",
    bestUse: "kraft_mill_oxygen_stage_pre_bleach_reduce_chemical_load_green",
  },
  hydrogen_peroxide: {
    brightnessGain: 7, strengthRetention: 9, chemicalCost: 7, environmentalScore: 9, pbCost: 6,
    chlorineFree: true, forPrinting: true,
    bleacherConfig: "hydrogen_peroxide_pulp_bleacher_alkaline_tower_gentle_brighten",
    bestUse: "mechanical_pulp_peroxide_bleach_brighten_retain_yield_newsprint",
  },
  ozone_bleach: {
    brightnessGain: 9, strengthRetention: 6, chemicalCost: 5, environmentalScore: 8, pbCost: 9,
    chlorineFree: true, forPrinting: true,
    bleacherConfig: "ozone_bleach_pulp_generator_mix_reactor_rapid_delignify",
    bestUse: "tcf_mill_ozone_bleach_stage_rapid_delignify_chlorine_free_bright",
  },
  totally_chlorine_free: {
    brightnessGain: 8, strengthRetention: 8, chemicalCost: 7, environmentalScore: 10, pbCost: 9,
    chlorineFree: true, forPrinting: true,
    bleacherConfig: "tcf_pulp_bleacher_multi_stage_o2_peroxide_ozone_sequence",
    bestUse: "eco_paper_mill_tcf_bleach_sequence_zero_chlorine_premium_pulp",
  },
};

function get(t: PulpBleacherType): PulpBleacherData {
  return DATA[t];
}

export const brightnessGain = (t: PulpBleacherType) => get(t).brightnessGain;
export const strengthRetention = (t: PulpBleacherType) => get(t).strengthRetention;
export const chemicalCost = (t: PulpBleacherType) => get(t).chemicalCost;
export const environmentalScore = (t: PulpBleacherType) => get(t).environmentalScore;
export const pbCost = (t: PulpBleacherType) => get(t).pbCost;
export const chlorineFree = (t: PulpBleacherType) => get(t).chlorineFree;
export const forPrinting = (t: PulpBleacherType) => get(t).forPrinting;
export const bleacherConfig = (t: PulpBleacherType) => get(t).bleacherConfig;
export const bestUse = (t: PulpBleacherType) => get(t).bestUse;
export const pulpBleacherTypes = (): PulpBleacherType[] =>
  Object.keys(DATA) as PulpBleacherType[];
