// Flatter hammer calculator - blacksmithing surface finishing tools

export type FlatterHammerType =
  | "handled_flatter_top"
  | "set_hammer_square"
  | "planishing_round_face"
  | "smoothing_wide_flat"
  | "creasing_narrow_edge";

const FLATTER_DATA: Record<
  FlatterHammerType,
  {
    surfaceFinish: number;
    coverArea: number;
    controlStrike: number;
    faceFlat: number;
    cost: number;
    handled: boolean;
    forFinishing: boolean;
    faceShape: string;
    bestUse: string;
  }
> = {
  handled_flatter_top: {
    surfaceFinish: 8,
    coverArea: 7,
    controlStrike: 6,
    faceFlat: 9,
    cost: 5,
    handled: true,
    forFinishing: true,
    faceShape: "flat_square_polished",
    bestUse: "surface_true_flat",
  },
  set_hammer_square: {
    surfaceFinish: 7,
    coverArea: 5,
    controlStrike: 8,
    faceFlat: 8,
    cost: 4,
    handled: true,
    forFinishing: false,
    faceShape: "small_square_flat",
    bestUse: "corner_shoulder_set",
  },
  planishing_round_face: {
    surfaceFinish: 9,
    coverArea: 4,
    controlStrike: 9,
    faceFlat: 6,
    cost: 6,
    handled: true,
    forFinishing: true,
    faceShape: "slight_crown_round",
    bestUse: "hammer_mark_remove",
  },
  smoothing_wide_flat: {
    surfaceFinish: 8,
    coverArea: 9,
    controlStrike: 5,
    faceFlat: 9,
    cost: 7,
    handled: false,
    forFinishing: true,
    faceShape: "wide_ground_flat",
    bestUse: "broad_surface_smooth",
  },
  creasing_narrow_edge: {
    surfaceFinish: 5,
    coverArea: 3,
    controlStrike: 8,
    faceFlat: 4,
    cost: 5,
    handled: true,
    forFinishing: false,
    faceShape: "narrow_round_edge",
    bestUse: "crease_fold_line",
  },
};

export function surfaceFinish(type: FlatterHammerType): number {
  return FLATTER_DATA[type].surfaceFinish;
}
export function coverArea(type: FlatterHammerType): number {
  return FLATTER_DATA[type].coverArea;
}
export function controlStrike(type: FlatterHammerType): number {
  return FLATTER_DATA[type].controlStrike;
}
export function faceFlat(type: FlatterHammerType): number {
  return FLATTER_DATA[type].faceFlat;
}
export function flatterCost(type: FlatterHammerType): number {
  return FLATTER_DATA[type].cost;
}
export function handled(type: FlatterHammerType): boolean {
  return FLATTER_DATA[type].handled;
}
export function forFinishing(type: FlatterHammerType): boolean {
  return FLATTER_DATA[type].forFinishing;
}
export function faceShape(type: FlatterHammerType): string {
  return FLATTER_DATA[type].faceShape;
}
export function bestUse(type: FlatterHammerType): string {
  return FLATTER_DATA[type].bestUse;
}
export function flatterHammers(): FlatterHammerType[] {
  return Object.keys(FLATTER_DATA) as FlatterHammerType[];
}
