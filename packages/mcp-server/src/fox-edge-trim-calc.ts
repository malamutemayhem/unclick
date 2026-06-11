export type FoxEdgeTrimType =
  | "single_fold_standard"
  | "double_fold_thick"
  | "blind_tack_hidden"
  | "staple_back_fast"
  | "gimp_cover_decorative";

const specs: Record<FoxEdgeTrimType, {
  finishClean: number; holdSecure: number; speedApply: number;
  durability: number; cost: number; hidden: boolean; decorative: boolean;
  attachMethod: string; use: string;
}> = {
  single_fold_standard: {
    finishClean: 78, holdSecure: 75, speedApply: 82,
    durability: 72, cost: 8, hidden: false, decorative: false,
    attachMethod: "single_fold_tack", use: "general_edge_finish",
  },
  double_fold_thick: {
    finishClean: 85, holdSecure: 82, speedApply: 70,
    durability: 80, cost: 12, hidden: false, decorative: false,
    attachMethod: "double_fold_tack", use: "thick_fabric_edge",
  },
  blind_tack_hidden: {
    finishClean: 92, holdSecure: 78, speedApply: 60,
    durability: 75, cost: 15, hidden: true, decorative: false,
    attachMethod: "hidden_strip_tack", use: "clean_hidden_edge",
  },
  staple_back_fast: {
    finishClean: 70, holdSecure: 88, speedApply: 95,
    durability: 82, cost: 6, hidden: false, decorative: false,
    attachMethod: "staple_fold_back", use: "fast_production_edge",
  },
  gimp_cover_decorative: {
    finishClean: 88, holdSecure: 72, speedApply: 65,
    durability: 78, cost: 20, hidden: false, decorative: true,
    attachMethod: "gimp_glue_cover", use: "decorative_trim_edge",
  },
};

export function finishClean(t: FoxEdgeTrimType): number { return specs[t].finishClean; }
export function holdSecure(t: FoxEdgeTrimType): number { return specs[t].holdSecure; }
export function speedApply(t: FoxEdgeTrimType): number { return specs[t].speedApply; }
export function durability(t: FoxEdgeTrimType): number { return specs[t].durability; }
export function trimCost(t: FoxEdgeTrimType): number { return specs[t].cost; }
export function hidden(t: FoxEdgeTrimType): boolean { return specs[t].hidden; }
export function decorative(t: FoxEdgeTrimType): boolean { return specs[t].decorative; }
export function attachMethod(t: FoxEdgeTrimType): string { return specs[t].attachMethod; }
export function bestUse(t: FoxEdgeTrimType): string { return specs[t].use; }
export function foxEdgeTrims(): FoxEdgeTrimType[] { return Object.keys(specs) as FoxEdgeTrimType[]; }
