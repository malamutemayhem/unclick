export type SlipformPaverType =
  | "two_track"
  | "four_track"
  | "offset_barrier"
  | "canal_lining"
  | "curb_gutter";

interface SlipformPaverData {
  pavingSpeed: number;
  slabWidth: number;
  surfaceSmoothness: number;
  gradeControl: number;
  sfCost: number;
  stringline: boolean;
  forHighway: boolean;
  paverConfig: string;
  bestUse: string;
}

const DATA: Record<SlipformPaverType, SlipformPaverData> = {
  two_track: {
    pavingSpeed: 8, slabWidth: 8, surfaceSmoothness: 8, gradeControl: 8, sfCost: 7,
    stringline: true, forHighway: true,
    paverConfig: "two_track_slipform_paver_stringline_dowel_bar_inserter_highway",
    bestUse: "highway_runway_slab_two_track_slipform_paver_dowel_bar_insert",
  },
  four_track: {
    pavingSpeed: 9, slabWidth: 10, surfaceSmoothness: 9, gradeControl: 10, sfCost: 10,
    stringline: true, forHighway: true,
    paverConfig: "four_track_wide_slipform_gps_grade_control_multi_lane_highway",
    bestUse: "wide_multi_lane_highway_four_track_slipform_gps_grade_control",
  },
  offset_barrier: {
    pavingSpeed: 7, slabWidth: 4, surfaceSmoothness: 7, gradeControl: 8, sfCost: 6,
    stringline: true, forHighway: true,
    paverConfig: "offset_barrier_slipform_median_jersey_wall_parapet_continuous",
    bestUse: "median_barrier_jersey_wall_parapet_offset_slipform_continuous",
  },
  canal_lining: {
    pavingSpeed: 6, slabWidth: 7, surfaceSmoothness: 7, gradeControl: 9, sfCost: 8,
    stringline: true, forHighway: false,
    paverConfig: "canal_lining_slipform_v_shape_u_shape_trapezoidal_channel_pave",
    bestUse: "irrigation_canal_drainage_channel_slipform_lining_v_u_shape",
  },
  curb_gutter: {
    pavingSpeed: 8, slabWidth: 3, surfaceSmoothness: 8, gradeControl: 7, sfCost: 5,
    stringline: true, forHighway: false,
    paverConfig: "curb_gutter_slipform_extruder_continuous_profile_street_edge",
    bestUse: "street_curb_gutter_sidewalk_slipform_extruder_continuous_edge",
  },
};

function get(t: SlipformPaverType): SlipformPaverData {
  return DATA[t];
}

export const pavingSpeed = (t: SlipformPaverType) => get(t).pavingSpeed;
export const slabWidth = (t: SlipformPaverType) => get(t).slabWidth;
export const surfaceSmoothness = (t: SlipformPaverType) => get(t).surfaceSmoothness;
export const gradeControl = (t: SlipformPaverType) => get(t).gradeControl;
export const sfCost = (t: SlipformPaverType) => get(t).sfCost;
export const stringline = (t: SlipformPaverType) => get(t).stringline;
export const forHighway = (t: SlipformPaverType) => get(t).forHighway;
export const paverConfig = (t: SlipformPaverType) => get(t).paverConfig;
export const bestUse = (t: SlipformPaverType) => get(t).bestUse;
export const slipformPaverTypes = (): SlipformPaverType[] =>
  Object.keys(DATA) as SlipformPaverType[];
