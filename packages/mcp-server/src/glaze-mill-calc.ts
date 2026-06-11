// Glaze mill calculator - pottery glaze grinding tools

export type GlazeMillType =
  | "ball_mill_jar"
  | "mortar_pestle_hand"
  | "plate_mill_flat"
  | "vibrating_sieve_screen"
  | "wet_grinder_stone";

const GLAZE_DATA: Record<
  GlazeMillType,
  {
    grindFine: number;
    batchConsist: number;
    speedGrind: number;
    materialRange: number;
    cost: number;
    powered: boolean;
    forWet: boolean;
    grindAction: string;
    bestUse: string;
  }
> = {
  ball_mill_jar: {
    grindFine: 10,
    batchConsist: 9,
    speedGrind: 7,
    materialRange: 9,
    cost: 6,
    powered: true,
    forWet: true,
    grindAction: "tumble_ball_crush",
    bestUse: "fine_glaze_grind",
  },
  mortar_pestle_hand: {
    grindFine: 7,
    batchConsist: 6,
    speedGrind: 4,
    materialRange: 7,
    cost: 2,
    powered: false,
    forWet: false,
    grindAction: "hand_crush_grind",
    bestUse: "small_test_batch",
  },
  plate_mill_flat: {
    grindFine: 8,
    batchConsist: 8,
    speedGrind: 8,
    materialRange: 7,
    cost: 7,
    powered: true,
    forWet: false,
    grindAction: "flat_plate_shear",
    bestUse: "dry_material_grind",
  },
  vibrating_sieve_screen: {
    grindFine: 6,
    batchConsist: 9,
    speedGrind: 9,
    materialRange: 5,
    cost: 5,
    powered: true,
    forWet: true,
    grindAction: "vibrate_screen_pass",
    bestUse: "glaze_sieve_uniform",
  },
  wet_grinder_stone: {
    grindFine: 9,
    batchConsist: 8,
    speedGrind: 6,
    materialRange: 8,
    cost: 5,
    powered: false,
    forWet: true,
    grindAction: "stone_wet_rotate",
    bestUse: "traditional_glaze_prep",
  },
};

export function grindFine(type: GlazeMillType): number {
  return GLAZE_DATA[type].grindFine;
}
export function batchConsist(type: GlazeMillType): number {
  return GLAZE_DATA[type].batchConsist;
}
export function speedGrind(type: GlazeMillType): number {
  return GLAZE_DATA[type].speedGrind;
}
export function materialRange(type: GlazeMillType): number {
  return GLAZE_DATA[type].materialRange;
}
export function glazeCost(type: GlazeMillType): number {
  return GLAZE_DATA[type].cost;
}
export function powered(type: GlazeMillType): boolean {
  return GLAZE_DATA[type].powered;
}
export function forWet(type: GlazeMillType): boolean {
  return GLAZE_DATA[type].forWet;
}
export function grindAction(type: GlazeMillType): string {
  return GLAZE_DATA[type].grindAction;
}
export function bestUse(type: GlazeMillType): string {
  return GLAZE_DATA[type].bestUse;
}
export function glazeMills(): GlazeMillType[] {
  return Object.keys(GLAZE_DATA) as GlazeMillType[];
}
