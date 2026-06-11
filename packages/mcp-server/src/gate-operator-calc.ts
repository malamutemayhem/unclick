export type GateOperatorType =
  | "slide_gate_rack_pinion"
  | "swing_gate_articulated"
  | "barrier_arm_parking"
  | "vertical_lift_industrial"
  | "underground_swing_hidden";

interface GateOperatorData {
  speed: number;
  loadCapacity: number;
  reliability: number;
  aesthetic: number;
  goCost: number;
  heavyDuty: boolean;
  forCommercial: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<GateOperatorType, GateOperatorData> = {
  slide_gate_rack_pinion: {
    speed: 7, loadCapacity: 9, reliability: 9, aesthetic: 6, goCost: 6,
    heavyDuty: true, forCommercial: true,
    drive: "rack_pinion_chain_drive",
    bestUse: "commercial_large_slide_gate",
  },
  swing_gate_articulated: {
    speed: 6, loadCapacity: 6, reliability: 8, aesthetic: 8, goCost: 5,
    heavyDuty: false, forCommercial: false,
    drive: "articulated_arm_linear_ram",
    bestUse: "residential_driveway_swing",
  },
  barrier_arm_parking: {
    speed: 10, loadCapacity: 2, reliability: 9, aesthetic: 5, goCost: 4,
    heavyDuty: false, forCommercial: true,
    drive: "dc_motor_counterweight_arm",
    bestUse: "parking_lot_toll_booth_lane",
  },
  vertical_lift_industrial: {
    speed: 5, loadCapacity: 10, reliability: 8, aesthetic: 3, goCost: 9,
    heavyDuty: true, forCommercial: true,
    drive: "hydraulic_cable_lift_winch",
    bestUse: "industrial_dock_security_gate",
  },
  underground_swing_hidden: {
    speed: 5, loadCapacity: 7, reliability: 7, aesthetic: 10, goCost: 8,
    heavyDuty: false, forCommercial: false,
    drive: "underground_hydraulic_arm",
    bestUse: "luxury_estate_hidden_operator",
  },
};

function get(t: GateOperatorType): GateOperatorData {
  return DATA[t];
}

export const speed = (t: GateOperatorType) => get(t).speed;
export const loadCapacity = (t: GateOperatorType) => get(t).loadCapacity;
export const reliability = (t: GateOperatorType) => get(t).reliability;
export const aesthetic = (t: GateOperatorType) => get(t).aesthetic;
export const goCost = (t: GateOperatorType) => get(t).goCost;
export const heavyDuty = (t: GateOperatorType) => get(t).heavyDuty;
export const forCommercial = (t: GateOperatorType) => get(t).forCommercial;
export const drive = (t: GateOperatorType) => get(t).drive;
export const bestUse = (t: GateOperatorType) => get(t).bestUse;
export const gateOperatorTypes = (): GateOperatorType[] =>
  Object.keys(DATA) as GateOperatorType[];
