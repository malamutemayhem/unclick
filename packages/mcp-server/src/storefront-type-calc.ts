export type StorefrontTypeType =
  | "standard_flush_glaze"
  | "center_set_butt_glaze"
  | "offset_set_structural"
  | "entrance_vestibule_system"
  | "blast_resistant_laminated";

interface StorefrontTypeData {
  thermal: number;
  structural: number;
  aesthetic: number;
  security: number;
  sfCost: number;
  thermBroken: boolean;
  forCommercial: boolean;
  frame: string;
  bestUse: string;
}

const DATA: Record<StorefrontTypeType, StorefrontTypeData> = {
  standard_flush_glaze: {
    thermal: 6, structural: 5, aesthetic: 7, security: 5, sfCost: 4,
    thermBroken: true, forCommercial: true,
    frame: "aluminum_flush_snap_on_cover",
    bestUse: "retail_office_lobby_standard",
  },
  center_set_butt_glaze: {
    thermal: 5, structural: 5, aesthetic: 8, security: 4, sfCost: 5,
    thermBroken: false, forCommercial: true,
    frame: "narrow_profile_butt_joint_glass",
    bestUse: "showroom_gallery_minimal_frame",
  },
  offset_set_structural: {
    thermal: 7, structural: 7, aesthetic: 6, security: 7, sfCost: 6,
    thermBroken: true, forCommercial: true,
    frame: "offset_glazing_pocket_deep",
    bestUse: "high_wind_structural_performance",
  },
  entrance_vestibule_system: {
    thermal: 8, structural: 6, aesthetic: 7, security: 6, sfCost: 7,
    thermBroken: true, forCommercial: true,
    frame: "entrance_door_transom_sidelight",
    bestUse: "building_entry_vestibule_ada",
  },
  blast_resistant_laminated: {
    thermal: 6, structural: 10, aesthetic: 5, security: 10, sfCost: 10,
    thermBroken: true, forCommercial: true,
    frame: "reinforced_anchored_blast_frame",
    bestUse: "government_embassy_high_security",
  },
};

function get(t: StorefrontTypeType): StorefrontTypeData {
  return DATA[t];
}

export const thermal = (t: StorefrontTypeType) => get(t).thermal;
export const structural = (t: StorefrontTypeType) => get(t).structural;
export const aesthetic = (t: StorefrontTypeType) => get(t).aesthetic;
export const security = (t: StorefrontTypeType) => get(t).security;
export const sfCost = (t: StorefrontTypeType) => get(t).sfCost;
export const thermBroken = (t: StorefrontTypeType) => get(t).thermBroken;
export const forCommercial = (t: StorefrontTypeType) => get(t).forCommercial;
export const frame = (t: StorefrontTypeType) => get(t).frame;
export const bestUse = (t: StorefrontTypeType) => get(t).bestUse;
export const storefrontTypeTypes = (): StorefrontTypeType[] =>
  Object.keys(DATA) as StorefrontTypeType[];
