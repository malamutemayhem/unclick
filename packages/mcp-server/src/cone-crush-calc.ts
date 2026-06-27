export type ConeCrushType =
  | "standard_head_secondary"
  | "short_head_tertiary"
  | "hydraulic_adjust_spring"
  | "gyratory_primary"
  | "multi_cylinder_hp";

interface ConeCrushData {
  reductionRatio: number;
  throughput: number;
  productShape: number;
  wearLife: number;
  ccCost: number;
  hydraulic: boolean;
  forFine: boolean;
  chamber: string;
  bestUse: string;
}

const DATA: Record<ConeCrushType, ConeCrushData> = {
  standard_head_secondary: {
    reductionRatio: 7, throughput: 8, productShape: 8, wearLife: 7, ccCost: 6,
    hydraulic: false, forFine: false,
    chamber: "standard_nonchoking_coarse_cavity",
    bestUse: "aggregate_secondary_crush_medium",
  },
  short_head_tertiary: {
    reductionRatio: 9, throughput: 6, productShape: 9, wearLife: 7, ccCost: 7,
    hydraulic: false, forFine: true,
    chamber: "short_head_steep_fine_cavity",
    bestUse: "aggregate_tertiary_fine_cubical",
  },
  hydraulic_adjust_spring: {
    reductionRatio: 8, throughput: 8, productShape: 9, wearLife: 9, ccCost: 8,
    hydraulic: true, forFine: false,
    chamber: "hydraulic_clamp_overload_relief",
    bestUse: "hard_rock_mining_process_circuit",
  },
  gyratory_primary: {
    reductionRatio: 5, throughput: 10, productShape: 7, wearLife: 8, ccCost: 10,
    hydraulic: true, forFine: false,
    chamber: "wide_mouth_gyratory_spider_arm",
    bestUse: "open_pit_mine_primary_high_tonnage",
  },
  multi_cylinder_hp: {
    reductionRatio: 10, throughput: 7, productShape: 10, wearLife: 8, ccCost: 9,
    hydraulic: true, forFine: true,
    chamber: "multi_cylinder_laminate_interparticle",
    bestUse: "fine_crush_sand_make_mineral_process",
  },
};

function get(t: ConeCrushType): ConeCrushData {
  return DATA[t];
}

export const reductionRatio = (t: ConeCrushType) => get(t).reductionRatio;
export const throughput = (t: ConeCrushType) => get(t).throughput;
export const productShape = (t: ConeCrushType) => get(t).productShape;
export const wearLife = (t: ConeCrushType) => get(t).wearLife;
export const ccCost = (t: ConeCrushType) => get(t).ccCost;
export const hydraulic = (t: ConeCrushType) => get(t).hydraulic;
export const forFine = (t: ConeCrushType) => get(t).forFine;
export const chamber = (t: ConeCrushType) => get(t).chamber;
export const bestUse = (t: ConeCrushType) => get(t).bestUse;
export const coneCrushTypes = (): ConeCrushType[] =>
  Object.keys(DATA) as ConeCrushType[];
