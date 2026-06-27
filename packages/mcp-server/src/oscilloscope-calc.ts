// oscilloscope-calc - oscilloscope types for electronics

export type Oscilloscope =
  | "analog_bench_classic"
  | "digital_storage_std"
  | "mixed_signal_mso"
  | "usb_portable_scope"
  | "handheld_field_scope";

const DATA: Record<Oscilloscope, {
  bandwidth: number; sampleRate: number; channelCount: number; portability: number;
  cost: number; digital: boolean; portable: boolean; triggerType: string; bestUse: string;
}> = {
  analog_bench_classic:  { bandwidth: 5, sampleRate: 4, channelCount: 4, portability: 2, cost: 3, digital: false, portable: false, triggerType: "edge_trigger_basic", bestUse: "analog_waveform_view" },
  digital_storage_std:   { bandwidth: 8, sampleRate: 8, channelCount: 6, portability: 3, cost: 6, digital: true, portable: false, triggerType: "multi_trigger_digital", bestUse: "general_digital_debug" },
  mixed_signal_mso:      { bandwidth: 9, sampleRate: 9, channelCount: 10, portability: 3, cost: 9, digital: true, portable: false, triggerType: "protocol_decode_trigger", bestUse: "mixed_analog_digital" },
  usb_portable_scope:    { bandwidth: 6, sampleRate: 7, channelCount: 4, portability: 9, cost: 4, digital: true, portable: true, triggerType: "software_trigger", bestUse: "laptop_field_capture" },
  handheld_field_scope:  { bandwidth: 7, sampleRate: 6, channelCount: 4, portability: 10, cost: 5, digital: true, portable: true, triggerType: "auto_edge_trigger", bestUse: "field_service_test" },
};

const get = (o: Oscilloscope) => DATA[o];
export const bandwidth = (o: Oscilloscope) => get(o).bandwidth;
export const sampleRate = (o: Oscilloscope) => get(o).sampleRate;
export const channelCount = (o: Oscilloscope) => get(o).channelCount;
export const portability = (o: Oscilloscope) => get(o).portability;
export const scopeCost = (o: Oscilloscope) => get(o).cost;
export const digital = (o: Oscilloscope) => get(o).digital;
export const portable = (o: Oscilloscope) => get(o).portable;
export const triggerType = (o: Oscilloscope) => get(o).triggerType;
export const bestUse = (o: Oscilloscope) => get(o).bestUse;
export const oscilloscopes = (): Oscilloscope[] => Object.keys(DATA) as Oscilloscope[];
