export type GraderType =
  | "motor_grader_tandem_axle"
  | "compact_grader_mini"
  | "laser_grader_gps_guided"
  | "grader_attachment_skid_steer"
  | "towed_grader_pull_behind";

interface GraderData {
  precision: number;
  speed: number;
  bladeWidth: number;
  gradeControl: number;
  grCost: number;
  selfPropelled: boolean;
  forRoad: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<GraderType, GraderData> = {
  motor_grader_tandem_axle: {
    precision: 8, speed: 8, bladeWidth: 9, gradeControl: 8, grCost: 8,
    selfPropelled: true, forRoad: true,
    blade: "moldboard_hydraulic_articulate",
    bestUse: "road_grading_ditch_cut_shoulder",
  },
  compact_grader_mini: {
    precision: 6, speed: 6, bladeWidth: 5, gradeControl: 6, grCost: 4,
    selfPropelled: true, forRoad: false,
    blade: "fixed_moldboard_compact_frame",
    bestUse: "small_site_parking_lot_path",
  },
  laser_grader_gps_guided: {
    precision: 10, speed: 7, bladeWidth: 8, gradeControl: 10, grCost: 10,
    selfPropelled: true, forRoad: true,
    blade: "moldboard_auto_gps_laser_control",
    bestUse: "precision_subgrade_airport_runway",
  },
  grader_attachment_skid_steer: {
    precision: 5, speed: 5, bladeWidth: 4, gradeControl: 5, grCost: 2,
    selfPropelled: false, forRoad: false,
    blade: "attachment_blade_quick_coupler",
    bestUse: "light_grading_driveway_paddock",
  },
  towed_grader_pull_behind: {
    precision: 4, speed: 7, bladeWidth: 7, gradeControl: 4, grCost: 3,
    selfPropelled: false, forRoad: false,
    blade: "towed_frame_adjustable_angle",
    bestUse: "farm_road_maintenance_gravel",
  },
};

function get(t: GraderType): GraderData {
  return DATA[t];
}

export const precision = (t: GraderType) => get(t).precision;
export const speed = (t: GraderType) => get(t).speed;
export const bladeWidth = (t: GraderType) => get(t).bladeWidth;
export const gradeControl = (t: GraderType) => get(t).gradeControl;
export const grCost = (t: GraderType) => get(t).grCost;
export const selfPropelled = (t: GraderType) => get(t).selfPropelled;
export const forRoad = (t: GraderType) => get(t).forRoad;
export const blade = (t: GraderType) => get(t).blade;
export const bestUse = (t: GraderType) => get(t).bestUse;
export const graderTypes = (): GraderType[] =>
  Object.keys(DATA) as GraderType[];
