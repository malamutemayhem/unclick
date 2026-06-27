// Woad mill calculator - natural dye plant processing tools

export type WoadMillType =
  | "stone_quern_grind"
  | "wooden_stamp_crush"
  | "roller_mill_press"
  | "mortar_pestle_hand"
  | "ball_mill_tumble";

const WOAD_DATA: Record<
  WoadMillType,
  {
    grindFine: number;
    pigmentYield: number;
    speedProcess: number;
    batchSize: number;
    cost: number;
    powered: boolean;
    forLeaf: boolean;
    grindMethod: string;
    bestUse: string;
  }
> = {
  stone_quern_grind: {
    grindFine: 8,
    pigmentYield: 8,
    speedProcess: 5,
    batchSize: 6,
    cost: 4,
    powered: false,
    forLeaf: true,
    grindMethod: "stone_rotation_grind",
    bestUse: "traditional_woad_grind",
  },
  wooden_stamp_crush: {
    grindFine: 6,
    pigmentYield: 7,
    speedProcess: 7,
    batchSize: 8,
    cost: 3,
    powered: false,
    forLeaf: true,
    grindMethod: "vertical_stamp_crush",
    bestUse: "leaf_crush_extract",
  },
  roller_mill_press: {
    grindFine: 9,
    pigmentYield: 9,
    speedProcess: 8,
    batchSize: 9,
    cost: 7,
    powered: true,
    forLeaf: true,
    grindMethod: "roller_press_squeeze",
    bestUse: "production_dye_extract",
  },
  mortar_pestle_hand: {
    grindFine: 7,
    pigmentYield: 6,
    speedProcess: 4,
    batchSize: 3,
    cost: 2,
    powered: false,
    forLeaf: false,
    grindMethod: "hand_grind_pestle",
    bestUse: "small_sample_grind",
  },
  ball_mill_tumble: {
    grindFine: 10,
    pigmentYield: 9,
    speedProcess: 9,
    batchSize: 7,
    cost: 8,
    powered: true,
    forLeaf: false,
    grindMethod: "tumble_ball_grind",
    bestUse: "fine_pigment_powder",
  },
};

export function grindFine(type: WoadMillType): number {
  return WOAD_DATA[type].grindFine;
}
export function pigmentYield(type: WoadMillType): number {
  return WOAD_DATA[type].pigmentYield;
}
export function speedProcess(type: WoadMillType): number {
  return WOAD_DATA[type].speedProcess;
}
export function batchSize(type: WoadMillType): number {
  return WOAD_DATA[type].batchSize;
}
export function woadCost(type: WoadMillType): number {
  return WOAD_DATA[type].cost;
}
export function powered(type: WoadMillType): boolean {
  return WOAD_DATA[type].powered;
}
export function forLeaf(type: WoadMillType): boolean {
  return WOAD_DATA[type].forLeaf;
}
export function grindMethod(type: WoadMillType): string {
  return WOAD_DATA[type].grindMethod;
}
export function bestUse(type: WoadMillType): string {
  return WOAD_DATA[type].bestUse;
}
export function woadMills(): WoadMillType[] {
  return Object.keys(WOAD_DATA) as WoadMillType[];
}
