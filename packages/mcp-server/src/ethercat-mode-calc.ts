export type EthercatModeType =
  | "freerun_async"
  | "sync_dc_clock"
  | "sync0_event"
  | "distributed_clock"
  | "redundancy_cable";

const DATA: Record<EthercatModeType, {
  cycleTime: number; jitter: number; nodeCapacity: number;
  cabling: number; modeCost: number; dcSync: boolean;
  forServo: boolean; syncMethod: string; bestUse: string;
}> = {
  freerun_async: { cycleTime: 4, jitter: 3, nodeCapacity: 8, cabling: 8, modeCost: 1, dcSync: false, forServo: false, syncMethod: "no_sync_freerun", bestUse: "simple_io_no_timing" },
  sync_dc_clock: { cycleTime: 8, jitter: 9, nodeCapacity: 8, cabling: 7, modeCost: 3, dcSync: true, forServo: true, syncMethod: "dc_64bit_clock", bestUse: "multi_axis_cnc_sync" },
  sync0_event: { cycleTime: 9, jitter: 10, nodeCapacity: 7, cabling: 7, modeCost: 4, dcSync: true, forServo: true, syncMethod: "sync0_interrupt_hw", bestUse: "precise_trigger_output" },
  distributed_clock: { cycleTime: 10, jitter: 10, nodeCapacity: 9, cabling: 6, modeCost: 5, dcSync: true, forServo: true, syncMethod: "dc_propagation_comp", bestUse: "sub_microsecond_motion" },
  redundancy_cable: { cycleTime: 7, jitter: 7, nodeCapacity: 8, cabling: 10, modeCost: 6, dcSync: true, forServo: false, syncMethod: "hot_connect_ring", bestUse: "fault_tolerant_ring" },
};

const get = (t: EthercatModeType) => DATA[t];

export const cycleTime = (t: EthercatModeType) => get(t).cycleTime;
export const jitter = (t: EthercatModeType) => get(t).jitter;
export const nodeCapacity = (t: EthercatModeType) => get(t).nodeCapacity;
export const cabling = (t: EthercatModeType) => get(t).cabling;
export const modeCost = (t: EthercatModeType) => get(t).modeCost;
export const dcSync = (t: EthercatModeType) => get(t).dcSync;
export const forServo = (t: EthercatModeType) => get(t).forServo;
export const syncMethod = (t: EthercatModeType) => get(t).syncMethod;
export const bestUse = (t: EthercatModeType) => get(t).bestUse;
export const ethercatModes = (): EthercatModeType[] => Object.keys(DATA) as EthercatModeType[];
