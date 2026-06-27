export type SpringTwineType =
  | "hemp_twine_standard"
  | "nylon_twine_strong"
  | "polyester_twine_durable"
  | "linen_twine_traditional"
  | "waxed_twine_grip";

const specs: Record<SpringTwineType, {
  knotHold: number; breakStrength: number; abrasionResist: number;
  flexibility: number; cost: number; waxed: boolean; synthetic: boolean;
  fiberType: string; use: string;
}> = {
  hemp_twine_standard: {
    knotHold: 82, breakStrength: 75, abrasionResist: 68,
    flexibility: 78, cost: 8, waxed: false, synthetic: false,
    fiberType: "natural_hemp_ply", use: "general_spring_tie",
  },
  nylon_twine_strong: {
    knotHold: 75, breakStrength: 92, abrasionResist: 85,
    flexibility: 82, cost: 12, waxed: false, synthetic: true,
    fiberType: "braided_nylon_cord", use: "high_tension_tie",
  },
  polyester_twine_durable: {
    knotHold: 78, breakStrength: 88, abrasionResist: 92,
    flexibility: 75, cost: 14, waxed: false, synthetic: true,
    fiberType: "twisted_polyester_ply", use: "durable_spring_lash",
  },
  linen_twine_traditional: {
    knotHold: 88, breakStrength: 70, abrasionResist: 60,
    flexibility: 85, cost: 10, waxed: false, synthetic: false,
    fiberType: "woven_linen_thread", use: "traditional_hand_tie",
  },
  waxed_twine_grip: {
    knotHold: 95, breakStrength: 80, abrasionResist: 78,
    flexibility: 70, cost: 15, waxed: true, synthetic: false,
    fiberType: "waxed_hemp_cord", use: "secure_grip_tie",
  },
};

export function knotHold(t: SpringTwineType): number { return specs[t].knotHold; }
export function breakStrength(t: SpringTwineType): number { return specs[t].breakStrength; }
export function abrasionResist(t: SpringTwineType): number { return specs[t].abrasionResist; }
export function flexibility(t: SpringTwineType): number { return specs[t].flexibility; }
export function twineCost(t: SpringTwineType): number { return specs[t].cost; }
export function waxed(t: SpringTwineType): boolean { return specs[t].waxed; }
export function synthetic(t: SpringTwineType): boolean { return specs[t].synthetic; }
export function fiberType(t: SpringTwineType): string { return specs[t].fiberType; }
export function bestUse(t: SpringTwineType): string { return specs[t].use; }
export function springTwines(): SpringTwineType[] { return Object.keys(specs) as SpringTwineType[]; }
