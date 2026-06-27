export type FireDamperType =
  | "curtain_blade_gravity"
  | "multi_blade_spring"
  | "intumescent_passive"
  | "combination_fire_smoke"
  | "corridor_damper_rated";

interface FireDamperData {
  fireRating: number;
  leakage: number;
  reliability: number;
  maintenance: number;
  fmCost: number;
  motorized: boolean;
  forSmoke: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<FireDamperType, FireDamperData> = {
  curtain_blade_gravity: {
    fireRating: 8, leakage: 6, reliability: 9, maintenance: 8, fmCost: 3,
    motorized: false, forSmoke: false,
    mechanism: "curtain_blade_gravity_drop_fusible_link",
    bestUse: "duct_penetration_fire_wall_basic_rated",
  },
  multi_blade_spring: {
    fireRating: 8, leakage: 7, reliability: 8, maintenance: 7, fmCost: 4,
    motorized: false, forSmoke: false,
    mechanism: "multi_blade_spring_close_thermal_release",
    bestUse: "hvac_duct_fire_rated_partition_standard",
  },
  intumescent_passive: {
    fireRating: 7, leakage: 9, reliability: 10, maintenance: 10, fmCost: 5,
    motorized: false, forSmoke: true,
    mechanism: "intumescent_material_expand_seal_heat",
    bestUse: "grille_transfer_opening_passive_seal",
  },
  combination_fire_smoke: {
    fireRating: 9, leakage: 9, reliability: 7, maintenance: 5, fmCost: 7,
    motorized: true, forSmoke: true,
    mechanism: "motor_actuated_blade_smoke_fire_dual",
    bestUse: "high_rise_smoke_control_hvac_stairwell",
  },
  corridor_damper_rated: {
    fireRating: 9, leakage: 8, reliability: 8, maintenance: 6, fmCost: 6,
    motorized: true, forSmoke: true,
    mechanism: "corridor_rated_motor_smoke_detector_link",
    bestUse: "hospital_corridor_ceiling_code_required",
  },
};

function get(t: FireDamperType): FireDamperData {
  return DATA[t];
}

export const fireRating = (t: FireDamperType) => get(t).fireRating;
export const leakage = (t: FireDamperType) => get(t).leakage;
export const reliability = (t: FireDamperType) => get(t).reliability;
export const maintenance = (t: FireDamperType) => get(t).maintenance;
export const fmCost = (t: FireDamperType) => get(t).fmCost;
export const motorized = (t: FireDamperType) => get(t).motorized;
export const forSmoke = (t: FireDamperType) => get(t).forSmoke;
export const mechanism = (t: FireDamperType) => get(t).mechanism;
export const bestUse = (t: FireDamperType) => get(t).bestUse;
export const fireDamperTypes = (): FireDamperType[] =>
  Object.keys(DATA) as FireDamperType[];
