// Drawknife bark calculator - green woodworking bark removal tools

export type DrawknifeBarkType =
  | "straight_blade_flat"
  | "curved_blade_scorp"
  | "folding_blade_travel"
  | "inshave_deep_hollow"
  | "mini_blade_detail";

const KNIFE_DATA: Record<
  DrawknifeBarkType,
  {
    barkRemove: number;
    controlGrip: number;
    bladeLife: number;
    reachRange: number;
    cost: number;
    folding: boolean;
    forHollow: boolean;
    bladeProfile: string;
    bestUse: string;
  }
> = {
  straight_blade_flat: {
    barkRemove: 9,
    controlGrip: 8,
    bladeLife: 8,
    reachRange: 8,
    cost: 5,
    folding: false,
    forHollow: false,
    bladeProfile: "straight_flat_edge",
    bestUse: "general_bark_strip",
  },
  curved_blade_scorp: {
    barkRemove: 7,
    controlGrip: 8,
    bladeLife: 7,
    reachRange: 5,
    cost: 6,
    folding: false,
    forHollow: true,
    bladeProfile: "curved_pull_edge",
    bestUse: "bowl_hollow_pull",
  },
  folding_blade_travel: {
    barkRemove: 6,
    controlGrip: 7,
    bladeLife: 6,
    reachRange: 6,
    cost: 4,
    folding: true,
    forHollow: false,
    bladeProfile: "folding_compact",
    bestUse: "field_bark_work",
  },
  inshave_deep_hollow: {
    barkRemove: 6,
    controlGrip: 9,
    bladeLife: 7,
    reachRange: 4,
    cost: 7,
    folding: false,
    forHollow: true,
    bladeProfile: "deep_curve_scoop",
    bestUse: "seat_hollow_carve",
  },
  mini_blade_detail: {
    barkRemove: 5,
    controlGrip: 10,
    bladeLife: 6,
    reachRange: 3,
    cost: 4,
    folding: false,
    forHollow: false,
    bladeProfile: "short_detail_edge",
    bestUse: "fine_shaping_trim",
  },
};

export function barkRemove(type: DrawknifeBarkType): number {
  return KNIFE_DATA[type].barkRemove;
}
export function controlGrip(type: DrawknifeBarkType): number {
  return KNIFE_DATA[type].controlGrip;
}
export function bladeLife(type: DrawknifeBarkType): number {
  return KNIFE_DATA[type].bladeLife;
}
export function reachRange(type: DrawknifeBarkType): number {
  return KNIFE_DATA[type].reachRange;
}
export function knifeCost(type: DrawknifeBarkType): number {
  return KNIFE_DATA[type].cost;
}
export function folding(type: DrawknifeBarkType): boolean {
  return KNIFE_DATA[type].folding;
}
export function forHollow(type: DrawknifeBarkType): boolean {
  return KNIFE_DATA[type].forHollow;
}
export function bladeProfile(type: DrawknifeBarkType): string {
  return KNIFE_DATA[type].bladeProfile;
}
export function bestUse(type: DrawknifeBarkType): string {
  return KNIFE_DATA[type].bestUse;
}
export function drawknifeBark(): DrawknifeBarkType[] {
  return Object.keys(KNIFE_DATA) as DrawknifeBarkType[];
}
