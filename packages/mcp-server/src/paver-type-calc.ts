export type PaverTypeType =
  | "concrete_interlocking"
  | "clay_brick_traditional"
  | "natural_stone_flagstone"
  | "permeable_open_joint"
  | "rubber_recycled_safety";

interface PaverTypeData {
  strength: number;
  aesthetic: number;
  permeability: number;
  durability: number;
  pvCost: number;
  permeable: boolean;
  forVehicular: boolean;
  base: string;
  bestUse: string;
}

const DATA: Record<PaverTypeType, PaverTypeData> = {
  concrete_interlocking: {
    strength: 8, aesthetic: 7, permeability: 3, durability: 8, pvCost: 5,
    permeable: false, forVehicular: true,
    base: "compacted_aggregate_sand_set",
    bestUse: "driveway_parking_lot_walkway",
  },
  clay_brick_traditional: {
    strength: 6, aesthetic: 9, permeability: 4, durability: 9, pvCost: 7,
    permeable: false, forVehicular: false,
    base: "sand_set_mortar_set_option",
    bestUse: "historic_walkway_patio_garden",
  },
  natural_stone_flagstone: {
    strength: 7, aesthetic: 10, permeability: 5, durability: 10, pvCost: 9,
    permeable: false, forVehicular: false,
    base: "mortar_bed_sand_set_dry_lay",
    bestUse: "luxury_patio_pool_deck",
  },
  permeable_open_joint: {
    strength: 7, aesthetic: 6, permeability: 10, durability: 7, pvCost: 6,
    permeable: true, forVehicular: true,
    base: "open_graded_aggregate_no_fines",
    bestUse: "stormwater_management_parking",
  },
  rubber_recycled_safety: {
    strength: 3, aesthetic: 4, permeability: 7, durability: 5, pvCost: 4,
    permeable: true, forVehicular: false,
    base: "compacted_stone_dust_level",
    bestUse: "playground_safety_surface",
  },
};

function get(t: PaverTypeType): PaverTypeData {
  return DATA[t];
}

export const strength = (t: PaverTypeType) => get(t).strength;
export const aesthetic = (t: PaverTypeType) => get(t).aesthetic;
export const permeability = (t: PaverTypeType) => get(t).permeability;
export const durability = (t: PaverTypeType) => get(t).durability;
export const pvCost = (t: PaverTypeType) => get(t).pvCost;
export const permeable = (t: PaverTypeType) => get(t).permeable;
export const forVehicular = (t: PaverTypeType) => get(t).forVehicular;
export const base = (t: PaverTypeType) => get(t).base;
export const bestUse = (t: PaverTypeType) => get(t).bestUse;
export const paverTypeTypes = (): PaverTypeType[] =>
  Object.keys(DATA) as PaverTypeType[];
