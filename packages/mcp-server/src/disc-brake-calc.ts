export type DiscBrakeType =
  | "floating_caliper_single"
  | "fixed_caliper_multi_piston"
  | "ventilated_drilled_rotor"
  | "carbon_ceramic_composite"
  | "spring_applied_failsafe";

interface DiscBrakeData {
  torque: number;
  response: number;
  heatDissipation: number;
  life: number;
  dbCost: number;
  failsafe: boolean;
  forHighSpeed: boolean;
  friction: string;
  bestUse: string;
}

const DATA: Record<DiscBrakeType, DiscBrakeData> = {
  floating_caliper_single: {
    torque: 6, response: 8, heatDissipation: 6, life: 7, dbCost: 3,
    failsafe: false, forHighSpeed: false,
    friction: "semi_metallic_pad_cast_iron_rotor",
    bestUse: "automotive_light_vehicle_standard",
  },
  fixed_caliper_multi_piston: {
    torque: 9, response: 9, heatDissipation: 8, life: 8, dbCost: 7,
    failsafe: false, forHighSpeed: true,
    friction: "sintered_metallic_multi_pad_set",
    bestUse: "performance_vehicle_heavy_truck",
  },
  ventilated_drilled_rotor: {
    torque: 8, response: 9, heatDissipation: 10, life: 7, dbCost: 6,
    failsafe: false, forHighSpeed: true,
    friction: "ceramic_compound_vented_disc",
    bestUse: "track_towing_sustained_downhill",
  },
  carbon_ceramic_composite: {
    torque: 10, response: 10, heatDissipation: 10, life: 10, dbCost: 10,
    failsafe: false, forHighSpeed: true,
    friction: "carbon_fiber_sic_ceramic_matrix",
    bestUse: "racing_supercar_aerospace_wheel",
  },
  spring_applied_failsafe: {
    torque: 7, response: 7, heatDissipation: 5, life: 9, dbCost: 5,
    failsafe: true, forHighSpeed: false,
    friction: "organic_pad_spring_clamp_rotor",
    bestUse: "crane_hoist_elevator_hold_brake",
  },
};

function get(t: DiscBrakeType): DiscBrakeData {
  return DATA[t];
}

export const torque = (t: DiscBrakeType) => get(t).torque;
export const response = (t: DiscBrakeType) => get(t).response;
export const heatDissipation = (t: DiscBrakeType) => get(t).heatDissipation;
export const life = (t: DiscBrakeType) => get(t).life;
export const dbCost = (t: DiscBrakeType) => get(t).dbCost;
export const failsafe = (t: DiscBrakeType) => get(t).failsafe;
export const forHighSpeed = (t: DiscBrakeType) => get(t).forHighSpeed;
export const friction = (t: DiscBrakeType) => get(t).friction;
export const bestUse = (t: DiscBrakeType) => get(t).bestUse;
export const discBrakeTypes = (): DiscBrakeType[] =>
  Object.keys(DATA) as DiscBrakeType[];
