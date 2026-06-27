export type QuantumSim =
  | "statevector_full"
  | "density_matrix_mixed"
  | "tensor_network_mps"
  | "stabilizer_clifford"
  | "gpu_accelerated_cuq";

const DATA: Record<QuantumSim, {
  qubitCapacity: number; accuracy: number; speed: number;
  memoryEff: number; qsCost: number; noiseModel: boolean;
  forVariational: boolean; backend: string; bestUse: string;
}> = {
  statevector_full: {
    qubitCapacity: 4, accuracy: 10, speed: 7,
    memoryEff: 3, qsCost: 5, noiseModel: false,
    forVariational: true, backend: "complex_array_2_to_n",
    bestUse: "exact_small_circuit_verify",
  },
  density_matrix_mixed: {
    qubitCapacity: 3, accuracy: 10, speed: 4,
    memoryEff: 2, qsCost: 6, noiseModel: true,
    forVariational: false, backend: "density_operator_4_to_n",
    bestUse: "open_system_decoherence_study",
  },
  tensor_network_mps: {
    qubitCapacity: 9, accuracy: 7, speed: 6,
    memoryEff: 10, qsCost: 4, noiseModel: false,
    forVariational: true, backend: "matrix_product_state_svd",
    bestUse: "low_entangle_variational_circuit",
  },
  stabilizer_clifford: {
    qubitCapacity: 10, accuracy: 5, speed: 10,
    memoryEff: 9, qsCost: 1, noiseModel: false,
    forVariational: false, backend: "tableau_gottesman_knill",
    bestUse: "error_correction_code_verify",
  },
  gpu_accelerated_cuq: {
    qubitCapacity: 7, accuracy: 10, speed: 9,
    memoryEff: 6, qsCost: 8, noiseModel: true,
    forVariational: true, backend: "cuda_parallel_amplitude",
    bestUse: "nisq_benchmark_large_circuit",
  },
};

const get = (t: QuantumSim) => DATA[t];

export const qubitCapacity = (t: QuantumSim) => get(t).qubitCapacity;
export const accuracy = (t: QuantumSim) => get(t).accuracy;
export const speed = (t: QuantumSim) => get(t).speed;
export const memoryEff = (t: QuantumSim) => get(t).memoryEff;
export const qsCost = (t: QuantumSim) => get(t).qsCost;
export const noiseModel = (t: QuantumSim) => get(t).noiseModel;
export const forVariational = (t: QuantumSim) => get(t).forVariational;
export const backend = (t: QuantumSim) => get(t).backend;
export const bestUse = (t: QuantumSim) => get(t).bestUse;
export const quantumSims = (): QuantumSim[] => Object.keys(DATA) as QuantumSim[];
