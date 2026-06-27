export type Watchdog =
  | "internal_wdt_mcu"
  | "external_ic_monitor"
  | "window_watchdog_wwdg"
  | "dual_watchdog_safety"
  | "software_task_monitor";

const DATA: Record<Watchdog, {
  reliability: number; coverage: number; latency: number;
  independence: number; wdCost: number; windowMode: boolean;
  forSafety: boolean; reset: string; bestUse: string;
}> = {
  internal_wdt_mcu: {
    reliability: 5, coverage: 5, latency: 8,
    independence: 3, wdCost: 1, windowMode: false,
    forSafety: false, reset: "system_reset_on_timeout",
    bestUse: "basic_firmware_hang_recovery",
  },
  external_ic_monitor: {
    reliability: 9, coverage: 7, latency: 7,
    independence: 10, wdCost: 4, windowMode: false,
    forSafety: true, reset: "external_reset_pin_assert",
    bestUse: "independent_supervisor_power_seq",
  },
  window_watchdog_wwdg: {
    reliability: 7, coverage: 9, latency: 6,
    independence: 5, wdCost: 2, windowMode: true,
    forSafety: true, reset: "early_late_window_violation",
    bestUse: "timing_critical_loop_check",
  },
  dual_watchdog_safety: {
    reliability: 10, coverage: 10, latency: 5,
    independence: 9, wdCost: 5, windowMode: true,
    forSafety: true, reset: "dual_timeout_safe_state",
    bestUse: "automotive_asil_d_lockstep",
  },
  software_task_monitor: {
    reliability: 4, coverage: 8, latency: 10,
    independence: 2, wdCost: 1, windowMode: false,
    forSafety: false, reset: "task_restart_escalate_reset",
    bestUse: "rtos_task_alive_heartbeat",
  },
};

const get = (t: Watchdog) => DATA[t];

export const reliability = (t: Watchdog) => get(t).reliability;
export const coverage = (t: Watchdog) => get(t).coverage;
export const latency = (t: Watchdog) => get(t).latency;
export const independence = (t: Watchdog) => get(t).independence;
export const wdCost = (t: Watchdog) => get(t).wdCost;
export const windowMode = (t: Watchdog) => get(t).windowMode;
export const forSafety = (t: Watchdog) => get(t).forSafety;
export const reset = (t: Watchdog) => get(t).reset;
export const bestUse = (t: Watchdog) => get(t).bestUse;
export const watchdogs = (): Watchdog[] => Object.keys(DATA) as Watchdog[];
