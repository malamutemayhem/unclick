// Planishing stake calculator - jewelry metalwork forming stakes

export type PlanishingStakeType =
  | "mushroom_dome_round"
  | "mandrel_taper_cone"
  | "t_stake_flat_edge"
  | "spoon_stake_hollow"
  | "anvil_horn_point";

const PLANISH_DATA: Record<
  PlanishingStakeType,
  {
    formSupport: number;
    surfacePolish: number;
    shapeRange: number;
    reachAccess: number;
    cost: number;
    tapered: boolean;
    forHollow: boolean;
    stakeProfile: string;
    bestUse: string;
  }
> = {
  mushroom_dome_round: {
    formSupport: 8,
    surfacePolish: 9,
    shapeRange: 7,
    reachAccess: 6,
    cost: 5,
    tapered: false,
    forHollow: false,
    stakeProfile: "dome_mushroom_top",
    bestUse: "bowl_dome_planish",
  },
  mandrel_taper_cone: {
    formSupport: 8,
    surfacePolish: 8,
    shapeRange: 8,
    reachAccess: 9,
    cost: 6,
    tapered: true,
    forHollow: false,
    stakeProfile: "taper_cone_mandrel",
    bestUse: "ring_bracelet_form",
  },
  t_stake_flat_edge: {
    formSupport: 9,
    surfacePolish: 8,
    shapeRange: 7,
    reachAccess: 8,
    cost: 5,
    tapered: false,
    forHollow: false,
    stakeProfile: "flat_t_cross_bar",
    bestUse: "flat_edge_form",
  },
  spoon_stake_hollow: {
    formSupport: 7,
    surfacePolish: 8,
    shapeRange: 6,
    reachAccess: 7,
    cost: 6,
    tapered: false,
    forHollow: true,
    stakeProfile: "concave_spoon_cup",
    bestUse: "hollow_form_support",
  },
  anvil_horn_point: {
    formSupport: 9,
    surfacePolish: 7,
    shapeRange: 9,
    reachAccess: 8,
    cost: 7,
    tapered: true,
    forHollow: false,
    stakeProfile: "horn_point_taper",
    bestUse: "curve_bend_shape",
  },
};

export function formSupport(type: PlanishingStakeType): number {
  return PLANISH_DATA[type].formSupport;
}
export function surfacePolish(type: PlanishingStakeType): number {
  return PLANISH_DATA[type].surfacePolish;
}
export function shapeRange(type: PlanishingStakeType): number {
  return PLANISH_DATA[type].shapeRange;
}
export function reachAccess(type: PlanishingStakeType): number {
  return PLANISH_DATA[type].reachAccess;
}
export function planishCost(type: PlanishingStakeType): number {
  return PLANISH_DATA[type].cost;
}
export function tapered(type: PlanishingStakeType): boolean {
  return PLANISH_DATA[type].tapered;
}
export function forHollow(type: PlanishingStakeType): boolean {
  return PLANISH_DATA[type].forHollow;
}
export function stakeProfile(type: PlanishingStakeType): string {
  return PLANISH_DATA[type].stakeProfile;
}
export function bestUse(type: PlanishingStakeType): string {
  return PLANISH_DATA[type].bestUse;
}
export function planishingStakes(): PlanishingStakeType[] {
  return Object.keys(PLANISH_DATA) as PlanishingStakeType[];
}
