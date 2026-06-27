export type SolderWireType =
  | "sn63_pb37_leaded"
  | "sn96_sac305_leadfree"
  | "sn99_3_pure_tin"
  | "sn62_pb36_ag2_silver"
  | "bismuth_low_temp";

const DATA: Record<SolderWireType, {
  wettability: number; jointStrength: number; meltTemp: number;
  reliability: number; wireCost: number; leadFree: boolean;
  rosinCore: boolean; alloyType: string; bestUse: string;
}> = {
  sn63_pb37_leaded: { wettability: 10, jointStrength: 8, meltTemp: 5, reliability: 8, wireCost: 3, leadFree: false, rosinCore: true, alloyType: "eutectic_tin_lead", bestUse: "hand_solder_general" },
  sn96_sac305_leadfree: { wettability: 7, jointStrength: 9, meltTemp: 7, reliability: 9, wireCost: 5, leadFree: true, rosinCore: true, alloyType: "sac_tin_silver_copper", bestUse: "rohs_production_solder" },
  sn99_3_pure_tin: { wettability: 5, jointStrength: 6, meltTemp: 7, reliability: 5, wireCost: 4, leadFree: true, rosinCore: true, alloyType: "pure_tin_copper", bestUse: "budget_leadfree_hobby" },
  sn62_pb36_ag2_silver: { wettability: 9, jointStrength: 10, meltTemp: 5, reliability: 10, wireCost: 8, leadFree: false, rosinCore: true, alloyType: "tin_lead_silver", bestUse: "silver_pad_precision" },
  bismuth_low_temp: { wettability: 6, jointStrength: 4, meltTemp: 2, reliability: 4, wireCost: 6, leadFree: true, rosinCore: false, alloyType: "bismuth_tin_low_melt", bestUse: "heat_sensitive_rework" },
};

const get = (t: SolderWireType) => DATA[t];

export const wettability = (t: SolderWireType) => get(t).wettability;
export const jointStrength = (t: SolderWireType) => get(t).jointStrength;
export const meltTemp = (t: SolderWireType) => get(t).meltTemp;
export const reliability = (t: SolderWireType) => get(t).reliability;
export const wireCost = (t: SolderWireType) => get(t).wireCost;
export const leadFree = (t: SolderWireType) => get(t).leadFree;
export const rosinCore = (t: SolderWireType) => get(t).rosinCore;
export const alloyType = (t: SolderWireType) => get(t).alloyType;
export const bestUse = (t: SolderWireType) => get(t).bestUse;
export const solderWires = (): SolderWireType[] => Object.keys(DATA) as SolderWireType[];
