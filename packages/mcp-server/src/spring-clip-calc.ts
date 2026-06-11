// Spring clip calculator - upholstery spring fastening tools

export type SpringClipType =
  | "hog_ring_plier"
  | "spring_clip_hand"
  | "zigzag_clip_auto"
  | "sinuous_spring_hook"
  | "coil_spring_tie";

const SPRING_DATA: Record<
  SpringClipType,
  {
    gripForce: number;
    speedAttach: number;
    holdSecure: number;
    springRange: number;
    cost: number;
    powered: boolean;
    forSinuous: boolean;
    clipMethod: string;
    bestUse: string;
  }
> = {
  hog_ring_plier: {
    gripForce: 9,
    speedAttach: 9,
    holdSecure: 9,
    springRange: 6,
    cost: 5,
    powered: false,
    forSinuous: false,
    clipMethod: "ring_crimp_close",
    bestUse: "spring_to_frame_fix",
  },
  spring_clip_hand: {
    gripForce: 7,
    speedAttach: 7,
    holdSecure: 7,
    springRange: 8,
    cost: 3,
    powered: false,
    forSinuous: false,
    clipMethod: "clip_squeeze_hold",
    bestUse: "temporary_spring_hold",
  },
  zigzag_clip_auto: {
    gripForce: 8,
    speedAttach: 10,
    holdSecure: 8,
    springRange: 5,
    cost: 7,
    powered: true,
    forSinuous: true,
    clipMethod: "auto_clip_feed",
    bestUse: "zigzag_spring_attach",
  },
  sinuous_spring_hook: {
    gripForce: 8,
    speedAttach: 6,
    holdSecure: 8,
    springRange: 7,
    cost: 4,
    powered: false,
    forSinuous: true,
    clipMethod: "hook_bend_lock",
    bestUse: "sinuous_end_hook",
  },
  coil_spring_tie: {
    gripForce: 7,
    speedAttach: 5,
    holdSecure: 9,
    springRange: 9,
    cost: 3,
    powered: false,
    forSinuous: false,
    clipMethod: "twine_tie_knot",
    bestUse: "coil_spring_lash",
  },
};

export function gripForce(type: SpringClipType): number {
  return SPRING_DATA[type].gripForce;
}
export function speedAttach(type: SpringClipType): number {
  return SPRING_DATA[type].speedAttach;
}
export function holdSecure(type: SpringClipType): number {
  return SPRING_DATA[type].holdSecure;
}
export function springRange(type: SpringClipType): number {
  return SPRING_DATA[type].springRange;
}
export function springCost(type: SpringClipType): number {
  return SPRING_DATA[type].cost;
}
export function powered(type: SpringClipType): boolean {
  return SPRING_DATA[type].powered;
}
export function forSinuous(type: SpringClipType): boolean {
  return SPRING_DATA[type].forSinuous;
}
export function clipMethod(type: SpringClipType): string {
  return SPRING_DATA[type].clipMethod;
}
export function bestUse(type: SpringClipType): string {
  return SPRING_DATA[type].bestUse;
}
export function springClips(): SpringClipType[] {
  return Object.keys(SPRING_DATA) as SpringClipType[];
}
