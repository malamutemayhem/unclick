export type BottomFullerType =
  | "half_round_standard"
  | "vee_groove_sharp"
  | "flat_bottom_wide"
  | "radius_round_smooth"
  | "spring_fuller_handheld";

const specs: Record<BottomFullerType, {
  grooveClean: number; depthControl: number; speedWork: number;
  sizeRange: number; cost: number; handheld: boolean; sharpEdge: boolean;
  grooveProfile: string; use: string;
}> = {
  half_round_standard: {
    grooveClean: 85, depthControl: 82, speedWork: 80,
    sizeRange: 85, cost: 25, handheld: false, sharpEdge: false,
    grooveProfile: "half_round_channel", use: "general_fullering",
  },
  vee_groove_sharp: {
    grooveClean: 82, depthControl: 88, speedWork: 75,
    sizeRange: 78, cost: 28, handheld: false, sharpEdge: true,
    grooveProfile: "vee_sharp_channel", use: "sharp_crease_line",
  },
  flat_bottom_wide: {
    grooveClean: 80, depthControl: 78, speedWork: 85,
    sizeRange: 90, cost: 22, handheld: false, sharpEdge: false,
    grooveProfile: "wide_flat_channel", use: "wide_spread_draw",
  },
  radius_round_smooth: {
    grooveClean: 90, depthControl: 85, speedWork: 78,
    sizeRange: 75, cost: 30, handheld: false, sharpEdge: false,
    grooveProfile: "full_radius_round", use: "smooth_round_groove",
  },
  spring_fuller_handheld: {
    grooveClean: 78, depthControl: 80, speedWork: 88,
    sizeRange: 82, cost: 35, handheld: true, sharpEdge: false,
    grooveProfile: "spring_top_bottom", use: "one_hand_fullering",
  },
};

export function grooveClean(t: BottomFullerType): number { return specs[t].grooveClean; }
export function depthControl(t: BottomFullerType): number { return specs[t].depthControl; }
export function speedWork(t: BottomFullerType): number { return specs[t].speedWork; }
export function sizeRange(t: BottomFullerType): number { return specs[t].sizeRange; }
export function fullerCost(t: BottomFullerType): number { return specs[t].cost; }
export function handheld(t: BottomFullerType): boolean { return specs[t].handheld; }
export function sharpEdge(t: BottomFullerType): boolean { return specs[t].sharpEdge; }
export function grooveProfile(t: BottomFullerType): string { return specs[t].grooveProfile; }
export function bestUse(t: BottomFullerType): string { return specs[t].use; }
export function bottomFullers(): BottomFullerType[] { return Object.keys(specs) as BottomFullerType[]; }
