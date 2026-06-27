export type FenceTypeType =
  | "chain_link_galvanized"
  | "wood_privacy_board"
  | "vinyl_pvc_privacy"
  | "ornamental_aluminum"
  | "composite_horizontal";

interface FenceTypeData {
  security: number;
  privacy: number;
  durability: number;
  aesthetic: number;
  fnCost: number;
  maintenance: boolean;
  forCommercial: boolean;
  post: string;
  bestUse: string;
}

const DATA: Record<FenceTypeType, FenceTypeData> = {
  chain_link_galvanized: {
    security: 7, privacy: 2, durability: 8, aesthetic: 3, fnCost: 2,
    maintenance: false, forCommercial: true,
    post: "steel_round_set_concrete",
    bestUse: "commercial_perimeter_security",
  },
  wood_privacy_board: {
    security: 6, privacy: 9, durability: 5, aesthetic: 7, fnCost: 4,
    maintenance: true, forCommercial: false,
    post: "pressure_treated_4x4_set",
    bestUse: "residential_backyard_privacy",
  },
  vinyl_pvc_privacy: {
    security: 5, privacy: 9, durability: 8, aesthetic: 7, fnCost: 6,
    maintenance: false, forCommercial: false,
    post: "vinyl_reinforced_aluminum_insert",
    bestUse: "residential_low_maintenance",
  },
  ornamental_aluminum: {
    security: 6, privacy: 2, durability: 9, aesthetic: 9, fnCost: 7,
    maintenance: false, forCommercial: true,
    post: "aluminum_square_flange_mount",
    bestUse: "pool_enclosure_decorative",
  },
  composite_horizontal: {
    security: 5, privacy: 8, durability: 9, aesthetic: 10, fnCost: 8,
    maintenance: false, forCommercial: false,
    post: "steel_core_composite_sleeve",
    bestUse: "modern_residential_horizontal",
  },
};

function get(t: FenceTypeType): FenceTypeData {
  return DATA[t];
}

export const security = (t: FenceTypeType) => get(t).security;
export const privacy = (t: FenceTypeType) => get(t).privacy;
export const durability = (t: FenceTypeType) => get(t).durability;
export const aesthetic = (t: FenceTypeType) => get(t).aesthetic;
export const fnCost = (t: FenceTypeType) => get(t).fnCost;
export const maintenance = (t: FenceTypeType) => get(t).maintenance;
export const forCommercial = (t: FenceTypeType) => get(t).forCommercial;
export const post = (t: FenceTypeType) => get(t).post;
export const bestUse = (t: FenceTypeType) => get(t).bestUse;
export const fenceTypeTypes = (): FenceTypeType[] =>
  Object.keys(DATA) as FenceTypeType[];
