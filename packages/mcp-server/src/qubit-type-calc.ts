export type QubitType =
  | "superconducting_transmon"
  | "trapped_ion_yb"
  | "silicon_spin"
  | "topological_majorana"
  | "photonic_squeezed";

const DATA: Record<QubitType, {
  coherence: number; gateSpeed: number; fidelity: number;
  scalability: number; qubitCost: number; cryogenic: boolean;
  forNisq: boolean; mechanism: string; bestUse: string;
}> = {
  superconducting_transmon: {
    coherence: 6, gateSpeed: 9, fidelity: 8,
    scalability: 8, qubitCost: 7, cryogenic: true,
    forNisq: true, mechanism: "josephson_junction",
    bestUse: "cloud_quantum_processor",
  },
  trapped_ion_yb: {
    coherence: 9, gateSpeed: 5, fidelity: 9,
    scalability: 5, qubitCost: 8, cryogenic: false,
    forNisq: true, mechanism: "laser_ion_chain",
    bestUse: "high_fidelity_algorithm",
  },
  silicon_spin: {
    coherence: 7, gateSpeed: 7, fidelity: 7,
    scalability: 9, qubitCost: 5, cryogenic: true,
    forNisq: false, mechanism: "electron_spin_dot",
    bestUse: "cmos_compatible_scale",
  },
  topological_majorana: {
    coherence: 8, gateSpeed: 6, fidelity: 6,
    scalability: 7, qubitCost: 9, cryogenic: true,
    forNisq: false, mechanism: "non_abelian_anyon",
    bestUse: "fault_tolerant_future",
  },
  photonic_squeezed: {
    coherence: 5, gateSpeed: 8, fidelity: 6,
    scalability: 7, qubitCost: 6, cryogenic: false,
    forNisq: true, mechanism: "squeezed_light_gbs",
    bestUse: "room_temp_sampling",
  },
};

const get = (t: QubitType) => DATA[t];

export const coherence = (t: QubitType) => get(t).coherence;
export const gateSpeed = (t: QubitType) => get(t).gateSpeed;
export const fidelity = (t: QubitType) => get(t).fidelity;
export const scalability = (t: QubitType) => get(t).scalability;
export const qubitCost = (t: QubitType) => get(t).qubitCost;
export const cryogenic = (t: QubitType) => get(t).cryogenic;
export const forNisq = (t: QubitType) => get(t).forNisq;
export const mechanism = (t: QubitType) => get(t).mechanism;
export const bestUse = (t: QubitType) => get(t).bestUse;
export const qubitTypes = (): QubitType[] => Object.keys(DATA) as QubitType[];
