export type SpallingHammerType =
  | "flat_face_standard"
  | "round_face_dome"
  | "cross_peen_spall"
  | "carbide_face_hard"
  | "pneumatic_spall_power";

const specs: Record<SpallingHammerType, {
  chipClean: number; forceStrike: number; controlAim: number;
  faceLife: number; cost: number; powered: boolean; crossPeen: boolean;
  faceShape: string; use: string;
}> = {
  flat_face_standard: {
    chipClean: 80, forceStrike: 75, controlAim: 85,
    faceLife: 72, cost: 40, powered: false, crossPeen: false,
    faceShape: "flat_square_face", use: "general_chip_remove",
  },
  round_face_dome: {
    chipClean: 72, forceStrike: 82, controlAim: 78,
    faceLife: 75, cost: 45, powered: false, crossPeen: false,
    faceShape: "domed_round_face", use: "concave_surface_chip",
  },
  cross_peen_spall: {
    chipClean: 85, forceStrike: 70, controlAim: 80,
    faceLife: 68, cost: 50, powered: false, crossPeen: true,
    faceShape: "narrow_cross_peen", use: "edge_line_chip",
  },
  carbide_face_hard: {
    chipClean: 88, forceStrike: 80, controlAim: 76,
    faceLife: 95, cost: 130, powered: false, crossPeen: false,
    faceShape: "carbide_flat_face", use: "hard_granite_chip",
  },
  pneumatic_spall_power: {
    chipClean: 78, forceStrike: 95, controlAim: 62,
    faceLife: 65, cost: 400, powered: true, crossPeen: false,
    faceShape: "multi_tip_head", use: "production_spall_remove",
  },
};

export function chipClean(t: SpallingHammerType): number { return specs[t].chipClean; }
export function forceStrike(t: SpallingHammerType): number { return specs[t].forceStrike; }
export function controlAim(t: SpallingHammerType): number { return specs[t].controlAim; }
export function faceLife(t: SpallingHammerType): number { return specs[t].faceLife; }
export function hammerCost(t: SpallingHammerType): number { return specs[t].cost; }
export function powered(t: SpallingHammerType): boolean { return specs[t].powered; }
export function crossPeen(t: SpallingHammerType): boolean { return specs[t].crossPeen; }
export function faceShape(t: SpallingHammerType): string { return specs[t].faceShape; }
export function bestUse(t: SpallingHammerType): string { return specs[t].use; }
export function spallingHammers(): SpallingHammerType[] { return Object.keys(specs) as SpallingHammerType[]; }
