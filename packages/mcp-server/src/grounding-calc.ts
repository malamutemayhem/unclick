export type Grounding =
  | "single_point_star"
  | "multi_point_mesh"
  | "hybrid_frequency_split"
  | "chassis_bond_strap"
  | "isolated_floating_ref";

const DATA: Record<Grounding, {
  lowFreqPerf: number; highFreqPerf: number; loopArea: number;
  safetyCompliance: number; grCost: number; scalable: boolean;
  forMixedSignal: boolean; topology: string; bestUse: string;
}> = {
  single_point_star: {
    lowFreqPerf: 10, highFreqPerf: 3, loopArea: 9,
    safetyCompliance: 6, grCost: 2, scalable: false,
    forMixedSignal: true, topology: "radial_star_single_node",
    bestUse: "audio_analog_low_noise_ref",
  },
  multi_point_mesh: {
    lowFreqPerf: 4, highFreqPerf: 10, loopArea: 5,
    safetyCompliance: 8, grCost: 4, scalable: true,
    forMixedSignal: false, topology: "distributed_grid_plane",
    bestUse: "digital_pcb_high_speed_return",
  },
  hybrid_frequency_split: {
    lowFreqPerf: 8, highFreqPerf: 8, loopArea: 7,
    safetyCompliance: 7, grCost: 5, scalable: true,
    forMixedSignal: true, topology: "capacitor_bridge_split_plane",
    bestUse: "mixed_signal_adc_partition",
  },
  chassis_bond_strap: {
    lowFreqPerf: 6, highFreqPerf: 7, loopArea: 4,
    safetyCompliance: 10, grCost: 1, scalable: true,
    forMixedSignal: false, topology: "braided_strap_chassis_bond",
    bestUse: "rack_mount_safety_earth_bond",
  },
  isolated_floating_ref: {
    lowFreqPerf: 7, highFreqPerf: 5, loopArea: 10,
    safetyCompliance: 9, grCost: 6, scalable: false,
    forMixedSignal: true, topology: "galvanic_isolated_barrier",
    bestUse: "medical_patient_leakage_limit",
  },
};

const get = (t: Grounding) => DATA[t];

export const lowFreqPerf = (t: Grounding) => get(t).lowFreqPerf;
export const highFreqPerf = (t: Grounding) => get(t).highFreqPerf;
export const loopArea = (t: Grounding) => get(t).loopArea;
export const safetyCompliance = (t: Grounding) => get(t).safetyCompliance;
export const grCost = (t: Grounding) => get(t).grCost;
export const scalable = (t: Grounding) => get(t).scalable;
export const forMixedSignal = (t: Grounding) => get(t).forMixedSignal;
export const topology = (t: Grounding) => get(t).topology;
export const bestUse = (t: Grounding) => get(t).bestUse;
export const groundings = (): Grounding[] => Object.keys(DATA) as Grounding[];
