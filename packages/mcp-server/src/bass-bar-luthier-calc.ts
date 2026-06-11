export type BassBarLuthierType =
  | "spruce_hand_carved"
  | "pre_shaped_standard"
  | "graduated_thick_heavy"
  | "scalloped_end_light"
  | "carbon_fiber_modern";

const specs: Record<BassBarLuthierType, {
  toneTransfer: number; stiffness: number; fitAccuracy: number;
  carveEase: number; cost: number; natural: boolean; preShaped: boolean;
  grainType: string; use: string;
}> = {
  spruce_hand_carved: {
    toneTransfer: 95, stiffness: 82, fitAccuracy: 90,
    carveEase: 55, cost: 40, natural: true, preShaped: false,
    grainType: "quarter_sawn_spruce", use: "concert_violin_bar",
  },
  pre_shaped_standard: {
    toneTransfer: 78, stiffness: 75, fitAccuracy: 72,
    carveEase: 92, cost: 15, natural: true, preShaped: true,
    grainType: "machine_cut_spruce", use: "student_violin_bar",
  },
  graduated_thick_heavy: {
    toneTransfer: 80, stiffness: 92, fitAccuracy: 78,
    carveEase: 60, cost: 35, natural: true, preShaped: false,
    grainType: "dense_grain_spruce", use: "cello_bass_bar",
  },
  scalloped_end_light: {
    toneTransfer: 90, stiffness: 70, fitAccuracy: 85,
    carveEase: 65, cost: 45, natural: true, preShaped: false,
    grainType: "fine_grain_spruce", use: "responsive_tone_bar",
  },
  carbon_fiber_modern: {
    toneTransfer: 72, stiffness: 95, fitAccuracy: 80,
    carveEase: 75, cost: 60, natural: false, preShaped: true,
    grainType: "woven_carbon_layup", use: "durable_travel_bar",
  },
};

export function toneTransfer(t: BassBarLuthierType): number { return specs[t].toneTransfer; }
export function stiffness(t: BassBarLuthierType): number { return specs[t].stiffness; }
export function fitAccuracy(t: BassBarLuthierType): number { return specs[t].fitAccuracy; }
export function carveEase(t: BassBarLuthierType): number { return specs[t].carveEase; }
export function barCost(t: BassBarLuthierType): number { return specs[t].cost; }
export function natural(t: BassBarLuthierType): boolean { return specs[t].natural; }
export function preShaped(t: BassBarLuthierType): boolean { return specs[t].preShaped; }
export function grainType(t: BassBarLuthierType): string { return specs[t].grainType; }
export function bestUse(t: BassBarLuthierType): string { return specs[t].use; }
export function bassBarLuthiers(): BassBarLuthierType[] { return Object.keys(specs) as BassBarLuthierType[]; }
