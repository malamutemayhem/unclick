// Flatter forge calculator - blacksmithing flatter tools

export type FlatterForgeType =
  | "hand_flatter_standard"
  | "set_hammer_square"
  | "planishing_round_face"
  | "dog_head_offset"
  | "power_hammer_die";

const FLATTER_DATA: Record<
  FlatterForgeType,
  {
    surfaceFlat: number;
    controlStrike: number;
    coverArea: number;
    finishQuality: number;
    cost: number;
    powered: boolean;
    offset: boolean;
    faceShape: string;
    bestUse: string;
  }
> = {
  hand_flatter_standard: {
    surfaceFlat: 9,
    controlStrike: 8,
    coverArea: 8,
    finishQuality: 8,
    cost: 4,
    powered: false,
    offset: false,
    faceShape: "flat_square_polish",
    bestUse: "general_flatten_work",
  },
  set_hammer_square: {
    surfaceFlat: 8,
    controlStrike: 9,
    coverArea: 6,
    finishQuality: 7,
    cost: 3,
    powered: false,
    offset: false,
    faceShape: "flat_small_square",
    bestUse: "corner_shoulder_set",
  },
  planishing_round_face: {
    surfaceFlat: 7,
    controlStrike: 8,
    coverArea: 7,
    finishQuality: 10,
    cost: 5,
    powered: false,
    offset: false,
    faceShape: "slight_crown_round",
    bestUse: "final_surface_finish",
  },
  dog_head_offset: {
    surfaceFlat: 8,
    controlStrike: 7,
    coverArea: 7,
    finishQuality: 7,
    cost: 4,
    powered: false,
    offset: true,
    faceShape: "offset_flat_head",
    bestUse: "reach_tight_angle",
  },
  power_hammer_die: {
    surfaceFlat: 10,
    controlStrike: 7,
    coverArea: 10,
    finishQuality: 8,
    cost: 8,
    powered: true,
    offset: false,
    faceShape: "machine_flat_die",
    bestUse: "production_flatten",
  },
};

export function surfaceFlat(type: FlatterForgeType): number {
  return FLATTER_DATA[type].surfaceFlat;
}
export function controlStrike(type: FlatterForgeType): number {
  return FLATTER_DATA[type].controlStrike;
}
export function coverArea(type: FlatterForgeType): number {
  return FLATTER_DATA[type].coverArea;
}
export function finishQuality(type: FlatterForgeType): number {
  return FLATTER_DATA[type].finishQuality;
}
export function flatterCost(type: FlatterForgeType): number {
  return FLATTER_DATA[type].cost;
}
export function powered(type: FlatterForgeType): boolean {
  return FLATTER_DATA[type].powered;
}
export function offset(type: FlatterForgeType): boolean {
  return FLATTER_DATA[type].offset;
}
export function faceShape(type: FlatterForgeType): string {
  return FLATTER_DATA[type].faceShape;
}
export function bestUse(type: FlatterForgeType): string {
  return FLATTER_DATA[type].bestUse;
}
export function flatterForges(): FlatterForgeType[] {
  return Object.keys(FLATTER_DATA) as FlatterForgeType[];
}
