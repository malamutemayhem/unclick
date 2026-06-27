export type EncausticMediumType =
  | "beeswax_damar_standard"
  | "microcrystal_wax_hard"
  | "soy_wax_medium_soft"
  | "pigmented_wax_color"
  | "clear_medium_glaze";

const specs: Record<EncausticMediumType, {
  fuseControl: number; transparency: number; layerBuild: number;
  workTime: number; cost: number; pigmented: boolean; traditional: boolean;
  waxBase: string; use: string;
}> = {
  beeswax_damar_standard: {
    fuseControl: 90, transparency: 88, layerBuild: 85,
    workTime: 82, cost: 10, pigmented: false, traditional: true,
    waxBase: "beeswax_damar_resin", use: "traditional_encaustic_paint",
  },
  microcrystal_wax_hard: {
    fuseControl: 85, transparency: 82, layerBuild: 92,
    workTime: 78, cost: 8, pigmented: false, traditional: false,
    waxBase: "microcrystalline_refined", use: "hard_durable_surface",
  },
  soy_wax_medium_soft: {
    fuseControl: 82, transparency: 85, layerBuild: 78,
    workTime: 90, cost: 6, pigmented: false, traditional: false,
    waxBase: "hydrogenated_soy_oil", use: "soft_blend_practice",
  },
  pigmented_wax_color: {
    fuseControl: 88, transparency: 70, layerBuild: 88,
    workTime: 80, cost: 12, pigmented: true, traditional: false,
    waxBase: "pigment_wax_block", use: "opaque_color_layer",
  },
  clear_medium_glaze: {
    fuseControl: 92, transparency: 95, layerBuild: 80,
    workTime: 85, cost: 9, pigmented: false, traditional: true,
    waxBase: "pure_beeswax_clear", use: "transparent_glaze_layer",
  },
};

export function fuseControl(t: EncausticMediumType): number { return specs[t].fuseControl; }
export function transparency(t: EncausticMediumType): number { return specs[t].transparency; }
export function layerBuild(t: EncausticMediumType): number { return specs[t].layerBuild; }
export function workTime(t: EncausticMediumType): number { return specs[t].workTime; }
export function mediumCost(t: EncausticMediumType): number { return specs[t].cost; }
export function pigmented(t: EncausticMediumType): boolean { return specs[t].pigmented; }
export function traditional(t: EncausticMediumType): boolean { return specs[t].traditional; }
export function waxBase(t: EncausticMediumType): string { return specs[t].waxBase; }
export function bestUse(t: EncausticMediumType): string { return specs[t].use; }
export function encausticMediums(): EncausticMediumType[] { return Object.keys(specs) as EncausticMediumType[]; }
