export type SurveyRodType =
  | "leveling_rod_fiberglass"
  | "prism_pole_carbon_fiber"
  | "gps_pole_two_meter"
  | "stadia_rod_graduated"
  | "range_pole_red_white";

interface SurveyRodData {
  accuracy: number;
  weight: number;
  durability: number;
  height: number;
  srCost: number;
  telescopic: boolean;
  forLevel: boolean;
  graduation: string;
  bestUse: string;
}

const DATA: Record<SurveyRodType, SurveyRodData> = {
  leveling_rod_fiberglass: {
    accuracy: 8, weight: 5, durability: 8, height: 8, srCost: 4,
    telescopic: true, forLevel: true,
    graduation: "metric_e_pattern_5mm_division",
    bestUse: "differential_leveling_benchmark_run",
  },
  prism_pole_carbon_fiber: {
    accuracy: 7, weight: 9, durability: 7, height: 7, srCost: 7,
    telescopic: true, forLevel: false,
    graduation: "metric_height_scale_bubble_vial",
    bestUse: "total_station_prism_target_pole",
  },
  gps_pole_two_meter: {
    accuracy: 6, weight: 8, durability: 7, height: 5, srCost: 5,
    telescopic: false, forLevel: false,
    graduation: "fixed_height_bipod_mount_gnss",
    bestUse: "gnss_rover_fixed_height_antenna",
  },
  stadia_rod_graduated: {
    accuracy: 5, weight: 5, durability: 8, height: 7, srCost: 3,
    telescopic: false, forLevel: true,
    graduation: "stadia_interval_bold_alternate_color",
    bestUse: "optical_level_distance_tacheometry",
  },
  range_pole_red_white: {
    accuracy: 2, weight: 7, durability: 9, height: 6, srCost: 1,
    telescopic: false, forLevel: false,
    graduation: "red_white_alternating_foot_band",
    bestUse: "line_of_sight_alignment_marking_vis",
  },
};

function get(t: SurveyRodType): SurveyRodData {
  return DATA[t];
}

export const accuracy = (t: SurveyRodType) => get(t).accuracy;
export const weight = (t: SurveyRodType) => get(t).weight;
export const durability = (t: SurveyRodType) => get(t).durability;
export const height = (t: SurveyRodType) => get(t).height;
export const srCost = (t: SurveyRodType) => get(t).srCost;
export const telescopic = (t: SurveyRodType) => get(t).telescopic;
export const forLevel = (t: SurveyRodType) => get(t).forLevel;
export const graduation = (t: SurveyRodType) => get(t).graduation;
export const bestUse = (t: SurveyRodType) => get(t).bestUse;
export const surveyRodTypes = (): SurveyRodType[] =>
  Object.keys(DATA) as SurveyRodType[];
