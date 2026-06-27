export type PcbLaminateType =
  | "fr4_standard_glass"
  | "high_tg_fr4"
  | "rogers_ptfe_rf"
  | "polyimide_flex"
  | "cem3_single_side";

const DATA: Record<PcbLaminateType, {
  dielectricConst: number; thermalResist: number; mechStrength: number;
  moistureAbsorb: number; lamCost: number; highFreq: boolean;
  forFlex: boolean; resinSystem: string; bestUse: string;
}> = {
  fr4_standard_glass: { dielectricConst: 5, thermalResist: 5, mechStrength: 7, moistureAbsorb: 5, lamCost: 2, highFreq: false, forFlex: false, resinSystem: "epoxy_glass_weave", bestUse: "general_purpose_rigid_pcb" },
  high_tg_fr4: { dielectricConst: 5, thermalResist: 8, mechStrength: 8, moistureAbsorb: 6, lamCost: 4, highFreq: false, forFlex: false, resinSystem: "modified_epoxy_glass", bestUse: "lead_free_high_temp_board" },
  rogers_ptfe_rf: { dielectricConst: 10, thermalResist: 7, mechStrength: 5, moistureAbsorb: 9, lamCost: 10, highFreq: true, forFlex: false, resinSystem: "ceramic_filled_ptfe", bestUse: "rf_microwave_antenna" },
  polyimide_flex: { dielectricConst: 6, thermalResist: 9, mechStrength: 4, moistureAbsorb: 4, lamCost: 7, highFreq: false, forFlex: true, resinSystem: "polyimide_film_adhesive", bestUse: "flexible_circuit_wearable" },
  cem3_single_side: { dielectricConst: 4, thermalResist: 3, mechStrength: 3, moistureAbsorb: 3, lamCost: 1, highFreq: false, forFlex: false, resinSystem: "composite_epoxy_mat", bestUse: "low_cost_consumer_board" },
};

const get = (t: PcbLaminateType) => DATA[t];

export const dielectricConst = (t: PcbLaminateType) => get(t).dielectricConst;
export const thermalResist = (t: PcbLaminateType) => get(t).thermalResist;
export const mechStrength = (t: PcbLaminateType) => get(t).mechStrength;
export const moistureAbsorb = (t: PcbLaminateType) => get(t).moistureAbsorb;
export const lamCost = (t: PcbLaminateType) => get(t).lamCost;
export const highFreq = (t: PcbLaminateType) => get(t).highFreq;
export const forFlex = (t: PcbLaminateType) => get(t).forFlex;
export const resinSystem = (t: PcbLaminateType) => get(t).resinSystem;
export const bestUse = (t: PcbLaminateType) => get(t).bestUse;
export const pcbLaminates = (): PcbLaminateType[] => Object.keys(DATA) as PcbLaminateType[];
