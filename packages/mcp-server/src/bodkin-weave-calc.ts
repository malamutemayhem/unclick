// Bodkin calculator - basket weaving threading/insertion tools

export type BodkinWeaveType =
  | "flat_ribbon_thread"
  | "pointed_bone_push"
  | "curved_hook_weave"
  | "wide_tape_needle"
  | "split_eye_pull";

const BODKIN_DATA: Record<
  BodkinWeaveType,
  {
    threadEase: number;
    weavePrecision: number;
    materialSafe: number;
    handleGrip: number;
    cost: number;
    curved: boolean;
    forRibbon: boolean;
    tipShape: string;
    bestUse: string;
  }
> = {
  flat_ribbon_thread: {
    threadEase: 9,
    weavePrecision: 7,
    materialSafe: 8,
    handleGrip: 6,
    cost: 3,
    curved: false,
    forRibbon: true,
    tipShape: "flat_blunt_end",
    bestUse: "ribbon_weave_thread",
  },
  pointed_bone_push: {
    threadEase: 7,
    weavePrecision: 9,
    materialSafe: 7,
    handleGrip: 8,
    cost: 4,
    curved: false,
    forRibbon: false,
    tipShape: "tapered_point_tip",
    bestUse: "tight_gap_push",
  },
  curved_hook_weave: {
    threadEase: 8,
    weavePrecision: 8,
    materialSafe: 9,
    handleGrip: 7,
    cost: 5,
    curved: true,
    forRibbon: false,
    tipShape: "curved_hook_end",
    bestUse: "pull_through_weave",
  },
  wide_tape_needle: {
    threadEase: 10,
    weavePrecision: 6,
    materialSafe: 8,
    handleGrip: 5,
    cost: 3,
    curved: false,
    forRibbon: true,
    tipShape: "broad_flat_eye",
    bestUse: "wide_splint_thread",
  },
  split_eye_pull: {
    threadEase: 8,
    weavePrecision: 7,
    materialSafe: 9,
    handleGrip: 7,
    cost: 4,
    curved: false,
    forRibbon: false,
    tipShape: "split_loop_eye",
    bestUse: "fine_strand_pull",
  },
};

export function threadEase(type: BodkinWeaveType): number {
  return BODKIN_DATA[type].threadEase;
}
export function weavePrecision(type: BodkinWeaveType): number {
  return BODKIN_DATA[type].weavePrecision;
}
export function materialSafe(type: BodkinWeaveType): number {
  return BODKIN_DATA[type].materialSafe;
}
export function handleGrip(type: BodkinWeaveType): number {
  return BODKIN_DATA[type].handleGrip;
}
export function bodkinCost(type: BodkinWeaveType): number {
  return BODKIN_DATA[type].cost;
}
export function curved(type: BodkinWeaveType): boolean {
  return BODKIN_DATA[type].curved;
}
export function forRibbon(type: BodkinWeaveType): boolean {
  return BODKIN_DATA[type].forRibbon;
}
export function tipShape(type: BodkinWeaveType): string {
  return BODKIN_DATA[type].tipShape;
}
export function bestUse(type: BodkinWeaveType): string {
  return BODKIN_DATA[type].bestUse;
}
export function bodkinWeaves(): BodkinWeaveType[] {
  return Object.keys(BODKIN_DATA) as BodkinWeaveType[];
}
