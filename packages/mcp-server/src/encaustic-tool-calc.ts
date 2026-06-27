export type EncausticToolType =
  | "bristle_brush_stiff"
  | "palette_knife_spread"
  | "carving_tool_scrape"
  | "stylus_pen_draw"
  | "rubber_shaper_blend";

const specs: Record<EncausticToolType, {
  markControl: number; blendSmooth: number; textureRange: number;
  durability: number; cost: number; heated: boolean; forCarving: boolean;
  tipStyle: string; use: string;
}> = {
  bristle_brush_stiff: {
    markControl: 82, blendSmooth: 85, textureRange: 88,
    durability: 80, cost: 5, heated: false, forCarving: false,
    tipStyle: "natural_bristle_flat", use: "general_wax_apply",
  },
  palette_knife_spread: {
    markControl: 85, blendSmooth: 88, textureRange: 82,
    durability: 90, cost: 6, heated: false, forCarving: false,
    tipStyle: "metal_flexible_blade", use: "smooth_spread_layer",
  },
  carving_tool_scrape: {
    markControl: 90, blendSmooth: 72, textureRange: 95,
    durability: 88, cost: 7, heated: false, forCarving: true,
    tipStyle: "sharp_loop_scraper", use: "sgraffito_carve_reveal",
  },
  stylus_pen_draw: {
    markControl: 95, blendSmooth: 78, textureRange: 80,
    durability: 82, cost: 10, heated: true, forCarving: false,
    tipStyle: "heated_metal_tip", use: "fine_line_draw_detail",
  },
  rubber_shaper_blend: {
    markControl: 80, blendSmooth: 92, textureRange: 78,
    durability: 75, cost: 4, heated: false, forCarving: false,
    tipStyle: "silicone_rubber_tip", use: "soft_blend_smooth",
  },
};

export function markControl(t: EncausticToolType): number { return specs[t].markControl; }
export function blendSmooth(t: EncausticToolType): number { return specs[t].blendSmooth; }
export function textureRange(t: EncausticToolType): number { return specs[t].textureRange; }
export function durability(t: EncausticToolType): number { return specs[t].durability; }
export function toolCost(t: EncausticToolType): number { return specs[t].cost; }
export function heated(t: EncausticToolType): boolean { return specs[t].heated; }
export function forCarving(t: EncausticToolType): boolean { return specs[t].forCarving; }
export function tipStyle(t: EncausticToolType): string { return specs[t].tipStyle; }
export function bestUse(t: EncausticToolType): string { return specs[t].use; }
export function encausticTools(): EncausticToolType[] { return Object.keys(specs) as EncausticToolType[]; }
