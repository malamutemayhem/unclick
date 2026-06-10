// Hog ring calculator - upholstery hog ring fastening tools

export type HogRingType =
  | "manual_plier_squeeze"
  | "pneumatic_auto_fire"
  | "spring_loaded_click"
  | "angled_nose_reach"
  | "heavy_gauge_fence";

const RING_DATA: Record<
  HogRingType,
  {
    closeForce: number;
    speedFasten: number;
    reachDepth: number;
    ringVariety: number;
    cost: number;
    powered: boolean;
    angled: boolean;
    feedType: string;
    bestUse: string;
  }
> = {
  manual_plier_squeeze: {
    closeForce: 6,
    speedFasten: 5,
    reachDepth: 6,
    ringVariety: 8,
    cost: 2,
    powered: false,
    angled: false,
    feedType: "single_load_hand",
    bestUse: "light_upholstery_fix",
  },
  pneumatic_auto_fire: {
    closeForce: 9,
    speedFasten: 10,
    reachDepth: 7,
    ringVariety: 6,
    cost: 8,
    powered: true,
    angled: false,
    feedType: "magazine_strip_feed",
    bestUse: "production_seat_build",
  },
  spring_loaded_click: {
    closeForce: 7,
    speedFasten: 7,
    reachDepth: 6,
    ringVariety: 7,
    cost: 4,
    powered: false,
    angled: false,
    feedType: "clip_strip_load",
    bestUse: "general_ring_set",
  },
  angled_nose_reach: {
    closeForce: 6,
    speedFasten: 6,
    reachDepth: 9,
    ringVariety: 5,
    cost: 5,
    powered: false,
    angled: true,
    feedType: "single_load_hand",
    bestUse: "tight_corner_reach",
  },
  heavy_gauge_fence: {
    closeForce: 10,
    speedFasten: 4,
    reachDepth: 5,
    ringVariety: 4,
    cost: 6,
    powered: false,
    angled: false,
    feedType: "bulk_ring_bucket",
    bestUse: "fence_cage_wire",
  },
};

export function closeForce(type: HogRingType): number {
  return RING_DATA[type].closeForce;
}
export function speedFasten(type: HogRingType): number {
  return RING_DATA[type].speedFasten;
}
export function reachDepth(type: HogRingType): number {
  return RING_DATA[type].reachDepth;
}
export function ringVariety(type: HogRingType): number {
  return RING_DATA[type].ringVariety;
}
export function ringCost(type: HogRingType): number {
  return RING_DATA[type].cost;
}
export function powered(type: HogRingType): boolean {
  return RING_DATA[type].powered;
}
export function angled(type: HogRingType): boolean {
  return RING_DATA[type].angled;
}
export function feedType(type: HogRingType): string {
  return RING_DATA[type].feedType;
}
export function bestUse(type: HogRingType): string {
  return RING_DATA[type].bestUse;
}
export function hogRings(): HogRingType[] {
  return Object.keys(RING_DATA) as HogRingType[];
}
