export type UtilityVaultType =
  | "precast_concrete_box"
  | "cast_in_place_custom"
  | "polymer_concrete_splice"
  | "fiberglass_direct_bury"
  | "hdpe_hand_hole";

interface UtilityVaultData {
  capacity: number;
  durability: number;
  weight: number;
  watertight: number;
  uvCost: number;
  trafficRated: boolean;
  forElectrical: boolean;
  lid: string;
  bestUse: string;
}

const DATA: Record<UtilityVaultType, UtilityVaultData> = {
  precast_concrete_box: {
    capacity: 10, durability: 9, weight: 2, watertight: 6, uvCost: 6,
    trafficRated: true, forElectrical: true,
    lid: "cast_iron_checkered_plate",
    bestUse: "electrical_transformer_pad",
  },
  cast_in_place_custom: {
    capacity: 10, durability: 10, weight: 1, watertight: 8, uvCost: 9,
    trafficRated: true, forElectrical: true,
    lid: "steel_plate_bolted_gasket",
    bestUse: "custom_large_telecom_vault",
  },
  polymer_concrete_splice: {
    capacity: 6, durability: 8, weight: 6, watertight: 9, uvCost: 7,
    trafficRated: true, forElectrical: true,
    lid: "polymer_concrete_flush_lid",
    bestUse: "cable_splice_junction_box",
  },
  fiberglass_direct_bury: {
    capacity: 7, durability: 7, weight: 9, watertight: 10, uvCost: 6,
    trafficRated: false, forElectrical: true,
    lid: "frp_bolted_cover_gasket",
    bestUse: "telecom_fiber_optic_access",
  },
  hdpe_hand_hole: {
    capacity: 4, durability: 6, weight: 10, watertight: 8, uvCost: 3,
    trafficRated: false, forElectrical: true,
    lid: "hdpe_snap_on_screw_cover",
    bestUse: "small_cable_pull_access_point",
  },
};

function get(t: UtilityVaultType): UtilityVaultData {
  return DATA[t];
}

export const capacity = (t: UtilityVaultType) => get(t).capacity;
export const durability = (t: UtilityVaultType) => get(t).durability;
export const weight = (t: UtilityVaultType) => get(t).weight;
export const watertight = (t: UtilityVaultType) => get(t).watertight;
export const uvCost = (t: UtilityVaultType) => get(t).uvCost;
export const trafficRated = (t: UtilityVaultType) => get(t).trafficRated;
export const forElectrical = (t: UtilityVaultType) => get(t).forElectrical;
export const lid = (t: UtilityVaultType) => get(t).lid;
export const bestUse = (t: UtilityVaultType) => get(t).bestUse;
export const utilityVaultTypes = (): UtilityVaultType[] =>
  Object.keys(DATA) as UtilityVaultType[];
