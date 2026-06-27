export type DuctDamperType =
  | "butterfly_round_hvac"
  | "parallel_blade_rect"
  | "opposed_blade_control"
  | "fire_smoke_rated"
  | "backdraft_gravity";

interface DuctDamperData {
  flowControl: number;
  leakage: number;
  pressureDrop: number;
  durability: number;
  ddCost: number;
  fireRated: boolean;
  forModulating: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<DuctDamperType, DuctDamperData> = {
  butterfly_round_hvac: {
    flowControl: 6, leakage: 5, pressureDrop: 7, durability: 7, ddCost: 3,
    fireRated: false, forModulating: false,
    blade: "single_disc_butterfly_round_duct_pivot",
    bestUse: "round_duct_isolation_simple_on_off_balancing",
  },
  parallel_blade_rect: {
    flowControl: 6, leakage: 6, pressureDrop: 6, durability: 7, ddCost: 4,
    fireRated: false, forModulating: false,
    blade: "parallel_rotation_rectangular_multi_blade",
    bestUse: "two_position_zone_mixing_box_face_bypass",
  },
  opposed_blade_control: {
    flowControl: 10, leakage: 8, pressureDrop: 5, durability: 8, ddCost: 6,
    fireRated: false, forModulating: true,
    blade: "opposed_rotation_equal_percentage_characteristic",
    bestUse: "vav_terminal_modulating_airflow_precision_control",
  },
  fire_smoke_rated: {
    flowControl: 4, leakage: 10, pressureDrop: 4, durability: 10, ddCost: 8,
    fireRated: true, forModulating: false,
    blade: "ul_rated_curtain_blade_fusible_link_spring",
    bestUse: "fire_barrier_penetration_smoke_containment_rated",
  },
  backdraft_gravity: {
    flowControl: 3, leakage: 4, pressureDrop: 8, durability: 6, ddCost: 2,
    fireRated: false, forModulating: false,
    blade: "gravity_weighted_aluminum_flap_backdraft_prevent",
    bestUse: "exhaust_fan_outlet_prevent_reverse_airflow",
  },
};

function get(t: DuctDamperType): DuctDamperData {
  return DATA[t];
}

export const flowControl = (t: DuctDamperType) => get(t).flowControl;
export const leakage = (t: DuctDamperType) => get(t).leakage;
export const pressureDrop = (t: DuctDamperType) => get(t).pressureDrop;
export const durability = (t: DuctDamperType) => get(t).durability;
export const ddCost = (t: DuctDamperType) => get(t).ddCost;
export const fireRated = (t: DuctDamperType) => get(t).fireRated;
export const forModulating = (t: DuctDamperType) => get(t).forModulating;
export const blade = (t: DuctDamperType) => get(t).blade;
export const bestUse = (t: DuctDamperType) => get(t).bestUse;
export const ductDamperTypes = (): DuctDamperType[] =>
  Object.keys(DATA) as DuctDamperType[];
