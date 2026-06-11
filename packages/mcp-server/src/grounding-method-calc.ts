export type GroundingMethod =
  | "single_point_star"
  | "multi_point_mesh"
  | "hybrid_frequency"
  | "chassis_bond_strap"
  | "isolated_float";

const DATA: Record<GroundingMethod, {
  loopArea: number; highFreq: number; safety: number;
  simplicity: number; gndCost: number; galvanic: boolean;
  forMixedSignal: boolean; technique: string; bestUse: string;
}> = {
  single_point_star: {
    loopArea: 10, highFreq: 3, safety: 7,
    simplicity: 8, gndCost: 2, galvanic: true,
    forMixedSignal: true, technique: "radial_return_common_node",
    bestUse: "audio_analog_low_freq",
  },
  multi_point_mesh: {
    loopArea: 4, highFreq: 10, safety: 8,
    simplicity: 6, gndCost: 4, galvanic: true,
    forMixedSignal: false, technique: "distributed_via_stitch_plane",
    bestUse: "digital_high_speed_pcb",
  },
  hybrid_frequency: {
    loopArea: 7, highFreq: 8, safety: 8,
    simplicity: 4, gndCost: 5, galvanic: true,
    forMixedSignal: true, technique: "cap_coupled_split_plane",
    bestUse: "mixed_signal_adc_board",
  },
  chassis_bond_strap: {
    loopArea: 6, highFreq: 7, safety: 10,
    simplicity: 9, gndCost: 3, galvanic: true,
    forMixedSignal: false, technique: "braided_strap_low_impedance",
    bestUse: "equipment_safety_earth",
  },
  isolated_float: {
    loopArea: 10, highFreq: 5, safety: 5,
    simplicity: 7, gndCost: 6, galvanic: false,
    forMixedSignal: true, technique: "transformer_optocoupler_isolate",
    bestUse: "medical_patient_isolation",
  },
};

const get = (t: GroundingMethod) => DATA[t];

export const loopArea = (t: GroundingMethod) => get(t).loopArea;
export const highFreq = (t: GroundingMethod) => get(t).highFreq;
export const safety = (t: GroundingMethod) => get(t).safety;
export const simplicity = (t: GroundingMethod) => get(t).simplicity;
export const gndCost = (t: GroundingMethod) => get(t).gndCost;
export const galvanic = (t: GroundingMethod) => get(t).galvanic;
export const forMixedSignal = (t: GroundingMethod) => get(t).forMixedSignal;
export const technique = (t: GroundingMethod) => get(t).technique;
export const bestUse = (t: GroundingMethod) => get(t).bestUse;
export const groundingMethods = (): GroundingMethod[] => Object.keys(DATA) as GroundingMethod[];
