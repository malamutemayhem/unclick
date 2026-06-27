export type FHoleCutterType =
  | "knife_edge_standard"
  | "scroll_saw_fine"
  | "purfling_pick_detail"
  | "miniature_gouge_curve"
  | "heated_knife_clean";

const specs: Record<FHoleCutterType, {
  cutClean: number; curveFollow: number; speedCut: number;
  controlFine: number; cost: number; heated: boolean; powered: boolean;
  bladeProfile: string; use: string;
}> = {
  knife_edge_standard: {
    cutClean: 90, curveFollow: 85, speedCut: 70,
    controlFine: 88, cost: 25, heated: false, powered: false,
    bladeProfile: "straight_bevel_edge", use: "general_f_hole_cut",
  },
  scroll_saw_fine: {
    cutClean: 82, curveFollow: 78, speedCut: 90,
    controlFine: 72, cost: 60, heated: false, powered: true,
    bladeProfile: "thin_scroll_blade", use: "rough_f_hole_shape",
  },
  purfling_pick_detail: {
    cutClean: 88, curveFollow: 92, speedCut: 55,
    controlFine: 95, cost: 30, heated: false, powered: false,
    bladeProfile: "hooked_pick_point", use: "f_hole_notch_detail",
  },
  miniature_gouge_curve: {
    cutClean: 85, curveFollow: 95, speedCut: 60,
    controlFine: 90, cost: 35, heated: false, powered: false,
    bladeProfile: "small_sweep_gouge", use: "f_hole_wing_curve",
  },
  heated_knife_clean: {
    cutClean: 95, curveFollow: 80, speedCut: 75,
    controlFine: 82, cost: 45, heated: true, powered: false,
    bladeProfile: "heated_bevel_blade", use: "clean_edge_finish",
  },
};

export function cutClean(t: FHoleCutterType): number { return specs[t].cutClean; }
export function curveFollow(t: FHoleCutterType): number { return specs[t].curveFollow; }
export function speedCut(t: FHoleCutterType): number { return specs[t].speedCut; }
export function controlFine(t: FHoleCutterType): number { return specs[t].controlFine; }
export function cutterCost(t: FHoleCutterType): number { return specs[t].cost; }
export function heated(t: FHoleCutterType): boolean { return specs[t].heated; }
export function powered(t: FHoleCutterType): boolean { return specs[t].powered; }
export function bladeProfile(t: FHoleCutterType): string { return specs[t].bladeProfile; }
export function bestUse(t: FHoleCutterType): string { return specs[t].use; }
export function fHoleCutters(): FHoleCutterType[] { return Object.keys(specs) as FHoleCutterType[]; }
