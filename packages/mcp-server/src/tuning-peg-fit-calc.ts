export type TuningPegFitType =
  | "taper_reamer_standard"
  | "peg_shaper_match"
  | "compound_paste_smooth"
  | "bush_insert_repair"
  | "friction_chalk_grip";

const specs: Record<TuningPegFitType, {
  fitAccuracy: number; turnSmooth: number; holdTune: number;
  speedFit: number; cost: number; forRepair: boolean; compound: boolean;
  fitMethod: string; use: string;
}> = {
  taper_reamer_standard: {
    fitAccuracy: 92, turnSmooth: 80, holdTune: 85,
    speedFit: 70, cost: 35, forRepair: false, compound: false,
    fitMethod: "taper_ream_hole", use: "general_peg_fit",
  },
  peg_shaper_match: {
    fitAccuracy: 90, turnSmooth: 82, holdTune: 88,
    speedFit: 75, cost: 40, forRepair: false, compound: false,
    fitMethod: "shaper_match_taper", use: "new_peg_shape",
  },
  compound_paste_smooth: {
    fitAccuracy: 70, turnSmooth: 95, holdTune: 78,
    speedFit: 92, cost: 10, forRepair: false, compound: true,
    fitMethod: "paste_lubricate_grip", use: "quick_smooth_adjust",
  },
  bush_insert_repair: {
    fitAccuracy: 85, turnSmooth: 75, holdTune: 90,
    speedFit: 55, cost: 50, forRepair: true, compound: false,
    fitMethod: "bush_glue_redrill", use: "worn_pegbox_repair",
  },
  friction_chalk_grip: {
    fitAccuracy: 65, turnSmooth: 70, holdTune: 82,
    speedFit: 95, cost: 5, forRepair: false, compound: true,
    fitMethod: "chalk_dust_friction", use: "slip_peg_quick_fix",
  },
};

export function fitAccuracy(t: TuningPegFitType): number { return specs[t].fitAccuracy; }
export function turnSmooth(t: TuningPegFitType): number { return specs[t].turnSmooth; }
export function holdTune(t: TuningPegFitType): number { return specs[t].holdTune; }
export function speedFit(t: TuningPegFitType): number { return specs[t].speedFit; }
export function fitCost(t: TuningPegFitType): number { return specs[t].cost; }
export function forRepair(t: TuningPegFitType): boolean { return specs[t].forRepair; }
export function compound(t: TuningPegFitType): boolean { return specs[t].compound; }
export function fitMethod(t: TuningPegFitType): string { return specs[t].fitMethod; }
export function bestUse(t: TuningPegFitType): string { return specs[t].use; }
export function tuningPegFits(): TuningPegFitType[] { return Object.keys(specs) as TuningPegFitType[]; }
