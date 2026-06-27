export type FrescoPaintType =
  | "earth_pigment_natural"
  | "lime_white_base"
  | "oxide_pigment_strong"
  | "mineral_pigment_pure"
  | "synthetic_pigment_bright";

const specs: Record<FrescoPaintType, {
  colorFast: number; bindStrength: number; mixEase: number;
  colorRange: number; cost: number; natural: boolean; limeProof: boolean;
  pigmentSource: string; use: string;
}> = {
  earth_pigment_natural: {
    colorFast: 92, bindStrength: 90, mixEase: 85,
    colorRange: 78, cost: 8, natural: true, limeProof: true,
    pigmentSource: "natural_earth_oxide", use: "traditional_buon_fresco",
  },
  lime_white_base: {
    colorFast: 88, bindStrength: 92, mixEase: 90,
    colorRange: 60, cost: 5, natural: true, limeProof: true,
    pigmentSource: "slaked_lime_calcium", use: "base_highlight_layer",
  },
  oxide_pigment_strong: {
    colorFast: 90, bindStrength: 88, mixEase: 82,
    colorRange: 85, cost: 9, natural: true, limeProof: true,
    pigmentSource: "iron_oxide_mineral", use: "strong_color_accent",
  },
  mineral_pigment_pure: {
    colorFast: 95, bindStrength: 85, mixEase: 78,
    colorRange: 82, cost: 14, natural: true, limeProof: true,
    pigmentSource: "ground_mineral_crystal", use: "premium_fine_detail",
  },
  synthetic_pigment_bright: {
    colorFast: 82, bindStrength: 80, mixEase: 88,
    colorRange: 92, cost: 6, natural: false, limeProof: false,
    pigmentSource: "synthetic_organic_dye", use: "bright_secco_overlay",
  },
};

export function colorFast(t: FrescoPaintType): number { return specs[t].colorFast; }
export function bindStrength(t: FrescoPaintType): number { return specs[t].bindStrength; }
export function mixEase(t: FrescoPaintType): number { return specs[t].mixEase; }
export function colorRange(t: FrescoPaintType): number { return specs[t].colorRange; }
export function paintCost(t: FrescoPaintType): number { return specs[t].cost; }
export function natural(t: FrescoPaintType): boolean { return specs[t].natural; }
export function limeProof(t: FrescoPaintType): boolean { return specs[t].limeProof; }
export function pigmentSource(t: FrescoPaintType): string { return specs[t].pigmentSource; }
export function bestUse(t: FrescoPaintType): string { return specs[t].use; }
export function frescoPaynts(): FrescoPaintType[] { return Object.keys(specs) as FrescoPaintType[]; }
