export type BrushRestType =
  | "ceramic_mountain_rest"
  | "bamboo_holder_natural"
  | "porcelain_tray_elegant"
  | "wooden_rack_multi"
  | "metal_stand_modern";

const specs: Record<BrushRestType, {
  stability: number; brushCount: number; cleanEase: number;
  portability: number; cost: number; natural: boolean; multiHolder: boolean;
  restShape: string; use: string;
}> = {
  ceramic_mountain_rest: {
    stability: 90, brushCount: 72, cleanEase: 85,
    portability: 80, cost: 8, natural: false, multiHolder: false,
    restShape: "mountain_peak_ridge", use: "single_brush_writing",
  },
  bamboo_holder_natural: {
    stability: 82, brushCount: 78, cleanEase: 80,
    portability: 88, cost: 5, natural: true, multiHolder: false,
    restShape: "curved_bamboo_groove", use: "portable_natural_rest",
  },
  porcelain_tray_elegant: {
    stability: 88, brushCount: 80, cleanEase: 90,
    portability: 75, cost: 10, natural: false, multiHolder: false,
    restShape: "flat_glazed_tray", use: "elegant_desk_display",
  },
  wooden_rack_multi: {
    stability: 85, brushCount: 95, cleanEase: 78,
    portability: 70, cost: 7, natural: true, multiHolder: true,
    restShape: "tiered_slot_rack", use: "multi_brush_storage",
  },
  metal_stand_modern: {
    stability: 92, brushCount: 85, cleanEase: 88,
    portability: 82, cost: 9, natural: false, multiHolder: true,
    restShape: "wire_loop_stand", use: "modern_studio_display",
  },
};

export function stability(t: BrushRestType): number { return specs[t].stability; }
export function brushCount(t: BrushRestType): number { return specs[t].brushCount; }
export function cleanEase(t: BrushRestType): number { return specs[t].cleanEase; }
export function portability(t: BrushRestType): number { return specs[t].portability; }
export function restCost(t: BrushRestType): number { return specs[t].cost; }
export function natural(t: BrushRestType): boolean { return specs[t].natural; }
export function multiHolder(t: BrushRestType): boolean { return specs[t].multiHolder; }
export function restShape(t: BrushRestType): string { return specs[t].restShape; }
export function bestUse(t: BrushRestType): string { return specs[t].use; }
export function brushRests(): BrushRestType[] { return Object.keys(specs) as BrushRestType[]; }
