export type GeotextileType =
  | "woven_slit_film"
  | "nonwoven_needlepunch"
  | "knitted_warp_stitch"
  | "composite_geocomposite"
  | "geogrid_biaxial_polymer";

const DATA: Record<GeotextileType, {
  tensile: number; filtration: number; drainage: number;
  durability: number; gtCost: number; permeable: boolean;
  forReinforcement: boolean; structure: string; bestUse: string;
}> = {
  woven_slit_film: {
    tensile: 9, filtration: 4, drainage: 3,
    durability: 8, gtCost: 2, permeable: false,
    forReinforcement: true, structure: "interlocked_flat_tape_weave",
    bestUse: "soil_reinforcement_retaining_wall",
  },
  nonwoven_needlepunch: {
    tensile: 5, filtration: 9, drainage: 8,
    durability: 7, gtCost: 1, permeable: true,
    forReinforcement: false, structure: "random_fiber_needle_bonded",
    bestUse: "separation_filtration_drainage",
  },
  knitted_warp_stitch: {
    tensile: 7, filtration: 6, drainage: 5,
    durability: 6, gtCost: 3, permeable: true,
    forReinforcement: false, structure: "loop_interlocking_yarn_stitch",
    bestUse: "erosion_control_slope_protection",
  },
  composite_geocomposite: {
    tensile: 8, filtration: 8, drainage: 9,
    durability: 8, gtCost: 4, permeable: true,
    forReinforcement: true, structure: "multi_layer_bonded_drain_core",
    bestUse: "combined_drain_filter_reinforce",
  },
  geogrid_biaxial_polymer: {
    tensile: 10, filtration: 2, drainage: 2,
    durability: 9, gtCost: 3, permeable: false,
    forReinforcement: true, structure: "extruded_punched_stretched_grid",
    bestUse: "base_reinforcement_road_pavement",
  },
};

const get = (t: GeotextileType) => DATA[t];

export const tensile = (t: GeotextileType) => get(t).tensile;
export const filtration = (t: GeotextileType) => get(t).filtration;
export const drainage = (t: GeotextileType) => get(t).drainage;
export const durability = (t: GeotextileType) => get(t).durability;
export const gtCost = (t: GeotextileType) => get(t).gtCost;
export const permeable = (t: GeotextileType) => get(t).permeable;
export const forReinforcement = (t: GeotextileType) => get(t).forReinforcement;
export const structure = (t: GeotextileType) => get(t).structure;
export const bestUse = (t: GeotextileType) => get(t).bestUse;
export const geotextileTypes = (): GeotextileType[] => Object.keys(DATA) as GeotextileType[];
