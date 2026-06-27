export type ObliqueHoldType =
  | "brass_flange_standard"
  | "adjustable_flange_universal"
  | "bullock_style_fixed"
  | "ergonomic_grip_comfort"
  | "speedball_oblique_budget";

const specs: Record<ObliqueHoldType, {
  angleConsist: number; nibHold: number; comfortGrip: number;
  nibRange: number; cost: number; adjustable: boolean; ergonomic: boolean;
  flangeType: string; use: string;
}> = {
  brass_flange_standard: {
    angleConsist: 88, nibHold: 90, comfortGrip: 80,
    nibRange: 82, cost: 8, adjustable: false, ergonomic: false,
    flangeType: "brass_fitted_flange", use: "copperplate_script_write",
  },
  adjustable_flange_universal: {
    angleConsist: 85, nibHold: 88, comfortGrip: 82,
    nibRange: 95, cost: 10, adjustable: true, ergonomic: false,
    flangeType: "universal_adjust_flange", use: "multi_nib_versatile",
  },
  bullock_style_fixed: {
    angleConsist: 92, nibHold: 92, comfortGrip: 78,
    nibRange: 75, cost: 12, adjustable: false, ergonomic: false,
    flangeType: "fixed_precision_flange", use: "spencerian_fine_script",
  },
  ergonomic_grip_comfort: {
    angleConsist: 82, nibHold: 85, comfortGrip: 95,
    nibRange: 85, cost: 9, adjustable: false, ergonomic: true,
    flangeType: "padded_comfort_flange", use: "long_session_practice",
  },
  speedball_oblique_budget: {
    angleConsist: 78, nibHold: 80, comfortGrip: 75,
    nibRange: 80, cost: 4, adjustable: false, ergonomic: false,
    flangeType: "plastic_basic_flange", use: "beginner_oblique_start",
  },
};

export function angleConsist(t: ObliqueHoldType): number { return specs[t].angleConsist; }
export function nibHold(t: ObliqueHoldType): number { return specs[t].nibHold; }
export function comfortGrip(t: ObliqueHoldType): number { return specs[t].comfortGrip; }
export function nibRange(t: ObliqueHoldType): number { return specs[t].nibRange; }
export function holdCost(t: ObliqueHoldType): number { return specs[t].cost; }
export function adjustable(t: ObliqueHoldType): boolean { return specs[t].adjustable; }
export function ergonomic(t: ObliqueHoldType): boolean { return specs[t].ergonomic; }
export function flangeType(t: ObliqueHoldType): string { return specs[t].flangeType; }
export function bestUse(t: ObliqueHoldType): string { return specs[t].use; }
export function obliqueHolds(): ObliqueHoldType[] { return Object.keys(specs) as ObliqueHoldType[]; }
