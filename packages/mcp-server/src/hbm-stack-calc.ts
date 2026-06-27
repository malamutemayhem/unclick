export type HbmStack =
  | "hbm2_8hi"
  | "hbm2e_12hi"
  | "hbm3_16hi"
  | "hbm3e_12hi"
  | "hbm4_future";

const DATA: Record<HbmStack, {
  bandwidth: number; capacity: number; powerEff: number;
  thermalDesign: number; hbmCost: number; ecc: boolean;
  forAi: boolean; interface_: string; bestUse: string;
}> = {
  hbm2_8hi: {
    bandwidth: 5, capacity: 4, powerEff: 6,
    thermalDesign: 7, hbmCost: 4, ecc: true,
    forAi: false, interface_: "1024bit_2gbps",
    bestUse: "hpc_scientific_compute",
  },
  hbm2e_12hi: {
    bandwidth: 7, capacity: 6, powerEff: 7,
    thermalDesign: 6, hbmCost: 6, ecc: true,
    forAi: true, interface_: "1024bit_3_6gbps",
    bestUse: "gpu_training_card",
  },
  hbm3_16hi: {
    bandwidth: 8, capacity: 8, powerEff: 8,
    thermalDesign: 5, hbmCost: 8, ecc: true,
    forAi: true, interface_: "1024bit_6_4gbps",
    bestUse: "ai_accelerator_h100",
  },
  hbm3e_12hi: {
    bandwidth: 9, capacity: 7, powerEff: 9,
    thermalDesign: 6, hbmCost: 9, ecc: true,
    forAi: true, interface_: "1024bit_9_2gbps",
    bestUse: "next_gen_ai_inference",
  },
  hbm4_future: {
    bandwidth: 10, capacity: 9, powerEff: 9,
    thermalDesign: 5, hbmCost: 10, ecc: true,
    forAi: true, interface_: "2048bit_hybrid_bond",
    bestUse: "exascale_ai_frontier",
  },
};

const get = (t: HbmStack) => DATA[t];

export const bandwidth = (t: HbmStack) => get(t).bandwidth;
export const capacity = (t: HbmStack) => get(t).capacity;
export const powerEff = (t: HbmStack) => get(t).powerEff;
export const thermalDesign = (t: HbmStack) => get(t).thermalDesign;
export const hbmCost = (t: HbmStack) => get(t).hbmCost;
export const ecc = (t: HbmStack) => get(t).ecc;
export const forAi = (t: HbmStack) => get(t).forAi;
export const interface_ = (t: HbmStack) => get(t).interface_;
export const bestUse = (t: HbmStack) => get(t).bestUse;
export const hbmStacks = (): HbmStack[] => Object.keys(DATA) as HbmStack[];
