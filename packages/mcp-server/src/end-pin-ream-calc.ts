export type EndPinReamType =
  | "spiral_reamer_standard"
  | "tapered_reamer_smooth"
  | "stepped_reamer_set"
  | "adjustable_reamer_dial"
  | "carbide_reamer_hard";

const specs: Record<EndPinReamType, {
  holeClean: number; taperAccuracy: number; speedReam: number;
  sizeRange: number; cost: number; adjustable: boolean; carbide: boolean;
  cutProfile: string; use: string;
}> = {
  spiral_reamer_standard: {
    holeClean: 85, taperAccuracy: 82, speedReam: 80,
    sizeRange: 78, cost: 30, adjustable: false, carbide: false,
    cutProfile: "spiral_flute_cut", use: "general_endpin_ream",
  },
  tapered_reamer_smooth: {
    holeClean: 90, taperAccuracy: 92, speedReam: 70,
    sizeRange: 75, cost: 35, adjustable: false, carbide: false,
    cutProfile: "straight_taper_flute", use: "precision_taper_fit",
  },
  stepped_reamer_set: {
    holeClean: 78, taperAccuracy: 75, speedReam: 88,
    sizeRange: 95, cost: 45, adjustable: false, carbide: false,
    cutProfile: "multi_step_bore", use: "multi_size_endpin",
  },
  adjustable_reamer_dial: {
    holeClean: 82, taperAccuracy: 85, speedReam: 75,
    sizeRange: 92, cost: 55, adjustable: true, carbide: false,
    cutProfile: "expanding_blade_set", use: "variable_taper_fit",
  },
  carbide_reamer_hard: {
    holeClean: 92, taperAccuracy: 88, speedReam: 85,
    sizeRange: 70, cost: 65, adjustable: false, carbide: true,
    cutProfile: "carbide_tip_flute", use: "ebony_hard_wood_ream",
  },
};

export function holeClean(t: EndPinReamType): number { return specs[t].holeClean; }
export function taperAccuracy(t: EndPinReamType): number { return specs[t].taperAccuracy; }
export function speedReam(t: EndPinReamType): number { return specs[t].speedReam; }
export function sizeRange(t: EndPinReamType): number { return specs[t].sizeRange; }
export function reamerCost(t: EndPinReamType): number { return specs[t].cost; }
export function adjustable(t: EndPinReamType): boolean { return specs[t].adjustable; }
export function carbide(t: EndPinReamType): boolean { return specs[t].carbide; }
export function cutProfile(t: EndPinReamType): string { return specs[t].cutProfile; }
export function bestUse(t: EndPinReamType): string { return specs[t].use; }
export function endPinReams(): EndPinReamType[] { return Object.keys(specs) as EndPinReamType[]; }
