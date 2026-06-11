export type BreakwaterType =
  | "rubble_mound_armor_stone"
  | "caisson_vertical_wall"
  | "floating_pontoon_moored"
  | "composite_caisson_mound"
  | "submerged_reef_low_crest";

interface BreakwaterData {
  waveAttenuation: number;
  durability: number;
  depth: number;
  environmental: number;
  bwCost: number;
  permeable: boolean;
  forHarbor: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<BreakwaterType, BreakwaterData> = {
  rubble_mound_armor_stone: {
    waveAttenuation: 9, durability: 9, depth: 7, environmental: 6, bwCost: 7,
    permeable: true, forHarbor: true,
    structure: "layered_rock_core_armor_cap",
    bestUse: "harbor_protection_open_coast",
  },
  caisson_vertical_wall: {
    waveAttenuation: 10, durability: 8, depth: 9, environmental: 4, bwCost: 9,
    permeable: false, forHarbor: true,
    structure: "concrete_box_filled_sand_ballast",
    bestUse: "deep_water_port_limited_space",
  },
  floating_pontoon_moored: {
    waveAttenuation: 5, durability: 5, depth: 10, environmental: 8, bwCost: 6,
    permeable: true, forHarbor: false,
    structure: "floating_hull_mooring_chain",
    bestUse: "marina_calm_water_temporary",
  },
  composite_caisson_mound: {
    waveAttenuation: 9, durability: 9, depth: 8, environmental: 5, bwCost: 8,
    permeable: false, forHarbor: true,
    structure: "rubble_base_caisson_top",
    bestUse: "intermediate_depth_exposed_coast",
  },
  submerged_reef_low_crest: {
    waveAttenuation: 6, durability: 7, depth: 6, environmental: 10, bwCost: 5,
    permeable: true, forHarbor: false,
    structure: "low_profile_rock_reef_below_mwl",
    bestUse: "beach_protection_eco_sensitive",
  },
};

function get(t: BreakwaterType): BreakwaterData {
  return DATA[t];
}

export const waveAttenuation = (t: BreakwaterType) => get(t).waveAttenuation;
export const durability = (t: BreakwaterType) => get(t).durability;
export const depth = (t: BreakwaterType) => get(t).depth;
export const environmental = (t: BreakwaterType) => get(t).environmental;
export const bwCost = (t: BreakwaterType) => get(t).bwCost;
export const permeable = (t: BreakwaterType) => get(t).permeable;
export const forHarbor = (t: BreakwaterType) => get(t).forHarbor;
export const structure = (t: BreakwaterType) => get(t).structure;
export const bestUse = (t: BreakwaterType) => get(t).bestUse;
export const breakwaterTypes = (): BreakwaterType[] =>
  Object.keys(DATA) as BreakwaterType[];
