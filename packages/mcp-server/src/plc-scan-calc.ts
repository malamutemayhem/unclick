export type PlcScan =
  | "cyclic_fixed_period"
  | "event_driven_interrupt"
  | "free_running_fastest"
  | "periodic_watchdog"
  | "motion_synchronized";

const DATA: Record<PlcScan, {
  determinism: number; throughput: number; jitter: number;
  cpuLoad: number; psCost: number; preemptive: boolean;
  forSafety: boolean; scheduler: string; bestUse: string;
}> = {
  cyclic_fixed_period: {
    determinism: 9, throughput: 6, jitter: 9,
    cpuLoad: 5, psCost: 3, preemptive: false,
    forSafety: true, scheduler: "fixed_priority_cyclic",
    bestUse: "discrete_logic_interlock",
  },
  event_driven_interrupt: {
    determinism: 7, throughput: 8, jitter: 6,
    cpuLoad: 7, psCost: 4, preemptive: true,
    forSafety: false, scheduler: "priority_interrupt_dispatch",
    bestUse: "alarm_fast_response_handler",
  },
  free_running_fastest: {
    determinism: 3, throughput: 10, jitter: 3,
    cpuLoad: 10, psCost: 1, preemptive: false,
    forSafety: false, scheduler: "no_wait_continuous_scan",
    bestUse: "simple_relay_replacement",
  },
  periodic_watchdog: {
    determinism: 10, throughput: 5, jitter: 10,
    cpuLoad: 4, psCost: 5, preemptive: false,
    forSafety: true, scheduler: "watchdog_monitored_period",
    bestUse: "safety_plc_sil3_program",
  },
  motion_synchronized: {
    determinism: 8, throughput: 9, jitter: 8,
    cpuLoad: 8, psCost: 7, preemptive: true,
    forSafety: false, scheduler: "distributed_clock_sync",
    bestUse: "multi_axis_cam_interpolate",
  },
};

const get = (t: PlcScan) => DATA[t];

export const determinism = (t: PlcScan) => get(t).determinism;
export const throughput = (t: PlcScan) => get(t).throughput;
export const jitter = (t: PlcScan) => get(t).jitter;
export const cpuLoad = (t: PlcScan) => get(t).cpuLoad;
export const psCost = (t: PlcScan) => get(t).psCost;
export const preemptive = (t: PlcScan) => get(t).preemptive;
export const forSafety = (t: PlcScan) => get(t).forSafety;
export const scheduler = (t: PlcScan) => get(t).scheduler;
export const bestUse = (t: PlcScan) => get(t).bestUse;
export const plcScans = (): PlcScan[] => Object.keys(DATA) as PlcScan[];
