// Pivot burnisher calculator - clockmaking pivot polishing tools

export type PivotBurnisherType =
  | "straight_steel_rod"
  | "curved_tip_reach"
  | "bell_mouth_open"
  | "jacot_drum_lathe"
  | "pivot_file_flat";

const BURNISHER_DATA: Record<
  PivotBurnisherType,
  {
    finishQuality: number;
    reachAccess: number;
    speedPolish: number;
    pivotRange: number;
    cost: number;
    powered: boolean;
    forEndshake: boolean;
    tipShape: string;
    bestUse: string;
  }
> = {
  straight_steel_rod: {
    finishQuality: 7,
    reachAccess: 6,
    speedPolish: 5,
    pivotRange: 7,
    cost: 3,
    powered: false,
    forEndshake: false,
    tipShape: "round_straight_tip",
    bestUse: "general_pivot_polish",
  },
  curved_tip_reach: {
    finishQuality: 7,
    reachAccess: 9,
    speedPolish: 5,
    pivotRange: 6,
    cost: 4,
    powered: false,
    forEndshake: false,
    tipShape: "curved_hook_tip",
    bestUse: "recessed_pivot_access",
  },
  bell_mouth_open: {
    finishQuality: 8,
    reachAccess: 7,
    speedPolish: 6,
    pivotRange: 5,
    cost: 5,
    powered: false,
    forEndshake: true,
    tipShape: "concave_bell_end",
    bestUse: "pivot_shoulder_finish",
  },
  jacot_drum_lathe: {
    finishQuality: 10,
    reachAccess: 5,
    speedPolish: 9,
    pivotRange: 9,
    cost: 9,
    powered: true,
    forEndshake: true,
    tipShape: "drum_groove_channel",
    bestUse: "precision_pivot_true",
  },
  pivot_file_flat: {
    finishQuality: 5,
    reachAccess: 8,
    speedPolish: 7,
    pivotRange: 4,
    cost: 2,
    powered: false,
    forEndshake: false,
    tipShape: "flat_smooth_face",
    bestUse: "rough_pivot_shape",
  },
};

export function finishQuality(type: PivotBurnisherType): number {
  return BURNISHER_DATA[type].finishQuality;
}
export function reachAccess(type: PivotBurnisherType): number {
  return BURNISHER_DATA[type].reachAccess;
}
export function speedPolish(type: PivotBurnisherType): number {
  return BURNISHER_DATA[type].speedPolish;
}
export function pivotRange(type: PivotBurnisherType): number {
  return BURNISHER_DATA[type].pivotRange;
}
export function burnisherCost(type: PivotBurnisherType): number {
  return BURNISHER_DATA[type].cost;
}
export function powered(type: PivotBurnisherType): boolean {
  return BURNISHER_DATA[type].powered;
}
export function forEndshake(type: PivotBurnisherType): boolean {
  return BURNISHER_DATA[type].forEndshake;
}
export function tipShape(type: PivotBurnisherType): string {
  return BURNISHER_DATA[type].tipShape;
}
export function bestUse(type: PivotBurnisherType): string {
  return BURNISHER_DATA[type].bestUse;
}
export function pivotBurnishers(): PivotBurnisherType[] {
  return Object.keys(BURNISHER_DATA) as PivotBurnisherType[];
}
