export type FootingTypeType =
  | "spread_isolated_pad"
  | "strip_continuous_wall"
  | "mat_raft_foundation"
  | "combined_multi_column"
  | "stepped_sloped_site";

interface FootingTypeData {
  bearing: number;
  settlement: number;
  excavation: number;
  reinforcement: number;
  ftCost: number;
  reinforced: boolean;
  forHeavy: boolean;
  shape: string;
  bestUse: string;
}

const DATA: Record<FootingTypeType, FootingTypeData> = {
  spread_isolated_pad: {
    bearing: 6, settlement: 7, excavation: 9, reinforcement: 5, ftCost: 3,
    reinforced: true, forHeavy: false,
    shape: "square_pad_single_column",
    bestUse: "single_column_light_structure",
  },
  strip_continuous_wall: {
    bearing: 7, settlement: 6, excavation: 7, reinforcement: 6, ftCost: 4,
    reinforced: true, forHeavy: false,
    shape: "continuous_strip_wall_line",
    bestUse: "load_bearing_wall_residential",
  },
  mat_raft_foundation: {
    bearing: 10, settlement: 10, excavation: 4, reinforcement: 9, ftCost: 8,
    reinforced: true, forHeavy: true,
    shape: "full_coverage_slab_mat",
    bestUse: "high_rise_weak_soil_uniform",
  },
  combined_multi_column: {
    bearing: 8, settlement: 8, excavation: 6, reinforcement: 7, ftCost: 6,
    reinforced: true, forHeavy: true,
    shape: "rectangular_multi_column_pad",
    bestUse: "adjacent_column_property_line",
  },
  stepped_sloped_site: {
    bearing: 5, settlement: 5, excavation: 5, reinforcement: 5, ftCost: 5,
    reinforced: false, forHeavy: false,
    shape: "stepped_increment_slope_follow",
    bestUse: "hillside_sloped_grade_change",
  },
};

function get(t: FootingTypeType): FootingTypeData {
  return DATA[t];
}

export const bearing = (t: FootingTypeType) => get(t).bearing;
export const settlement = (t: FootingTypeType) => get(t).settlement;
export const excavation = (t: FootingTypeType) => get(t).excavation;
export const reinforcement = (t: FootingTypeType) => get(t).reinforcement;
export const ftCost = (t: FootingTypeType) => get(t).ftCost;
export const reinforced = (t: FootingTypeType) => get(t).reinforced;
export const forHeavy = (t: FootingTypeType) => get(t).forHeavy;
export const shape = (t: FootingTypeType) => get(t).shape;
export const bestUse = (t: FootingTypeType) => get(t).bestUse;
export const footingTypeTypes = (): FootingTypeType[] =>
  Object.keys(DATA) as FootingTypeType[];
