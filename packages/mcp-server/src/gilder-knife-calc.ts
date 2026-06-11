export type GilderKnifeType =
  | "straight_blade_standard"
  | "curved_blade_contour"
  | "palette_knife_wide"
  | "precision_blade_thin"
  | "double_edge_versatile";

const specs: Record<GilderKnifeType, {
  cutClean: number; controlSteady: number; bladeSharp: number;
  leafRange: number; cost: number; curved: boolean; doubleEdge: boolean;
  bladeProfile: string; use: string;
}> = {
  straight_blade_standard: {
    cutClean: 88, controlSteady: 85, bladeSharp: 82,
    leafRange: 85, cost: 7, curved: false, doubleEdge: false,
    bladeProfile: "flat_straight_edge", use: "general_leaf_cut",
  },
  curved_blade_contour: {
    cutClean: 85, controlSteady: 82, bladeSharp: 80,
    leafRange: 80, cost: 8, curved: true, doubleEdge: false,
    bladeProfile: "gentle_curve_edge", use: "curved_surface_cut",
  },
  palette_knife_wide: {
    cutClean: 82, controlSteady: 88, bladeSharp: 78,
    leafRange: 90, cost: 6, curved: false, doubleEdge: false,
    bladeProfile: "wide_flat_spatula", use: "large_sheet_transfer",
  },
  precision_blade_thin: {
    cutClean: 92, controlSteady: 90, bladeSharp: 90,
    leafRange: 72, cost: 10, curved: false, doubleEdge: false,
    bladeProfile: "thin_point_blade", use: "precise_trim_detail",
  },
  double_edge_versatile: {
    cutClean: 85, controlSteady: 85, bladeSharp: 85,
    leafRange: 88, cost: 9, curved: false, doubleEdge: true,
    bladeProfile: "dual_bevel_edge", use: "versatile_multi_cut",
  },
};

export function cutClean(t: GilderKnifeType): number { return specs[t].cutClean; }
export function controlSteady(t: GilderKnifeType): number { return specs[t].controlSteady; }
export function bladeSharp(t: GilderKnifeType): number { return specs[t].bladeSharp; }
export function leafRange(t: GilderKnifeType): number { return specs[t].leafRange; }
export function knifeCost(t: GilderKnifeType): number { return specs[t].cost; }
export function curved(t: GilderKnifeType): boolean { return specs[t].curved; }
export function doubleEdge(t: GilderKnifeType): boolean { return specs[t].doubleEdge; }
export function bladeProfile(t: GilderKnifeType): string { return specs[t].bladeProfile; }
export function bestUse(t: GilderKnifeType): string { return specs[t].use; }
export function gilderKnifes(): GilderKnifeType[] { return Object.keys(specs) as GilderKnifeType[]; }
