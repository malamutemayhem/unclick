export type StructuralBoltType =
  | "a325_high_strength_hex"
  | "a490_alloy_steel_heavy"
  | "a307_low_carbon_common"
  | "tension_control_tc_twist_off"
  | "a354_anchor_rod_grade_bd";

interface StructuralBoltData {
  tensile: number;
  shear: number;
  ductility: number;
  installEase: number;
  sbCost: number;
  highStrength: boolean;
  forSlipCritical: boolean;
  grade: string;
  bestUse: string;
}

const DATA: Record<StructuralBoltType, StructuralBoltData> = {
  a325_high_strength_hex: {
    tensile: 7, shear: 7, ductility: 7, installEase: 7, sbCost: 5,
    highStrength: true, forSlipCritical: true,
    grade: "astm_a325_120ksi_min",
    bestUse: "steel_frame_beam_column_connection",
  },
  a490_alloy_steel_heavy: {
    tensile: 10, shear: 10, ductility: 5, installEase: 5, sbCost: 8,
    highStrength: true, forSlipCritical: true,
    grade: "astm_a490_150ksi_min",
    bestUse: "heavy_steel_moment_frame_flange",
  },
  a307_low_carbon_common: {
    tensile: 4, shear: 4, ductility: 9, installEase: 10, sbCost: 2,
    highStrength: false, forSlipCritical: false,
    grade: "astm_a307_grade_a_60ksi",
    bestUse: "secondary_member_light_brace_girt",
  },
  tension_control_tc_twist_off: {
    tensile: 8, shear: 8, ductility: 6, installEase: 9, sbCost: 7,
    highStrength: true, forSlipCritical: true,
    grade: "f1852_tc_a325_equivalent",
    bestUse: "field_erection_fast_pretension_verify",
  },
  a354_anchor_rod_grade_bd: {
    tensile: 9, shear: 9, ductility: 6, installEase: 4, sbCost: 9,
    highStrength: true, forSlipCritical: false,
    grade: "astm_a354_grade_bd_150ksi",
    bestUse: "anchor_rod_base_plate_embed_heavy",
  },
};

function get(t: StructuralBoltType): StructuralBoltData {
  return DATA[t];
}

export const tensile = (t: StructuralBoltType) => get(t).tensile;
export const shear = (t: StructuralBoltType) => get(t).shear;
export const ductility = (t: StructuralBoltType) => get(t).ductility;
export const installEase = (t: StructuralBoltType) => get(t).installEase;
export const sbCost = (t: StructuralBoltType) => get(t).sbCost;
export const highStrength = (t: StructuralBoltType) => get(t).highStrength;
export const forSlipCritical = (t: StructuralBoltType) => get(t).forSlipCritical;
export const grade = (t: StructuralBoltType) => get(t).grade;
export const bestUse = (t: StructuralBoltType) => get(t).bestUse;
export const structuralBoltTypes = (): StructuralBoltType[] =>
  Object.keys(DATA) as StructuralBoltType[];
