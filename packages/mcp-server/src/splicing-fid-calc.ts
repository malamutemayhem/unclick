// Splicing fid calculator - rope splicing/opening tools

export type SplicingFidType =
  | "wood_cone_taper"
  | "hollow_tube_pull"
  | "wire_loop_thread"
  | "swedish_push_steel"
  | "selma_handle_set";

const FID_DATA: Record<
  SplicingFidType,
  {
    strandOpen: number;
    threadEase: number;
    ropeRange: number;
    durability: number;
    cost: number;
    hollow: boolean;
    forBraid: boolean;
    fidShape: string;
    bestUse: string;
  }
> = {
  wood_cone_taper: {
    strandOpen: 8,
    threadEase: 5,
    ropeRange: 7,
    durability: 6,
    cost: 3,
    hollow: false,
    forBraid: false,
    fidShape: "solid_taper_cone",
    bestUse: "three_strand_splice",
  },
  hollow_tube_pull: {
    strandOpen: 6,
    threadEase: 10,
    ropeRange: 5,
    durability: 7,
    cost: 6,
    hollow: true,
    forBraid: true,
    fidShape: "tubular_needle_bore",
    bestUse: "braid_core_thread",
  },
  wire_loop_thread: {
    strandOpen: 4,
    threadEase: 9,
    ropeRange: 4,
    durability: 5,
    cost: 2,
    hollow: false,
    forBraid: true,
    fidShape: "wire_loop_pull",
    bestUse: "small_line_pull",
  },
  swedish_push_steel: {
    strandOpen: 9,
    threadEase: 7,
    ropeRange: 8,
    durability: 9,
    cost: 7,
    hollow: false,
    forBraid: false,
    fidShape: "flat_blade_push",
    bestUse: "wire_rope_strand",
  },
  selma_handle_set: {
    strandOpen: 7,
    threadEase: 8,
    ropeRange: 9,
    durability: 8,
    cost: 8,
    hollow: true,
    forBraid: true,
    fidShape: "handled_tube_set",
    bestUse: "all_size_splice_kit",
  },
};

export function strandOpen(type: SplicingFidType): number {
  return FID_DATA[type].strandOpen;
}
export function threadEase(type: SplicingFidType): number {
  return FID_DATA[type].threadEase;
}
export function ropeRange(type: SplicingFidType): number {
  return FID_DATA[type].ropeRange;
}
export function durability(type: SplicingFidType): number {
  return FID_DATA[type].durability;
}
export function fidCost(type: SplicingFidType): number {
  return FID_DATA[type].cost;
}
export function hollow(type: SplicingFidType): boolean {
  return FID_DATA[type].hollow;
}
export function forBraid(type: SplicingFidType): boolean {
  return FID_DATA[type].forBraid;
}
export function fidShape(type: SplicingFidType): string {
  return FID_DATA[type].fidShape;
}
export function bestUse(type: SplicingFidType): string {
  return FID_DATA[type].bestUse;
}
export function splicingFids(): SplicingFidType[] {
  return Object.keys(FID_DATA) as SplicingFidType[];
}
