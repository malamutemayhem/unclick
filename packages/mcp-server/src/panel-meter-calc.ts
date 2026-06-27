export type PanelMeterType =
  | "analog_moving_coil"
  | "digital_led_display"
  | "dual_voltage_current"
  | "frequency_counter_panel"
  | "bargraph_led_level";

const DATA: Record<PanelMeterType, {
  accuracy: number; readability: number; rangeSpan: number;
  responseSpeed: number; meterCost: number; digital: boolean;
  multiFunction: boolean; displayType: string; bestUse: string;
}> = {
  analog_moving_coil: { accuracy: 5, readability: 6, rangeSpan: 5, responseSpeed: 8, meterCost: 3, digital: false, multiFunction: false, displayType: "needle_arc_scale", bestUse: "vu_meter_audio_level" },
  digital_led_display: { accuracy: 8, readability: 9, rangeSpan: 8, responseSpeed: 7, meterCost: 4, digital: true, multiFunction: false, displayType: "seven_seg_led_red", bestUse: "dc_voltage_readout" },
  dual_voltage_current: { accuracy: 7, readability: 8, rangeSpan: 7, responseSpeed: 6, meterCost: 5, digital: true, multiFunction: true, displayType: "dual_led_display", bestUse: "power_supply_monitor" },
  frequency_counter_panel: { accuracy: 9, readability: 8, rangeSpan: 9, responseSpeed: 5, meterCost: 7, digital: true, multiFunction: false, displayType: "lcd_digit_panel", bestUse: "signal_freq_readout" },
  bargraph_led_level: { accuracy: 4, readability: 7, rangeSpan: 4, responseSpeed: 10, meterCost: 3, digital: false, multiFunction: false, displayType: "led_bar_segment", bestUse: "quick_level_indicator" },
};

const get = (t: PanelMeterType) => DATA[t];

export const accuracy = (t: PanelMeterType) => get(t).accuracy;
export const readability = (t: PanelMeterType) => get(t).readability;
export const rangeSpan = (t: PanelMeterType) => get(t).rangeSpan;
export const responseSpeed = (t: PanelMeterType) => get(t).responseSpeed;
export const meterCost = (t: PanelMeterType) => get(t).meterCost;
export const digital = (t: PanelMeterType) => get(t).digital;
export const multiFunction = (t: PanelMeterType) => get(t).multiFunction;
export const displayType = (t: PanelMeterType) => get(t).displayType;
export const bestUse = (t: PanelMeterType) => get(t).bestUse;
export const panelMeters = (): PanelMeterType[] => Object.keys(DATA) as PanelMeterType[];
