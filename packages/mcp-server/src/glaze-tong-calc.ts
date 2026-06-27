export type GlazeTongType =
  | "dipping_tong_standard"
  | "spring_tong_grip"
  | "long_reach_deep"
  | "wide_jaw_plate"
  | "rubber_tip_gentle";

const specs: Record<GlazeTongType, {
  gripSecure: number; markFree: number; reachDepth: number;
  sizeRange: number; cost: number; springLoaded: boolean; rubberTip: boolean;
  jawStyle: string; use: string;
}> = {
  dipping_tong_standard: {
    gripSecure: 85, markFree: 78, reachDepth: 80,
    sizeRange: 82, cost: 12, springLoaded: false, rubberTip: false,
    jawStyle: "narrow_point_grip", use: "general_glaze_dip",
  },
  spring_tong_grip: {
    gripSecure: 90, markFree: 75, reachDepth: 78,
    sizeRange: 85, cost: 15, springLoaded: true, rubberTip: false,
    jawStyle: "spring_return_jaw", use: "repeated_dip_session",
  },
  long_reach_deep: {
    gripSecure: 82, markFree: 72, reachDepth: 95,
    sizeRange: 78, cost: 18, springLoaded: false, rubberTip: false,
    jawStyle: "extended_arm_grip", use: "deep_bucket_dip",
  },
  wide_jaw_plate: {
    gripSecure: 88, markFree: 80, reachDepth: 75,
    sizeRange: 92, cost: 16, springLoaded: false, rubberTip: false,
    jawStyle: "wide_flat_cradle", use: "plate_platter_dip",
  },
  rubber_tip_gentle: {
    gripSecure: 78, markFree: 95, reachDepth: 72,
    sizeRange: 80, cost: 20, springLoaded: false, rubberTip: true,
    jawStyle: "rubber_coated_tip", use: "bisque_gentle_hold",
  },
};

export function gripSecure(t: GlazeTongType): number { return specs[t].gripSecure; }
export function markFree(t: GlazeTongType): number { return specs[t].markFree; }
export function reachDepth(t: GlazeTongType): number { return specs[t].reachDepth; }
export function sizeRange(t: GlazeTongType): number { return specs[t].sizeRange; }
export function tongCost(t: GlazeTongType): number { return specs[t].cost; }
export function springLoaded(t: GlazeTongType): boolean { return specs[t].springLoaded; }
export function rubberTip(t: GlazeTongType): boolean { return specs[t].rubberTip; }
export function jawStyle(t: GlazeTongType): string { return specs[t].jawStyle; }
export function bestUse(t: GlazeTongType): string { return specs[t].use; }
export function glazeTongs(): GlazeTongType[] { return Object.keys(specs) as GlazeTongType[]; }
