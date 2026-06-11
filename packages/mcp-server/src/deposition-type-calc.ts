export type DepositionType =
  | "pecvd_plasma"
  | "lpcvd_thermal"
  | "ald_atomic_dep"
  | "pvd_sputter"
  | "epi_epitaxial";

const DATA: Record<DepositionType, {
  conformality: number; filmQuality: number; throughput: number;
  tempBudget: number; depCost: number; lowTemp: boolean;
  forGate: boolean; method: string; bestUse: string;
}> = {
  pecvd_plasma: {
    conformality: 5, filmQuality: 5, throughput: 8,
    tempBudget: 9, depCost: 3, lowTemp: true,
    forGate: false, method: "plasma_enhanced_cvd",
    bestUse: "passivation_sin",
  },
  lpcvd_thermal: {
    conformality: 8, filmQuality: 8, throughput: 6,
    tempBudget: 3, depCost: 4, lowTemp: false,
    forGate: false, method: "low_pressure_batch",
    bestUse: "poly_gate_dep",
  },
  ald_atomic_dep: {
    conformality: 10, filmQuality: 10, throughput: 3,
    tempBudget: 7, depCost: 9, lowTemp: true,
    forGate: true, method: "precursor_pulse_cycle",
    bestUse: "high_k_gate_oxide",
  },
  pvd_sputter: {
    conformality: 3, filmQuality: 7, throughput: 9,
    tempBudget: 10, depCost: 5, lowTemp: true,
    forGate: false, method: "magnetron_target",
    bestUse: "metal_barrier_liner",
  },
  epi_epitaxial: {
    conformality: 6, filmQuality: 10, throughput: 5,
    tempBudget: 2, depCost: 8, lowTemp: false,
    forGate: false, method: "chemical_vapor_epi",
    bestUse: "sige_channel_strain",
  },
};

const get = (t: DepositionType) => DATA[t];

export const conformality = (t: DepositionType) => get(t).conformality;
export const filmQuality = (t: DepositionType) => get(t).filmQuality;
export const throughput = (t: DepositionType) => get(t).throughput;
export const tempBudget = (t: DepositionType) => get(t).tempBudget;
export const depCost = (t: DepositionType) => get(t).depCost;
export const lowTemp = (t: DepositionType) => get(t).lowTemp;
export const forGate = (t: DepositionType) => get(t).forGate;
export const method = (t: DepositionType) => get(t).method;
export const bestUse = (t: DepositionType) => get(t).bestUse;
export const depositionTypes = (): DepositionType[] => Object.keys(DATA) as DepositionType[];
