export type InductionMotorType =
  | "squirrel_cage_standard"
  | "squirrel_cage_premium"
  | "wound_rotor_slip"
  | "double_cage_high_start"
  | "explosion_proof_hazard";

interface InductionMotorData {
  efficiency: number;
  startTorque: number;
  speedControl: number;
  reliability: number;
  imCost: number;
  variableSpeed: boolean;
  forHeavyStart: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<InductionMotorType, InductionMotorData> = {
  squirrel_cage_standard: {
    efficiency: 7, startTorque: 6, speedControl: 3, reliability: 9, imCost: 4,
    variableSpeed: false, forHeavyStart: false,
    rotor: "aluminum_die_cast_squirrel_cage_bars_simple",
    bestUse: "fan_pump_conveyor_general_constant_speed",
  },
  squirrel_cage_premium: {
    efficiency: 10, startTorque: 6, speedControl: 3, reliability: 9, imCost: 6,
    variableSpeed: false, forHeavyStart: false,
    rotor: "copper_rotor_bars_premium_efficiency_ie3_ie4",
    bestUse: "continuous_duty_pump_compressor_energy_saving",
  },
  wound_rotor_slip: {
    efficiency: 7, startTorque: 10, speedControl: 7, reliability: 7, imCost: 8,
    variableSpeed: true, forHeavyStart: true,
    rotor: "wound_rotor_slip_rings_external_resistance",
    bestUse: "crane_hoist_mill_high_inertia_start_control",
  },
  double_cage_high_start: {
    efficiency: 7, startTorque: 9, speedControl: 3, reliability: 8, imCost: 6,
    variableSpeed: false, forHeavyStart: true,
    rotor: "double_cage_high_resistance_outer_low_inner",
    bestUse: "crusher_ball_mill_high_start_torque_direct",
  },
  explosion_proof_hazard: {
    efficiency: 8, startTorque: 7, speedControl: 3, reliability: 10, imCost: 9,
    variableSpeed: false, forHeavyStart: false,
    rotor: "totally_enclosed_explosion_proof_cast_frame",
    bestUse: "oil_gas_chemical_hazardous_area_zone_1_2",
  },
};

function get(t: InductionMotorType): InductionMotorData {
  return DATA[t];
}

export const efficiency = (t: InductionMotorType) => get(t).efficiency;
export const startTorque = (t: InductionMotorType) => get(t).startTorque;
export const speedControl = (t: InductionMotorType) => get(t).speedControl;
export const reliability = (t: InductionMotorType) => get(t).reliability;
export const imCost = (t: InductionMotorType) => get(t).imCost;
export const variableSpeed = (t: InductionMotorType) => get(t).variableSpeed;
export const forHeavyStart = (t: InductionMotorType) => get(t).forHeavyStart;
export const rotor = (t: InductionMotorType) => get(t).rotor;
export const bestUse = (t: InductionMotorType) => get(t).bestUse;
export const inductionMotorTypes = (): InductionMotorType[] =>
  Object.keys(DATA) as InductionMotorType[];
