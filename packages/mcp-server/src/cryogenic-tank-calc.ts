export type CryogenicTankType =
  | "double_wall_vacuum"
  | "flat_bottom_lng"
  | "spherical_lng_moss"
  | "membrane_lng_ship"
  | "micro_bulk_portable";

interface CryogenicTankData {
  boilOffRate: number;
  capacity: number;
  insulation: number;
  safety: number;
  ctCost: number;
  transportable: boolean;
  forLng: boolean;
  containment: string;
  bestUse: string;
}

const DATA: Record<CryogenicTankType, CryogenicTankData> = {
  double_wall_vacuum: {
    boilOffRate: 9, capacity: 6, insulation: 10, safety: 9, ctCost: 7,
    transportable: false, forLng: false,
    containment: "inner_ss_vessel_vacuum_perlite_outer_shell",
    bestUse: "liquid_nitrogen_oxygen_argon_industrial_gas",
  },
  flat_bottom_lng: {
    boilOffRate: 7, capacity: 10, insulation: 8, safety: 10, ctCost: 9,
    transportable: false, forLng: true,
    containment: "full_containment_9pct_nickel_steel_concrete",
    bestUse: "lng_import_terminal_peak_shaving_base_load",
  },
  spherical_lng_moss: {
    boilOffRate: 8, capacity: 8, insulation: 8, safety: 9, ctCost: 10,
    transportable: true, forLng: true,
    containment: "independent_spherical_aluminum_moss_type",
    bestUse: "lng_carrier_ship_independent_tank_marine",
  },
  membrane_lng_ship: {
    boilOffRate: 7, capacity: 9, insulation: 8, safety: 9, ctCost: 8,
    transportable: true, forLng: true,
    containment: "membrane_liner_insulation_ship_hull_primary",
    bestUse: "lng_carrier_membrane_type_gtt_mark_iii",
  },
  micro_bulk_portable: {
    boilOffRate: 6, capacity: 3, insulation: 7, safety: 8, ctCost: 4,
    transportable: true, forLng: false,
    containment: "portable_vacuum_dewar_caster_wheel_mobile",
    bestUse: "hospital_lab_small_user_liquid_nitrogen_delivery",
  },
};

function get(t: CryogenicTankType): CryogenicTankData {
  return DATA[t];
}

export const boilOffRate = (t: CryogenicTankType) => get(t).boilOffRate;
export const capacity = (t: CryogenicTankType) => get(t).capacity;
export const insulation = (t: CryogenicTankType) => get(t).insulation;
export const safety = (t: CryogenicTankType) => get(t).safety;
export const ctCost = (t: CryogenicTankType) => get(t).ctCost;
export const transportable = (t: CryogenicTankType) => get(t).transportable;
export const forLng = (t: CryogenicTankType) => get(t).forLng;
export const containment = (t: CryogenicTankType) => get(t).containment;
export const bestUse = (t: CryogenicTankType) => get(t).bestUse;
export const cryogenicTankTypes = (): CryogenicTankType[] =>
  Object.keys(DATA) as CryogenicTankType[];
