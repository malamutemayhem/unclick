export type DnaCompute =
  | "strand_displacement"
  | "dna_origami_gate"
  | "crispr_logic"
  | "aptamer_sensor_logic"
  | "dna_storage_compute";

const DATA: Record<DnaCompute, {
  parallelism: number; speed: number; errorRate: number;
  programmability: number; dnaCost: number; reusable: boolean;
  forDiagnostics: boolean; mechanism: string; bestUse: string;
}> = {
  strand_displacement: {
    parallelism: 8, speed: 3, errorRate: 6,
    programmability: 8, dnaCost: 5, reusable: false,
    forDiagnostics: true, mechanism: "toehold_mediated_branch",
    bestUse: "molecular_logic_circuit",
  },
  dna_origami_gate: {
    parallelism: 9, speed: 2, errorRate: 7,
    programmability: 7, dnaCost: 7, reusable: false,
    forDiagnostics: false, mechanism: "scaffold_staple_fold",
    bestUse: "nanostructure_pattern_compute",
  },
  crispr_logic: {
    parallelism: 7, speed: 4, errorRate: 5,
    programmability: 9, dnaCost: 6, reusable: true,
    forDiagnostics: true, mechanism: "guide_rna_conditional",
    bestUse: "cell_state_classifier",
  },
  aptamer_sensor_logic: {
    parallelism: 6, speed: 6, errorRate: 4,
    programmability: 5, dnaCost: 4, reusable: true,
    forDiagnostics: true, mechanism: "conformational_switch",
    bestUse: "point_of_care_detect",
  },
  dna_storage_compute: {
    parallelism: 10, speed: 1, errorRate: 8,
    programmability: 4, dnaCost: 9, reusable: false,
    forDiagnostics: false, mechanism: "pcr_select_sequence",
    bestUse: "archival_search_query",
  },
};

const get = (t: DnaCompute) => DATA[t];

export const parallelism = (t: DnaCompute) => get(t).parallelism;
export const speed = (t: DnaCompute) => get(t).speed;
export const errorRate = (t: DnaCompute) => get(t).errorRate;
export const programmability = (t: DnaCompute) => get(t).programmability;
export const dnaCost = (t: DnaCompute) => get(t).dnaCost;
export const reusable = (t: DnaCompute) => get(t).reusable;
export const forDiagnostics = (t: DnaCompute) => get(t).forDiagnostics;
export const mechanism = (t: DnaCompute) => get(t).mechanism;
export const bestUse = (t: DnaCompute) => get(t).bestUse;
export const dnaComputes = (): DnaCompute[] => Object.keys(DATA) as DnaCompute[];
