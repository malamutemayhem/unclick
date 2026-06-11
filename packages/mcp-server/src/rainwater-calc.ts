export type RainwaterType =
  | "above_ground_poly_tank"
  | "below_ground_concrete"
  | "modular_cube_matrix"
  | "bladder_pillow_flexible"
  | "cistern_stone_historic";

interface RainwaterData {
  capacity: number;
  durability: number;
  installEase: number;
  aesthetic: number;
  rwCost: number;
  underground: boolean;
  forPotable: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<RainwaterType, RainwaterData> = {
  above_ground_poly_tank: {
    capacity: 6, durability: 7, installEase: 9, aesthetic: 5, rwCost: 3,
    underground: false, forPotable: false,
    material: "uv_resistant_polyethylene_tank",
    bestUse: "residential_garden_irrigation",
  },
  below_ground_concrete: {
    capacity: 10, durability: 10, installEase: 3, aesthetic: 10, rwCost: 8,
    underground: true, forPotable: true,
    material: "reinforced_concrete_vault_sealed",
    bestUse: "commercial_building_flush_supply",
  },
  modular_cube_matrix: {
    capacity: 9, durability: 8, installEase: 7, aesthetic: 9, rwCost: 7,
    underground: true, forPotable: false,
    material: "hdpe_modular_cube_wrapped_liner",
    bestUse: "parking_lot_infiltration_reuse",
  },
  bladder_pillow_flexible: {
    capacity: 7, durability: 5, installEase: 10, aesthetic: 3, rwCost: 4,
    underground: false, forPotable: false,
    material: "reinforced_pvc_bladder_pillow",
    bestUse: "temporary_construction_site",
  },
  cistern_stone_historic: {
    capacity: 8, durability: 9, installEase: 4, aesthetic: 8, rwCost: 9,
    underground: true, forPotable: true,
    material: "stone_brick_lime_render_lined",
    bestUse: "heritage_restoration_rural_estate",
  },
};

function get(t: RainwaterType): RainwaterData {
  return DATA[t];
}

export const capacity = (t: RainwaterType) => get(t).capacity;
export const durability = (t: RainwaterType) => get(t).durability;
export const installEase = (t: RainwaterType) => get(t).installEase;
export const aesthetic = (t: RainwaterType) => get(t).aesthetic;
export const rwCost = (t: RainwaterType) => get(t).rwCost;
export const underground = (t: RainwaterType) => get(t).underground;
export const forPotable = (t: RainwaterType) => get(t).forPotable;
export const material = (t: RainwaterType) => get(t).material;
export const bestUse = (t: RainwaterType) => get(t).bestUse;
export const rainwaterTypes = (): RainwaterType[] =>
  Object.keys(DATA) as RainwaterType[];
