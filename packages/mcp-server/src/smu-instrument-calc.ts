export type SmuInstrument =
  | "precision_dc_smu"
  | "pulse_iv_smu"
  | "multi_channel_smu"
  | "high_voltage_smu"
  | "fast_iv_curve";

const DATA: Record<SmuInstrument, {
  accuracy: number; speed: number; channels: number;
  compliance: number; smuCost: number; pulsed: boolean;
  forSemiconductor: boolean; range: string; bestUse: string;
}> = {
  precision_dc_smu: {
    accuracy: 10, speed: 5, channels: 3,
    compliance: 6, smuCost: 7, pulsed: false,
    forSemiconductor: true, range: "femtoamp_to_1a",
    bestUse: "mosfet_id_vg_char",
  },
  pulse_iv_smu: {
    accuracy: 7, speed: 9, channels: 4,
    compliance: 7, smuCost: 8, pulsed: true,
    forSemiconductor: true, range: "nanosec_pulse_10a",
    bestUse: "gan_hemt_thermal_trap",
  },
  multi_channel_smu: {
    accuracy: 8, speed: 6, channels: 9,
    compliance: 6, smuCost: 9, pulsed: false,
    forSemiconductor: true, range: "picoamp_to_3a",
    bestUse: "wafer_level_parametric",
  },
  high_voltage_smu: {
    accuracy: 7, speed: 4, channels: 3,
    compliance: 10, smuCost: 8, pulsed: false,
    forSemiconductor: false, range: "nanoamp_to_3kv",
    bestUse: "breakdown_leakage_test",
  },
  fast_iv_curve: {
    accuracy: 6, speed: 10, channels: 5,
    compliance: 5, smuCost: 5, pulsed: true,
    forSemiconductor: true, range: "microsec_sweep_1a",
    bestUse: "solar_cell_iv_sweep",
  },
};

const get = (t: SmuInstrument) => DATA[t];

export const accuracy = (t: SmuInstrument) => get(t).accuracy;
export const speed = (t: SmuInstrument) => get(t).speed;
export const channels = (t: SmuInstrument) => get(t).channels;
export const compliance = (t: SmuInstrument) => get(t).compliance;
export const smuCost = (t: SmuInstrument) => get(t).smuCost;
export const pulsed = (t: SmuInstrument) => get(t).pulsed;
export const forSemiconductor = (t: SmuInstrument) => get(t).forSemiconductor;
export const range = (t: SmuInstrument) => get(t).range;
export const bestUse = (t: SmuInstrument) => get(t).bestUse;
export const smuInstruments = (): SmuInstrument[] => Object.keys(DATA) as SmuInstrument[];
