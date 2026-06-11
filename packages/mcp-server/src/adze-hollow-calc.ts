// Adze hollow calculator - green woodworking hollowing/shaping adzes

export type AdzeHollowType =
  | "gutter_adze_deep"
  | "lipped_adze_bowl"
  | "hand_adze_carving"
  | "foot_adze_beam"
  | "sculptor_adze_finish";

const ADZE_DATA: Record<
  AdzeHollowType,
  {
    hollowDepth: number;
    finishSmooth: number;
    controlSwing: number;
    weightBalance: number;
    cost: number;
    oneHand: boolean;
    forBeams: boolean;
    headCurve: string;
    bestUse: string;
  }
> = {
  gutter_adze_deep: {
    hollowDepth: 10,
    finishSmooth: 5,
    controlSwing: 6,
    weightBalance: 7,
    cost: 6,
    oneHand: false,
    forBeams: false,
    headCurve: "deep_gutter_scoop",
    bestUse: "trough_channel_cut",
  },
  lipped_adze_bowl: {
    hollowDepth: 8,
    finishSmooth: 7,
    controlSwing: 7,
    weightBalance: 7,
    cost: 7,
    oneHand: false,
    forBeams: false,
    headCurve: "lipped_bowl_curve",
    bestUse: "bowl_dish_hollow",
  },
  hand_adze_carving: {
    hollowDepth: 6,
    finishSmooth: 8,
    controlSwing: 9,
    weightBalance: 8,
    cost: 5,
    oneHand: true,
    forBeams: false,
    headCurve: "short_carving_arc",
    bestUse: "detail_carve_shape",
  },
  foot_adze_beam: {
    hollowDepth: 7,
    finishSmooth: 6,
    controlSwing: 7,
    weightBalance: 9,
    cost: 8,
    oneHand: false,
    forBeams: true,
    headCurve: "flat_beam_sweep",
    bestUse: "beam_face_flatten",
  },
  sculptor_adze_finish: {
    hollowDepth: 5,
    finishSmooth: 10,
    controlSwing: 8,
    weightBalance: 8,
    cost: 9,
    oneHand: true,
    forBeams: false,
    headCurve: "gentle_finish_lip",
    bestUse: "sculpture_smooth_form",
  },
};

export function hollowDepth(type: AdzeHollowType): number {
  return ADZE_DATA[type].hollowDepth;
}
export function finishSmooth(type: AdzeHollowType): number {
  return ADZE_DATA[type].finishSmooth;
}
export function controlSwing(type: AdzeHollowType): number {
  return ADZE_DATA[type].controlSwing;
}
export function weightBalance(type: AdzeHollowType): number {
  return ADZE_DATA[type].weightBalance;
}
export function adzeCost(type: AdzeHollowType): number {
  return ADZE_DATA[type].cost;
}
export function oneHand(type: AdzeHollowType): boolean {
  return ADZE_DATA[type].oneHand;
}
export function forBeams(type: AdzeHollowType): boolean {
  return ADZE_DATA[type].forBeams;
}
export function headCurve(type: AdzeHollowType): string {
  return ADZE_DATA[type].headCurve;
}
export function bestUse(type: AdzeHollowType): string {
  return ADZE_DATA[type].bestUse;
}
export function adzeHollows(): AdzeHollowType[] {
  return Object.keys(ADZE_DATA) as AdzeHollowType[];
}
