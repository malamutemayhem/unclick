export type LaserLevelType =
  | "rotary_red_self_level"
  | "rotary_green_high_vis"
  | "cross_line_interior"
  | "dot_plumb_point"
  | "pipe_laser_grade_align";

interface LaserLevelData {
  accuracy: number;
  range: number;
  visibility: number;
  versatility: number;
  llCost: number;
  selfLeveling: boolean;
  forExterior: boolean;
  beam: string;
  bestUse: string;
}

const DATA: Record<LaserLevelType, LaserLevelData> = {
  rotary_red_self_level: {
    accuracy: 8, range: 9, visibility: 5, versatility: 8, llCost: 7,
    selfLeveling: true, forExterior: true,
    beam: "rotating_red_650nm_360_plane",
    bestUse: "site_grade_foundation_excavation",
  },
  rotary_green_high_vis: {
    accuracy: 8, range: 8, visibility: 9, versatility: 8, llCost: 9,
    selfLeveling: true, forExterior: true,
    beam: "rotating_green_532nm_360_plane",
    bestUse: "bright_site_daylight_visible_level",
  },
  cross_line_interior: {
    accuracy: 6, range: 4, visibility: 7, versatility: 7, llCost: 3,
    selfLeveling: true, forExterior: false,
    beam: "fan_line_horizontal_vertical_cross",
    bestUse: "tile_layout_cabinet_picture_hang",
  },
  dot_plumb_point: {
    accuracy: 7, range: 5, visibility: 6, versatility: 4, llCost: 2,
    selfLeveling: true, forExterior: false,
    beam: "single_dot_plumb_up_down_forward",
    bestUse: "plumb_transfer_ceiling_point_align",
  },
  pipe_laser_grade_align: {
    accuracy: 9, range: 6, visibility: 4, versatility: 3, llCost: 8,
    selfLeveling: false, forExterior: false,
    beam: "visible_target_dot_grade_percent",
    bestUse: "sewer_pipe_manhole_invert_grade",
  },
};

function get(t: LaserLevelType): LaserLevelData {
  return DATA[t];
}

export const accuracy = (t: LaserLevelType) => get(t).accuracy;
export const range = (t: LaserLevelType) => get(t).range;
export const visibility = (t: LaserLevelType) => get(t).visibility;
export const versatility = (t: LaserLevelType) => get(t).versatility;
export const llCost = (t: LaserLevelType) => get(t).llCost;
export const selfLeveling = (t: LaserLevelType) => get(t).selfLeveling;
export const forExterior = (t: LaserLevelType) => get(t).forExterior;
export const beam = (t: LaserLevelType) => get(t).beam;
export const bestUse = (t: LaserLevelType) => get(t).bestUse;
export const laserLevelTypes = (): LaserLevelType[] =>
  Object.keys(DATA) as LaserLevelType[];
