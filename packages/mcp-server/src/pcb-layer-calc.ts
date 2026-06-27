export type PcbLayer =
  | "single_sided_1l"
  | "double_sided_2l"
  | "four_layer_standard"
  | "six_layer_hdi"
  | "ten_plus_layer_hpc";

const DATA: Record<PcbLayer, {
  density: number; signalIntegrity: number; thermal: number;
  flexibility: number; layerCost: number; blindVia: boolean;
  forRf: boolean; stackup: string; bestUse: string;
}> = {
  single_sided_1l: {
    density: 2, signalIntegrity: 3, thermal: 3,
    flexibility: 9, layerCost: 1, blindVia: false,
    forRf: false, stackup: "top_copper_fr4_base",
    bestUse: "led_strip_simple_consumer",
  },
  double_sided_2l: {
    density: 5, signalIntegrity: 5, thermal: 5,
    flexibility: 7, layerCost: 2, blindVia: false,
    forRf: false, stackup: "top_core_bottom",
    bestUse: "iot_sensor_breakout",
  },
  four_layer_standard: {
    density: 7, signalIntegrity: 8, thermal: 7,
    flexibility: 5, layerCost: 4, blindVia: false,
    forRf: true, stackup: "sig_gnd_pwr_sig",
    bestUse: "mcu_general_embedded",
  },
  six_layer_hdi: {
    density: 9, signalIntegrity: 9, thermal: 8,
    flexibility: 3, layerCost: 7, blindVia: true,
    forRf: true, stackup: "sig_gnd_sig_sig_pwr_sig",
    bestUse: "smartphone_module_compact",
  },
  ten_plus_layer_hpc: {
    density: 10, signalIntegrity: 10, thermal: 9,
    flexibility: 1, layerCost: 10, blindVia: true,
    forRf: false, stackup: "multi_gnd_pwr_interleave",
    bestUse: "server_fpga_high_pin",
  },
};

const get = (t: PcbLayer) => DATA[t];

export const density = (t: PcbLayer) => get(t).density;
export const signalIntegrity = (t: PcbLayer) => get(t).signalIntegrity;
export const thermal = (t: PcbLayer) => get(t).thermal;
export const flexibility = (t: PcbLayer) => get(t).flexibility;
export const layerCost = (t: PcbLayer) => get(t).layerCost;
export const blindVia = (t: PcbLayer) => get(t).blindVia;
export const forRf = (t: PcbLayer) => get(t).forRf;
export const stackup = (t: PcbLayer) => get(t).stackup;
export const bestUse = (t: PcbLayer) => get(t).bestUse;
export const pcbLayers = (): PcbLayer[] => Object.keys(DATA) as PcbLayer[];
