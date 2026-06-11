export type DistressToolType =
  | "distress_ink_pad"
  | "oxide_ink_react"
  | "blending_tool_foam"
  | "splatter_brush_spray"
  | "emboss_resist_clear";

const specs: Record<DistressToolType, {
  colorIntense: number; blendSmooth: number; effectRange: number;
  drySpeed: number; cost: number; waterReactive: boolean; forEmboss: boolean;
  inkType: string; use: string;
}> = {
  distress_ink_pad: {
    colorIntense: 85, blendSmooth: 88, effectRange: 82,
    drySpeed: 78, cost: 8, waterReactive: true, forEmboss: false,
    inkType: "dye_based_distress", use: "general_distress_ink",
  },
  oxide_ink_react: {
    colorIntense: 90, blendSmooth: 85, effectRange: 92,
    drySpeed: 72, cost: 10, waterReactive: true, forEmboss: true,
    inkType: "dye_pigment_oxide", use: "reactive_oxidize_effect",
  },
  blending_tool_foam: {
    colorIntense: 80, blendSmooth: 92, effectRange: 78,
    drySpeed: 82, cost: 5, waterReactive: false, forEmboss: false,
    inkType: "foam_applicator_tip", use: "smooth_edge_blend",
  },
  splatter_brush_spray: {
    colorIntense: 82, blendSmooth: 70, effectRange: 88,
    drySpeed: 85, cost: 6, waterReactive: false, forEmboss: false,
    inkType: "bristle_flick_spray", use: "random_splatter_effect",
  },
  emboss_resist_clear: {
    colorIntense: 75, blendSmooth: 80, effectRange: 85,
    drySpeed: 88, cost: 7, waterReactive: false, forEmboss: true,
    inkType: "clear_resist_pad", use: "emboss_resist_technique",
  },
};

export function colorIntense(t: DistressToolType): number { return specs[t].colorIntense; }
export function blendSmooth(t: DistressToolType): number { return specs[t].blendSmooth; }
export function effectRange(t: DistressToolType): number { return specs[t].effectRange; }
export function drySpeed(t: DistressToolType): number { return specs[t].drySpeed; }
export function toolCost(t: DistressToolType): number { return specs[t].cost; }
export function waterReactive(t: DistressToolType): boolean { return specs[t].waterReactive; }
export function forEmboss(t: DistressToolType): boolean { return specs[t].forEmboss; }
export function inkType(t: DistressToolType): string { return specs[t].inkType; }
export function bestUse(t: DistressToolType): string { return specs[t].use; }
export function distressTools(): DistressToolType[] { return Object.keys(specs) as DistressToolType[]; }
