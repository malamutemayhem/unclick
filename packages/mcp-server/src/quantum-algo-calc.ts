export type QuantumAlgo =
  | "shor_factoring"
  | "grover_search"
  | "vqe_variational"
  | "qaoa_combinatorial"
  | "hhl_linear_solve";

const DATA: Record<QuantumAlgo, {
  speedup: number; qubitReq: number; noiseToler: number;
  classicalOverhead: number; qaCost: number; nisqFriendly: boolean;
  forOptimize: boolean; paradigm: string; bestUse: string;
}> = {
  shor_factoring: {
    speedup: 10, qubitReq: 3, noiseToler: 2,
    classicalOverhead: 5, qaCost: 9, nisqFriendly: false,
    forOptimize: false, paradigm: "quantum_fourier_transform",
    bestUse: "rsa_integer_factorization",
  },
  grover_search: {
    speedup: 6, qubitReq: 7, noiseToler: 5,
    classicalOverhead: 4, qaCost: 5, nisqFriendly: false,
    forOptimize: false, paradigm: "amplitude_amplification",
    bestUse: "unstructured_database_search",
  },
  vqe_variational: {
    speedup: 5, qubitReq: 9, noiseToler: 9,
    classicalOverhead: 8, qaCost: 3, nisqFriendly: true,
    forOptimize: false, paradigm: "hybrid_variational_classical",
    bestUse: "molecular_ground_state_energy",
  },
  qaoa_combinatorial: {
    speedup: 4, qubitReq: 8, noiseToler: 8,
    classicalOverhead: 7, qaCost: 4, nisqFriendly: true,
    forOptimize: true, paradigm: "alternating_operator_ansatz",
    bestUse: "maxcut_graph_optimization",
  },
  hhl_linear_solve: {
    speedup: 9, qubitReq: 4, noiseToler: 3,
    classicalOverhead: 6, qaCost: 8, nisqFriendly: false,
    forOptimize: false, paradigm: "phase_estimation_inversion",
    bestUse: "sparse_linear_system_solve",
  },
};

const get = (t: QuantumAlgo) => DATA[t];

export const speedup = (t: QuantumAlgo) => get(t).speedup;
export const qubitReq = (t: QuantumAlgo) => get(t).qubitReq;
export const noiseToler = (t: QuantumAlgo) => get(t).noiseToler;
export const classicalOverhead = (t: QuantumAlgo) => get(t).classicalOverhead;
export const qaCost = (t: QuantumAlgo) => get(t).qaCost;
export const nisqFriendly = (t: QuantumAlgo) => get(t).nisqFriendly;
export const forOptimize = (t: QuantumAlgo) => get(t).forOptimize;
export const paradigm = (t: QuantumAlgo) => get(t).paradigm;
export const bestUse = (t: QuantumAlgo) => get(t).bestUse;
export const quantumAlgos = (): QuantumAlgo[] => Object.keys(DATA) as QuantumAlgo[];
