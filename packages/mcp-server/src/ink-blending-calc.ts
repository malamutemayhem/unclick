export type InkBlendingType =
  | "foam_applicator_standard"
  | "mini_round_detail"
  | "blending_brush_soft"
  | "sponge_dauber_quick"
  | "velvet_tool_smooth";

const specs: Record<InkBlendingType, {
  blendSmooth: number; coverageEven: number; controlFine: number;
  cleanEase: number; cost: number; brush: boolean; velvet: boolean;
  tipType: string; use: string;
}> = {
  foam_applicator_standard: {
    blendSmooth: 85, coverageEven: 88, controlFine: 82,
    cleanEase: 80, cost: 5, brush: false, velvet: false,
    tipType: "round_foam_pad", use: "general_ink_blend",
  },
  mini_round_detail: {
    blendSmooth: 82, coverageEven: 78, controlFine: 92,
    cleanEase: 82, cost: 6, brush: false, velvet: false,
    tipType: "small_foam_tip", use: "small_area_detail",
  },
  blending_brush_soft: {
    blendSmooth: 90, coverageEven: 85, controlFine: 85,
    cleanEase: 88, cost: 10, brush: true, velvet: false,
    tipType: "soft_bristle_brush", use: "soft_gradient_blend",
  },
  sponge_dauber_quick: {
    blendSmooth: 78, coverageEven: 82, controlFine: 78,
    cleanEase: 85, cost: 4, brush: false, velvet: false,
    tipType: "dome_sponge_tip", use: "quick_coverage_dab",
  },
  velvet_tool_smooth: {
    blendSmooth: 92, coverageEven: 90, controlFine: 80,
    cleanEase: 75, cost: 12, brush: false, velvet: true,
    tipType: "velvet_pad_surface", use: "ultra_smooth_blend",
  },
};

export function blendSmooth(t: InkBlendingType): number { return specs[t].blendSmooth; }
export function coverageEven(t: InkBlendingType): number { return specs[t].coverageEven; }
export function controlFine(t: InkBlendingType): number { return specs[t].controlFine; }
export function cleanEase(t: InkBlendingType): number { return specs[t].cleanEase; }
export function blendCost(t: InkBlendingType): number { return specs[t].cost; }
export function brush(t: InkBlendingType): boolean { return specs[t].brush; }
export function velvet(t: InkBlendingType): boolean { return specs[t].velvet; }
export function tipType(t: InkBlendingType): string { return specs[t].tipType; }
export function bestUse(t: InkBlendingType): string { return specs[t].use; }
export function inkBlendings(): InkBlendingType[] { return Object.keys(specs) as InkBlendingType[]; }
