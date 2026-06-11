export type GrozingPlierType =
  | "flat_jaw_standard"
  | "curved_jaw_contour"
  | "running_plier_score"
  | "breaker_grozier_combo"
  | "needle_nose_detail";

const specs: Record<GrozingPlierType, {
  gripStrength: number; nibbleFine: number; controlSteady: number;
  glassRange: number; cost: number; curved: boolean; forScoreLine: boolean;
  jawProfile: string; use: string;
}> = {
  flat_jaw_standard: {
    gripStrength: 85, nibbleFine: 82, controlSteady: 88,
    glassRange: 85, cost: 6, curved: false, forScoreLine: false,
    jawProfile: "flat_serrated_edge", use: "general_glass_grozing",
  },
  curved_jaw_contour: {
    gripStrength: 82, nibbleFine: 88, controlSteady: 85,
    glassRange: 80, cost: 7, curved: true, forScoreLine: false,
    jawProfile: "curved_concave_jaw", use: "contour_shape_nibble",
  },
  running_plier_score: {
    gripStrength: 90, nibbleFine: 72, controlSteady: 92,
    glassRange: 88, cost: 8, curved: false, forScoreLine: true,
    jawProfile: "wide_padded_jaw", use: "clean_score_line_break",
  },
  breaker_grozier_combo: {
    gripStrength: 88, nibbleFine: 85, controlSteady: 82,
    glassRange: 90, cost: 9, curved: false, forScoreLine: true,
    jawProfile: "dual_function_jaw", use: "break_and_groze_combo",
  },
  needle_nose_detail: {
    gripStrength: 75, nibbleFine: 95, controlSteady: 90,
    glassRange: 72, cost: 7, curved: false, forScoreLine: false,
    jawProfile: "narrow_pointed_tip", use: "tight_curve_detail_work",
  },
};

export function gripStrength(t: GrozingPlierType): number { return specs[t].gripStrength; }
export function nibbleFine(t: GrozingPlierType): number { return specs[t].nibbleFine; }
export function controlSteady(t: GrozingPlierType): number { return specs[t].controlSteady; }
export function glassRange(t: GrozingPlierType): number { return specs[t].glassRange; }
export function plierCost(t: GrozingPlierType): number { return specs[t].cost; }
export function curved(t: GrozingPlierType): boolean { return specs[t].curved; }
export function forScoreLine(t: GrozingPlierType): boolean { return specs[t].forScoreLine; }
export function jawProfile(t: GrozingPlierType): string { return specs[t].jawProfile; }
export function bestUse(t: GrozingPlierType): string { return specs[t].use; }
export function grozingPliers(): GrozingPlierType[] { return Object.keys(specs) as GrozingPlierType[]; }
