export type FunctionGenType =
  | "dds_benchtop_basic"
  | "arbitrary_waveform"
  | "rf_signal_source"
  | "usb_compact_module"
  | "pulse_pattern_gen";

const DATA: Record<FunctionGenType, {
  freqRange: number; waveformCount: number; accuracy: number;
  outputChannels: number; genCost: number; arbitrary: boolean;
  portable: boolean; outputType: string; bestUse: string;
}> = {
  dds_benchtop_basic: { freqRange: 6, waveformCount: 5, accuracy: 7, outputChannels: 4, genCost: 4, arbitrary: false, portable: false, outputType: "sine_square_triangle", bestUse: "general_bench_stimulus" },
  arbitrary_waveform: { freqRange: 8, waveformCount: 10, accuracy: 9, outputChannels: 6, genCost: 8, arbitrary: true, portable: false, outputType: "custom_waveform_memory", bestUse: "complex_signal_simulate" },
  rf_signal_source: { freqRange: 10, waveformCount: 3, accuracy: 9, outputChannels: 3, genCost: 9, arbitrary: false, portable: false, outputType: "modulated_rf_carrier", bestUse: "rf_receiver_test" },
  usb_compact_module: { freqRange: 5, waveformCount: 6, accuracy: 6, outputChannels: 4, genCost: 2, arbitrary: true, portable: true, outputType: "pc_controlled_dds", bestUse: "portable_field_signal" },
  pulse_pattern_gen: { freqRange: 7, waveformCount: 4, accuracy: 10, outputChannels: 8, genCost: 7, arbitrary: false, portable: false, outputType: "digital_pulse_pattern", bestUse: "serial_bus_jitter_test" },
};

const get = (t: FunctionGenType) => DATA[t];

export const freqRange = (t: FunctionGenType) => get(t).freqRange;
export const waveformCount = (t: FunctionGenType) => get(t).waveformCount;
export const accuracy = (t: FunctionGenType) => get(t).accuracy;
export const outputChannels = (t: FunctionGenType) => get(t).outputChannels;
export const genCost = (t: FunctionGenType) => get(t).genCost;
export const arbitrary = (t: FunctionGenType) => get(t).arbitrary;
export const portable = (t: FunctionGenType) => get(t).portable;
export const outputType = (t: FunctionGenType) => get(t).outputType;
export const bestUse = (t: FunctionGenType) => get(t).bestUse;
export const functionGens = (): FunctionGenType[] => Object.keys(DATA) as FunctionGenType[];
