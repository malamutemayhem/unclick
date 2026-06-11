export type FiberSpliceType =
  | "fusion_arc_welder"
  | "mechanical_crimp_align"
  | "ribbon_mass_fusion"
  | "rotary_mechanical"
  | "pre_polished_splice";

const DATA: Record<FiberSpliceType, {
  insertionLoss: number; returnLoss: number; spliceSpeed: number;
  reliability: number; spliceCost: number; permanent: boolean;
  forRibbon: boolean; alignMethod: string; bestUse: string;
}> = {
  fusion_arc_welder: { insertionLoss: 10, returnLoss: 10, spliceSpeed: 6, reliability: 10, spliceCost: 9, permanent: true, forRibbon: false, alignMethod: "core_align_arc_weld", bestUse: "telecom_permanent_join" },
  mechanical_crimp_align: { insertionLoss: 6, returnLoss: 6, spliceSpeed: 9, reliability: 6, spliceCost: 3, permanent: false, forRibbon: false, alignMethod: "v_groove_index_match", bestUse: "field_quick_repair" },
  ribbon_mass_fusion: { insertionLoss: 9, returnLoss: 9, spliceSpeed: 10, reliability: 9, spliceCost: 8, permanent: true, forRibbon: true, alignMethod: "mass_ribbon_arc_align", bestUse: "high_count_fiber_build" },
  rotary_mechanical: { insertionLoss: 7, returnLoss: 7, spliceSpeed: 8, reliability: 7, spliceCost: 4, permanent: false, forRibbon: false, alignMethod: "rotary_ferrule_lock", bestUse: "temporary_test_splice" },
  pre_polished_splice: { insertionLoss: 7, returnLoss: 7, spliceSpeed: 10, reliability: 6, spliceCost: 5, permanent: false, forRibbon: false, alignMethod: "pre_cleaved_butt_join", bestUse: "fttx_drop_terminate" },
};

const get = (t: FiberSpliceType) => DATA[t];

export const insertionLoss = (t: FiberSpliceType) => get(t).insertionLoss;
export const returnLoss = (t: FiberSpliceType) => get(t).returnLoss;
export const spliceSpeed = (t: FiberSpliceType) => get(t).spliceSpeed;
export const reliability = (t: FiberSpliceType) => get(t).reliability;
export const spliceCost = (t: FiberSpliceType) => get(t).spliceCost;
export const permanent = (t: FiberSpliceType) => get(t).permanent;
export const forRibbon = (t: FiberSpliceType) => get(t).forRibbon;
export const alignMethod = (t: FiberSpliceType) => get(t).alignMethod;
export const bestUse = (t: FiberSpliceType) => get(t).bestUse;
export const fiberSplices = (): FiberSpliceType[] => Object.keys(DATA) as FiberSpliceType[];
