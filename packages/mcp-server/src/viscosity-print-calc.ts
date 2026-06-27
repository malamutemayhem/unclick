// viscosity-print-calc - viscosity printing ink types

export type ViscosityPrint =
  | "stiff_ink_heavy"
  | "medium_ink_standard"
  | "thin_ink_light"
  | "tack_ink_sticky"
  | "modifier_ink_blend";

const DATA: Record<ViscosityPrint, {
  layerSeparation: number; colorIntense: number; controlFlow: number; mixEase: number;
  cost: number; oilBased: boolean; forMultiColor: boolean; viscosityGrade: string; bestUse: string;
}> = {
  stiff_ink_heavy:     { layerSeparation: 10, colorIntense: 9, controlFlow: 8, mixEase: 5, cost: 7, oilBased: true, forMultiColor: true, viscosityGrade: "high_body_stiff", bestUse: "top_layer_overprint" },
  medium_ink_standard: { layerSeparation: 7, colorIntense: 8, controlFlow: 8, mixEase: 8, cost: 5, oilBased: true, forMultiColor: true, viscosityGrade: "medium_body_flow", bestUse: "general_viscosity_layer" },
  thin_ink_light:      { layerSeparation: 5, colorIntense: 6, controlFlow: 6, mixEase: 9, cost: 4, oilBased: true, forMultiColor: true, viscosityGrade: "low_body_fluid", bestUse: "base_layer_print" },
  tack_ink_sticky:     { layerSeparation: 9, colorIntense: 7, controlFlow: 7, mixEase: 4, cost: 8, oilBased: true, forMultiColor: false, viscosityGrade: "high_tack_grab", bestUse: "single_pass_detail" },
  modifier_ink_blend:  { layerSeparation: 6, colorIntense: 5, controlFlow: 10, mixEase: 10, cost: 6, oilBased: false, forMultiColor: true, viscosityGrade: "additive_modifier", bestUse: "custom_viscosity_tune" },
};

const get = (v: ViscosityPrint) => DATA[v];
export const layerSeparation = (v: ViscosityPrint) => get(v).layerSeparation;
export const colorIntense = (v: ViscosityPrint) => get(v).colorIntense;
export const controlFlow = (v: ViscosityPrint) => get(v).controlFlow;
export const mixEase = (v: ViscosityPrint) => get(v).mixEase;
export const viscCost = (v: ViscosityPrint) => get(v).cost;
export const oilBased = (v: ViscosityPrint) => get(v).oilBased;
export const forMultiColor = (v: ViscosityPrint) => get(v).forMultiColor;
export const viscosityGrade = (v: ViscosityPrint) => get(v).viscosityGrade;
export const bestUse = (v: ViscosityPrint) => get(v).bestUse;
export const viscosityPrints = (): ViscosityPrint[] => Object.keys(DATA) as ViscosityPrint[];
