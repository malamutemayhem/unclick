export type RippingChiselUpholstType =
  | "straight_blade_standard"
  | "cranked_blade_offset"
  | "wide_blade_fast"
  | "narrow_blade_detail"
  | "magnetic_tip_collect";

const specs: Record<RippingChiselUpholstType, {
  tackPull: number; fabricSafe: number; speedStrip: number;
  controlAim: number; cost: number; cranked: boolean; magnetic: boolean;
  bladeWidth: string; use: string;
}> = {
  straight_blade_standard: {
    tackPull: 80, fabricSafe: 75, speedStrip: 72,
    controlAim: 82, cost: 15, cranked: false, magnetic: false,
    bladeWidth: "medium_half_inch", use: "general_tack_strip",
  },
  cranked_blade_offset: {
    tackPull: 85, fabricSafe: 82, speedStrip: 78,
    controlAim: 88, cost: 20, cranked: true, magnetic: false,
    bladeWidth: "medium_half_inch", use: "flush_frame_strip",
  },
  wide_blade_fast: {
    tackPull: 88, fabricSafe: 65, speedStrip: 92,
    controlAim: 70, cost: 18, cranked: false, magnetic: false,
    bladeWidth: "wide_one_inch", use: "fast_bulk_strip",
  },
  narrow_blade_detail: {
    tackPull: 72, fabricSafe: 90, speedStrip: 60,
    controlAim: 95, cost: 16, cranked: false, magnetic: false,
    bladeWidth: "narrow_quarter_inch", use: "detail_corner_strip",
  },
  magnetic_tip_collect: {
    tackPull: 82, fabricSafe: 78, speedStrip: 80,
    controlAim: 80, cost: 25, cranked: false, magnetic: true,
    bladeWidth: "medium_half_inch", use: "clean_tack_collect",
  },
};

export function tackPull(t: RippingChiselUpholstType): number { return specs[t].tackPull; }
export function fabricSafe(t: RippingChiselUpholstType): number { return specs[t].fabricSafe; }
export function speedStrip(t: RippingChiselUpholstType): number { return specs[t].speedStrip; }
export function controlAim(t: RippingChiselUpholstType): number { return specs[t].controlAim; }
export function chiselCost(t: RippingChiselUpholstType): number { return specs[t].cost; }
export function cranked(t: RippingChiselUpholstType): boolean { return specs[t].cranked; }
export function magnetic(t: RippingChiselUpholstType): boolean { return specs[t].magnetic; }
export function bladeWidth(t: RippingChiselUpholstType): string { return specs[t].bladeWidth; }
export function bestUse(t: RippingChiselUpholstType): string { return specs[t].use; }
export function rippingChiselUpholsts(): RippingChiselUpholstType[] { return Object.keys(specs) as RippingChiselUpholstType[]; }
