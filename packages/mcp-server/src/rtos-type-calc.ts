export type RtosType =
  | "preemptive_priority"
  | "cooperative_round"
  | "tickless_deferred"
  | "microkernel_ipc"
  | "safety_certified";

const DATA: Record<RtosType, {
  latency: number; footprint: number; determinism: number;
  ecosystem: number; rtosCost: number; openSource: boolean;
  forSafety: boolean; scheduler: string; bestUse: string;
}> = {
  preemptive_priority: {
    latency: 8, footprint: 7, determinism: 8,
    ecosystem: 9, rtosCost: 3, openSource: true,
    forSafety: false, scheduler: "fixed_priority_preempt",
    bestUse: "iot_sensor_gateway",
  },
  cooperative_round: {
    latency: 5, footprint: 9, determinism: 5,
    ecosystem: 5, rtosCost: 1, openSource: true,
    forSafety: false, scheduler: "round_robin_yield",
    bestUse: "ultra_low_power_node",
  },
  tickless_deferred: {
    latency: 9, footprint: 7, determinism: 9,
    ecosystem: 8, rtosCost: 3, openSource: true,
    forSafety: false, scheduler: "dynamic_tick_suppress",
    bestUse: "wearable_ble_device",
  },
  microkernel_ipc: {
    latency: 7, footprint: 6, determinism: 8,
    ecosystem: 7, rtosCost: 5, openSource: true,
    forSafety: true, scheduler: "message_passing_isolated",
    bestUse: "avionics_mixed_crit",
  },
  safety_certified: {
    latency: 8, footprint: 5, determinism: 10,
    ecosystem: 6, rtosCost: 9, openSource: false,
    forSafety: true, scheduler: "wcet_analyzed_static",
    bestUse: "automotive_asil_d_ecu",
  },
};

const get = (t: RtosType) => DATA[t];

export const latency = (t: RtosType) => get(t).latency;
export const footprint = (t: RtosType) => get(t).footprint;
export const determinism = (t: RtosType) => get(t).determinism;
export const ecosystem = (t: RtosType) => get(t).ecosystem;
export const rtosCost = (t: RtosType) => get(t).rtosCost;
export const openSource = (t: RtosType) => get(t).openSource;
export const forSafety = (t: RtosType) => get(t).forSafety;
export const scheduler = (t: RtosType) => get(t).scheduler;
export const bestUse = (t: RtosType) => get(t).bestUse;
export const rtosTypes = (): RtosType[] => Object.keys(DATA) as RtosType[];
