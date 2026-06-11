export type ConnectionTypeType =
  | "welded_complete_joint_cjp"
  | "bolted_bearing_snug"
  | "bolted_slip_critical"
  | "welded_fillet_lap"
  | "pin_clevis_hinge";

interface ConnectionTypeData {
  strength: number;
  stiffness: number;
  ductility: number;
  installEase: number;
  cnCost: number;
  moment: boolean;
  forSeismic: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ConnectionTypeType, ConnectionTypeData> = {
  welded_complete_joint_cjp: {
    strength: 10, stiffness: 10, ductility: 7, installEase: 3, cnCost: 9,
    moment: true, forSeismic: true,
    method: "full_penetration_groove_weld",
    bestUse: "moment_frame_beam_column",
  },
  bolted_bearing_snug: {
    strength: 6, stiffness: 5, ductility: 6, installEase: 9, cnCost: 4,
    moment: false, forSeismic: false,
    method: "snug_tight_bearing_bolt",
    bestUse: "simple_shear_gravity_connection",
  },
  bolted_slip_critical: {
    strength: 8, stiffness: 8, ductility: 5, installEase: 6, cnCost: 7,
    moment: false, forSeismic: true,
    method: "pretension_slip_resist_faying",
    bestUse: "fatigue_vibration_reversal_load",
  },
  welded_fillet_lap: {
    strength: 7, stiffness: 7, ductility: 6, installEase: 7, cnCost: 5,
    moment: false, forSeismic: false,
    method: "fillet_weld_lap_tee_joint",
    bestUse: "gusset_plate_brace_connection",
  },
  pin_clevis_hinge: {
    strength: 5, stiffness: 2, ductility: 9, installEase: 8, cnCost: 6,
    moment: false, forSeismic: false,
    method: "pin_through_clevis_plate",
    bestUse: "truss_arch_hinge_support",
  },
};

function get(t: ConnectionTypeType): ConnectionTypeData {
  return DATA[t];
}

export const strength = (t: ConnectionTypeType) => get(t).strength;
export const stiffness = (t: ConnectionTypeType) => get(t).stiffness;
export const ductility = (t: ConnectionTypeType) => get(t).ductility;
export const installEase = (t: ConnectionTypeType) => get(t).installEase;
export const cnCost = (t: ConnectionTypeType) => get(t).cnCost;
export const moment = (t: ConnectionTypeType) => get(t).moment;
export const forSeismic = (t: ConnectionTypeType) => get(t).forSeismic;
export const method = (t: ConnectionTypeType) => get(t).method;
export const bestUse = (t: ConnectionTypeType) => get(t).bestUse;
export const connectionTypeTypes = (): ConnectionTypeType[] =>
  Object.keys(DATA) as ConnectionTypeType[];
