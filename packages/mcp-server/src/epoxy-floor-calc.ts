export type EpoxyFloorType =
  | "self_leveling_solid"
  | "mortar_trowel_applied"
  | "flake_broadcast_chip"
  | "metallic_swirl_design"
  | "quartz_aggregate_slip";

interface EpoxyFloorData {
  durability: number;
  aesthetic: number;
  chemical: number;
  thickness: number;
  efCost: number;
  decorative: boolean;
  forIndustrial: boolean;
  system: string;
  bestUse: string;
}

const DATA: Record<EpoxyFloorType, EpoxyFloorData> = {
  self_leveling_solid: {
    durability: 8, aesthetic: 7, chemical: 9, thickness: 7, efCost: 6,
    decorative: false, forIndustrial: true,
    system: "two_part_100_pct_solids_self",
    bestUse: "warehouse_manufacturing_floor",
  },
  mortar_trowel_applied: {
    durability: 10, aesthetic: 5, chemical: 10, thickness: 10, efCost: 9,
    decorative: false, forIndustrial: true,
    system: "epoxy_mortar_trowel_3_8_inch",
    bestUse: "chemical_plant_heavy_impact",
  },
  flake_broadcast_chip: {
    durability: 7, aesthetic: 8, chemical: 7, thickness: 5, efCost: 5,
    decorative: true, forIndustrial: false,
    system: "base_coat_flake_broadcast_top",
    bestUse: "garage_showroom_residential",
  },
  metallic_swirl_design: {
    durability: 7, aesthetic: 10, chemical: 7, thickness: 5, efCost: 8,
    decorative: true, forIndustrial: false,
    system: "metallic_pigment_swirl_clear",
    bestUse: "retail_lobby_designer_floor",
  },
  quartz_aggregate_slip: {
    durability: 9, aesthetic: 6, chemical: 8, thickness: 6, efCost: 6,
    decorative: false, forIndustrial: true,
    system: "quartz_sand_broadcast_texture",
    bestUse: "commercial_kitchen_wet_area",
  },
};

function get(t: EpoxyFloorType): EpoxyFloorData {
  return DATA[t];
}

export const durability = (t: EpoxyFloorType) => get(t).durability;
export const aesthetic = (t: EpoxyFloorType) => get(t).aesthetic;
export const chemical = (t: EpoxyFloorType) => get(t).chemical;
export const thickness = (t: EpoxyFloorType) => get(t).thickness;
export const efCost = (t: EpoxyFloorType) => get(t).efCost;
export const decorative = (t: EpoxyFloorType) => get(t).decorative;
export const forIndustrial = (t: EpoxyFloorType) => get(t).forIndustrial;
export const system = (t: EpoxyFloorType) => get(t).system;
export const bestUse = (t: EpoxyFloorType) => get(t).bestUse;
export const epoxyFloorTypes = (): EpoxyFloorType[] =>
  Object.keys(DATA) as EpoxyFloorType[];
