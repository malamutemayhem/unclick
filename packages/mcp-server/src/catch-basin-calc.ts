export type CatchBasinType =
  | "precast_concrete_box"
  | "polymer_concrete_channel"
  | "hdpe_plastic_inline"
  | "brick_masonry_field"
  | "fiberglass_frp_light";

interface CatchBasinData {
  capacity: number;
  durability: number;
  weight: number;
  installEase: number;
  cbCost: number;
  watertight: boolean;
  forTraffic: boolean;
  grate: string;
  bestUse: string;
}

const DATA: Record<CatchBasinType, CatchBasinData> = {
  precast_concrete_box: {
    capacity: 10, durability: 9, weight: 2, installEase: 5, cbCost: 6,
    watertight: true, forTraffic: true,
    grate: "cast_iron_heavy_duty_traffic",
    bestUse: "road_parking_lot_storm_drain",
  },
  polymer_concrete_channel: {
    capacity: 7, durability: 8, weight: 6, installEase: 7, cbCost: 7,
    watertight: true, forTraffic: true,
    grate: "stainless_slot_heel_proof",
    bestUse: "commercial_driveway_entry",
  },
  hdpe_plastic_inline: {
    capacity: 5, durability: 6, weight: 9, installEase: 9, cbCost: 3,
    watertight: true, forTraffic: false,
    grate: "plastic_flat_atrium_grate",
    bestUse: "residential_yard_downspout",
  },
  brick_masonry_field: {
    capacity: 8, durability: 7, weight: 3, installEase: 3, cbCost: 5,
    watertight: false, forTraffic: true,
    grate: "cast_iron_square_hinged_frame",
    bestUse: "historic_district_field_built",
  },
  fiberglass_frp_light: {
    capacity: 6, durability: 7, weight: 8, installEase: 8, cbCost: 5,
    watertight: true, forTraffic: false,
    grate: "frp_molded_corrosion_resist",
    bestUse: "chemical_plant_corrosive_area",
  },
};

function get(t: CatchBasinType): CatchBasinData {
  return DATA[t];
}

export const capacity = (t: CatchBasinType) => get(t).capacity;
export const durability = (t: CatchBasinType) => get(t).durability;
export const weight = (t: CatchBasinType) => get(t).weight;
export const installEase = (t: CatchBasinType) => get(t).installEase;
export const cbCost = (t: CatchBasinType) => get(t).cbCost;
export const watertight = (t: CatchBasinType) => get(t).watertight;
export const forTraffic = (t: CatchBasinType) => get(t).forTraffic;
export const grate = (t: CatchBasinType) => get(t).grate;
export const bestUse = (t: CatchBasinType) => get(t).bestUse;
export const catchBasinTypes = (): CatchBasinType[] =>
  Object.keys(DATA) as CatchBasinType[];
