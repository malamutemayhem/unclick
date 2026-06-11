export type WallingHammerType =
  | "yorkshire_pattern_heavy"
  | "kentish_pattern_light"
  | "double_face_general"
  | "carbide_face_hard"
  | "geological_pick_field";

const specs: Record<WallingHammerType, {
  trimClean: number; splitForce: number; controlAim: number;
  faceLife: number; cost: number; doubleFace: boolean; forDrystone: boolean;
  headWeight: string; use: string;
}> = {
  yorkshire_pattern_heavy: {
    trimClean: 82, splitForce: 90, controlAim: 72,
    faceLife: 78, cost: 55, doubleFace: false, forDrystone: true,
    headWeight: "heavy_three_pound", use: "large_stone_trim",
  },
  kentish_pattern_light: {
    trimClean: 88, splitForce: 65, controlAim: 90,
    faceLife: 75, cost: 50, doubleFace: false, forDrystone: true,
    headWeight: "light_one_pound", use: "fine_face_trim",
  },
  double_face_general: {
    trimClean: 78, splitForce: 75, controlAim: 80,
    faceLife: 72, cost: 45, doubleFace: true, forDrystone: false,
    headWeight: "medium_two_pound", use: "general_wall_build",
  },
  carbide_face_hard: {
    trimClean: 85, splitForce: 82, controlAim: 76,
    faceLife: 95, cost: 120, doubleFace: false, forDrystone: false,
    headWeight: "medium_two_pound", use: "hard_stone_trim",
  },
  geological_pick_field: {
    trimClean: 60, splitForce: 88, controlAim: 68,
    faceLife: 70, cost: 35, doubleFace: false, forDrystone: false,
    headWeight: "light_one_pound", use: "field_stone_break",
  },
};

export function trimClean(t: WallingHammerType): number { return specs[t].trimClean; }
export function splitForce(t: WallingHammerType): number { return specs[t].splitForce; }
export function controlAim(t: WallingHammerType): number { return specs[t].controlAim; }
export function faceLife(t: WallingHammerType): number { return specs[t].faceLife; }
export function hammerCost(t: WallingHammerType): number { return specs[t].cost; }
export function doubleFace(t: WallingHammerType): boolean { return specs[t].doubleFace; }
export function forDrystone(t: WallingHammerType): boolean { return specs[t].forDrystone; }
export function headWeight(t: WallingHammerType): string { return specs[t].headWeight; }
export function bestUse(t: WallingHammerType): string { return specs[t].use; }
export function wallingHammers(): WallingHammerType[] { return Object.keys(specs) as WallingHammerType[]; }
