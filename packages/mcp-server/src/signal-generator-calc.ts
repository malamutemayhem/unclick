// signal-generator-calc - signal generator types for electronics

export type SignalGenerator =
  | "function_gen_basic"
  | "arbitrary_waveform_adv"
  | "rf_signal_gen_high"
  | "pulse_gen_digital"
  | "audio_gen_test";

const DATA: Record<SignalGenerator, {
  freqRange: number; waveformCount: number; outputAccuracy: number; portability: number;
  cost: number; programmable: boolean; forRf: boolean; outputType: string; bestUse: string;
}> = {
  function_gen_basic:        { freqRange: 6, waveformCount: 5, outputAccuracy: 7, portability: 6, cost: 4, programmable: false, forRf: false, outputType: "sine_square_triangle", bestUse: "general_bench_signal" },
  arbitrary_waveform_adv:    { freqRange: 8, waveformCount: 10, outputAccuracy: 9, portability: 4, cost: 8, programmable: true, forRf: false, outputType: "arbitrary_point_wave", bestUse: "custom_waveform_test" },
  rf_signal_gen_high:        { freqRange: 10, waveformCount: 6, outputAccuracy: 10, portability: 3, cost: 10, programmable: true, forRf: true, outputType: "modulated_rf_carrier", bestUse: "rf_receiver_test" },
  pulse_gen_digital:         { freqRange: 7, waveformCount: 4, outputAccuracy: 8, portability: 5, cost: 6, programmable: true, forRf: false, outputType: "precise_digital_pulse", bestUse: "digital_timing_test" },
  audio_gen_test:            { freqRange: 4, waveformCount: 7, outputAccuracy: 8, portability: 8, cost: 3, programmable: false, forRf: false, outputType: "audio_sweep_tone", bestUse: "audio_circuit_test" },
};

const get = (s: SignalGenerator) => DATA[s];
export const freqRange = (s: SignalGenerator) => get(s).freqRange;
export const waveformCount = (s: SignalGenerator) => get(s).waveformCount;
export const outputAccuracy = (s: SignalGenerator) => get(s).outputAccuracy;
export const portability = (s: SignalGenerator) => get(s).portability;
export const genCost = (s: SignalGenerator) => get(s).cost;
export const programmable = (s: SignalGenerator) => get(s).programmable;
export const forRf = (s: SignalGenerator) => get(s).forRf;
export const outputType = (s: SignalGenerator) => get(s).outputType;
export const bestUse = (s: SignalGenerator) => get(s).bestUse;
export const signalGenerators = (): SignalGenerator[] => Object.keys(DATA) as SignalGenerator[];
