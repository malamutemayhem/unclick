export type FeltingMatType =
  | "foam_pad_standard"
  | "brush_mat_dense"
  | "wool_pad_natural"
  | "rice_pad_firm"
  | "multi_surface_flip";

const specs: Record<FeltingMatType, {
  needleProtect: number; surfaceGrip: number; durability: number;
  portability: number; cost: number; natural: boolean; multiSurface: boolean;
  padMaterial: string; use: string;
}> = {
  foam_pad_standard: {
    needleProtect: 82, surfaceGrip: 80, durability: 70,
    portability: 88, cost: 5, natural: false, multiSurface: false,
    padMaterial: "dense_foam_block", use: "general_needle_base",
  },
  brush_mat_dense: {
    needleProtect: 90, surfaceGrip: 85, durability: 88,
    portability: 82, cost: 15, natural: false, multiSurface: false,
    padMaterial: "nylon_bristle_mat", use: "long_life_felt_base",
  },
  wool_pad_natural: {
    needleProtect: 85, surfaceGrip: 88, durability: 75,
    portability: 85, cost: 12, natural: true, multiSurface: false,
    padMaterial: "compressed_wool_pad", use: "natural_soft_base",
  },
  rice_pad_firm: {
    needleProtect: 88, surfaceGrip: 82, durability: 92,
    portability: 78, cost: 18, natural: true, multiSurface: false,
    padMaterial: "compressed_rice_straw", use: "firm_stable_base",
  },
  multi_surface_flip: {
    needleProtect: 85, surfaceGrip: 85, durability: 80,
    portability: 90, cost: 20, natural: false, multiSurface: true,
    padMaterial: "dual_side_combo", use: "versatile_flip_base",
  },
};

export function needleProtect(t: FeltingMatType): number { return specs[t].needleProtect; }
export function surfaceGrip(t: FeltingMatType): number { return specs[t].surfaceGrip; }
export function durability(t: FeltingMatType): number { return specs[t].durability; }
export function portability(t: FeltingMatType): number { return specs[t].portability; }
export function matCost(t: FeltingMatType): number { return specs[t].cost; }
export function natural(t: FeltingMatType): boolean { return specs[t].natural; }
export function multiSurface(t: FeltingMatType): boolean { return specs[t].multiSurface; }
export function padMaterial(t: FeltingMatType): string { return specs[t].padMaterial; }
export function bestUse(t: FeltingMatType): string { return specs[t].use; }
export function feltingMats(): FeltingMatType[] { return Object.keys(specs) as FeltingMatType[]; }
