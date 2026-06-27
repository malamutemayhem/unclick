// Hoof knife calculator - farriery trimming/paring tools

export type HoofKnifeType =
  | "right_hand_loop"
  | "left_hand_loop"
  | "double_edge_straight"
  | "narrow_blade_sole"
  | "wide_blade_frog";

const KNIFE_DATA: Record<
  HoofKnifeType,
  {
    cutClean: number;
    controlAngle: number;
    bladeLife: number;
    handleGrip: number;
    cost: number;
    doubleEdge: boolean;
    forFrog: boolean;
    bladeShape: string;
    bestUse: string;
  }
> = {
  right_hand_loop: {
    cutClean: 8,
    controlAngle: 9,
    bladeLife: 7,
    handleGrip: 8,
    cost: 4,
    doubleEdge: false,
    forFrog: false,
    bladeShape: "right_loop_curve",
    bestUse: "general_sole_trim",
  },
  left_hand_loop: {
    cutClean: 8,
    controlAngle: 9,
    bladeLife: 7,
    handleGrip: 8,
    cost: 4,
    doubleEdge: false,
    forFrog: false,
    bladeShape: "left_loop_curve",
    bestUse: "left_hand_trim",
  },
  double_edge_straight: {
    cutClean: 7,
    controlAngle: 7,
    bladeLife: 8,
    handleGrip: 7,
    cost: 5,
    doubleEdge: true,
    forFrog: false,
    bladeShape: "straight_double_bevel",
    bestUse: "wall_trim_either_hand",
  },
  narrow_blade_sole: {
    cutClean: 9,
    controlAngle: 8,
    bladeLife: 6,
    handleGrip: 7,
    cost: 4,
    doubleEdge: false,
    forFrog: false,
    bladeShape: "narrow_fine_curve",
    bestUse: "precision_sole_pare",
  },
  wide_blade_frog: {
    cutClean: 7,
    controlAngle: 7,
    bladeLife: 7,
    handleGrip: 9,
    cost: 5,
    doubleEdge: false,
    forFrog: true,
    bladeShape: "wide_scoop_blade",
    bestUse: "frog_bar_clean",
  },
};

export function cutClean(type: HoofKnifeType): number {
  return KNIFE_DATA[type].cutClean;
}
export function controlAngle(type: HoofKnifeType): number {
  return KNIFE_DATA[type].controlAngle;
}
export function bladeLife(type: HoofKnifeType): number {
  return KNIFE_DATA[type].bladeLife;
}
export function handleGrip(type: HoofKnifeType): number {
  return KNIFE_DATA[type].handleGrip;
}
export function knifeCost(type: HoofKnifeType): number {
  return KNIFE_DATA[type].cost;
}
export function doubleEdge(type: HoofKnifeType): boolean {
  return KNIFE_DATA[type].doubleEdge;
}
export function forFrog(type: HoofKnifeType): boolean {
  return KNIFE_DATA[type].forFrog;
}
export function bladeShape(type: HoofKnifeType): string {
  return KNIFE_DATA[type].bladeShape;
}
export function bestUse(type: HoofKnifeType): string {
  return KNIFE_DATA[type].bestUse;
}
export function hoofKnives(): HoofKnifeType[] {
  return Object.keys(KNIFE_DATA) as HoofKnifeType[];
}
