export type WatchdogTimer =
  | "simple_rc_reset"
  | "window_watchdog"
  | "independent_wdt"
  | "multi_stage_cascade"
  | "safety_lockstep";

const DATA: Record<WatchdogTimer, {
  reliability: number; flexibility: number; latency: number;
  diagCoverage: number; wdtCost: number; windowed: boolean;
  forAutomotive: boolean; architecture: string; bestUse: string;
}> = {
  simple_rc_reset: {
    reliability: 4, flexibility: 2, latency: 8,
    diagCoverage: 3, wdtCost: 1, windowed: false,
    forAutomotive: false, architecture: "rc_monostable",
    bestUse: "consumer_mcu_reset",
  },
  window_watchdog: {
    reliability: 7, flexibility: 7, latency: 6,
    diagCoverage: 7, wdtCost: 4, windowed: true,
    forAutomotive: true, architecture: "early_late_window",
    bestUse: "industrial_plc_safety",
  },
  independent_wdt: {
    reliability: 8, flexibility: 5, latency: 7,
    diagCoverage: 6, wdtCost: 3, windowed: false,
    forAutomotive: false, architecture: "separate_osc_counter",
    bestUse: "iot_remote_recovery",
  },
  multi_stage_cascade: {
    reliability: 9, flexibility: 8, latency: 5,
    diagCoverage: 9, wdtCost: 6, windowed: true,
    forAutomotive: true, architecture: "qa_challenge_response",
    bestUse: "adas_ecu_monitor",
  },
  safety_lockstep: {
    reliability: 10, flexibility: 6, latency: 4,
    diagCoverage: 10, wdtCost: 8, windowed: true,
    forAutomotive: true, architecture: "dual_core_compare",
    bestUse: "iso26262_asild_ecu",
  },
};

const get = (t: WatchdogTimer) => DATA[t];

export const reliability = (t: WatchdogTimer) => get(t).reliability;
export const flexibility = (t: WatchdogTimer) => get(t).flexibility;
export const latency = (t: WatchdogTimer) => get(t).latency;
export const diagCoverage = (t: WatchdogTimer) => get(t).diagCoverage;
export const wdtCost = (t: WatchdogTimer) => get(t).wdtCost;
export const windowed = (t: WatchdogTimer) => get(t).windowed;
export const forAutomotive = (t: WatchdogTimer) => get(t).forAutomotive;
export const architecture = (t: WatchdogTimer) => get(t).architecture;
export const bestUse = (t: WatchdogTimer) => get(t).bestUse;
export const watchdogTimers = (): WatchdogTimer[] => Object.keys(DATA) as WatchdogTimer[];
