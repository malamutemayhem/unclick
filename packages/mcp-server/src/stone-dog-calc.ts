// Stone dog calculator - stone masonry clamping dog tools

export type StoneDogType =
  | "straight_bar_standard"
  | "offset_hook_step"
  | "ring_bolt_anchor"
  | "wedge_clamp_tight"
  | "adjustable_span_slide";

const DOG_DATA: Record<
  StoneDogType,
  {
    holdForce: number;
    stoneGrip: number;
    setupSpeed: number;
    spanRange: number;
    cost: number;
    adjustable: boolean;
    forStep: boolean;
    dogShape: string;
    bestUse: string;
  }
> = {
  straight_bar_standard: {
    holdForce: 8,
    stoneGrip: 8,
    setupSpeed: 8,
    spanRange: 7,
    cost: 3,
    adjustable: false,
    forStep: false,
    dogShape: "straight_flat_bar",
    bestUse: "general_stone_hold",
  },
  offset_hook_step: {
    holdForce: 8,
    stoneGrip: 9,
    setupSpeed: 7,
    spanRange: 6,
    cost: 4,
    adjustable: false,
    forStep: true,
    dogShape: "offset_hook_end",
    bestUse: "stepped_joint_hold",
  },
  ring_bolt_anchor: {
    holdForce: 9,
    stoneGrip: 7,
    setupSpeed: 6,
    spanRange: 5,
    cost: 5,
    adjustable: false,
    forStep: false,
    dogShape: "ring_bolt_set",
    bestUse: "permanent_anchor_hold",
  },
  wedge_clamp_tight: {
    holdForce: 10,
    stoneGrip: 9,
    setupSpeed: 6,
    spanRange: 6,
    cost: 5,
    adjustable: false,
    forStep: false,
    dogShape: "wedge_taper_clamp",
    bestUse: "tight_pressure_hold",
  },
  adjustable_span_slide: {
    holdForce: 7,
    stoneGrip: 7,
    setupSpeed: 9,
    spanRange: 10,
    cost: 6,
    adjustable: true,
    forStep: false,
    dogShape: "sliding_bar_adjust",
    bestUse: "variable_width_hold",
  },
};

export function holdForce(type: StoneDogType): number {
  return DOG_DATA[type].holdForce;
}
export function stoneGrip(type: StoneDogType): number {
  return DOG_DATA[type].stoneGrip;
}
export function setupSpeed(type: StoneDogType): number {
  return DOG_DATA[type].setupSpeed;
}
export function spanRange(type: StoneDogType): number {
  return DOG_DATA[type].spanRange;
}
export function dogCost(type: StoneDogType): number {
  return DOG_DATA[type].cost;
}
export function adjustable(type: StoneDogType): boolean {
  return DOG_DATA[type].adjustable;
}
export function forStep(type: StoneDogType): boolean {
  return DOG_DATA[type].forStep;
}
export function dogShape(type: StoneDogType): string {
  return DOG_DATA[type].dogShape;
}
export function bestUse(type: StoneDogType): string {
  return DOG_DATA[type].bestUse;
}
export function stoneDogs(): StoneDogType[] {
  return Object.keys(DOG_DATA) as StoneDogType[];
}
