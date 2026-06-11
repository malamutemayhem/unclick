// Heading knife calculator - coopering barrel head cutting tools

export type HeadingKnifeType =
  | "compass_cutter_round"
  | "straight_blade_trim"
  | "beveled_edge_chamfer"
  | "adjustable_radius_set"
  | "electric_jigsaw_power";

const KNIFE_DATA: Record<
  HeadingKnifeType,
  {
    cutCircle: number;
    edgeClean: number;
    setupSpeed: number;
    sizeRange: number;
    cost: number;
    powered: boolean;
    adjustable: boolean;
    cutMethod: string;
    bestUse: string;
  }
> = {
  compass_cutter_round: {
    cutCircle: 10,
    edgeClean: 9,
    setupSpeed: 7,
    sizeRange: 8,
    cost: 6,
    powered: false,
    adjustable: true,
    cutMethod: "compass_pivot_cut",
    bestUse: "precision_head_circle",
  },
  straight_blade_trim: {
    cutCircle: 6,
    edgeClean: 8,
    setupSpeed: 9,
    sizeRange: 5,
    cost: 3,
    powered: false,
    adjustable: false,
    cutMethod: "straight_freehand",
    bestUse: "quick_head_trim",
  },
  beveled_edge_chamfer: {
    cutCircle: 7,
    edgeClean: 9,
    setupSpeed: 7,
    sizeRange: 6,
    cost: 5,
    powered: false,
    adjustable: false,
    cutMethod: "bevel_chamfer_cut",
    bestUse: "chamfered_head_edge",
  },
  adjustable_radius_set: {
    cutCircle: 9,
    edgeClean: 8,
    setupSpeed: 6,
    sizeRange: 10,
    cost: 7,
    powered: false,
    adjustable: true,
    cutMethod: "sliding_radius_arm",
    bestUse: "multi_size_head_cut",
  },
  electric_jigsaw_power: {
    cutCircle: 7,
    edgeClean: 7,
    setupSpeed: 10,
    sizeRange: 9,
    cost: 5,
    powered: true,
    adjustable: false,
    cutMethod: "powered_blade_cut",
    bestUse: "fast_production_head",
  },
};

export function cutCircle(type: HeadingKnifeType): number {
  return KNIFE_DATA[type].cutCircle;
}
export function edgeClean(type: HeadingKnifeType): number {
  return KNIFE_DATA[type].edgeClean;
}
export function setupSpeed(type: HeadingKnifeType): number {
  return KNIFE_DATA[type].setupSpeed;
}
export function sizeRange(type: HeadingKnifeType): number {
  return KNIFE_DATA[type].sizeRange;
}
export function knifeCost(type: HeadingKnifeType): number {
  return KNIFE_DATA[type].cost;
}
export function powered(type: HeadingKnifeType): boolean {
  return KNIFE_DATA[type].powered;
}
export function adjustable(type: HeadingKnifeType): boolean {
  return KNIFE_DATA[type].adjustable;
}
export function cutMethod(type: HeadingKnifeType): string {
  return KNIFE_DATA[type].cutMethod;
}
export function bestUse(type: HeadingKnifeType): string {
  return KNIFE_DATA[type].bestUse;
}
export function headingKnives(): HeadingKnifeType[] {
  return Object.keys(KNIFE_DATA) as HeadingKnifeType[];
}
