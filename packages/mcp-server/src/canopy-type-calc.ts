export type CanopyTypeType =
  | "cantilever_steel_blade"
  | "tension_fabric_membrane"
  | "standing_seam_metal"
  | "glass_canopy_spider"
  | "retractable_motorized";

interface CanopyTypeData {
  span: number;
  durability: number;
  aesthetic: number;
  light: number;
  cnCost: number;
  retractable: boolean;
  forEntrance: boolean;
  structure: string;
  bestUse: string;
}

const DATA: Record<CanopyTypeType, CanopyTypeData> = {
  cantilever_steel_blade: {
    span: 7, durability: 9, aesthetic: 8, light: 3, cnCost: 7,
    retractable: false, forEntrance: true,
    structure: "steel_plate_welded_cantilever",
    bestUse: "building_entrance_overhang",
  },
  tension_fabric_membrane: {
    span: 10, durability: 6, aesthetic: 9, light: 8, cnCost: 5,
    retractable: false, forEntrance: false,
    structure: "ptfe_etfe_tensioned_cable",
    bestUse: "stadium_plaza_large_span",
  },
  standing_seam_metal: {
    span: 6, durability: 10, aesthetic: 6, light: 2, cnCost: 6,
    retractable: false, forEntrance: true,
    structure: "metal_panel_standing_seam_purlin",
    bestUse: "walkway_loading_dock_cover",
  },
  glass_canopy_spider: {
    span: 5, durability: 7, aesthetic: 10, light: 10, cnCost: 9,
    retractable: false, forEntrance: true,
    structure: "laminated_glass_spider_fitting",
    bestUse: "luxury_entrance_hotel_lobby",
  },
  retractable_motorized: {
    span: 8, durability: 5, aesthetic: 7, light: 7, cnCost: 8,
    retractable: true, forEntrance: false,
    structure: "folding_arm_motorized_fabric",
    bestUse: "restaurant_patio_retractable",
  },
};

function get(t: CanopyTypeType): CanopyTypeData {
  return DATA[t];
}

export const span = (t: CanopyTypeType) => get(t).span;
export const durability = (t: CanopyTypeType) => get(t).durability;
export const aesthetic = (t: CanopyTypeType) => get(t).aesthetic;
export const light = (t: CanopyTypeType) => get(t).light;
export const cnCost = (t: CanopyTypeType) => get(t).cnCost;
export const retractable = (t: CanopyTypeType) => get(t).retractable;
export const forEntrance = (t: CanopyTypeType) => get(t).forEntrance;
export const structure = (t: CanopyTypeType) => get(t).structure;
export const bestUse = (t: CanopyTypeType) => get(t).bestUse;
export const canopyTypeTypes = (): CanopyTypeType[] =>
  Object.keys(DATA) as CanopyTypeType[];
