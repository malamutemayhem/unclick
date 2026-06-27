export type OscilloscopeType =
  | "dso_digital_storage"
  | "mso_mixed_signal"
  | "dpo_digital_phosphor"
  | "sampling_equivalent_time"
  | "usb_portable_scope";

const DATA: Record<OscilloscopeType, {
  bandwidth: number; sampleRate: number; memoryDepth: number;
  channels: number; oscCost: number; isolated: boolean;
  forEmbedded: boolean; acquisition: string; bestUse: string;
}> = {
  dso_digital_storage: {
    bandwidth: 7, sampleRate: 7, memoryDepth: 8,
    channels: 6, oscCost: 4, isolated: false,
    forEmbedded: true, acquisition: "real_time_adc_capture",
    bestUse: "general_debug_waveform",
  },
  mso_mixed_signal: {
    bandwidth: 8, sampleRate: 8, memoryDepth: 8,
    channels: 10, oscCost: 6, isolated: false,
    forEmbedded: true, acquisition: "analog_plus_digital_bus",
    bestUse: "protocol_decode_debug",
  },
  dpo_digital_phosphor: {
    bandwidth: 9, sampleRate: 9, memoryDepth: 9,
    channels: 7, oscCost: 8, isolated: false,
    forEmbedded: false, acquisition: "intensity_graded_persist",
    bestUse: "signal_integrity_eye",
  },
  sampling_equivalent_time: {
    bandwidth: 10, sampleRate: 10, memoryDepth: 5,
    channels: 4, oscCost: 9, isolated: true,
    forEmbedded: false, acquisition: "sequential_subsampling",
    bestUse: "high_speed_serial_jitter",
  },
  usb_portable_scope: {
    bandwidth: 4, sampleRate: 5, memoryDepth: 6,
    channels: 5, oscCost: 1, isolated: false,
    forEmbedded: true, acquisition: "pc_hosted_stream",
    bestUse: "field_service_portable",
  },
};

const get = (t: OscilloscopeType) => DATA[t];

export const bandwidth = (t: OscilloscopeType) => get(t).bandwidth;
export const sampleRate = (t: OscilloscopeType) => get(t).sampleRate;
export const memoryDepth = (t: OscilloscopeType) => get(t).memoryDepth;
export const channels = (t: OscilloscopeType) => get(t).channels;
export const oscCost = (t: OscilloscopeType) => get(t).oscCost;
export const isolated = (t: OscilloscopeType) => get(t).isolated;
export const forEmbedded = (t: OscilloscopeType) => get(t).forEmbedded;
export const acquisition = (t: OscilloscopeType) => get(t).acquisition;
export const bestUse = (t: OscilloscopeType) => get(t).bestUse;
export const oscilloscopeTypes = (): OscilloscopeType[] => Object.keys(DATA) as OscilloscopeType[];
