export type RaddleSpreadType =
  | "open_top_standard"
  | "closed_top_secure"
  | "adjustable_peg_set"
  | "metal_raddle_durable"
  | "clamp_mount_portable";

const specs: Record<RaddleSpreadType, {
  spreadEven: number; threadSecure: number; setupSpeed: number;
  widthRange: number; cost: number; closedTop: boolean; adjustable: boolean;
  pegStyle: string; use: string;
}> = {
  open_top_standard: {
    spreadEven: 82, threadSecure: 75, setupSpeed: 88,
    widthRange: 85, cost: 15, closedTop: false, adjustable: false,
    pegStyle: "fixed_nail_peg", use: "general_warp_spread",
  },
  closed_top_secure: {
    spreadEven: 85, threadSecure: 92, setupSpeed: 75,
    widthRange: 82, cost: 22, closedTop: true, adjustable: false,
    pegStyle: "capped_dowel_peg", use: "secure_beam_wind",
  },
  adjustable_peg_set: {
    spreadEven: 88, threadSecure: 80, setupSpeed: 78,
    widthRange: 95, cost: 30, closedTop: false, adjustable: true,
    pegStyle: "removable_slot_peg", use: "variable_sett_spread",
  },
  metal_raddle_durable: {
    spreadEven: 85, threadSecure: 85, setupSpeed: 80,
    widthRange: 88, cost: 35, closedTop: true, adjustable: false,
    pegStyle: "welded_steel_peg", use: "heavy_warp_spread",
  },
  clamp_mount_portable: {
    spreadEven: 78, threadSecure: 78, setupSpeed: 92,
    widthRange: 80, cost: 18, closedTop: false, adjustable: false,
    pegStyle: "clamp_on_peg_strip", use: "portable_quick_mount",
  },
};

export function spreadEven(t: RaddleSpreadType): number { return specs[t].spreadEven; }
export function threadSecure(t: RaddleSpreadType): number { return specs[t].threadSecure; }
export function setupSpeed(t: RaddleSpreadType): number { return specs[t].setupSpeed; }
export function widthRange(t: RaddleSpreadType): number { return specs[t].widthRange; }
export function raddleCost(t: RaddleSpreadType): number { return specs[t].cost; }
export function closedTop(t: RaddleSpreadType): boolean { return specs[t].closedTop; }
export function adjustable(t: RaddleSpreadType): boolean { return specs[t].adjustable; }
export function pegStyle(t: RaddleSpreadType): string { return specs[t].pegStyle; }
export function bestUse(t: RaddleSpreadType): string { return specs[t].use; }
export function raddleSpreads(): RaddleSpreadType[] { return Object.keys(specs) as RaddleSpreadType[]; }
