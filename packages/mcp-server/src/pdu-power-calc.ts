export type PduPowerType =
  | "basic_strip_rack"
  | "metered_digital_display"
  | "switched_remote_ctrl"
  | "managed_per_outlet"
  | "auto_transfer_switch";

const DATA: Record<PduPowerType, {
  outletCount: number; monitoring: number; reliability: number;
  manageability: number; pduCost: number; remote: boolean;
  redundant: boolean; formFactor: string; bestUse: string;
}> = {
  basic_strip_rack: { outletCount: 8, monitoring: 1, reliability: 6, manageability: 1, pduCost: 2, remote: false, redundant: false, formFactor: "vertical_0u_strip", bestUse: "lab_rack_basic_power" },
  metered_digital_display: { outletCount: 8, monitoring: 7, reliability: 7, manageability: 4, pduCost: 5, remote: false, redundant: false, formFactor: "vertical_0u_metered", bestUse: "capacity_planning_monitor" },
  switched_remote_ctrl: { outletCount: 8, monitoring: 8, reliability: 8, manageability: 8, pduCost: 7, remote: true, redundant: false, formFactor: "horizontal_1u_switched", bestUse: "remote_outlet_reboot" },
  managed_per_outlet: { outletCount: 10, monitoring: 10, reliability: 9, manageability: 10, pduCost: 9, remote: true, redundant: false, formFactor: "vertical_0u_managed", bestUse: "datacenter_granular_control" },
  auto_transfer_switch: { outletCount: 6, monitoring: 8, reliability: 10, manageability: 7, pduCost: 10, remote: true, redundant: true, formFactor: "rack_ats_dual_input", bestUse: "critical_load_failover" },
};

const get = (t: PduPowerType) => DATA[t];

export const outletCount = (t: PduPowerType) => get(t).outletCount;
export const monitoring = (t: PduPowerType) => get(t).monitoring;
export const reliability = (t: PduPowerType) => get(t).reliability;
export const manageability = (t: PduPowerType) => get(t).manageability;
export const pduCost = (t: PduPowerType) => get(t).pduCost;
export const remote = (t: PduPowerType) => get(t).remote;
export const redundant = (t: PduPowerType) => get(t).redundant;
export const formFactor = (t: PduPowerType) => get(t).formFactor;
export const bestUse = (t: PduPowerType) => get(t).bestUse;
export const pduPowers = (): PduPowerType[] => Object.keys(DATA) as PduPowerType[];
