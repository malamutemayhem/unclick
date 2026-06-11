// Repousse pitch calculator - jewelry repousse backing medium tools

export type RepoussePitchType =
  | "burgundy_pitch_standard"
  | "german_pitch_hard"
  | "swedish_pitch_soft"
  | "microcrystalline_wax_mix"
  | "pitch_bowl_cast";

const REPOUSSE_DATA: Record<
  RepoussePitchType,
  {
    holdFirm: number;
    detailSupport: number;
    reworkEase: number;
    heatResist: number;
    cost: number;
    waxBased: boolean;
    forFine: boolean;
    consistency: string;
    bestUse: string;
  }
> = {
  burgundy_pitch_standard: {
    holdFirm: 8,
    detailSupport: 8,
    reworkEase: 7,
    heatResist: 7,
    cost: 4,
    waxBased: false,
    forFine: false,
    consistency: "medium_firm_tacky",
    bestUse: "general_repousse_work",
  },
  german_pitch_hard: {
    holdFirm: 10,
    detailSupport: 9,
    reworkEase: 5,
    heatResist: 9,
    cost: 5,
    waxBased: false,
    forFine: true,
    consistency: "hard_firm_set",
    bestUse: "fine_detail_chase",
  },
  swedish_pitch_soft: {
    holdFirm: 6,
    detailSupport: 6,
    reworkEase: 10,
    heatResist: 5,
    cost: 4,
    waxBased: false,
    forFine: false,
    consistency: "soft_pliable_warm",
    bestUse: "deep_relief_form",
  },
  microcrystalline_wax_mix: {
    holdFirm: 7,
    detailSupport: 7,
    reworkEase: 9,
    heatResist: 4,
    cost: 3,
    waxBased: true,
    forFine: false,
    consistency: "wax_blend_medium",
    bestUse: "low_heat_hold",
  },
  pitch_bowl_cast: {
    holdFirm: 9,
    detailSupport: 8,
    reworkEase: 6,
    heatResist: 8,
    cost: 6,
    waxBased: false,
    forFine: true,
    consistency: "bowl_cast_firm",
    bestUse: "rotating_work_hold",
  },
};

export function holdFirm(type: RepoussePitchType): number {
  return REPOUSSE_DATA[type].holdFirm;
}
export function detailSupport(type: RepoussePitchType): number {
  return REPOUSSE_DATA[type].detailSupport;
}
export function reworkEase(type: RepoussePitchType): number {
  return REPOUSSE_DATA[type].reworkEase;
}
export function heatResist(type: RepoussePitchType): number {
  return REPOUSSE_DATA[type].heatResist;
}
export function repousseCost(type: RepoussePitchType): number {
  return REPOUSSE_DATA[type].cost;
}
export function waxBased(type: RepoussePitchType): boolean {
  return REPOUSSE_DATA[type].waxBased;
}
export function forFine(type: RepoussePitchType): boolean {
  return REPOUSSE_DATA[type].forFine;
}
export function consistency(type: RepoussePitchType): string {
  return REPOUSSE_DATA[type].consistency;
}
export function bestUse(type: RepoussePitchType): string {
  return REPOUSSE_DATA[type].bestUse;
}
export function repoussePitches(): RepoussePitchType[] {
  return Object.keys(REPOUSSE_DATA) as RepoussePitchType[];
}
