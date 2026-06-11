export type HydroFormType =
  | "tube_hydro_axial"
  | "sheet_hydro_punch"
  | "tube_hydro_end_feed"
  | "active_hydro_die"
  | "warm_hydro_alloy";

interface HydroFormData {
  formability: number;
  precision: number;
  strength: number;
  complexity: number;
  hfCost: number;
  tubular: boolean;
  forAuto: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<HydroFormType, HydroFormData> = {
  tube_hydro_axial: {
    formability: 9, precision: 8, strength: 9, complexity: 8, hfCost: 7,
    tubular: true, forAuto: true,
    medium: "water_glycol_internal_pressure_seal",
    bestUse: "exhaust_manifold_frame_rail_tube",
  },
  sheet_hydro_punch: {
    formability: 8, precision: 9, strength: 8, complexity: 7, hfCost: 6,
    tubular: false, forAuto: true,
    medium: "fluid_cell_rubber_pad_punch",
    bestUse: "aerospace_panel_auto_body_complex",
  },
  tube_hydro_end_feed: {
    formability: 10, precision: 8, strength: 10, complexity: 9, hfCost: 8,
    tubular: true, forAuto: true,
    medium: "water_axial_feed_material_push",
    bestUse: "tee_joint_cross_fitting_branch",
  },
  active_hydro_die: {
    formability: 9, precision: 10, strength: 8, complexity: 10, hfCost: 9,
    tubular: false, forAuto: false,
    medium: "counter_pressure_die_fluid_both",
    bestUse: "deep_recess_sharp_corner_complex",
  },
  warm_hydro_alloy: {
    formability: 10, precision: 7, strength: 9, complexity: 7, hfCost: 10,
    tubular: true, forAuto: false,
    medium: "heated_fluid_elevated_temp_form",
    bestUse: "aluminum_magnesium_lightweight_part",
  },
};

function get(t: HydroFormType): HydroFormData {
  return DATA[t];
}

export const formability = (t: HydroFormType) => get(t).formability;
export const precision = (t: HydroFormType) => get(t).precision;
export const strength = (t: HydroFormType) => get(t).strength;
export const complexity = (t: HydroFormType) => get(t).complexity;
export const hfCost = (t: HydroFormType) => get(t).hfCost;
export const tubular = (t: HydroFormType) => get(t).tubular;
export const forAuto = (t: HydroFormType) => get(t).forAuto;
export const medium = (t: HydroFormType) => get(t).medium;
export const bestUse = (t: HydroFormType) => get(t).bestUse;
export const hydroFormTypes = (): HydroFormType[] =>
  Object.keys(DATA) as HydroFormType[];
