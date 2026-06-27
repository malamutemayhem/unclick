// Shed stick calculator - weaving shed opening tools

export type ShedStickType =
  | "flat_wood_standard"
  | "beveled_edge_smooth"
  | "curved_pick_up"
  | "metal_thin_rigid"
  | "bamboo_light_flex";

const SHED_DATA: Record<
  ShedStickType,
  {
    shedOpen: number;
    warpSafe: number;
    slideSmooth: number;
    durability: number;
    cost: number;
    flexible: boolean;
    forPickup: boolean;
    edgeProfile: string;
    bestUse: string;
  }
> = {
  flat_wood_standard: {
    shedOpen: 8,
    warpSafe: 8,
    slideSmooth: 7,
    durability: 8,
    cost: 3,
    flexible: false,
    forPickup: false,
    edgeProfile: "flat_square_edge",
    bestUse: "general_shed_hold",
  },
  beveled_edge_smooth: {
    shedOpen: 9,
    warpSafe: 9,
    slideSmooth: 10,
    durability: 7,
    cost: 5,
    flexible: false,
    forPickup: false,
    edgeProfile: "tapered_bevel_edge",
    bestUse: "fine_warp_shed",
  },
  curved_pick_up: {
    shedOpen: 7,
    warpSafe: 8,
    slideSmooth: 7,
    durability: 7,
    cost: 4,
    flexible: false,
    forPickup: true,
    edgeProfile: "curved_scoop_tip",
    bestUse: "pattern_pickup_weave",
  },
  metal_thin_rigid: {
    shedOpen: 8,
    warpSafe: 6,
    slideSmooth: 9,
    durability: 10,
    cost: 6,
    flexible: false,
    forPickup: false,
    edgeProfile: "thin_metal_flat",
    bestUse: "tight_sett_shed",
  },
  bamboo_light_flex: {
    shedOpen: 7,
    warpSafe: 9,
    slideSmooth: 8,
    durability: 6,
    cost: 2,
    flexible: true,
    forPickup: false,
    edgeProfile: "bamboo_round_edge",
    bestUse: "delicate_warp_shed",
  },
};

export function shedOpen(type: ShedStickType): number {
  return SHED_DATA[type].shedOpen;
}
export function warpSafe(type: ShedStickType): number {
  return SHED_DATA[type].warpSafe;
}
export function slideSmooth(type: ShedStickType): number {
  return SHED_DATA[type].slideSmooth;
}
export function durability(type: ShedStickType): number {
  return SHED_DATA[type].durability;
}
export function shedCost(type: ShedStickType): number {
  return SHED_DATA[type].cost;
}
export function flexible(type: ShedStickType): boolean {
  return SHED_DATA[type].flexible;
}
export function forPickup(type: ShedStickType): boolean {
  return SHED_DATA[type].forPickup;
}
export function edgeProfile(type: ShedStickType): string {
  return SHED_DATA[type].edgeProfile;
}
export function bestUse(type: ShedStickType): string {
  return SHED_DATA[type].bestUse;
}
export function shedSticks(): ShedStickType[] {
  return Object.keys(SHED_DATA) as ShedStickType[];
}
