export type LedDriver =
  | "constant_current_buck"
  | "boost_string_driver"
  | "charge_pump_cap"
  | "linear_ldo_driver"
  | "pwm_dimming_ic";

const DATA: Record<LedDriver, {
  efficiency: number; regulation: number; dimRange: number;
  ripple: number; drvCost: number; integrated: boolean;
  forBacklight: boolean; topology: string; bestUse: string;
}> = {
  constant_current_buck: {
    efficiency: 9, regulation: 9, dimRange: 8,
    ripple: 7, drvCost: 4, integrated: true,
    forBacklight: true, topology: "step_down_inductor",
    bestUse: "automotive_headlamp",
  },
  boost_string_driver: {
    efficiency: 8, regulation: 8, dimRange: 7,
    ripple: 6, drvCost: 5, integrated: true,
    forBacklight: true, topology: "step_up_series_string",
    bestUse: "lcd_backlight_panel",
  },
  charge_pump_cap: {
    efficiency: 7, regulation: 6, dimRange: 5,
    ripple: 5, drvCost: 3, integrated: true,
    forBacklight: false, topology: "switched_capacitor_doubler",
    bestUse: "mobile_flash_indicator",
  },
  linear_ldo_driver: {
    efficiency: 4, regulation: 10, dimRange: 9,
    ripple: 10, drvCost: 2, integrated: true,
    forBacklight: false, topology: "pass_transistor_series",
    bestUse: "camera_flash_precision",
  },
  pwm_dimming_ic: {
    efficiency: 8, regulation: 7, dimRange: 10,
    ripple: 4, drvCost: 6, integrated: false,
    forBacklight: true, topology: "digital_pulse_width_mod",
    bestUse: "rgb_architectural_lighting",
  },
};

const get = (t: LedDriver) => DATA[t];

export const efficiency = (t: LedDriver) => get(t).efficiency;
export const regulation = (t: LedDriver) => get(t).regulation;
export const dimRange = (t: LedDriver) => get(t).dimRange;
export const ripple = (t: LedDriver) => get(t).ripple;
export const drvCost = (t: LedDriver) => get(t).drvCost;
export const integrated = (t: LedDriver) => get(t).integrated;
export const forBacklight = (t: LedDriver) => get(t).forBacklight;
export const topology = (t: LedDriver) => get(t).topology;
export const bestUse = (t: LedDriver) => get(t).bestUse;
export const ledDrivers = (): LedDriver[] => Object.keys(DATA) as LedDriver[];
