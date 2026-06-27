export type ColumnTypeType =
  | "steel_wide_flange_h"
  | "reinforced_concrete_rect"
  | "composite_concrete_filled"
  | "timber_post_glulam"
  | "precast_concrete_round";

interface ColumnTypeData {
  axial: number;
  moment: number;
  slenderness: number;
  fireRating: number;
  clCost: number;
  fireProof: boolean;
  forHighRise: boolean;
  section: string;
  bestUse: string;
}

const DATA: Record<ColumnTypeType, ColumnTypeData> = {
  steel_wide_flange_h: {
    axial: 9, moment: 8, slenderness: 9, fireRating: 4, clCost: 7,
    fireProof: false, forHighRise: true,
    section: "h_shape_parallel_flange_column",
    bestUse: "high_rise_steel_moment_frame",
  },
  reinforced_concrete_rect: {
    axial: 8, moment: 7, slenderness: 5, fireRating: 9, clCost: 5,
    fireProof: true, forHighRise: true,
    section: "rectangular_tied_rebar_cage",
    bestUse: "mid_rise_concrete_shear_wall",
  },
  composite_concrete_filled: {
    axial: 10, moment: 9, slenderness: 8, fireRating: 8, clCost: 8,
    fireProof: true, forHighRise: true,
    section: "steel_tube_concrete_infill",
    bestUse: "high_rise_composite_dual_system",
  },
  timber_post_glulam: {
    axial: 5, moment: 4, slenderness: 4, fireRating: 6, clCost: 6,
    fireProof: false, forHighRise: false,
    section: "rectangular_glulam_laminated",
    bestUse: "mass_timber_exposed_structure",
  },
  precast_concrete_round: {
    axial: 7, moment: 6, slenderness: 6, fireRating: 9, clCost: 6,
    fireProof: true, forHighRise: false,
    section: "circular_spiral_reinforce",
    bestUse: "parking_structure_precast_frame",
  },
};

function get(t: ColumnTypeType): ColumnTypeData {
  return DATA[t];
}

export const axial = (t: ColumnTypeType) => get(t).axial;
export const moment = (t: ColumnTypeType) => get(t).moment;
export const slenderness = (t: ColumnTypeType) => get(t).slenderness;
export const fireRating = (t: ColumnTypeType) => get(t).fireRating;
export const clCost = (t: ColumnTypeType) => get(t).clCost;
export const fireProof = (t: ColumnTypeType) => get(t).fireProof;
export const forHighRise = (t: ColumnTypeType) => get(t).forHighRise;
export const section = (t: ColumnTypeType) => get(t).section;
export const bestUse = (t: ColumnTypeType) => get(t).bestUse;
export const columnTypeTypes = (): ColumnTypeType[] =>
  Object.keys(DATA) as ColumnTypeType[];
