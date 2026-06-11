// glaze-ball-calc - glaze ball mill media types

export type GlazeBall =
  | "alumina_ball_hard"
  | "flint_pebble_natural"
  | "porcelain_ball_smooth"
  | "zirconia_ball_dense"
  | "steatite_ball_standard";

const DATA: Record<GlazeBall, {
  grindEfficiency: number; wearResist: number; contaminationLow: number; sizeRange: number;
  cost: number; synthetic: boolean; forStoneware: boolean; mediaDensity: string; bestUse: string;
}> = {
  alumina_ball_hard:      { grindEfficiency: 9, wearResist: 10, contaminationLow: 10, sizeRange: 8, cost: 9, synthetic: true, forStoneware: true, mediaDensity: "high_density_alumina", bestUse: "fine_grind_stoneware" },
  flint_pebble_natural:   { grindEfficiency: 6, wearResist: 5, contaminationLow: 7, sizeRange: 6, cost: 2, synthetic: false, forStoneware: false, mediaDensity: "medium_density_flint", bestUse: "basic_earthenware_grind" },
  porcelain_ball_smooth:  { grindEfficiency: 7, wearResist: 6, contaminationLow: 8, sizeRange: 7, cost: 5, synthetic: true, forStoneware: false, mediaDensity: "medium_density_porcelain", bestUse: "general_glaze_mill" },
  zirconia_ball_dense:    { grindEfficiency: 10, wearResist: 10, contaminationLow: 10, sizeRange: 7, cost: 10, synthetic: true, forStoneware: true, mediaDensity: "ultra_high_density_zrc", bestUse: "precision_particle_grind" },
  steatite_ball_standard: { grindEfficiency: 7, wearResist: 7, contaminationLow: 6, sizeRange: 9, cost: 4, synthetic: false, forStoneware: false, mediaDensity: "low_density_steatite", bestUse: "economy_ball_mill" },
};

const get = (b: GlazeBall) => DATA[b];
export const grindEfficiency = (b: GlazeBall) => get(b).grindEfficiency;
export const wearResist = (b: GlazeBall) => get(b).wearResist;
export const contaminationLow = (b: GlazeBall) => get(b).contaminationLow;
export const sizeRange = (b: GlazeBall) => get(b).sizeRange;
export const ballCost = (b: GlazeBall) => get(b).cost;
export const synthetic = (b: GlazeBall) => get(b).synthetic;
export const forStoneware = (b: GlazeBall) => get(b).forStoneware;
export const mediaDensity = (b: GlazeBall) => get(b).mediaDensity;
export const bestUse = (b: GlazeBall) => get(b).bestUse;
export const glazeBalls = (): GlazeBall[] => Object.keys(DATA) as GlazeBall[];
