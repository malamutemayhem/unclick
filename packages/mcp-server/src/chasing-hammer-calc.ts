// Chasing hammer calculator - jewelry metalwork hammer tools

export type ChasingHammerType =
  | "round_face_standard"
  | "ball_peen_texture"
  | "cross_peen_spread"
  | "planishing_flat_smooth"
  | "riveting_small_head";

const CHASING_DATA: Record<
  ChasingHammerType,
  {
    strikeControl: number;
    surfaceFinish: number;
    textureCreate: number;
    weightBalance: number;
    cost: number;
    textureHead: boolean;
    forPlanish: boolean;
    faceShape: string;
    bestUse: string;
  }
> = {
  round_face_standard: {
    strikeControl: 8,
    surfaceFinish: 7,
    textureCreate: 6,
    weightBalance: 9,
    cost: 4,
    textureHead: false,
    forPlanish: false,
    faceShape: "convex_round_face",
    bestUse: "general_chase_strike",
  },
  ball_peen_texture: {
    strikeControl: 7,
    surfaceFinish: 5,
    textureCreate: 10,
    weightBalance: 7,
    cost: 4,
    textureHead: true,
    forPlanish: false,
    faceShape: "ball_sphere_peen",
    bestUse: "dimple_texture_create",
  },
  cross_peen_spread: {
    strikeControl: 7,
    surfaceFinish: 5,
    textureCreate: 8,
    weightBalance: 7,
    cost: 4,
    textureHead: true,
    forPlanish: false,
    faceShape: "cross_wedge_peen",
    bestUse: "metal_spread_direct",
  },
  planishing_flat_smooth: {
    strikeControl: 9,
    surfaceFinish: 10,
    textureCreate: 3,
    weightBalance: 8,
    cost: 6,
    textureHead: false,
    forPlanish: true,
    faceShape: "mirror_flat_face",
    bestUse: "smooth_finish_planish",
  },
  riveting_small_head: {
    strikeControl: 9,
    surfaceFinish: 7,
    textureCreate: 4,
    weightBalance: 8,
    cost: 5,
    textureHead: false,
    forPlanish: false,
    faceShape: "small_round_narrow",
    bestUse: "rivet_set_strike",
  },
};

export function strikeControl(type: ChasingHammerType): number {
  return CHASING_DATA[type].strikeControl;
}
export function surfaceFinish(type: ChasingHammerType): number {
  return CHASING_DATA[type].surfaceFinish;
}
export function textureCreate(type: ChasingHammerType): number {
  return CHASING_DATA[type].textureCreate;
}
export function weightBalance(type: ChasingHammerType): number {
  return CHASING_DATA[type].weightBalance;
}
export function chasingCost(type: ChasingHammerType): number {
  return CHASING_DATA[type].cost;
}
export function textureHead(type: ChasingHammerType): boolean {
  return CHASING_DATA[type].textureHead;
}
export function forPlanish(type: ChasingHammerType): boolean {
  return CHASING_DATA[type].forPlanish;
}
export function faceShape(type: ChasingHammerType): string {
  return CHASING_DATA[type].faceShape;
}
export function bestUse(type: ChasingHammerType): string {
  return CHASING_DATA[type].bestUse;
}
export function chasingHammers(): ChasingHammerType[] {
  return Object.keys(CHASING_DATA) as ChasingHammerType[];
}
