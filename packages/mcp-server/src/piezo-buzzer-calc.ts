export type PiezoBuzzerType =
  | "active_dc_drive"
  | "passive_freq_drive"
  | "smd_surface_mount"
  | "enclosed_panel_mount"
  | "transducer_ext_driver";

const DATA: Record<PiezoBuzzerType, {
  soundLevel: number; freqRange: number; sizeCompact: number;
  powerDraw: number; buzzerCost: number; selfOscillate: boolean;
  forAlarm: boolean; driveMethod: string; bestUse: string;
}> = {
  active_dc_drive: { soundLevel: 7, freqRange: 3, sizeCompact: 7, powerDraw: 6, buzzerCost: 2, selfOscillate: true, forAlarm: true, driveMethod: "internal_oscillator_dc", bestUse: "simple_alert_beep" },
  passive_freq_drive: { soundLevel: 6, freqRange: 9, sizeCompact: 7, powerDraw: 7, buzzerCost: 2, selfOscillate: false, forAlarm: false, driveMethod: "external_square_wave", bestUse: "melody_tone_output" },
  smd_surface_mount: { soundLevel: 5, freqRange: 5, sizeCompact: 10, powerDraw: 8, buzzerCost: 3, selfOscillate: true, forAlarm: false, driveMethod: "smd_integrated_drive", bestUse: "compact_device_alert" },
  enclosed_panel_mount: { soundLevel: 10, freqRange: 4, sizeCompact: 3, powerDraw: 4, buzzerCost: 5, selfOscillate: true, forAlarm: true, driveMethod: "panel_mount_resonant", bestUse: "industrial_alarm_loud" },
  transducer_ext_driver: { soundLevel: 8, freqRange: 10, sizeCompact: 5, powerDraw: 5, buzzerCost: 4, selfOscillate: false, forAlarm: false, driveMethod: "bare_element_external", bestUse: "ultrasonic_range_emit" },
};

const get = (t: PiezoBuzzerType) => DATA[t];

export const soundLevel = (t: PiezoBuzzerType) => get(t).soundLevel;
export const freqRange = (t: PiezoBuzzerType) => get(t).freqRange;
export const sizeCompact = (t: PiezoBuzzerType) => get(t).sizeCompact;
export const powerDraw = (t: PiezoBuzzerType) => get(t).powerDraw;
export const buzzerCost = (t: PiezoBuzzerType) => get(t).buzzerCost;
export const selfOscillate = (t: PiezoBuzzerType) => get(t).selfOscillate;
export const forAlarm = (t: PiezoBuzzerType) => get(t).forAlarm;
export const driveMethod = (t: PiezoBuzzerType) => get(t).driveMethod;
export const bestUse = (t: PiezoBuzzerType) => get(t).bestUse;
export const piezoBuzzers = (): PiezoBuzzerType[] => Object.keys(DATA) as PiezoBuzzerType[];
