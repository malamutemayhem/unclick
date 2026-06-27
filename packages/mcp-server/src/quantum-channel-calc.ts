export type QuantumChannel =
  | "depolarizing_uniform"
  | "amplitude_damping"
  | "phase_damping"
  | "bit_flip_pauli_x"
  | "erasure_loss";

const DATA: Record<QuantumChannel, {
  fidelity: number; capacity: number; correctability: number;
  physicality: number; qcCost: number; unital: boolean;
  forFiber: boolean; model: string; bestUse: string;
}> = {
  depolarizing_uniform: {
    fidelity: 5, capacity: 5, correctability: 7,
    physicality: 6, qcCost: 3, unital: true,
    forFiber: false, model: "uniform_kraus_operator_mix",
    bestUse: "worst_case_noise_threshold",
  },
  amplitude_damping: {
    fidelity: 6, capacity: 7, correctability: 6,
    physicality: 10, qcCost: 4, unital: false,
    forFiber: false, model: "spontaneous_emission_decay",
    bestUse: "superconducting_t1_relaxation",
  },
  phase_damping: {
    fidelity: 7, capacity: 8, correctability: 8,
    physicality: 9, qcCost: 2, unital: true,
    forFiber: false, model: "dephasing_z_basis_scatter",
    bestUse: "trapped_ion_t2_dephase",
  },
  bit_flip_pauli_x: {
    fidelity: 8, capacity: 9, correctability: 10,
    physicality: 4, qcCost: 1, unital: true,
    forFiber: false, model: "symmetric_pauli_x_flip",
    bestUse: "repetition_code_benchmark",
  },
  erasure_loss: {
    fidelity: 4, capacity: 6, correctability: 9,
    physicality: 8, qcCost: 5, unital: false,
    forFiber: true, model: "photon_loss_heralded_detect",
    bestUse: "photonic_fiber_qkd_link",
  },
};

const get = (t: QuantumChannel) => DATA[t];

export const fidelity = (t: QuantumChannel) => get(t).fidelity;
export const capacity = (t: QuantumChannel) => get(t).capacity;
export const correctability = (t: QuantumChannel) => get(t).correctability;
export const physicality = (t: QuantumChannel) => get(t).physicality;
export const qcCost = (t: QuantumChannel) => get(t).qcCost;
export const unital = (t: QuantumChannel) => get(t).unital;
export const forFiber = (t: QuantumChannel) => get(t).forFiber;
export const model = (t: QuantumChannel) => get(t).model;
export const bestUse = (t: QuantumChannel) => get(t).bestUse;
export const quantumChannels = (): QuantumChannel[] => Object.keys(DATA) as QuantumChannel[];
