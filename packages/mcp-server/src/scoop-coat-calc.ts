export type ScoopCoatType =
  | "round_edge_standard"
  | "sharp_edge_thin"
  | "dual_edge_combo"
  | "wide_trough_large"
  | "micro_coat_detail";

const specs: Record<ScoopCoatType, {
  coatEven: number; thicknessControl: number; speedCoat: number;
  sizeRange: number; cost: number; dualEdge: boolean; forDetail: boolean;
  troughStyle: string; use: string;
}> = {
  round_edge_standard: {
    coatEven: 85, thicknessControl: 80, speedCoat: 88,
    sizeRange: 82, cost: 6, dualEdge: false, forDetail: false,
    troughStyle: "round_bead_trough", use: "general_emulsion_coat",
  },
  sharp_edge_thin: {
    coatEven: 88, thicknessControl: 92, speedCoat: 82,
    sizeRange: 80, cost: 7, dualEdge: false, forDetail: true,
    troughStyle: "sharp_blade_trough", use: "thin_coat_fine_detail",
  },
  dual_edge_combo: {
    coatEven: 90, thicknessControl: 88, speedCoat: 85,
    sizeRange: 85, cost: 10, dualEdge: true, forDetail: false,
    troughStyle: "dual_profile_trough", use: "versatile_coat_control",
  },
  wide_trough_large: {
    coatEven: 82, thicknessControl: 78, speedCoat: 90,
    sizeRange: 92, cost: 9, dualEdge: false, forDetail: false,
    troughStyle: "wide_capacity_trough", use: "large_screen_coating",
  },
  micro_coat_detail: {
    coatEven: 92, thicknessControl: 95, speedCoat: 75,
    sizeRange: 70, cost: 11, dualEdge: false, forDetail: true,
    troughStyle: "micro_precision_trough", use: "ultra_fine_halftone",
  },
};

export function coatEven(t: ScoopCoatType): number { return specs[t].coatEven; }
export function thicknessControl(t: ScoopCoatType): number { return specs[t].thicknessControl; }
export function speedCoat(t: ScoopCoatType): number { return specs[t].speedCoat; }
export function sizeRange(t: ScoopCoatType): number { return specs[t].sizeRange; }
export function coatCost(t: ScoopCoatType): number { return specs[t].cost; }
export function dualEdge(t: ScoopCoatType): boolean { return specs[t].dualEdge; }
export function forDetail(t: ScoopCoatType): boolean { return specs[t].forDetail; }
export function troughStyle(t: ScoopCoatType): string { return specs[t].troughStyle; }
export function bestUse(t: ScoopCoatType): string { return specs[t].use; }
export function scoopCoats(): ScoopCoatType[] { return Object.keys(specs) as ScoopCoatType[]; }
