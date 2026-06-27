export type DamperType =
  | "butterfly_round_single_blade"
  | "parallel_blade_rectangular"
  | "opposed_blade_rectangular"
  | "fire_damper_fusible_link"
  | "smoke_damper_motorized_ul";

interface DamperData {
  control: number;
  leakage: number;
  pressure: number;
  reliability: number;
  dmCost: number;
  motorized: boolean;
  forVav: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<DamperType, DamperData> = {
  butterfly_round_single_blade: {
    control: 5, leakage: 5, pressure: 6, reliability: 8, dmCost: 3,
    motorized: false, forVav: false,
    blade: "single_disc_center_pivot_round",
    bestUse: "branch_duct_balancing_on_off",
  },
  parallel_blade_rectangular: {
    control: 6, leakage: 6, pressure: 7, reliability: 8, dmCost: 5,
    motorized: true, forVav: false,
    blade: "multi_blade_parallel_rotate_same",
    bestUse: "mixing_box_two_position_divert",
  },
  opposed_blade_rectangular: {
    control: 9, leakage: 7, pressure: 7, reliability: 8, dmCost: 6,
    motorized: true, forVav: true,
    blade: "multi_blade_opposed_rotate_counter",
    bestUse: "vav_terminal_modulating_flow_control",
  },
  fire_damper_fusible_link: {
    control: 2, leakage: 9, pressure: 9, reliability: 10, dmCost: 7,
    motorized: false, forVav: false,
    blade: "curtain_blade_fusible_link_spring",
    bestUse: "fire_wall_penetration_code_required",
  },
  smoke_damper_motorized_ul: {
    control: 7, leakage: 10, pressure: 9, reliability: 9, dmCost: 9,
    motorized: true, forVav: false,
    blade: "low_leak_blade_seal_motor_spring",
    bestUse: "smoke_control_stair_pressurize_zone",
  },
};

function get(t: DamperType): DamperData {
  return DATA[t];
}

export const control = (t: DamperType) => get(t).control;
export const leakage = (t: DamperType) => get(t).leakage;
export const pressure = (t: DamperType) => get(t).pressure;
export const reliability = (t: DamperType) => get(t).reliability;
export const dmCost = (t: DamperType) => get(t).dmCost;
export const motorized = (t: DamperType) => get(t).motorized;
export const forVav = (t: DamperType) => get(t).forVav;
export const blade = (t: DamperType) => get(t).blade;
export const bestUse = (t: DamperType) => get(t).bestUse;
export const damperTypes = (): DamperType[] =>
  Object.keys(DATA) as DamperType[];
