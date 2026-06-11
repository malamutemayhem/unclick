export type GrozPlierType =
  | "flat_nose_standard"
  | "curved_nose_contour"
  | "wide_jaw_grip"
  | "narrow_nose_detail"
  | "spring_action_easy";

const specs: Record<GrozPlierType, {
  nibbleClean: number; controlFine: number; glassRange: number;
  comfortGrip: number; cost: number; springAction: boolean; forDetail: boolean;
  noseProfile: string; use: string;
}> = {
  flat_nose_standard: {
    nibbleClean: 85, controlFine: 82, glassRange: 88,
    comfortGrip: 78, cost: 18, springAction: false, forDetail: false,
    noseProfile: "flat_serrated_nose", use: "general_glass_groze",
  },
  curved_nose_contour: {
    nibbleClean: 82, controlFine: 88, glassRange: 75,
    comfortGrip: 80, cost: 22, springAction: false, forDetail: false,
    noseProfile: "curved_smooth_nose", use: "contour_edge_groze",
  },
  wide_jaw_grip: {
    nibbleClean: 80, controlFine: 75, glassRange: 92,
    comfortGrip: 78, cost: 20, springAction: false, forDetail: false,
    noseProfile: "wide_flat_jaw", use: "large_piece_groze",
  },
  narrow_nose_detail: {
    nibbleClean: 88, controlFine: 95, glassRange: 65,
    comfortGrip: 75, cost: 25, springAction: false, forDetail: true,
    noseProfile: "narrow_pointed_nose", use: "fine_detail_groze",
  },
  spring_action_easy: {
    nibbleClean: 82, controlFine: 80, glassRange: 82,
    comfortGrip: 92, cost: 28, springAction: true, forDetail: false,
    noseProfile: "spring_return_nose", use: "extended_groze_session",
  },
};

export function nibbleClean(t: GrozPlierType): number { return specs[t].nibbleClean; }
export function controlFine(t: GrozPlierType): number { return specs[t].controlFine; }
export function glassRange(t: GrozPlierType): number { return specs[t].glassRange; }
export function comfortGrip(t: GrozPlierType): number { return specs[t].comfortGrip; }
export function plierCost(t: GrozPlierType): number { return specs[t].cost; }
export function springAction(t: GrozPlierType): boolean { return specs[t].springAction; }
export function forDetail(t: GrozPlierType): boolean { return specs[t].forDetail; }
export function noseProfile(t: GrozPlierType): string { return specs[t].noseProfile; }
export function bestUse(t: GrozPlierType): string { return specs[t].use; }
export function grozPliers(): GrozPlierType[] { return Object.keys(specs) as GrozPlierType[]; }
