export type LandscapeLightType =
  | "path_bollard_led"
  | "spot_accent_uplighter"
  | "well_ingrade_flush"
  | "flood_tree_wash"
  | "step_riser_recessed";

interface LandscapeLightData {
  brightness: number;
  efficiency: number;
  durability: number;
  aesthetic: number;
  llCost: number;
  waterproof: boolean;
  forArchitectural: boolean;
  beam: string;
  bestUse: string;
}

const DATA: Record<LandscapeLightType, LandscapeLightData> = {
  path_bollard_led: {
    brightness: 5, efficiency: 8, durability: 8, aesthetic: 7, llCost: 4,
    waterproof: true, forArchitectural: false,
    beam: "360_degree_low_glare_path",
    bestUse: "garden_path_walkway_edge",
  },
  spot_accent_uplighter: {
    brightness: 7, efficiency: 7, durability: 7, aesthetic: 9, llCost: 5,
    waterproof: true, forArchitectural: true,
    beam: "narrow_spot_15_degree_aim",
    bestUse: "tree_sculpture_facade_accent",
  },
  well_ingrade_flush: {
    brightness: 6, efficiency: 7, durability: 9, aesthetic: 10, llCost: 7,
    waterproof: true, forArchitectural: true,
    beam: "medium_flood_uplight_flush",
    bestUse: "column_wall_graze_uplighting",
  },
  flood_tree_wash: {
    brightness: 9, efficiency: 6, durability: 7, aesthetic: 6, llCost: 5,
    waterproof: true, forArchitectural: false,
    beam: "wide_flood_60_degree_canopy",
    bestUse: "large_tree_canopy_area_wash",
  },
  step_riser_recessed: {
    brightness: 3, efficiency: 9, durability: 8, aesthetic: 8, llCost: 6,
    waterproof: false, forArchitectural: true,
    beam: "louver_shielded_downcast_step",
    bestUse: "stair_riser_deck_handrail",
  },
};

function get(t: LandscapeLightType): LandscapeLightData {
  return DATA[t];
}

export const brightness = (t: LandscapeLightType) => get(t).brightness;
export const efficiency = (t: LandscapeLightType) => get(t).efficiency;
export const durability = (t: LandscapeLightType) => get(t).durability;
export const aesthetic = (t: LandscapeLightType) => get(t).aesthetic;
export const llCost = (t: LandscapeLightType) => get(t).llCost;
export const waterproof = (t: LandscapeLightType) => get(t).waterproof;
export const forArchitectural = (t: LandscapeLightType) => get(t).forArchitectural;
export const beam = (t: LandscapeLightType) => get(t).beam;
export const bestUse = (t: LandscapeLightType) => get(t).bestUse;
export const landscapeLightTypes = (): LandscapeLightType[] =>
  Object.keys(DATA) as LandscapeLightType[];
