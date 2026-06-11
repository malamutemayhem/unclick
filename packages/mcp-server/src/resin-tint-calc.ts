export type ResinTintType =
  | "liquid_pigment_standard"
  | "mica_powder_shimmer"
  | "alcohol_ink_swirl"
  | "opaque_paste_solid"
  | "glow_powder_dark";

const specs: Record<ResinTintType, {
  colorIntense: number; mixEase: number; transparency: number;
  colorRange: number; cost: number; shimmer: boolean; opaque: boolean;
  pigmentBase: string; use: string;
}> = {
  liquid_pigment_standard: {
    colorIntense: 88, mixEase: 92, transparency: 85,
    colorRange: 90, cost: 6, shimmer: false, opaque: false,
    pigmentBase: "liquid_concentrate_drop", use: "general_transparent_tint",
  },
  mica_powder_shimmer: {
    colorIntense: 82, mixEase: 80, transparency: 70,
    colorRange: 88, cost: 7, shimmer: true, opaque: false,
    pigmentBase: "mineral_mica_flake", use: "metallic_shimmer_effect",
  },
  alcohol_ink_swirl: {
    colorIntense: 90, mixEase: 75, transparency: 92,
    colorRange: 85, cost: 8, shimmer: false, opaque: false,
    pigmentBase: "alcohol_based_dye", use: "swirl_petri_art",
  },
  opaque_paste_solid: {
    colorIntense: 95, mixEase: 78, transparency: 30,
    colorRange: 82, cost: 7, shimmer: false, opaque: true,
    pigmentBase: "thick_opaque_paste", use: "solid_color_cast",
  },
  glow_powder_dark: {
    colorIntense: 80, mixEase: 72, transparency: 65,
    colorRange: 70, cost: 10, shimmer: true, opaque: false,
    pigmentBase: "strontium_aluminate_crystal", use: "glow_in_dark_cast",
  },
};

export function colorIntense(t: ResinTintType): number { return specs[t].colorIntense; }
export function mixEase(t: ResinTintType): number { return specs[t].mixEase; }
export function transparency(t: ResinTintType): number { return specs[t].transparency; }
export function colorRange(t: ResinTintType): number { return specs[t].colorRange; }
export function tintCost(t: ResinTintType): number { return specs[t].cost; }
export function shimmer(t: ResinTintType): boolean { return specs[t].shimmer; }
export function opaque(t: ResinTintType): boolean { return specs[t].opaque; }
export function pigmentBase(t: ResinTintType): string { return specs[t].pigmentBase; }
export function bestUse(t: ResinTintType): string { return specs[t].use; }
export function resinTints(): ResinTintType[] { return Object.keys(specs) as ResinTintType[]; }
