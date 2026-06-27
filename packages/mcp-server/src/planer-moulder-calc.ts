export type PlanerMoulderType =
  | "single_side"
  | "double_side"
  | "four_side"
  | "moulder_profiler"
  | "spiral_head";

interface PlanerMoulderData {
  surfaceFinish: number;
  throughput: number;
  profileRange: number;
  thicknessAccuracy: number;
  pmCost: number;
  multiSide: boolean;
  forMoulding: boolean;
  planerConfig: string;
  bestUse: string;
}

const DATA: Record<PlanerMoulderType, PlanerMoulderData> = {
  single_side: {
    surfaceFinish: 7, throughput: 7, profileRange: 3, thicknessAccuracy: 8, pmCost: 4,
    multiSide: false, forMoulding: false,
    planerConfig: "single_side_planer_top_head_cutterhead_thickness_surface_smooth",
    bestUse: "small_shop_single_side_planer_thickness_board_smooth_surface",
  },
  double_side: {
    surfaceFinish: 8, throughput: 8, profileRange: 4, thicknessAccuracy: 9, pmCost: 6,
    multiSide: true, forMoulding: false,
    planerConfig: "double_side_planer_top_bottom_head_simultaneous_plane_parallel",
    bestUse: "lumber_mill_double_side_planer_parallel_faces_dimension_lumber",
  },
  four_side: {
    surfaceFinish: 9, throughput: 9, profileRange: 8, thicknessAccuracy: 9, pmCost: 9,
    multiSide: true, forMoulding: true,
    planerConfig: "four_side_planer_moulder_top_bottom_left_right_head_one_pass",
    bestUse: "millwork_four_side_planer_moulder_finished_profile_one_pass",
  },
  moulder_profiler: {
    surfaceFinish: 9, throughput: 8, profileRange: 10, thicknessAccuracy: 8, pmCost: 8,
    multiSide: true, forMoulding: true,
    planerConfig: "moulder_profiler_custom_knife_profile_shape_trim_baseboard",
    bestUse: "custom_millwork_moulder_profiler_crown_baseboard_casing_trim",
  },
  spiral_head: {
    surfaceFinish: 10, throughput: 7, profileRange: 3, thicknessAccuracy: 9, pmCost: 7,
    multiSide: false, forMoulding: false,
    planerConfig: "spiral_head_planer_helical_insert_cutter_smooth_tearout_free",
    bestUse: "fine_woodwork_spiral_head_planer_tearout_free_figured_wood",
  },
};

function get(t: PlanerMoulderType): PlanerMoulderData {
  return DATA[t];
}

export const surfaceFinish = (t: PlanerMoulderType) => get(t).surfaceFinish;
export const throughput = (t: PlanerMoulderType) => get(t).throughput;
export const profileRange = (t: PlanerMoulderType) => get(t).profileRange;
export const thicknessAccuracy = (t: PlanerMoulderType) => get(t).thicknessAccuracy;
export const pmCost = (t: PlanerMoulderType) => get(t).pmCost;
export const multiSide = (t: PlanerMoulderType) => get(t).multiSide;
export const forMoulding = (t: PlanerMoulderType) => get(t).forMoulding;
export const planerConfig = (t: PlanerMoulderType) => get(t).planerConfig;
export const bestUse = (t: PlanerMoulderType) => get(t).bestUse;
export const planerMoulderTypes = (): PlanerMoulderType[] =>
  Object.keys(DATA) as PlanerMoulderType[];
