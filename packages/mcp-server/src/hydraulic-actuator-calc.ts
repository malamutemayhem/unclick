export type HydraulicActuatorType =
  | "linear_cylinder_double"
  | "rotary_vane_quarter"
  | "scotch_yoke_high_torque"
  | "rack_pinion_compact"
  | "telescoping_multi_stage";

interface HydraulicActuatorData {
  force: number;
  speed: number;
  precision: number;
  compactness: number;
  haCost: number;
  failSafe: boolean;
  forHighForce: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<HydraulicActuatorType, HydraulicActuatorData> = {
  linear_cylinder_double: {
    force: 10, speed: 8, precision: 7, compactness: 5, haCost: 4,
    failSafe: false, forHighForce: true,
    design: "double_acting_cylinder_piston_rod_seal",
    bestUse: "press_clamp_heavy_lift_industrial_machine",
  },
  rotary_vane_quarter: {
    force: 6, speed: 7, precision: 6, compactness: 8, haCost: 5,
    failSafe: false, forHighForce: false,
    design: "rotary_vane_quarter_turn_compact_body",
    bestUse: "ball_butterfly_valve_quarter_turn_medium",
  },
  scotch_yoke_high_torque: {
    force: 9, speed: 6, precision: 5, compactness: 6, haCost: 7,
    failSafe: true, forHighForce: true,
    design: "scotch_yoke_high_torque_breakaway",
    bestUse: "large_valve_pipeline_high_breakaway_torque",
  },
  rack_pinion_compact: {
    force: 7, speed: 8, precision: 8, compactness: 9, haCost: 6,
    failSafe: true, forHighForce: false,
    design: "rack_pinion_dual_piston_spring_return",
    bestUse: "process_valve_compact_install_modulating",
  },
  telescoping_multi_stage: {
    force: 10, speed: 5, precision: 4, compactness: 7, haCost: 8,
    failSafe: false, forHighForce: true,
    design: "telescoping_multi_stage_long_stroke",
    bestUse: "crane_outrigger_dump_truck_long_extend",
  },
};

function get(t: HydraulicActuatorType): HydraulicActuatorData {
  return DATA[t];
}

export const force = (t: HydraulicActuatorType) => get(t).force;
export const speed = (t: HydraulicActuatorType) => get(t).speed;
export const precision = (t: HydraulicActuatorType) => get(t).precision;
export const compactness = (t: HydraulicActuatorType) => get(t).compactness;
export const haCost = (t: HydraulicActuatorType) => get(t).haCost;
export const failSafe = (t: HydraulicActuatorType) => get(t).failSafe;
export const forHighForce = (t: HydraulicActuatorType) => get(t).forHighForce;
export const design = (t: HydraulicActuatorType) => get(t).design;
export const bestUse = (t: HydraulicActuatorType) => get(t).bestUse;
export const hydraulicActuatorTypes = (): HydraulicActuatorType[] =>
  Object.keys(DATA) as HydraulicActuatorType[];
