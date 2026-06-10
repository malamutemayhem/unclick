// Strap cutter calculator - leatherworking belt/strap cutting tools

export type StrapCutterType =
  | "draw_gauge_pull"
  | "plough_gauge_push"
  | "rotary_wheel_roll"
  | "straight_edge_knife"
  | "adjustable_fence_set";

const CUTTER_DATA: Record<
  StrapCutterType,
  {
    cutStraight: number;
    widthConsist: number;
    cutSpeed: number;
    thicknessRange: number;
    cost: number;
    adjustable: boolean;
    forThick: boolean;
    bladeType: string;
    bestUse: string;
  }
> = {
  draw_gauge_pull: {
    cutStraight: 9,
    widthConsist: 9,
    cutSpeed: 7,
    thicknessRange: 8,
    cost: 6,
    adjustable: true,
    forThick: true,
    bladeType: "fixed_blade_fence",
    bestUse: "belt_strap_cut",
  },
  plough_gauge_push: {
    cutStraight: 8,
    widthConsist: 8,
    cutSpeed: 8,
    thicknessRange: 7,
    cost: 5,
    adjustable: true,
    forThick: false,
    bladeType: "push_blade_gauge",
    bestUse: "thin_strip_repeat",
  },
  rotary_wheel_roll: {
    cutStraight: 6,
    widthConsist: 5,
    cutSpeed: 9,
    thicknessRange: 5,
    cost: 3,
    adjustable: false,
    forThick: false,
    bladeType: "circular_rotary_disc",
    bestUse: "quick_freehand_cut",
  },
  straight_edge_knife: {
    cutStraight: 7,
    widthConsist: 4,
    cutSpeed: 6,
    thicknessRange: 9,
    cost: 2,
    adjustable: false,
    forThick: true,
    bladeType: "straight_razor_edge",
    bestUse: "single_cut_heavy",
  },
  adjustable_fence_set: {
    cutStraight: 10,
    widthConsist: 10,
    cutSpeed: 6,
    thicknessRange: 8,
    cost: 8,
    adjustable: true,
    forThick: true,
    bladeType: "fence_rail_blade",
    bestUse: "precision_width_repeat",
  },
};

export function cutStraight(type: StrapCutterType): number {
  return CUTTER_DATA[type].cutStraight;
}
export function widthConsist(type: StrapCutterType): number {
  return CUTTER_DATA[type].widthConsist;
}
export function cutSpeed(type: StrapCutterType): number {
  return CUTTER_DATA[type].cutSpeed;
}
export function thicknessRange(type: StrapCutterType): number {
  return CUTTER_DATA[type].thicknessRange;
}
export function cutterCost(type: StrapCutterType): number {
  return CUTTER_DATA[type].cost;
}
export function adjustable(type: StrapCutterType): boolean {
  return CUTTER_DATA[type].adjustable;
}
export function forThick(type: StrapCutterType): boolean {
  return CUTTER_DATA[type].forThick;
}
export function bladeType(type: StrapCutterType): string {
  return CUTTER_DATA[type].bladeType;
}
export function bestUse(type: StrapCutterType): string {
  return CUTTER_DATA[type].bestUse;
}
export function strapCutters(): StrapCutterType[] {
  return Object.keys(CUTTER_DATA) as StrapCutterType[];
}
