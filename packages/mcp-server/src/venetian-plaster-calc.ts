export type VenetianPlasterType =
  | "lime_putty_traditional"
  | "synthetic_acrylic_modern"
  | "marble_dust_fine"
  | "colored_stucco_pigment"
  | "metallic_plaster_shimmer";

const specs: Record<VenetianPlasterType, {
  smoothFinish: number; depthGlow: number; durability: number;
  applyEase: number; cost: number; traditional: boolean; metallic: boolean;
  binderType: string; use: string;
}> = {
  lime_putty_traditional: {
    smoothFinish: 92, depthGlow: 90, durability: 85,
    applyEase: 72, cost: 10, traditional: true, metallic: false,
    binderType: "aged_lime_putty", use: "authentic_italian_finish",
  },
  synthetic_acrylic_modern: {
    smoothFinish: 85, depthGlow: 78, durability: 90,
    applyEase: 92, cost: 7, traditional: false, metallic: false,
    binderType: "acrylic_polymer_bind", use: "easy_apply_modern",
  },
  marble_dust_fine: {
    smoothFinish: 90, depthGlow: 88, durability: 88,
    applyEase: 78, cost: 12, traditional: true, metallic: false,
    binderType: "lime_marble_powder", use: "high_polish_marble_look",
  },
  colored_stucco_pigment: {
    smoothFinish: 82, depthGlow: 82, durability: 85,
    applyEase: 85, cost: 8, traditional: false, metallic: false,
    binderType: "pigment_lime_blend", use: "bold_color_accent_wall",
  },
  metallic_plaster_shimmer: {
    smoothFinish: 88, depthGlow: 85, durability: 82,
    applyEase: 80, cost: 11, traditional: false, metallic: true,
    binderType: "mica_acrylic_blend", use: "luxury_metallic_accent",
  },
};

export function smoothFinish(t: VenetianPlasterType): number { return specs[t].smoothFinish; }
export function depthGlow(t: VenetianPlasterType): number { return specs[t].depthGlow; }
export function durability(t: VenetianPlasterType): number { return specs[t].durability; }
export function applyEase(t: VenetianPlasterType): number { return specs[t].applyEase; }
export function plasterCost(t: VenetianPlasterType): number { return specs[t].cost; }
export function traditional(t: VenetianPlasterType): boolean { return specs[t].traditional; }
export function metallic(t: VenetianPlasterType): boolean { return specs[t].metallic; }
export function binderType(t: VenetianPlasterType): string { return specs[t].binderType; }
export function bestUse(t: VenetianPlasterType): string { return specs[t].use; }
export function venetianPlasters(): VenetianPlasterType[] { return Object.keys(specs) as VenetianPlasterType[]; }
