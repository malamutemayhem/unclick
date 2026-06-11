export type ThicknessPlanerType =
  | "single_side_benchtop"
  | "double_side_industrial"
  | "spiral_cutterhead"
  | "moulder_planer_combo"
  | "wide_drum_sander";

interface ThicknessPlanerData {
  surfaceFinish: number;
  feedSpeed: number;
  maxWidth: number;
  depthAccuracy: number;
  tpCost: number;
  doubleSided: boolean;
  forHardwood: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<ThicknessPlanerType, ThicknessPlanerData> = {
  single_side_benchtop: {
    surfaceFinish: 6, feedSpeed: 6, maxWidth: 5, depthAccuracy: 7, tpCost: 2,
    doubleSided: false, forHardwood: false,
    cutterConfig: "straight_knife_cutterhead_two_blade_benchtop_single_pass_top",
    bestUse: "small_workshop_hobby_dimensioning_softwood_pine_cedar_planing",
  },
  double_side_industrial: {
    surfaceFinish: 9, feedSpeed: 9, maxWidth: 9, depthAccuracy: 9, tpCost: 9,
    doubleSided: true, forHardwood: true,
    cutterConfig: "twin_cutterhead_top_bottom_simultaneous_plane_both_faces_pass",
    bestUse: "production_mill_hardwood_flooring_dimensional_lumber_two_side",
  },
  spiral_cutterhead: {
    surfaceFinish: 10, feedSpeed: 7, maxWidth: 7, depthAccuracy: 9, tpCost: 7,
    doubleSided: false, forHardwood: true,
    cutterConfig: "helical_carbide_insert_spiral_cutterhead_shear_cut_low_noise",
    bestUse: "fine_woodworking_figured_hardwood_tear_out_free_smooth_surface",
  },
  moulder_planer_combo: {
    surfaceFinish: 8, feedSpeed: 10, maxWidth: 8, depthAccuracy: 8, tpCost: 10,
    doubleSided: true, forHardwood: true,
    cutterConfig: "four_head_moulder_plane_profile_all_four_sides_single_pass",
    bestUse: "moulding_trim_production_profile_and_dimension_four_side_pass",
  },
  wide_drum_sander: {
    surfaceFinish: 8, feedSpeed: 5, maxWidth: 10, depthAccuracy: 6, tpCost: 6,
    doubleSided: false, forHardwood: false,
    cutterConfig: "abrasive_drum_conveyor_feed_sand_wide_panel_glue_up_flatten",
    bestUse: "wide_panel_glue_up_cutting_board_table_top_sanding_thickness",
  },
};

function get(t: ThicknessPlanerType): ThicknessPlanerData {
  return DATA[t];
}

export const surfaceFinish = (t: ThicknessPlanerType) => get(t).surfaceFinish;
export const feedSpeed = (t: ThicknessPlanerType) => get(t).feedSpeed;
export const maxWidth = (t: ThicknessPlanerType) => get(t).maxWidth;
export const depthAccuracy = (t: ThicknessPlanerType) => get(t).depthAccuracy;
export const tpCost = (t: ThicknessPlanerType) => get(t).tpCost;
export const doubleSided = (t: ThicknessPlanerType) => get(t).doubleSided;
export const forHardwood = (t: ThicknessPlanerType) => get(t).forHardwood;
export const cutterConfig = (t: ThicknessPlanerType) => get(t).cutterConfig;
export const bestUse = (t: ThicknessPlanerType) => get(t).bestUse;
export const thicknessPlanerTypes = (): ThicknessPlanerType[] =>
  Object.keys(DATA) as ThicknessPlanerType[];
