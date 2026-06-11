export type BushingToolWatchType =
  | "hand_reamer_standard"
  | "broach_set_taper"
  | "burnisher_polish"
  | "press_fit_install"
  | "micro_lathe_turn";

const specs: Record<BushingToolWatchType, {
  holeAccuracy: number; finishSmooth: number; speedWork: number;
  sizeRange: number; cost: number; powered: boolean; forPolish: boolean;
  cutMethod: string; use: string;
}> = {
  hand_reamer_standard: {
    holeAccuracy: 82, finishSmooth: 78, speedWork: 65,
    sizeRange: 75, cost: 40, powered: false, forPolish: false,
    cutMethod: "straight_flute_ream", use: "general_bushing_ream",
  },
  broach_set_taper: {
    holeAccuracy: 88, finishSmooth: 72, speedWork: 80,
    sizeRange: 85, cost: 80, powered: false, forPolish: false,
    cutMethod: "tapered_broach_push", use: "fast_bushing_size",
  },
  burnisher_polish: {
    holeAccuracy: 75, finishSmooth: 95, speedWork: 55,
    sizeRange: 60, cost: 30, powered: false, forPolish: true,
    cutMethod: "burnish_smooth_rub", use: "pivot_hole_polish",
  },
  press_fit_install: {
    holeAccuracy: 85, finishSmooth: 80, speedWork: 88,
    sizeRange: 72, cost: 60, powered: false, forPolish: false,
    cutMethod: "press_force_fit", use: "bushing_install_press",
  },
  micro_lathe_turn: {
    holeAccuracy: 95, finishSmooth: 90, speedWork: 60,
    sizeRange: 90, cost: 500, powered: true, forPolish: false,
    cutMethod: "lathe_precision_turn", use: "custom_bushing_make",
  },
};

export function holeAccuracy(t: BushingToolWatchType): number { return specs[t].holeAccuracy; }
export function finishSmooth(t: BushingToolWatchType): number { return specs[t].finishSmooth; }
export function speedWork(t: BushingToolWatchType): number { return specs[t].speedWork; }
export function sizeRange(t: BushingToolWatchType): number { return specs[t].sizeRange; }
export function toolCost(t: BushingToolWatchType): number { return specs[t].cost; }
export function powered(t: BushingToolWatchType): boolean { return specs[t].powered; }
export function forPolish(t: BushingToolWatchType): boolean { return specs[t].forPolish; }
export function cutMethod(t: BushingToolWatchType): string { return specs[t].cutMethod; }
export function bestUse(t: BushingToolWatchType): string { return specs[t].use; }
export function bushingToolWatches(): BushingToolWatchType[] { return Object.keys(specs) as BushingToolWatchType[]; }
