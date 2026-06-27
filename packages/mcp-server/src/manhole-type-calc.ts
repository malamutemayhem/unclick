export type ManholeTypeType =
  | "precast_concrete_round"
  | "brick_masonry_traditional"
  | "polymer_concrete_corrosion"
  | "fiberglass_frp_light"
  | "hdpe_watertight_sealed";

interface ManholeTypeData {
  capacity: number;
  durability: number;
  weight: number;
  watertight: number;
  mhCost: number;
  corrosionResist: boolean;
  forSanitary: boolean;
  cover: string;
  bestUse: string;
}

const DATA: Record<ManholeTypeType, ManholeTypeData> = {
  precast_concrete_round: {
    capacity: 9, durability: 9, weight: 2, watertight: 6, mhCost: 5,
    corrosionResist: false, forSanitary: true,
    cover: "cast_iron_round_traffic_rated",
    bestUse: "standard_sanitary_storm_sewer",
  },
  brick_masonry_traditional: {
    capacity: 7, durability: 7, weight: 3, watertight: 4, mhCost: 6,
    corrosionResist: false, forSanitary: true,
    cover: "cast_iron_square_hinged",
    bestUse: "historic_existing_system_repair",
  },
  polymer_concrete_corrosion: {
    capacity: 8, durability: 10, weight: 5, watertight: 8, mhCost: 8,
    corrosionResist: true, forSanitary: true,
    cover: "stainless_steel_bolted_seal",
    bestUse: "chemical_plant_corrosive_sewer",
  },
  fiberglass_frp_light: {
    capacity: 6, durability: 8, weight: 9, watertight: 9, mhCost: 7,
    corrosionResist: true, forSanitary: true,
    cover: "frp_composite_locking_lid",
    bestUse: "coastal_high_water_table",
  },
  hdpe_watertight_sealed: {
    capacity: 7, durability: 7, weight: 8, watertight: 10, mhCost: 6,
    corrosionResist: true, forSanitary: true,
    cover: "hdpe_bolted_gasket_cover",
    bestUse: "vacuum_sewer_low_pressure",
  },
};

function get(t: ManholeTypeType): ManholeTypeData {
  return DATA[t];
}

export const capacity = (t: ManholeTypeType) => get(t).capacity;
export const durability = (t: ManholeTypeType) => get(t).durability;
export const weight = (t: ManholeTypeType) => get(t).weight;
export const watertight = (t: ManholeTypeType) => get(t).watertight;
export const mhCost = (t: ManholeTypeType) => get(t).mhCost;
export const corrosionResist = (t: ManholeTypeType) => get(t).corrosionResist;
export const forSanitary = (t: ManholeTypeType) => get(t).forSanitary;
export const cover = (t: ManholeTypeType) => get(t).cover;
export const bestUse = (t: ManholeTypeType) => get(t).bestUse;
export const manholeTypeTypes = (): ManholeTypeType[] =>
  Object.keys(DATA) as ManholeTypeType[];
