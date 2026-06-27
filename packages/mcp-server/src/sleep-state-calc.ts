export type SleepState =
  | "run_active"
  | "sleep_wfi"
  | "low_power_sleep"
  | "stop_retention"
  | "standby_vbat";

const DATA: Record<SleepState, {
  wakeTime: number; retention: number; peripheralActive: number;
  powerSave: number; slpCost: number; sramRetained: boolean;
  forBattery: boolean; wakeSource: string; bestUse: string;
}> = {
  run_active: {
    wakeTime: 10, retention: 10, peripheralActive: 10,
    powerSave: 1, slpCost: 1, sramRetained: true,
    forBattery: false, wakeSource: "already_running",
    bestUse: "continuous_processing",
  },
  sleep_wfi: {
    wakeTime: 9, retention: 10, peripheralActive: 8,
    powerSave: 3, slpCost: 1, sramRetained: true,
    forBattery: false, wakeSource: "any_interrupt_event",
    bestUse: "idle_between_interrupts",
  },
  low_power_sleep: {
    wakeTime: 7, retention: 9, peripheralActive: 5,
    powerSave: 6, slpCost: 2, sramRetained: true,
    forBattery: true, wakeSource: "select_peripheral_irq",
    bestUse: "periodic_sensor_sample",
  },
  stop_retention: {
    wakeTime: 4, retention: 7, peripheralActive: 2,
    powerSave: 8, slpCost: 3, sramRetained: true,
    forBattery: true, wakeSource: "rtc_exti_lpuart",
    bestUse: "minute_interval_transmit",
  },
  standby_vbat: {
    wakeTime: 2, retention: 2, peripheralActive: 1,
    powerSave: 10, slpCost: 4, sramRetained: false,
    forBattery: true, wakeSource: "wakeup_pin_rtc_alarm",
    bestUse: "daily_report_beacon",
  },
};

const get = (t: SleepState) => DATA[t];

export const wakeTime = (t: SleepState) => get(t).wakeTime;
export const retention = (t: SleepState) => get(t).retention;
export const peripheralActive = (t: SleepState) => get(t).peripheralActive;
export const powerSave = (t: SleepState) => get(t).powerSave;
export const slpCost = (t: SleepState) => get(t).slpCost;
export const sramRetained = (t: SleepState) => get(t).sramRetained;
export const forBattery = (t: SleepState) => get(t).forBattery;
export const wakeSource = (t: SleepState) => get(t).wakeSource;
export const bestUse = (t: SleepState) => get(t).bestUse;
export const sleepStates = (): SleepState[] => Object.keys(DATA) as SleepState[];
