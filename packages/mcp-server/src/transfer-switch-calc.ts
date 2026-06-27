export type TransferSwitchType =
  | "automatic_ats_open"
  | "manual_double_throw"
  | "static_solid_state"
  | "bypass_isolation_ats"
  | "closed_transition_cts";

interface TransferSwitchData {
  speed: number;
  reliability: number;
  capacity: number;
  maintenance: number;
  tsCost: number;
  automatic: boolean;
  forCritical: boolean;
  transfer: string;
  bestUse: string;
}

const DATA: Record<TransferSwitchType, TransferSwitchData> = {
  automatic_ats_open: {
    speed: 7, reliability: 9, capacity: 8, maintenance: 8, tsCost: 6,
    automatic: true, forCritical: false,
    transfer: "open_transition_break_make",
    bestUse: "commercial_standby_generator",
  },
  manual_double_throw: {
    speed: 2, reliability: 9, capacity: 6, maintenance: 9, tsCost: 2,
    automatic: false, forCritical: false,
    transfer: "manual_handle_double_throw",
    bestUse: "residential_portable_generator",
  },
  static_solid_state: {
    speed: 10, reliability: 9, capacity: 7, maintenance: 8, tsCost: 10,
    automatic: true, forCritical: true,
    transfer: "scr_thyristor_zero_break",
    bestUse: "data_center_zero_downtime",
  },
  bypass_isolation_ats: {
    speed: 7, reliability: 10, capacity: 9, maintenance: 10, tsCost: 8,
    automatic: true, forCritical: true,
    transfer: "ats_with_bypass_drawout",
    bestUse: "hospital_mission_critical_power",
  },
  closed_transition_cts: {
    speed: 8, reliability: 9, capacity: 8, maintenance: 7, tsCost: 7,
    automatic: true, forCritical: false,
    transfer: "closed_make_before_break",
    bestUse: "industrial_no_interruption",
  },
};

function get(t: TransferSwitchType): TransferSwitchData {
  return DATA[t];
}

export const speed = (t: TransferSwitchType) => get(t).speed;
export const reliability = (t: TransferSwitchType) => get(t).reliability;
export const capacity = (t: TransferSwitchType) => get(t).capacity;
export const maintenance = (t: TransferSwitchType) => get(t).maintenance;
export const tsCost = (t: TransferSwitchType) => get(t).tsCost;
export const automatic = (t: TransferSwitchType) => get(t).automatic;
export const forCritical = (t: TransferSwitchType) => get(t).forCritical;
export const transfer = (t: TransferSwitchType) => get(t).transfer;
export const bestUse = (t: TransferSwitchType) => get(t).bestUse;
export const transferSwitchTypes = (): TransferSwitchType[] =>
  Object.keys(DATA) as TransferSwitchType[];
