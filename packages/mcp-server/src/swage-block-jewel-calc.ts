// Swage block jewel calculator - jewelry forming block tools

export type SwageBlockJewelType =
  | "steel_multi_groove"
  | "brass_single_channel"
  | "hardwood_forming_block"
  | "lead_soft_form"
  | "urethane_cushion_press";

const SWAGE_DATA: Record<
  SwageBlockJewelType,
  {
    formAccuracy: number;
    surfaceFinish: number;
    shapeRange: number;
    durability: number;
    cost: number;
    multiGroove: boolean;
    forSoft: boolean;
    blockMaterial: string;
    bestUse: string;
  }
> = {
  steel_multi_groove: {
    formAccuracy: 9,
    surfaceFinish: 8,
    shapeRange: 10,
    durability: 10,
    cost: 7,
    multiGroove: true,
    forSoft: false,
    blockMaterial: "hardened_steel",
    bestUse: "wire_channel_form",
  },
  brass_single_channel: {
    formAccuracy: 8,
    surfaceFinish: 9,
    shapeRange: 5,
    durability: 7,
    cost: 5,
    multiGroove: false,
    forSoft: false,
    blockMaterial: "solid_brass",
    bestUse: "single_channel_bend",
  },
  hardwood_forming_block: {
    formAccuracy: 7,
    surfaceFinish: 7,
    shapeRange: 6,
    durability: 5,
    cost: 3,
    multiGroove: false,
    forSoft: true,
    blockMaterial: "maple_hardwood",
    bestUse: "gentle_curve_form",
  },
  lead_soft_form: {
    formAccuracy: 6,
    surfaceFinish: 6,
    shapeRange: 8,
    durability: 4,
    cost: 3,
    multiGroove: false,
    forSoft: true,
    blockMaterial: "soft_lead_block",
    bestUse: "custom_shape_press",
  },
  urethane_cushion_press: {
    formAccuracy: 7,
    surfaceFinish: 9,
    shapeRange: 7,
    durability: 6,
    cost: 4,
    multiGroove: false,
    forSoft: true,
    blockMaterial: "urethane_pad",
    bestUse: "mark_free_form",
  },
};

export function formAccuracy(type: SwageBlockJewelType): number {
  return SWAGE_DATA[type].formAccuracy;
}
export function surfaceFinish(type: SwageBlockJewelType): number {
  return SWAGE_DATA[type].surfaceFinish;
}
export function shapeRange(type: SwageBlockJewelType): number {
  return SWAGE_DATA[type].shapeRange;
}
export function durability(type: SwageBlockJewelType): number {
  return SWAGE_DATA[type].durability;
}
export function swageCost(type: SwageBlockJewelType): number {
  return SWAGE_DATA[type].cost;
}
export function multiGroove(type: SwageBlockJewelType): boolean {
  return SWAGE_DATA[type].multiGroove;
}
export function forSoft(type: SwageBlockJewelType): boolean {
  return SWAGE_DATA[type].forSoft;
}
export function blockMaterial(type: SwageBlockJewelType): string {
  return SWAGE_DATA[type].blockMaterial;
}
export function bestUse(type: SwageBlockJewelType): string {
  return SWAGE_DATA[type].bestUse;
}
export function swageBlockJewels(): SwageBlockJewelType[] {
  return Object.keys(SWAGE_DATA) as SwageBlockJewelType[];
}
