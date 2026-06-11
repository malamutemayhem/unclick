export type MeshCountType =
  | "low_mesh_60"
  | "medium_mesh_110"
  | "high_mesh_230"
  | "ultra_mesh_305"
  | "standard_mesh_156";

const specs: Record<MeshCountType, {
  detailFine: number; inkDeposit: number; durability: number;
  tensionRange: number; cost: number; forHalftone: boolean; forTextile: boolean;
  threadDiameter: string; use: string;
}> = {
  low_mesh_60: {
    detailFine: 60, inkDeposit: 95, durability: 85,
    tensionRange: 78, cost: 5, forHalftone: false, forTextile: true,
    threadDiameter: "thick_thread_heavy", use: "heavy_ink_textile_print",
  },
  medium_mesh_110: {
    detailFine: 75, inkDeposit: 82, durability: 88,
    tensionRange: 85, cost: 6, forHalftone: false, forTextile: true,
    threadDiameter: "medium_thread_standard", use: "general_textile_graphic",
  },
  high_mesh_230: {
    detailFine: 90, inkDeposit: 65, durability: 82,
    tensionRange: 88, cost: 8, forHalftone: true, forTextile: false,
    threadDiameter: "fine_thread_detail", use: "halftone_paper_print",
  },
  ultra_mesh_305: {
    detailFine: 95, inkDeposit: 55, durability: 78,
    tensionRange: 90, cost: 10, forHalftone: true, forTextile: false,
    threadDiameter: "ultra_fine_thread", use: "ultra_fine_process_print",
  },
  standard_mesh_156: {
    detailFine: 82, inkDeposit: 75, durability: 90,
    tensionRange: 86, cost: 7, forHalftone: false, forTextile: true,
    threadDiameter: "standard_thread_balanced", use: "versatile_all_purpose",
  },
};

export function detailFine(t: MeshCountType): number { return specs[t].detailFine; }
export function inkDeposit(t: MeshCountType): number { return specs[t].inkDeposit; }
export function durability(t: MeshCountType): number { return specs[t].durability; }
export function tensionRange(t: MeshCountType): number { return specs[t].tensionRange; }
export function meshCost(t: MeshCountType): number { return specs[t].cost; }
export function forHalftone(t: MeshCountType): boolean { return specs[t].forHalftone; }
export function forTextile(t: MeshCountType): boolean { return specs[t].forTextile; }
export function threadDiameter(t: MeshCountType): string { return specs[t].threadDiameter; }
export function bestUse(t: MeshCountType): string { return specs[t].use; }
export function meshCounts(): MeshCountType[] { return Object.keys(specs) as MeshCountType[]; }
