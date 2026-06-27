export type FeedPelletizerType =
  | "flat_die"
  | "ring_die"
  | "screw_extruder"
  | "twin_screw"
  | "cold_pellet";

interface FeedPelletizerData {
  pelletDensity: number;
  throughput: number;
  nutrientRetention: number;
  sizeConsistency: number;
  fpCost: number;
  heated: boolean;
  forAqua: boolean;
  pelletizerConfig: string;
  bestUse: string;
}

const DATA: Record<FeedPelletizerType, FeedPelletizerData> = {
  flat_die: {
    pelletDensity: 7, throughput: 5, nutrientRetention: 8, sizeConsistency: 7, fpCost: 4,
    heated: false, forAqua: false,
    pelletizerConfig: "flat_die_feed_pelletizer_gravity_compress_roller_die_simple",
    bestUse: "small_farm_flat_die_pelletizer_poultry_livestock_feed_simple",
  },
  ring_die: {
    pelletDensity: 9, throughput: 10, nutrientRetention: 7, sizeConsistency: 9, fpCost: 8,
    heated: true, forAqua: false,
    pelletizerConfig: "ring_die_feed_pelletizer_rotating_die_roller_compress_steam",
    bestUse: "commercial_feed_mill_ring_die_pelletizer_high_volume_livestock",
  },
  screw_extruder: {
    pelletDensity: 10, throughput: 8, nutrientRetention: 6, sizeConsistency: 8, fpCost: 9,
    heated: true, forAqua: true,
    pelletizerConfig: "screw_extruder_feed_pelletizer_barrel_heat_pressure_expand_float",
    bestUse: "aquaculture_feed_screw_extruder_floating_sinking_pellet_fish",
  },
  twin_screw: {
    pelletDensity: 10, throughput: 9, nutrientRetention: 7, sizeConsistency: 10, fpCost: 10,
    heated: true, forAqua: true,
    pelletizerConfig: "twin_screw_feed_pelletizer_co_rotating_barrel_precise_cook_shape",
    bestUse: "premium_aquafeed_twin_screw_extruder_precise_cook_shape_nutrient",
  },
  cold_pellet: {
    pelletDensity: 6, throughput: 6, nutrientRetention: 10, sizeConsistency: 6, fpCost: 3,
    heated: false, forAqua: false,
    pelletizerConfig: "cold_pellet_feed_pelletizer_hydraulic_press_no_heat_raw_bind",
    bestUse: "organic_farm_cold_pelletizer_no_heat_preserve_vitamin_enzyme",
  },
};

function get(t: FeedPelletizerType): FeedPelletizerData {
  return DATA[t];
}

export const pelletDensity = (t: FeedPelletizerType) => get(t).pelletDensity;
export const throughput = (t: FeedPelletizerType) => get(t).throughput;
export const nutrientRetention = (t: FeedPelletizerType) => get(t).nutrientRetention;
export const sizeConsistency = (t: FeedPelletizerType) => get(t).sizeConsistency;
export const fpCost = (t: FeedPelletizerType) => get(t).fpCost;
export const heated = (t: FeedPelletizerType) => get(t).heated;
export const forAqua = (t: FeedPelletizerType) => get(t).forAqua;
export const pelletizerConfig = (t: FeedPelletizerType) => get(t).pelletizerConfig;
export const bestUse = (t: FeedPelletizerType) => get(t).bestUse;
export const feedPelletizerTypes = (): FeedPelletizerType[] =>
  Object.keys(DATA) as FeedPelletizerType[];
