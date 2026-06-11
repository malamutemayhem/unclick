export type WitnessConeType =
  | "small_cone_low"
  | "large_cone_standard"
  | "self_support_bar"
  | "junior_cone_mini"
  | "guard_cone_safety";

const specs: Record<WitnessConeType, {
  tempAccuracy: number; visibility: number; tempRange: number;
  reliability: number; cost: number; selfSupport: boolean; miniSize: boolean;
  coneShape: string; use: string;
}> = {
  small_cone_low: {
    tempAccuracy: 88, visibility: 82, tempRange: 75,
    reliability: 85, cost: 2, selfSupport: false, miniSize: false,
    coneShape: "standard_small_cone", use: "low_fire_witness",
  },
  large_cone_standard: {
    tempAccuracy: 90, visibility: 92, tempRange: 85,
    reliability: 88, cost: 3, selfSupport: false, miniSize: false,
    coneShape: "standard_large_cone", use: "general_fire_witness",
  },
  self_support_bar: {
    tempAccuracy: 85, visibility: 88, tempRange: 82,
    reliability: 82, cost: 4, selfSupport: true, miniSize: false,
    coneShape: "flat_bar_stand", use: "no_plaque_needed",
  },
  junior_cone_mini: {
    tempAccuracy: 82, visibility: 78, tempRange: 78,
    reliability: 80, cost: 2, selfSupport: false, miniSize: true,
    coneShape: "miniature_cone_tip", use: "kiln_sitter_trigger",
  },
  guard_cone_safety: {
    tempAccuracy: 88, visibility: 85, tempRange: 88,
    reliability: 92, cost: 3, selfSupport: false, miniSize: false,
    coneShape: "guard_warning_cone", use: "overfire_safety_check",
  },
};

export function tempAccuracy(t: WitnessConeType): number { return specs[t].tempAccuracy; }
export function visibility(t: WitnessConeType): number { return specs[t].visibility; }
export function tempRange(t: WitnessConeType): number { return specs[t].tempRange; }
export function reliability(t: WitnessConeType): number { return specs[t].reliability; }
export function coneCost(t: WitnessConeType): number { return specs[t].cost; }
export function selfSupport(t: WitnessConeType): boolean { return specs[t].selfSupport; }
export function miniSize(t: WitnessConeType): boolean { return specs[t].miniSize; }
export function coneShape(t: WitnessConeType): string { return specs[t].coneShape; }
export function bestUse(t: WitnessConeType): string { return specs[t].use; }
export function witnessCones(): WitnessConeType[] { return Object.keys(specs) as WitnessConeType[]; }
