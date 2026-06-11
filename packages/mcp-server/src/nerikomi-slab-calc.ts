export type NerikomiSlabType =
  | "colored_clay_standard"
  | "porcelain_stain_fine"
  | "oxide_tint_earthy"
  | "mason_stain_bright"
  | "natural_clay_blend";

const specs: Record<NerikomiSlabType, {
  patternClarity: number; colorIntense: number; blendSmooth: number;
  sliceClean: number; cost: number; stained: boolean; natural: boolean;
  colorSource: string; use: string;
}> = {
  colored_clay_standard: {
    patternClarity: 85, colorIntense: 82, blendSmooth: 80,
    sliceClean: 85, cost: 15, stained: false, natural: false,
    colorSource: "premixed_body_stain", use: "general_pattern_slab",
  },
  porcelain_stain_fine: {
    patternClarity: 92, colorIntense: 88, blendSmooth: 85,
    sliceClean: 90, cost: 30, stained: true, natural: false,
    colorSource: "porcelain_body_stain", use: "fine_detail_pattern",
  },
  oxide_tint_earthy: {
    patternClarity: 80, colorIntense: 75, blendSmooth: 88,
    sliceClean: 82, cost: 12, stained: false, natural: true,
    colorSource: "metal_oxide_tint", use: "earthy_tone_pattern",
  },
  mason_stain_bright: {
    patternClarity: 88, colorIntense: 95, blendSmooth: 78,
    sliceClean: 85, cost: 25, stained: true, natural: false,
    colorSource: "mason_stain_powder", use: "bright_vivid_pattern",
  },
  natural_clay_blend: {
    patternClarity: 78, colorIntense: 70, blendSmooth: 92,
    sliceClean: 80, cost: 8, stained: false, natural: true,
    colorSource: "mixed_natural_clay", use: "subtle_earth_pattern",
  },
};

export function patternClarity(t: NerikomiSlabType): number { return specs[t].patternClarity; }
export function colorIntense(t: NerikomiSlabType): number { return specs[t].colorIntense; }
export function blendSmooth(t: NerikomiSlabType): number { return specs[t].blendSmooth; }
export function sliceClean(t: NerikomiSlabType): number { return specs[t].sliceClean; }
export function slabCost(t: NerikomiSlabType): number { return specs[t].cost; }
export function stained(t: NerikomiSlabType): boolean { return specs[t].stained; }
export function natural(t: NerikomiSlabType): boolean { return specs[t].natural; }
export function colorSource(t: NerikomiSlabType): string { return specs[t].colorSource; }
export function bestUse(t: NerikomiSlabType): string { return specs[t].use; }
export function nerikomiSlabs(): NerikomiSlabType[] { return Object.keys(specs) as NerikomiSlabType[]; }
