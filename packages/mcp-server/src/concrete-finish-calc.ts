export type ConcreteFinishType =
  | "broom_finish_standard"
  | "exposed_aggregate_wash"
  | "stamped_pattern_color"
  | "polished_grind_seal"
  | "trowel_smooth_hard";

interface ConcreteFinishData {
  traction: number;
  aesthetic: number;
  durability: number;
  maintenance: number;
  cfCost: number;
  decorative: boolean;
  forExterior: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<ConcreteFinishType, ConcreteFinishData> = {
  broom_finish_standard: {
    traction: 9, aesthetic: 4, durability: 8, maintenance: 9, cfCost: 2,
    decorative: false, forExterior: true,
    process: "broom_drag_wet_surface",
    bestUse: "sidewalk_driveway_basic_exterior",
  },
  exposed_aggregate_wash: {
    traction: 8, aesthetic: 8, durability: 9, maintenance: 8, cfCost: 5,
    decorative: true, forExterior: true,
    process: "surface_retarder_pressure_wash",
    bestUse: "patio_pool_deck_decorative",
  },
  stamped_pattern_color: {
    traction: 7, aesthetic: 10, durability: 7, maintenance: 6, cfCost: 7,
    decorative: true, forExterior: true,
    process: "stamp_mat_color_hardener_seal",
    bestUse: "patio_walkway_faux_stone_look",
  },
  polished_grind_seal: {
    traction: 6, aesthetic: 9, durability: 10, maintenance: 9, cfCost: 8,
    decorative: true, forExterior: false,
    process: "diamond_grind_densify_polish",
    bestUse: "retail_warehouse_showroom_floor",
  },
  trowel_smooth_hard: {
    traction: 4, aesthetic: 6, durability: 8, maintenance: 8, cfCost: 3,
    decorative: false, forExterior: false,
    process: "power_trowel_hard_steel_finish",
    bestUse: "garage_interior_slab_coating_base",
  },
};

function get(t: ConcreteFinishType): ConcreteFinishData {
  return DATA[t];
}

export const traction = (t: ConcreteFinishType) => get(t).traction;
export const aesthetic = (t: ConcreteFinishType) => get(t).aesthetic;
export const durability = (t: ConcreteFinishType) => get(t).durability;
export const maintenance = (t: ConcreteFinishType) => get(t).maintenance;
export const cfCost = (t: ConcreteFinishType) => get(t).cfCost;
export const decorative = (t: ConcreteFinishType) => get(t).decorative;
export const forExterior = (t: ConcreteFinishType) => get(t).forExterior;
export const process = (t: ConcreteFinishType) => get(t).process;
export const bestUse = (t: ConcreteFinishType) => get(t).bestUse;
export const concreteFinishTypes = (): ConcreteFinishType[] =>
  Object.keys(DATA) as ConcreteFinishType[];
