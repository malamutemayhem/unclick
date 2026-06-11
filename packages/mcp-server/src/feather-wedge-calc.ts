// Feather wedge calculator - stone splitting wedge tools

export type FeatherWedgeType =
  | "standard_steel_set"
  | "small_plug_trim"
  | "large_quarry_heavy"
  | "carbide_face_hard"
  | "hand_forged_custom";

const WEDGE_DATA: Record<
  FeatherWedgeType,
  {
    splitForce: number;
    lineControl: number;
    durability: number;
    sizeRange: number;
    cost: number;
    carbide: boolean;
    forQuarry: boolean;
    setSize: string;
    bestUse: string;
  }
> = {
  standard_steel_set: {
    splitForce: 8,
    lineControl: 8,
    durability: 8,
    sizeRange: 7,
    cost: 4,
    carbide: false,
    forQuarry: false,
    setSize: "medium_3_4_inch",
    bestUse: "general_stone_split",
  },
  small_plug_trim: {
    splitForce: 5,
    lineControl: 10,
    durability: 7,
    sizeRange: 4,
    cost: 3,
    carbide: false,
    forQuarry: false,
    setSize: "small_1_2_inch",
    bestUse: "precision_trim_split",
  },
  large_quarry_heavy: {
    splitForce: 10,
    lineControl: 6,
    durability: 9,
    sizeRange: 9,
    cost: 6,
    carbide: false,
    forQuarry: true,
    setSize: "large_1_inch",
    bestUse: "quarry_block_split",
  },
  carbide_face_hard: {
    splitForce: 9,
    lineControl: 8,
    durability: 10,
    sizeRange: 7,
    cost: 8,
    carbide: true,
    forQuarry: false,
    setSize: "medium_carbide_face",
    bestUse: "hard_granite_split",
  },
  hand_forged_custom: {
    splitForce: 8,
    lineControl: 9,
    durability: 9,
    sizeRange: 8,
    cost: 7,
    carbide: false,
    forQuarry: false,
    setSize: "custom_forged_set",
    bestUse: "artisan_precise_split",
  },
};

export function splitForce(type: FeatherWedgeType): number {
  return WEDGE_DATA[type].splitForce;
}
export function lineControl(type: FeatherWedgeType): number {
  return WEDGE_DATA[type].lineControl;
}
export function durability(type: FeatherWedgeType): number {
  return WEDGE_DATA[type].durability;
}
export function sizeRange(type: FeatherWedgeType): number {
  return WEDGE_DATA[type].sizeRange;
}
export function wedgeCost(type: FeatherWedgeType): number {
  return WEDGE_DATA[type].cost;
}
export function carbide(type: FeatherWedgeType): boolean {
  return WEDGE_DATA[type].carbide;
}
export function forQuarry(type: FeatherWedgeType): boolean {
  return WEDGE_DATA[type].forQuarry;
}
export function setSize(type: FeatherWedgeType): string {
  return WEDGE_DATA[type].setSize;
}
export function bestUse(type: FeatherWedgeType): string {
  return WEDGE_DATA[type].bestUse;
}
export function featherWedges(): FeatherWedgeType[] {
  return Object.keys(WEDGE_DATA) as FeatherWedgeType[];
}
