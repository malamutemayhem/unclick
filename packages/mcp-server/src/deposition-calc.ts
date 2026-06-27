export type Deposition =
  | "pecvd_plasma_enhanced"
  | "lpcvd_low_pressure"
  | "ald_atomic_layer"
  | "pvd_sputter_dc"
  | "ebeam_evaporate";

const DATA: Record<Deposition, {
  conformality: number; purity: number; rate: number;
  temperature: number; dpCost: number; lowTemp: boolean;
  forGate: boolean; precursor: string; bestUse: string;
}> = {
  pecvd_plasma_enhanced: {
    conformality: 5, purity: 6, rate: 9,
    temperature: 8, dpCost: 3, lowTemp: true,
    forGate: false, precursor: "sih4_n2o_plasma_decompose",
    bestUse: "passivation_oxide_nitride",
  },
  lpcvd_low_pressure: {
    conformality: 8, purity: 9, rate: 6,
    temperature: 4, dpCost: 4, lowTemp: false,
    forGate: false, precursor: "teos_thermal_decompose",
    bestUse: "spacer_nitride_conformal",
  },
  ald_atomic_layer: {
    conformality: 10, purity: 10, rate: 2,
    temperature: 7, dpCost: 8, lowTemp: true,
    forGate: true, precursor: "tma_h2o_self_limiting",
    bestUse: "high_k_gate_dielectric_hfo2",
  },
  pvd_sputter_dc: {
    conformality: 3, purity: 7, rate: 8,
    temperature: 9, dpCost: 5, lowTemp: true,
    forGate: false, precursor: "argon_target_bombardment",
    bestUse: "metal_barrier_seed_layer",
  },
  ebeam_evaporate: {
    conformality: 2, purity: 8, rate: 7,
    temperature: 10, dpCost: 6, lowTemp: true,
    forGate: false, precursor: "electron_beam_melt_source",
    bestUse: "liftoff_patterned_metal_contact",
  },
};

const get = (t: Deposition) => DATA[t];

export const conformality = (t: Deposition) => get(t).conformality;
export const purity = (t: Deposition) => get(t).purity;
export const rate = (t: Deposition) => get(t).rate;
export const temperature = (t: Deposition) => get(t).temperature;
export const dpCost = (t: Deposition) => get(t).dpCost;
export const lowTemp = (t: Deposition) => get(t).lowTemp;
export const forGate = (t: Deposition) => get(t).forGate;
export const precursor = (t: Deposition) => get(t).precursor;
export const bestUse = (t: Deposition) => get(t).bestUse;
export const depositions = (): Deposition[] => Object.keys(DATA) as Deposition[];
