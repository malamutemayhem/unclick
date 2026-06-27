export type PcbTraceType =
  | "standard_fr4_copper"
  | "heavy_copper_power"
  | "impedance_controlled"
  | "flex_polyimide_thin"
  | "aluminum_core_led";

const DATA: Record<PcbTraceType, {
  currentCapacity: number; signalIntegrity: number; thermalConduct: number;
  flexibility: number; traceCost: number; multilayer: boolean;
  forHighFreq: boolean; substrateType: string; bestUse: string;
}> = {
  standard_fr4_copper: { currentCapacity: 6, signalIntegrity: 6, thermalConduct: 5, flexibility: 2, traceCost: 2, multilayer: true, forHighFreq: false, substrateType: "glass_epoxy_fr4", bestUse: "general_digital_logic" },
  heavy_copper_power: { currentCapacity: 10, signalIntegrity: 4, thermalConduct: 8, flexibility: 1, traceCost: 6, multilayer: false, forHighFreq: false, substrateType: "thick_copper_fr4", bestUse: "power_converter_board" },
  impedance_controlled: { currentCapacity: 5, signalIntegrity: 10, thermalConduct: 5, flexibility: 2, traceCost: 7, multilayer: true, forHighFreq: true, substrateType: "low_loss_dielectric", bestUse: "high_speed_ddr_route" },
  flex_polyimide_thin: { currentCapacity: 3, signalIntegrity: 7, thermalConduct: 4, flexibility: 10, traceCost: 8, multilayer: false, forHighFreq: false, substrateType: "polyimide_flex_film", bestUse: "wearable_fold_connect" },
  aluminum_core_led: { currentCapacity: 7, signalIntegrity: 4, thermalConduct: 10, flexibility: 1, traceCost: 4, multilayer: false, forHighFreq: false, substrateType: "aluminum_base_dielectric", bestUse: "led_array_heatsink" },
};

const get = (t: PcbTraceType) => DATA[t];

export const currentCapacity = (t: PcbTraceType) => get(t).currentCapacity;
export const signalIntegrity = (t: PcbTraceType) => get(t).signalIntegrity;
export const thermalConduct = (t: PcbTraceType) => get(t).thermalConduct;
export const flexibility = (t: PcbTraceType) => get(t).flexibility;
export const traceCost = (t: PcbTraceType) => get(t).traceCost;
export const multilayer = (t: PcbTraceType) => get(t).multilayer;
export const forHighFreq = (t: PcbTraceType) => get(t).forHighFreq;
export const substrateType = (t: PcbTraceType) => get(t).substrateType;
export const bestUse = (t: PcbTraceType) => get(t).bestUse;
export const pcbTraces = (): PcbTraceType[] => Object.keys(DATA) as PcbTraceType[];
