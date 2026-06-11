export type FeltingNeedleType =
  | "triangle_standard_medium"
  | "star_point_fast"
  | "spiral_twist_smooth"
  | "crown_point_surface"
  | "reverse_barb_pull";

const specs: Record<FeltingNeedleType, {
  feltSpeed: number; surfaceSmooth: number; controlFine: number;
  durability: number; cost: number; reverse: boolean; forSurface: boolean;
  barbStyle: string; use: string;
}> = {
  triangle_standard_medium: {
    feltSpeed: 82, surfaceSmooth: 80, controlFine: 85,
    durability: 85, cost: 2, reverse: false, forSurface: false,
    barbStyle: "triangle_three_barb", use: "general_needle_felt",
  },
  star_point_fast: {
    feltSpeed: 92, surfaceSmooth: 78, controlFine: 80,
    durability: 80, cost: 3, reverse: false, forSurface: false,
    barbStyle: "star_four_barb", use: "fast_bulk_felt",
  },
  spiral_twist_smooth: {
    feltSpeed: 85, surfaceSmooth: 92, controlFine: 82,
    durability: 88, cost: 4, reverse: false, forSurface: false,
    barbStyle: "spiral_twist_barb", use: "smooth_finish_felt",
  },
  crown_point_surface: {
    feltSpeed: 78, surfaceSmooth: 88, controlFine: 90,
    durability: 82, cost: 3, reverse: false, forSurface: true,
    barbStyle: "crown_tip_barb", use: "surface_detail_felt",
  },
  reverse_barb_pull: {
    feltSpeed: 75, surfaceSmooth: 85, controlFine: 88,
    durability: 78, cost: 4, reverse: true, forSurface: true,
    barbStyle: "reverse_pull_barb", use: "fuzzy_texture_pull",
  },
};

export function feltSpeed(t: FeltingNeedleType): number { return specs[t].feltSpeed; }
export function surfaceSmooth(t: FeltingNeedleType): number { return specs[t].surfaceSmooth; }
export function controlFine(t: FeltingNeedleType): number { return specs[t].controlFine; }
export function durability(t: FeltingNeedleType): number { return specs[t].durability; }
export function needleCost(t: FeltingNeedleType): number { return specs[t].cost; }
export function reverse(t: FeltingNeedleType): boolean { return specs[t].reverse; }
export function forSurface(t: FeltingNeedleType): boolean { return specs[t].forSurface; }
export function barbStyle(t: FeltingNeedleType): string { return specs[t].barbStyle; }
export function bestUse(t: FeltingNeedleType): string { return specs[t].use; }
export function feltingNeedles(): FeltingNeedleType[] { return Object.keys(specs) as FeltingNeedleType[]; }
