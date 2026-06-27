export type BreakPlierType =
  | "flat_jaw_standard"
  | "curved_jaw_contour"
  | "wide_jaw_sheet"
  | "narrow_jaw_strip"
  | "padded_jaw_delicate";

const specs: Record<BreakPlierType, {
  snapClean: number; controlGrip: number; glassRange: number;
  comfortHold: number; cost: number; padded: boolean; curved: boolean;
  jawProfile: string; use: string;
}> = {
  flat_jaw_standard: {
    snapClean: 85, controlGrip: 82, glassRange: 88,
    comfortHold: 78, cost: 20, padded: false, curved: false,
    jawProfile: "flat_serrated_steel", use: "general_glass_break",
  },
  curved_jaw_contour: {
    snapClean: 80, controlGrip: 88, glassRange: 75,
    comfortHold: 82, cost: 28, padded: false, curved: true,
    jawProfile: "curved_smooth_face", use: "curved_score_break",
  },
  wide_jaw_sheet: {
    snapClean: 82, controlGrip: 78, glassRange: 92,
    comfortHold: 75, cost: 25, padded: false, curved: false,
    jawProfile: "wide_flat_grip", use: "large_sheet_break",
  },
  narrow_jaw_strip: {
    snapClean: 88, controlGrip: 90, glassRange: 65,
    comfortHold: 80, cost: 22, padded: false, curved: false,
    jawProfile: "narrow_precision_tip", use: "thin_strip_break",
  },
  padded_jaw_delicate: {
    snapClean: 78, controlGrip: 85, glassRange: 70,
    comfortHold: 92, cost: 30, padded: true, curved: false,
    jawProfile: "rubber_padded_face", use: "delicate_art_glass",
  },
};

export function snapClean(t: BreakPlierType): number { return specs[t].snapClean; }
export function controlGrip(t: BreakPlierType): number { return specs[t].controlGrip; }
export function glassRange(t: BreakPlierType): number { return specs[t].glassRange; }
export function comfortHold(t: BreakPlierType): number { return specs[t].comfortHold; }
export function plierCost(t: BreakPlierType): number { return specs[t].cost; }
export function padded(t: BreakPlierType): boolean { return specs[t].padded; }
export function curved(t: BreakPlierType): boolean { return specs[t].curved; }
export function jawProfile(t: BreakPlierType): string { return specs[t].jawProfile; }
export function bestUse(t: BreakPlierType): string { return specs[t].use; }
export function breakPliers(): BreakPlierType[] { return Object.keys(specs) as BreakPlierType[]; }
