export type ProfinetModeType =
  | "profinet_rt"
  | "profinet_irt"
  | "profinet_cba"
  | "profinet_mrp"
  | "profinet_tsn";

const DATA: Record<ProfinetModeType, {
  cycleTime: number; determinism: number; bandwidth: number;
  redundancy: number; modeCost: number; hardwareSync: boolean;
  forMotion: boolean; scheduling: string; bestUse: string;
}> = {
  profinet_rt: { cycleTime: 5, determinism: 5, bandwidth: 7, redundancy: 4, modeCost: 3, hardwareSync: false, forMotion: false, scheduling: "software_rt_1ms", bestUse: "standard_io_plc_link" },
  profinet_irt: { cycleTime: 10, determinism: 10, bandwidth: 8, redundancy: 6, modeCost: 7, hardwareSync: true, forMotion: true, scheduling: "hardware_irt_31us", bestUse: "servo_drive_sync_axis" },
  profinet_cba: { cycleTime: 3, determinism: 3, bandwidth: 6, redundancy: 3, modeCost: 4, hardwareSync: false, forMotion: false, scheduling: "component_model_dcom", bestUse: "modular_machine_design" },
  profinet_mrp: { cycleTime: 5, determinism: 5, bandwidth: 7, redundancy: 9, modeCost: 5, hardwareSync: false, forMotion: false, scheduling: "media_redundancy_ring", bestUse: "ring_topology_failover" },
  profinet_tsn: { cycleTime: 9, determinism: 9, bandwidth: 10, redundancy: 8, modeCost: 8, hardwareSync: true, forMotion: true, scheduling: "tsn_802_1qbv_gate", bestUse: "converged_it_ot_network" },
};

const get = (t: ProfinetModeType) => DATA[t];

export const cycleTime = (t: ProfinetModeType) => get(t).cycleTime;
export const determinism = (t: ProfinetModeType) => get(t).determinism;
export const bandwidth = (t: ProfinetModeType) => get(t).bandwidth;
export const redundancy = (t: ProfinetModeType) => get(t).redundancy;
export const modeCost = (t: ProfinetModeType) => get(t).modeCost;
export const hardwareSync = (t: ProfinetModeType) => get(t).hardwareSync;
export const forMotion = (t: ProfinetModeType) => get(t).forMotion;
export const scheduling = (t: ProfinetModeType) => get(t).scheduling;
export const bestUse = (t: ProfinetModeType) => get(t).bestUse;
export const profinetModes = (): ProfinetModeType[] => Object.keys(DATA) as ProfinetModeType[];
