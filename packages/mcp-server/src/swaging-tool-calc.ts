// Swaging tool calculator - plumbing tube expansion/reduction tools

export type SwagingToolType =
  | "expander_punch_push"
  | "reducer_die_crimp"
  | "rotary_swage_spin"
  | "hydraulic_expander_set"
  | "manual_flange_spread";

const SWAGE_DATA: Record<
  SwagingToolType,
  {
    formQuality: number;
    sizeRange: number;
    speedSwage: number;
    jointStrength: number;
    cost: number;
    powered: boolean;
    forExpand: boolean;
    dieShape: string;
    bestUse: string;
  }
> = {
  expander_punch_push: {
    formQuality: 7,
    sizeRange: 6,
    speedSwage: 8,
    jointStrength: 7,
    cost: 3,
    powered: false,
    forExpand: true,
    dieShape: "tapered_punch_cone",
    bestUse: "copper_tube_expand",
  },
  reducer_die_crimp: {
    formQuality: 8,
    sizeRange: 6,
    speedSwage: 7,
    jointStrength: 8,
    cost: 4,
    powered: false,
    forExpand: false,
    dieShape: "ring_crimp_die",
    bestUse: "tube_end_reduce",
  },
  rotary_swage_spin: {
    formQuality: 9,
    sizeRange: 7,
    speedSwage: 9,
    jointStrength: 9,
    cost: 8,
    powered: true,
    forExpand: false,
    dieShape: "rotating_hammer_die",
    bestUse: "precision_taper_form",
  },
  hydraulic_expander_set: {
    formQuality: 10,
    sizeRange: 10,
    speedSwage: 7,
    jointStrength: 9,
    cost: 9,
    powered: true,
    forExpand: true,
    dieShape: "hydraulic_segment_head",
    bestUse: "large_tube_expand",
  },
  manual_flange_spread: {
    formQuality: 7,
    sizeRange: 5,
    speedSwage: 8,
    jointStrength: 7,
    cost: 4,
    powered: false,
    forExpand: true,
    dieShape: "lever_spread_jaw",
    bestUse: "field_joint_spread",
  },
};

export function formQuality(type: SwagingToolType): number {
  return SWAGE_DATA[type].formQuality;
}
export function sizeRange(type: SwagingToolType): number {
  return SWAGE_DATA[type].sizeRange;
}
export function speedSwage(type: SwagingToolType): number {
  return SWAGE_DATA[type].speedSwage;
}
export function jointStrength(type: SwagingToolType): number {
  return SWAGE_DATA[type].jointStrength;
}
export function swageCost(type: SwagingToolType): number {
  return SWAGE_DATA[type].cost;
}
export function powered(type: SwagingToolType): boolean {
  return SWAGE_DATA[type].powered;
}
export function forExpand(type: SwagingToolType): boolean {
  return SWAGE_DATA[type].forExpand;
}
export function dieShape(type: SwagingToolType): string {
  return SWAGE_DATA[type].dieShape;
}
export function bestUse(type: SwagingToolType): string {
  return SWAGE_DATA[type].bestUse;
}
export function swagingTools(): SwagingToolType[] {
  return Object.keys(SWAGE_DATA) as SwagingToolType[];
}
