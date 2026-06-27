// Sail palm calculator - sailmaking/rope sewing palm tools

export type SailPalmType =
  | "roping_palm_heavy"
  | "seaming_palm_light"
  | "right_hand_standard"
  | "left_hand_mirror"
  | "adjustable_strap_fit";

const PALM_DATA: Record<
  SailPalmType,
  {
    pushForce: number;
    needleGuide: number;
    handComfort: number;
    durability: number;
    cost: number;
    forRoping: boolean;
    adjustable: boolean;
    ironType: string;
    bestUse: string;
  }
> = {
  roping_palm_heavy: {
    pushForce: 10,
    needleGuide: 7,
    handComfort: 5,
    durability: 9,
    cost: 6,
    forRoping: true,
    adjustable: false,
    ironType: "deep_groove_iron",
    bestUse: "heavy_bolt_rope",
  },
  seaming_palm_light: {
    pushForce: 6,
    needleGuide: 9,
    handComfort: 8,
    durability: 7,
    cost: 5,
    forRoping: false,
    adjustable: false,
    ironType: "flat_dimple_iron",
    bestUse: "seam_stitch_canvas",
  },
  right_hand_standard: {
    pushForce: 8,
    needleGuide: 8,
    handComfort: 7,
    durability: 8,
    cost: 5,
    forRoping: false,
    adjustable: false,
    ironType: "medium_groove_iron",
    bestUse: "general_sail_repair",
  },
  left_hand_mirror: {
    pushForce: 8,
    needleGuide: 8,
    handComfort: 7,
    durability: 8,
    cost: 6,
    forRoping: false,
    adjustable: false,
    ironType: "mirror_groove_iron",
    bestUse: "left_hand_sail_work",
  },
  adjustable_strap_fit: {
    pushForce: 7,
    needleGuide: 7,
    handComfort: 9,
    durability: 6,
    cost: 7,
    forRoping: false,
    adjustable: true,
    ironType: "swap_iron_plate",
    bestUse: "shared_multi_user",
  },
};

export function pushForce(type: SailPalmType): number {
  return PALM_DATA[type].pushForce;
}
export function needleGuide(type: SailPalmType): number {
  return PALM_DATA[type].needleGuide;
}
export function handComfort(type: SailPalmType): number {
  return PALM_DATA[type].handComfort;
}
export function durability(type: SailPalmType): number {
  return PALM_DATA[type].durability;
}
export function palmCost(type: SailPalmType): number {
  return PALM_DATA[type].cost;
}
export function forRoping(type: SailPalmType): boolean {
  return PALM_DATA[type].forRoping;
}
export function adjustable(type: SailPalmType): boolean {
  return PALM_DATA[type].adjustable;
}
export function ironType(type: SailPalmType): string {
  return PALM_DATA[type].ironType;
}
export function bestUse(type: SailPalmType): string {
  return PALM_DATA[type].bestUse;
}
export function sailPalms(): SailPalmType[] {
  return Object.keys(PALM_DATA) as SailPalmType[];
}
