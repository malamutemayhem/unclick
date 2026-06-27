export type FidToolType =
  | "wooden_fid_standard"
  | "metal_fid_durable"
  | "bone_fid_smooth"
  | "hollow_fid_thread"
  | "tapered_fid_splice";

const specs: Record<FidToolType, {
  openEase: number; threadGuide: number; durability: number;
  cordRange: number; cost: number; hollow: boolean; tapered: boolean;
  tipShape: string; use: string;
}> = {
  wooden_fid_standard: {
    openEase: 82, threadGuide: 78, durability: 70,
    cordRange: 85, cost: 8, hollow: false, tapered: true,
    tipShape: "solid_taper_point", use: "general_rope_splice",
  },
  metal_fid_durable: {
    openEase: 88, threadGuide: 82, durability: 95,
    cordRange: 80, cost: 15, hollow: false, tapered: true,
    tipShape: "steel_taper_point", use: "heavy_line_splice",
  },
  bone_fid_smooth: {
    openEase: 85, threadGuide: 85, durability: 65,
    cordRange: 75, cost: 12, hollow: false, tapered: true,
    tipShape: "polished_bone_taper", use: "traditional_net_work",
  },
  hollow_fid_thread: {
    openEase: 78, threadGuide: 95, durability: 80,
    cordRange: 70, cost: 20, hollow: true, tapered: false,
    tipShape: "hollow_tube_channel", use: "thread_through_braid",
  },
  tapered_fid_splice: {
    openEase: 90, threadGuide: 80, durability: 85,
    cordRange: 92, cost: 18, hollow: false, tapered: true,
    tipShape: "long_gradual_taper", use: "large_hawser_splice",
  },
};

export function openEase(t: FidToolType): number { return specs[t].openEase; }
export function threadGuide(t: FidToolType): number { return specs[t].threadGuide; }
export function durability(t: FidToolType): number { return specs[t].durability; }
export function cordRange(t: FidToolType): number { return specs[t].cordRange; }
export function fidCost(t: FidToolType): number { return specs[t].cost; }
export function hollow(t: FidToolType): boolean { return specs[t].hollow; }
export function tapered(t: FidToolType): boolean { return specs[t].tapered; }
export function tipShape(t: FidToolType): string { return specs[t].tipShape; }
export function bestUse(t: FidToolType): string { return specs[t].use; }
export function fidTools(): FidToolType[] { return Object.keys(specs) as FidToolType[]; }
