export type CryoCable =
  | "coax_stainless_steel"
  | "coax_niobium_supercon"
  | "dc_loom_phosphor_bronze"
  | "dc_loom_manganin"
  | "flex_ribbon_kapton";

const DATA: Record<CryoCable, {
  thermalLoad: number; signalLoss: number; bandwidth: number;
  flexibility: number; cbCost: number; superconducting: boolean;
  forRf: boolean; material: string; bestUse: string;
}> = {
  coax_stainless_steel: {
    thermalLoad: 7, signalLoss: 6, bandwidth: 8,
    flexibility: 5, cbCost: 2, superconducting: false,
    forRf: true, material: "stainless_steel_outer_copper",
    bestUse: "qubit_readout_microwave_line",
  },
  coax_niobium_supercon: {
    thermalLoad: 10, signalLoss: 10, bandwidth: 9,
    flexibility: 3, cbCost: 5, superconducting: true,
    forRf: true, material: "niobium_inner_outer_conductor",
    bestUse: "base_stage_low_loss_rf",
  },
  dc_loom_phosphor_bronze: {
    thermalLoad: 6, signalLoss: 5, bandwidth: 3,
    flexibility: 7, cbCost: 1, superconducting: false,
    forRf: false, material: "phosphor_bronze_twisted_pair",
    bestUse: "thermometer_heater_dc_bias",
  },
  dc_loom_manganin: {
    thermalLoad: 8, signalLoss: 4, bandwidth: 3,
    flexibility: 6, cbCost: 2, superconducting: false,
    forRf: false, material: "manganin_alloy_low_thermal",
    bestUse: "precision_dc_measurement_wire",
  },
  flex_ribbon_kapton: {
    thermalLoad: 5, signalLoss: 7, bandwidth: 7,
    flexibility: 10, cbCost: 3, superconducting: false,
    forRf: true, material: "kapton_flex_copper_trace",
    bestUse: "high_density_qubit_fanout",
  },
};

const get = (t: CryoCable) => DATA[t];

export const thermalLoad = (t: CryoCable) => get(t).thermalLoad;
export const signalLoss = (t: CryoCable) => get(t).signalLoss;
export const bandwidth = (t: CryoCable) => get(t).bandwidth;
export const flexibility = (t: CryoCable) => get(t).flexibility;
export const cbCost = (t: CryoCable) => get(t).cbCost;
export const superconducting = (t: CryoCable) => get(t).superconducting;
export const forRf = (t: CryoCable) => get(t).forRf;
export const material = (t: CryoCable) => get(t).material;
export const bestUse = (t: CryoCable) => get(t).bestUse;
export const cryoCables = (): CryoCable[] => Object.keys(DATA) as CryoCable[];
