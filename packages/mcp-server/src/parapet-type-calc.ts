export type ParapetTypeType =
  | "masonry_brick_cmu"
  | "metal_panel_coped"
  | "concrete_cast_precast"
  | "eifs_stucco_finish"
  | "glass_frameless_guard";

interface ParapetTypeData {
  durability: number;
  waterproof: number;
  aesthetic: number;
  weight: number;
  ppCost: number;
  combustible: boolean;
  forFlat: boolean;
  coping: string;
  bestUse: string;
}

const DATA: Record<ParapetTypeType, ParapetTypeData> = {
  masonry_brick_cmu: {
    durability: 9, waterproof: 6, aesthetic: 7, weight: 3, ppCost: 6,
    combustible: false, forFlat: true,
    coping: "cast_stone_precast_cap",
    bestUse: "traditional_commercial_building",
  },
  metal_panel_coped: {
    durability: 8, waterproof: 9, aesthetic: 7, weight: 8, ppCost: 7,
    combustible: false, forFlat: true,
    coping: "metal_coping_snap_on_cleat",
    bestUse: "modern_commercial_metal_roof",
  },
  concrete_cast_precast: {
    durability: 10, waterproof: 7, aesthetic: 6, weight: 2, ppCost: 7,
    combustible: false, forFlat: true,
    coping: "integral_drip_edge_formed",
    bestUse: "high_rise_concrete_structure",
  },
  eifs_stucco_finish: {
    durability: 5, waterproof: 5, aesthetic: 8, weight: 9, ppCost: 4,
    combustible: true, forFlat: true,
    coping: "metal_drip_edge_stucco_wrap",
    bestUse: "residential_low_rise_facade",
  },
  glass_frameless_guard: {
    durability: 6, waterproof: 8, aesthetic: 10, weight: 7, ppCost: 9,
    combustible: false, forFlat: true,
    coping: "stainless_channel_glass_clamp",
    bestUse: "rooftop_terrace_view_guard",
  },
};

function get(t: ParapetTypeType): ParapetTypeData {
  return DATA[t];
}

export const durability = (t: ParapetTypeType) => get(t).durability;
export const waterproof = (t: ParapetTypeType) => get(t).waterproof;
export const aesthetic = (t: ParapetTypeType) => get(t).aesthetic;
export const weight = (t: ParapetTypeType) => get(t).weight;
export const ppCost = (t: ParapetTypeType) => get(t).ppCost;
export const combustible = (t: ParapetTypeType) => get(t).combustible;
export const forFlat = (t: ParapetTypeType) => get(t).forFlat;
export const coping = (t: ParapetTypeType) => get(t).coping;
export const bestUse = (t: ParapetTypeType) => get(t).bestUse;
export const parapetTypeTypes = (): ParapetTypeType[] =>
  Object.keys(DATA) as ParapetTypeType[];
