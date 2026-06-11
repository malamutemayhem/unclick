export type ButterflyValveType =
  | "resilient_seat_wafer"
  | "high_performance_double"
  | "triple_offset_metal_seat"
  | "lug_style_dead_end"
  | "rubber_lined_corrosive";

interface ButterflyValveData {
  flow: number;
  shutoff: number;
  durability: number;
  torque: number;
  bvCost: number;
  zeroLeakage: boolean;
  forThrottle: boolean;
  disc: string;
  bestUse: string;
}

const DATA: Record<ButterflyValveType, ButterflyValveData> = {
  resilient_seat_wafer: {
    flow: 8, shutoff: 7, durability: 7, torque: 8, bvCost: 2,
    zeroLeakage: false, forThrottle: false,
    disc: "ductile_iron_epdm_seat_wafer",
    bestUse: "water_supply_isolation_basic",
  },
  high_performance_double: {
    flow: 8, shutoff: 9, durability: 9, torque: 7, bvCost: 6,
    zeroLeakage: false, forThrottle: true,
    disc: "stainless_double_eccentric",
    bestUse: "process_plant_throttle_control",
  },
  triple_offset_metal_seat: {
    flow: 8, shutoff: 10, durability: 10, torque: 6, bvCost: 9,
    zeroLeakage: true, forThrottle: true,
    disc: "stellite_triple_offset_metal",
    bestUse: "high_temp_steam_critical_shut",
  },
  lug_style_dead_end: {
    flow: 8, shutoff: 7, durability: 7, torque: 8, bvCost: 3,
    zeroLeakage: false, forThrottle: false,
    disc: "ductile_iron_lug_bolted_end",
    bestUse: "dead_end_service_one_side_remove",
  },
  rubber_lined_corrosive: {
    flow: 7, shutoff: 8, durability: 8, torque: 7, bvCost: 5,
    zeroLeakage: false, forThrottle: false,
    disc: "rubber_coated_disc_epoxy_body",
    bestUse: "chemical_seawater_corrosive",
  },
};

function get(t: ButterflyValveType): ButterflyValveData {
  return DATA[t];
}

export const flow = (t: ButterflyValveType) => get(t).flow;
export const shutoff = (t: ButterflyValveType) => get(t).shutoff;
export const durability = (t: ButterflyValveType) => get(t).durability;
export const torque = (t: ButterflyValveType) => get(t).torque;
export const bvCost = (t: ButterflyValveType) => get(t).bvCost;
export const zeroLeakage = (t: ButterflyValveType) => get(t).zeroLeakage;
export const forThrottle = (t: ButterflyValveType) => get(t).forThrottle;
export const disc = (t: ButterflyValveType) => get(t).disc;
export const bestUse = (t: ButterflyValveType) => get(t).bestUse;
export const butterflyValveTypes = (): ButterflyValveType[] =>
  Object.keys(DATA) as ButterflyValveType[];
