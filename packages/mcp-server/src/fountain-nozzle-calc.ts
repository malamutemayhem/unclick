export type FountainNozzleType =
  | "single_jet_vertical"
  | "cascade_tier_waterfall"
  | "foam_aerating_frothy"
  | "fan_spread_flat"
  | "laminar_crystal_clear";

interface FountainNozzleData {
  height: number;
  visual: number;
  sound: number;
  windResist: number;
  fnCost: number;
  adjustable: boolean;
  forIndoor: boolean;
  pattern: string;
  bestUse: string;
}

const DATA: Record<FountainNozzleType, FountainNozzleData> = {
  single_jet_vertical: {
    height: 10, visual: 6, sound: 5, windResist: 3, fnCost: 3,
    adjustable: true, forIndoor: false,
    pattern: "single_smooth_bore_vertical",
    bestUse: "plaza_reflecting_pool_center",
  },
  cascade_tier_waterfall: {
    height: 4, visual: 9, sound: 8, windResist: 8, fnCost: 6,
    adjustable: false, forIndoor: true,
    pattern: "multi_tier_overflow_cascade",
    bestUse: "hotel_lobby_garden_waterfall",
  },
  foam_aerating_frothy: {
    height: 5, visual: 7, sound: 7, windResist: 7, fnCost: 4,
    adjustable: true, forIndoor: false,
    pattern: "aerating_foamy_white_water",
    bestUse: "park_pond_aeration_display",
  },
  fan_spread_flat: {
    height: 6, visual: 8, sound: 6, windResist: 5, fnCost: 5,
    adjustable: true, forIndoor: false,
    pattern: "flat_fan_spread_peacock_tail",
    bestUse: "commercial_entry_feature_wall",
  },
  laminar_crystal_clear: {
    height: 7, visual: 10, sound: 3, windResist: 6, fnCost: 9,
    adjustable: false, forIndoor: true,
    pattern: "laminar_flow_crystal_arc_led",
    bestUse: "luxury_resort_interactive_led",
  },
};

function get(t: FountainNozzleType): FountainNozzleData {
  return DATA[t];
}

export const height = (t: FountainNozzleType) => get(t).height;
export const visual = (t: FountainNozzleType) => get(t).visual;
export const sound = (t: FountainNozzleType) => get(t).sound;
export const windResist = (t: FountainNozzleType) => get(t).windResist;
export const fnCost = (t: FountainNozzleType) => get(t).fnCost;
export const adjustable = (t: FountainNozzleType) => get(t).adjustable;
export const forIndoor = (t: FountainNozzleType) => get(t).forIndoor;
export const pattern = (t: FountainNozzleType) => get(t).pattern;
export const bestUse = (t: FountainNozzleType) => get(t).bestUse;
export const fountainNozzleTypes = (): FountainNozzleType[] =>
  Object.keys(DATA) as FountainNozzleType[];
