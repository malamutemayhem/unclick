export type ExcavatorType =
  | "crawler_hydraulic_standard"
  | "wheeled_mobile_highway"
  | "mini_compact_zero_tail"
  | "long_reach_demolition"
  | "dragline_walking_cable";

interface ExcavatorData {
  digging: number;
  reach: number;
  mobility: number;
  stability: number;
  exCost: number;
  tracked: boolean;
  forTrench: boolean;
  undercarriage: string;
  bestUse: string;
}

const DATA: Record<ExcavatorType, ExcavatorData> = {
  crawler_hydraulic_standard: {
    digging: 9, reach: 7, mobility: 5, stability: 9, exCost: 7,
    tracked: true, forTrench: true,
    undercarriage: "steel_track_chain_roller",
    bestUse: "general_excavation_trench_load",
  },
  wheeled_mobile_highway: {
    digging: 7, reach: 7, mobility: 10, stability: 6, exCost: 6,
    tracked: false, forTrench: false,
    undercarriage: "rubber_tire_axle_outrigger",
    bestUse: "road_utility_multi_site_travel",
  },
  mini_compact_zero_tail: {
    digging: 4, reach: 4, mobility: 8, stability: 5, exCost: 3,
    tracked: true, forTrench: true,
    undercarriage: "rubber_track_retractable",
    bestUse: "confined_space_landscaping_indoor",
  },
  long_reach_demolition: {
    digging: 6, reach: 10, mobility: 4, stability: 7, exCost: 9,
    tracked: true, forTrench: false,
    undercarriage: "heavy_track_wide_pad_counter",
    bestUse: "deep_dredge_high_demolition_reach",
  },
  dragline_walking_cable: {
    digging: 10, reach: 10, mobility: 2, stability: 10, exCost: 10,
    tracked: false, forTrench: false,
    undercarriage: "walking_shoe_pad_dragging",
    bestUse: "surface_mine_overburden_strip",
  },
};

function get(t: ExcavatorType): ExcavatorData {
  return DATA[t];
}

export const digging = (t: ExcavatorType) => get(t).digging;
export const reach = (t: ExcavatorType) => get(t).reach;
export const mobility = (t: ExcavatorType) => get(t).mobility;
export const stability = (t: ExcavatorType) => get(t).stability;
export const exCost = (t: ExcavatorType) => get(t).exCost;
export const tracked = (t: ExcavatorType) => get(t).tracked;
export const forTrench = (t: ExcavatorType) => get(t).forTrench;
export const undercarriage = (t: ExcavatorType) => get(t).undercarriage;
export const bestUse = (t: ExcavatorType) => get(t).bestUse;
export const excavatorTypes = (): ExcavatorType[] =>
  Object.keys(DATA) as ExcavatorType[];
