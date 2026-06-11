export type SailTwineType =
  | "polyester_waxed_standard"
  | "nylon_waxed_strong"
  | "linen_traditional_soft"
  | "dyneema_thin_light"
  | "whipping_twine_fine";

const specs: Record<SailTwineType, {
  knotHold: number; breakStrength: number; uvResist: number;
  sewSmooth: number; cost: number; waxed: boolean; synthetic: boolean;
  fiberType: string; use: string;
}> = {
  polyester_waxed_standard: {
    knotHold: 88, breakStrength: 85, uvResist: 90,
    sewSmooth: 82, cost: 8, waxed: true, synthetic: true,
    fiberType: "waxed_polyester_braid", use: "general_sail_sew",
  },
  nylon_waxed_strong: {
    knotHold: 85, breakStrength: 92, uvResist: 78,
    sewSmooth: 80, cost: 10, waxed: true, synthetic: true,
    fiberType: "waxed_nylon_twist", use: "heavy_load_stitch",
  },
  linen_traditional_soft: {
    knotHold: 82, breakStrength: 72, uvResist: 65,
    sewSmooth: 90, cost: 12, waxed: false, synthetic: false,
    fiberType: "natural_linen_thread", use: "traditional_hand_sew",
  },
  dyneema_thin_light: {
    knotHold: 78, breakStrength: 95, uvResist: 85,
    sewSmooth: 75, cost: 20, waxed: false, synthetic: true,
    fiberType: "hmpe_thin_braid", use: "light_strong_repair",
  },
  whipping_twine_fine: {
    knotHold: 90, breakStrength: 78, uvResist: 82,
    sewSmooth: 88, cost: 6, waxed: true, synthetic: true,
    fiberType: "fine_waxed_poly", use: "whipping_seize_bind",
  },
};

export function knotHold(t: SailTwineType): number { return specs[t].knotHold; }
export function breakStrength(t: SailTwineType): number { return specs[t].breakStrength; }
export function uvResist(t: SailTwineType): number { return specs[t].uvResist; }
export function sewSmooth(t: SailTwineType): number { return specs[t].sewSmooth; }
export function twineCost(t: SailTwineType): number { return specs[t].cost; }
export function waxed(t: SailTwineType): boolean { return specs[t].waxed; }
export function synthetic(t: SailTwineType): boolean { return specs[t].synthetic; }
export function fiberType(t: SailTwineType): string { return specs[t].fiberType; }
export function bestUse(t: SailTwineType): string { return specs[t].use; }
export function sailTwines(): SailTwineType[] { return Object.keys(specs) as SailTwineType[]; }
