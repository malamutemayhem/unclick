export type HeatShrinkType =
  | "polyolefin_standard"
  | "dual_wall_adhesive"
  | "ptfe_high_temp"
  | "pvc_thin_wall"
  | "silicone_flex_rubber";

const DATA: Record<HeatShrinkType, {
  shrinkRatio: number; tempResist: number; flexibility: number;
  insulation: number; shrinkCost: number; adhesiveLined: boolean;
  forHighTemp: boolean; material: string; bestUse: string;
}> = {
  polyolefin_standard: { shrinkRatio: 7, tempResist: 6, flexibility: 7, insulation: 7, shrinkCost: 2, adhesiveLined: false, forHighTemp: false, material: "cross_linked_polyolefin", bestUse: "general_wire_insulate" },
  dual_wall_adhesive: { shrinkRatio: 8, tempResist: 7, flexibility: 6, insulation: 9, shrinkCost: 5, adhesiveLined: true, forHighTemp: false, material: "polyolefin_hot_melt", bestUse: "waterproof_splice_seal" },
  ptfe_high_temp: { shrinkRatio: 5, tempResist: 10, flexibility: 4, insulation: 10, shrinkCost: 9, adhesiveLined: false, forHighTemp: true, material: "fluoropolymer_ptfe", bestUse: "aerospace_engine_harness" },
  pvc_thin_wall: { shrinkRatio: 6, tempResist: 4, flexibility: 8, insulation: 5, shrinkCost: 1, adhesiveLined: false, forHighTemp: false, material: "polyvinyl_chloride", bestUse: "color_code_marking" },
  silicone_flex_rubber: { shrinkRatio: 6, tempResist: 8, flexibility: 10, insulation: 8, shrinkCost: 7, adhesiveLined: false, forHighTemp: true, material: "silicone_elastomer", bestUse: "medical_device_cable" },
};

const get = (t: HeatShrinkType) => DATA[t];

export const shrinkRatio = (t: HeatShrinkType) => get(t).shrinkRatio;
export const tempResist = (t: HeatShrinkType) => get(t).tempResist;
export const flexibility = (t: HeatShrinkType) => get(t).flexibility;
export const insulation = (t: HeatShrinkType) => get(t).insulation;
export const shrinkCost = (t: HeatShrinkType) => get(t).shrinkCost;
export const adhesiveLined = (t: HeatShrinkType) => get(t).adhesiveLined;
export const forHighTemp = (t: HeatShrinkType) => get(t).forHighTemp;
export const material = (t: HeatShrinkType) => get(t).material;
export const bestUse = (t: HeatShrinkType) => get(t).bestUse;
export const heatShrinks = (): HeatShrinkType[] => Object.keys(DATA) as HeatShrinkType[];
