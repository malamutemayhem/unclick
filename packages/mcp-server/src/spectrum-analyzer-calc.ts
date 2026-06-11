export type SpectrumAnalyzerType =
  | "benchtop_rf_full"
  | "handheld_field_portable"
  | "usb_pc_based"
  | "real_time_wideband"
  | "audio_fft_analyzer";

const DATA: Record<SpectrumAnalyzerType, {
  freqRange: number; dynamicRange: number; sensitivity: number;
  portability: number; analyzerCost: number; realTime: boolean;
  portable: boolean; displayType: string; bestUse: string;
}> = {
  benchtop_rf_full: { freqRange: 9, dynamicRange: 10, sensitivity: 10, portability: 2, analyzerCost: 9, realTime: false, portable: false, displayType: "large_color_lcd", bestUse: "lab_rf_characterize" },
  handheld_field_portable: { freqRange: 6, dynamicRange: 6, sensitivity: 6, portability: 10, analyzerCost: 6, realTime: false, portable: true, displayType: "rugged_touch_lcd", bestUse: "field_interference_hunt" },
  usb_pc_based: { freqRange: 7, dynamicRange: 7, sensitivity: 7, portability: 8, analyzerCost: 4, realTime: false, portable: true, displayType: "pc_software_render", bestUse: "budget_lab_rf_measure" },
  real_time_wideband: { freqRange: 10, dynamicRange: 9, sensitivity: 9, portability: 2, analyzerCost: 10, realTime: true, portable: false, displayType: "spectrogram_waterfall", bestUse: "transient_signal_capture" },
  audio_fft_analyzer: { freqRange: 2, dynamicRange: 8, sensitivity: 8, portability: 7, analyzerCost: 3, realTime: true, portable: true, displayType: "pc_audio_spectrum", bestUse: "audio_speaker_response" },
};

const get = (t: SpectrumAnalyzerType) => DATA[t];

export const freqRange = (t: SpectrumAnalyzerType) => get(t).freqRange;
export const dynamicRange = (t: SpectrumAnalyzerType) => get(t).dynamicRange;
export const sensitivity = (t: SpectrumAnalyzerType) => get(t).sensitivity;
export const portability = (t: SpectrumAnalyzerType) => get(t).portability;
export const analyzerCost = (t: SpectrumAnalyzerType) => get(t).analyzerCost;
export const realTime = (t: SpectrumAnalyzerType) => get(t).realTime;
export const portable = (t: SpectrumAnalyzerType) => get(t).portable;
export const displayType = (t: SpectrumAnalyzerType) => get(t).displayType;
export const bestUse = (t: SpectrumAnalyzerType) => get(t).bestUse;
export const spectrumAnalyzers = (): SpectrumAnalyzerType[] => Object.keys(DATA) as SpectrumAnalyzerType[];
