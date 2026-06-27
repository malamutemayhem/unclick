export type QuantumGate =
  | "single_qubit_rx"
  | "cnot_cx"
  | "toffoli_ccx"
  | "hadamard_h"
  | "t_gate_magic";

const DATA: Record<QuantumGate, {
  fidelity: number; speed: number; errorRate: number;
  universality: number; gateCost: number; clifford: boolean;
  forVqe: boolean; qubits: string; bestUse: string;
}> = {
  single_qubit_rx: {
    fidelity: 9, speed: 9, errorRate: 9,
    universality: 5, gateCost: 2, clifford: false,
    forVqe: true, qubits: "one_rotation",
    bestUse: "parametric_circuit_ansatz",
  },
  cnot_cx: {
    fidelity: 7, speed: 7, errorRate: 6,
    universality: 8, gateCost: 5, clifford: true,
    forVqe: true, qubits: "two_entangling",
    bestUse: "entanglement_generation",
  },
  toffoli_ccx: {
    fidelity: 5, speed: 5, errorRate: 4,
    universality: 9, gateCost: 8, clifford: false,
    forVqe: false, qubits: "three_controlled",
    bestUse: "arithmetic_logic_circuit",
  },
  hadamard_h: {
    fidelity: 9, speed: 9, errorRate: 9,
    universality: 6, gateCost: 2, clifford: true,
    forVqe: true, qubits: "one_superposition",
    bestUse: "basis_change_transform",
  },
  t_gate_magic: {
    fidelity: 6, speed: 4, errorRate: 5,
    universality: 10, gateCost: 9, clifford: false,
    forVqe: false, qubits: "one_magic_state",
    bestUse: "fault_tolerant_universal",
  },
};

const get = (t: QuantumGate) => DATA[t];

export const fidelity = (t: QuantumGate) => get(t).fidelity;
export const speed = (t: QuantumGate) => get(t).speed;
export const errorRate = (t: QuantumGate) => get(t).errorRate;
export const universality = (t: QuantumGate) => get(t).universality;
export const gateCost = (t: QuantumGate) => get(t).gateCost;
export const clifford = (t: QuantumGate) => get(t).clifford;
export const forVqe = (t: QuantumGate) => get(t).forVqe;
export const qubits = (t: QuantumGate) => get(t).qubits;
export const bestUse = (t: QuantumGate) => get(t).bestUse;
export const quantumGates = (): QuantumGate[] => Object.keys(DATA) as QuantumGate[];
