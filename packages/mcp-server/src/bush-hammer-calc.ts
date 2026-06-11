// Bush hammer calculator - stone masonry surface texturing hammers

export type BushHammerType =
  | "hand_held_standard"
  | "pneumatic_air_power"
  | "rotary_disc_grind"
  | "fine_point_detail"
  | "heavy_head_rough";

const BUSH_DATA: Record<
  BushHammerType,
  {
    textureEven: number;
    coverSpeed: number;
    depthControl: number;
    faceLife: number;
    cost: number;
    powered: boolean;
    forDetail: boolean;
    pointCount: string;
    bestUse: string;
  }
> = {
  hand_held_standard: {
    textureEven: 8,
    coverSpeed: 6,
    depthControl: 9,
    faceLife: 7,
    cost: 4,
    powered: false,
    forDetail: false,
    pointCount: "sixteen_point_grid",
    bestUse: "general_bush_texture",
  },
  pneumatic_air_power: {
    textureEven: 9,
    coverSpeed: 10,
    depthControl: 7,
    faceLife: 8,
    cost: 9,
    powered: true,
    forDetail: false,
    pointCount: "twentyfive_point_head",
    bestUse: "large_area_texture",
  },
  rotary_disc_grind: {
    textureEven: 7,
    coverSpeed: 9,
    depthControl: 6,
    faceLife: 6,
    cost: 7,
    powered: true,
    forDetail: false,
    pointCount: "multi_roller_disc",
    bestUse: "floor_slab_finish",
  },
  fine_point_detail: {
    textureEven: 7,
    coverSpeed: 4,
    depthControl: 10,
    faceLife: 6,
    cost: 5,
    powered: false,
    forDetail: true,
    pointCount: "nine_point_fine",
    bestUse: "detail_panel_text",
  },
  heavy_head_rough: {
    textureEven: 6,
    coverSpeed: 8,
    depthControl: 5,
    faceLife: 9,
    cost: 5,
    powered: false,
    forDetail: false,
    pointCount: "four_point_heavy",
    bestUse: "rough_block_face",
  },
};

export function textureEven(type: BushHammerType): number {
  return BUSH_DATA[type].textureEven;
}
export function coverSpeed(type: BushHammerType): number {
  return BUSH_DATA[type].coverSpeed;
}
export function depthControl(type: BushHammerType): number {
  return BUSH_DATA[type].depthControl;
}
export function faceLife(type: BushHammerType): number {
  return BUSH_DATA[type].faceLife;
}
export function bushCost(type: BushHammerType): number {
  return BUSH_DATA[type].cost;
}
export function powered(type: BushHammerType): boolean {
  return BUSH_DATA[type].powered;
}
export function forDetail(type: BushHammerType): boolean {
  return BUSH_DATA[type].forDetail;
}
export function pointCount(type: BushHammerType): string {
  return BUSH_DATA[type].pointCount;
}
export function bestUse(type: BushHammerType): string {
  return BUSH_DATA[type].bestUse;
}
export function bushHammers(): BushHammerType[] {
  return Object.keys(BUSH_DATA) as BushHammerType[];
}
