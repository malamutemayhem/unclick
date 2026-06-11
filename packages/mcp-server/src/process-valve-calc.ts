export type ProcessValve =
  | "globe_pneumatic"
  | "ball_quarter_turn"
  | "butterfly_wafer"
  | "diaphragm_weir"
  | "control_valve_cage";

const DATA: Record<ProcessValve, {
  rangeability: number; tightShutoff: number; flowCapacity: number;
  cavitationResist: number; pvCost: number; linear: boolean;
  forSanitary: boolean; actuator: string; bestUse: string;
}> = {
  globe_pneumatic: {
    rangeability: 9, tightShutoff: 8, flowCapacity: 6,
    cavitationResist: 7, pvCost: 6, linear: true,
    forSanitary: false, actuator: "diaphragm_spring_return",
    bestUse: "steam_pressure_throttle",
  },
  ball_quarter_turn: {
    rangeability: 5, tightShutoff: 10, flowCapacity: 10,
    cavitationResist: 5, pvCost: 3, linear: false,
    forSanitary: true, actuator: "rack_pinion_pneumatic",
    bestUse: "onoff_isolation_pipeline",
  },
  butterfly_wafer: {
    rangeability: 6, tightShutoff: 6, flowCapacity: 9,
    cavitationResist: 4, pvCost: 1, linear: false,
    forSanitary: false, actuator: "electric_quarter_turn",
    bestUse: "hvac_large_duct_damper",
  },
  diaphragm_weir: {
    rangeability: 7, tightShutoff: 9, flowCapacity: 5,
    cavitationResist: 8, pvCost: 5, linear: true,
    forSanitary: true, actuator: "handwheel_manual_override",
    bestUse: "pharma_sterile_slurry_flow",
  },
  control_valve_cage: {
    rangeability: 10, tightShutoff: 7, flowCapacity: 7,
    cavitationResist: 10, pvCost: 8, linear: true,
    forSanitary: false, actuator: "piston_double_acting",
    bestUse: "high_dp_letdown_station",
  },
};

const get = (t: ProcessValve) => DATA[t];

export const rangeability = (t: ProcessValve) => get(t).rangeability;
export const tightShutoff = (t: ProcessValve) => get(t).tightShutoff;
export const flowCapacity = (t: ProcessValve) => get(t).flowCapacity;
export const cavitationResist = (t: ProcessValve) => get(t).cavitationResist;
export const pvCost = (t: ProcessValve) => get(t).pvCost;
export const linear = (t: ProcessValve) => get(t).linear;
export const forSanitary = (t: ProcessValve) => get(t).forSanitary;
export const actuator = (t: ProcessValve) => get(t).actuator;
export const bestUse = (t: ProcessValve) => get(t).bestUse;
export const processValves = (): ProcessValve[] => Object.keys(DATA) as ProcessValve[];
