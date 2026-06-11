export type InterruptMode =
  | "nested_nvic"
  | "vectored_direct"
  | "polled_status"
  | "event_wakeup"
  | "dma_triggered";

const DATA: Record<InterruptMode, {
  latency: number; determinism: number; throughput: number;
  cpuLoad: number; intCost: number; preemptive: boolean;
  forRealtime: boolean; mechanism: string; bestUse: string;
}> = {
  nested_nvic: {
    latency: 9, determinism: 9, throughput: 7,
    cpuLoad: 5, intCost: 2, preemptive: true,
    forRealtime: true, mechanism: "priority_tail_chaining",
    bestUse: "rtos_isr_priority_scheme",
  },
  vectored_direct: {
    latency: 10, determinism: 10, throughput: 6,
    cpuLoad: 6, intCost: 3, preemptive: false,
    forRealtime: true, mechanism: "hardware_vector_jump",
    bestUse: "safety_critical_response",
  },
  polled_status: {
    latency: 3, determinism: 5, throughput: 4,
    cpuLoad: 2, intCost: 1, preemptive: false,
    forRealtime: false, mechanism: "register_flag_check_loop",
    bestUse: "simple_bare_metal_loop",
  },
  event_wakeup: {
    latency: 6, determinism: 7, throughput: 3,
    cpuLoad: 9, intCost: 2, preemptive: false,
    forRealtime: false, mechanism: "wfe_sev_core_wake",
    bestUse: "low_power_sleep_wake",
  },
  dma_triggered: {
    latency: 7, determinism: 8, throughput: 10,
    cpuLoad: 10, intCost: 4, preemptive: false,
    forRealtime: true, mechanism: "transfer_complete_callback",
    bestUse: "high_speed_data_pipeline",
  },
};

const get = (t: InterruptMode) => DATA[t];

export const latency = (t: InterruptMode) => get(t).latency;
export const determinism = (t: InterruptMode) => get(t).determinism;
export const throughput = (t: InterruptMode) => get(t).throughput;
export const cpuLoad = (t: InterruptMode) => get(t).cpuLoad;
export const intCost = (t: InterruptMode) => get(t).intCost;
export const preemptive = (t: InterruptMode) => get(t).preemptive;
export const forRealtime = (t: InterruptMode) => get(t).forRealtime;
export const mechanism = (t: InterruptMode) => get(t).mechanism;
export const bestUse = (t: InterruptMode) => get(t).bestUse;
export const interruptModes = (): InterruptMode[] => Object.keys(DATA) as InterruptMode[];
