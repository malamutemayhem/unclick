export type PcbStackup =
  | "two_layer_fr4"
  | "four_layer_sig_pwr"
  | "six_layer_impedance"
  | "eight_layer_hdi"
  | "rigid_flex_combo";

const DATA: Record<PcbStackup, {
  layerCount: number; signalIntegrity: number; thermalPerf: number;
  routingDensity: number; stackupCost: number; impedanceCtrl: boolean;
  forRf: boolean; dielectric: string; bestUse: string;
}> = {
  two_layer_fr4: {
    layerCount: 2, signalIntegrity: 3, thermalPerf: 3,
    routingDensity: 2, stackupCost: 1, impedanceCtrl: false,
    forRf: false, dielectric: "standard_fr4_4_5",
    bestUse: "simple_digital_breakout",
  },
  four_layer_sig_pwr: {
    layerCount: 4, signalIntegrity: 6, thermalPerf: 6,
    routingDensity: 5, stackupCost: 3, impedanceCtrl: true,
    forRf: false, dielectric: "mid_tg_fr4_170",
    bestUse: "mcu_embedded_controller",
  },
  six_layer_impedance: {
    layerCount: 6, signalIntegrity: 8, thermalPerf: 7,
    routingDensity: 7, stackupCost: 6, impedanceCtrl: true,
    forRf: true, dielectric: "high_tg_fr4_megtron",
    bestUse: "ddr4_memory_interface",
  },
  eight_layer_hdi: {
    layerCount: 8, signalIntegrity: 9, thermalPerf: 8,
    routingDensity: 10, stackupCost: 9, impedanceCtrl: true,
    forRf: true, dielectric: "low_loss_megtron6",
    bestUse: "fpga_high_speed_design",
  },
  rigid_flex_combo: {
    layerCount: 5, signalIntegrity: 7, thermalPerf: 5,
    routingDensity: 6, stackupCost: 8, impedanceCtrl: true,
    forRf: false, dielectric: "polyimide_flex_fr4",
    bestUse: "wearable_folding_device",
  },
};

const get = (t: PcbStackup) => DATA[t];

export const layerCount = (t: PcbStackup) => get(t).layerCount;
export const signalIntegrity = (t: PcbStackup) => get(t).signalIntegrity;
export const thermalPerf = (t: PcbStackup) => get(t).thermalPerf;
export const routingDensity = (t: PcbStackup) => get(t).routingDensity;
export const stackupCost = (t: PcbStackup) => get(t).stackupCost;
export const impedanceCtrl = (t: PcbStackup) => get(t).impedanceCtrl;
export const forRf = (t: PcbStackup) => get(t).forRf;
export const dielectric = (t: PcbStackup) => get(t).dielectric;
export const bestUse = (t: PcbStackup) => get(t).bestUse;
export const pcbStackups = (): PcbStackup[] => Object.keys(DATA) as PcbStackup[];
