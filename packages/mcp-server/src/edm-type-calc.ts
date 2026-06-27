export type EdmType =
  | "sinker_ram_die_cavity"
  | "wire_edm_cnc_contour"
  | "hole_drilling_fast_edm"
  | "micro_edm_fine_feature"
  | "dry_edm_gas_dielectric";

interface EdmData {
  mrr: number;
  finish_: number;
  accuracy: number;
  complexity: number;
  edCost: number;
  submerged: boolean;
  forMold: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<EdmType, EdmData> = {
  sinker_ram_die_cavity: {
    mrr: 7, finish_: 8, accuracy: 8, complexity: 9, edCost: 7,
    submerged: true, forMold: true,
    electrode: "graphite_copper_shaped_3d",
    bestUse: "mold_cavity_die_complex_shape",
  },
  wire_edm_cnc_contour: {
    mrr: 5, finish_: 9, accuracy: 10, complexity: 7, edCost: 6,
    submerged: true, forMold: false,
    electrode: "brass_wire_continuous_spool",
    bestUse: "precision_contour_punch_die_tool",
  },
  hole_drilling_fast_edm: {
    mrr: 8, finish_: 5, accuracy: 6, complexity: 3, edCost: 4,
    submerged: false, forMold: false,
    electrode: "tubular_brass_rotating",
    bestUse: "cooling_hole_turbine_blade_start",
  },
  micro_edm_fine_feature: {
    mrr: 2, finish_: 10, accuracy: 10, complexity: 8, edCost: 9,
    submerged: true, forMold: false,
    electrode: "tungsten_wire_micro_rod",
    bestUse: "micro_hole_mems_medical_device",
  },
  dry_edm_gas_dielectric: {
    mrr: 4, finish_: 7, accuracy: 7, complexity: 5, edCost: 5,
    submerged: false, forMold: false,
    electrode: "copper_tungsten_gas_flushed",
    bestUse: "clean_room_no_fluid_special",
  },
};

function get(t: EdmType): EdmData {
  return DATA[t];
}

export const mrr = (t: EdmType) => get(t).mrr;
export const finish_ = (t: EdmType) => get(t).finish_;
export const accuracy = (t: EdmType) => get(t).accuracy;
export const complexity = (t: EdmType) => get(t).complexity;
export const edCost = (t: EdmType) => get(t).edCost;
export const submerged = (t: EdmType) => get(t).submerged;
export const forMold = (t: EdmType) => get(t).forMold;
export const electrode = (t: EdmType) => get(t).electrode;
export const bestUse = (t: EdmType) => get(t).bestUse;
export const edmTypes = (): EdmType[] =>
  Object.keys(DATA) as EdmType[];
