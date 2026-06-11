// Pillow lace calculator - lace making pillow tools

export type PillowLaceType =
  | "flat_cookie_round"
  | "bolster_roller_long"
  | "travel_board_portable"
  | "block_pillow_square"
  | "polystyrene_light_modern";

const PILLOW_DATA: Record<
  PillowLaceType,
  {
    pinHold: number;
    bobbinSupport: number;
    portability: number;
    workArea: number;
    cost: number;
    portable: boolean;
    forContinuous: boolean;
    fillMaterial: string;
    bestUse: string;
  }
> = {
  flat_cookie_round: {
    pinHold: 9,
    bobbinSupport: 8,
    portability: 6,
    workArea: 7,
    cost: 4,
    portable: false,
    forContinuous: false,
    fillMaterial: "dense_stuffed_cotton",
    bestUse: "traditional_part_lace",
  },
  bolster_roller_long: {
    pinHold: 8,
    bobbinSupport: 9,
    portability: 4,
    workArea: 9,
    cost: 6,
    portable: false,
    forContinuous: true,
    fillMaterial: "firm_rolled_straw",
    bestUse: "continuous_strip_lace",
  },
  travel_board_portable: {
    pinHold: 7,
    bobbinSupport: 6,
    portability: 10,
    workArea: 5,
    cost: 3,
    portable: true,
    forContinuous: false,
    fillMaterial: "foam_board_core",
    bestUse: "class_travel_lace",
  },
  block_pillow_square: {
    pinHold: 9,
    bobbinSupport: 8,
    portability: 5,
    workArea: 8,
    cost: 5,
    portable: false,
    forContinuous: false,
    fillMaterial: "sawdust_packed",
    bestUse: "geometric_tape_lace",
  },
  polystyrene_light_modern: {
    pinHold: 7,
    bobbinSupport: 7,
    portability: 8,
    workArea: 7,
    cost: 3,
    portable: true,
    forContinuous: false,
    fillMaterial: "polystyrene_block",
    bestUse: "modern_beginner_lace",
  },
};

export function pinHold(type: PillowLaceType): number {
  return PILLOW_DATA[type].pinHold;
}
export function bobbinSupport(type: PillowLaceType): number {
  return PILLOW_DATA[type].bobbinSupport;
}
export function portability(type: PillowLaceType): number {
  return PILLOW_DATA[type].portability;
}
export function workArea(type: PillowLaceType): number {
  return PILLOW_DATA[type].workArea;
}
export function pillowCost(type: PillowLaceType): number {
  return PILLOW_DATA[type].cost;
}
export function portable(type: PillowLaceType): boolean {
  return PILLOW_DATA[type].portable;
}
export function forContinuous(type: PillowLaceType): boolean {
  return PILLOW_DATA[type].forContinuous;
}
export function fillMaterial(type: PillowLaceType): string {
  return PILLOW_DATA[type].fillMaterial;
}
export function bestUse(type: PillowLaceType): string {
  return PILLOW_DATA[type].bestUse;
}
export function pillowLaces(): PillowLaceType[] {
  return Object.keys(PILLOW_DATA) as PillowLaceType[];
}
