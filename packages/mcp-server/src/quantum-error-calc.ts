export type QuantumError =
  | "surface_code"
  | "steane_7qubit"
  | "shor_9qubit"
  | "bacon_shor_subsystem"
  | "color_code_2d";

const DATA: Record<QuantumError, {
  threshold: number; overhead: number; decodingSpeed: number;
  faultTolerance: number; ecCost: number; topological: boolean;
  forNearTerm: boolean; encoding: string; bestUse: string;
}> = {
  surface_code: {
    threshold: 9, overhead: 4, decodingSpeed: 7,
    faultTolerance: 9, ecCost: 8, topological: true,
    forNearTerm: false, encoding: "2d_lattice_stabilizer",
    bestUse: "large_scale_fault_tolerant",
  },
  steane_7qubit: {
    threshold: 6, overhead: 7, decodingSpeed: 8,
    faultTolerance: 6, ecCost: 4, topological: false,
    forNearTerm: true, encoding: "css_hamming_code",
    bestUse: "small_code_demo",
  },
  shor_9qubit: {
    threshold: 5, overhead: 5, decodingSpeed: 8,
    faultTolerance: 5, ecCost: 5, topological: false,
    forNearTerm: true, encoding: "concatenated_bit_phase",
    bestUse: "educational_benchmark",
  },
  bacon_shor_subsystem: {
    threshold: 7, overhead: 6, decodingSpeed: 7,
    faultTolerance: 7, ecCost: 6, topological: false,
    forNearTerm: false, encoding: "subsystem_gauge_fix",
    bestUse: "adaptive_overhead_trade",
  },
  color_code_2d: {
    threshold: 8, overhead: 5, decodingSpeed: 6,
    faultTolerance: 8, ecCost: 7, topological: true,
    forNearTerm: false, encoding: "trivalent_lattice",
    bestUse: "transversal_gate_set",
  },
};

const get = (t: QuantumError) => DATA[t];

export const threshold = (t: QuantumError) => get(t).threshold;
export const overhead = (t: QuantumError) => get(t).overhead;
export const decodingSpeed = (t: QuantumError) => get(t).decodingSpeed;
export const faultTolerance = (t: QuantumError) => get(t).faultTolerance;
export const ecCost = (t: QuantumError) => get(t).ecCost;
export const topological = (t: QuantumError) => get(t).topological;
export const forNearTerm = (t: QuantumError) => get(t).forNearTerm;
export const encoding = (t: QuantumError) => get(t).encoding;
export const bestUse = (t: QuantumError) => get(t).bestUse;
export const quantumErrors = (): QuantumError[] => Object.keys(DATA) as QuantumError[];
