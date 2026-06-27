// Broad hatchet calculator - timber framing broad hatchet tools

export type BroadHatchetType =
  | "kent_pattern_right"
  | "kent_pattern_left"
  | "ship_carpenter_curved"
  | "carving_hatchet_light"
  | "shingling_hatchet_roof";

const HATCHET_DATA: Record<
  BroadHatchetType,
  {
    hewFlat: number;
    controlSwing: number;
    edgeKeep: number;
    weightBalance: number;
    cost: number;
    singleBevel: boolean;
    forShingle: boolean;
    headProfile: string;
    bestUse: string;
  }
> = {
  kent_pattern_right: {
    hewFlat: 9,
    controlSwing: 8,
    edgeKeep: 8,
    weightBalance: 8,
    cost: 5,
    singleBevel: true,
    forShingle: false,
    headProfile: "right_hand_bevel",
    bestUse: "right_hand_hew_flat",
  },
  kent_pattern_left: {
    hewFlat: 9,
    controlSwing: 8,
    edgeKeep: 8,
    weightBalance: 8,
    cost: 6,
    singleBevel: true,
    forShingle: false,
    headProfile: "left_hand_bevel",
    bestUse: "left_hand_hew_flat",
  },
  ship_carpenter_curved: {
    hewFlat: 8,
    controlSwing: 7,
    edgeKeep: 7,
    weightBalance: 7,
    cost: 7,
    singleBevel: true,
    forShingle: false,
    headProfile: "curved_ship_edge",
    bestUse: "curved_hull_shape",
  },
  carving_hatchet_light: {
    hewFlat: 6,
    controlSwing: 9,
    edgeKeep: 7,
    weightBalance: 9,
    cost: 4,
    singleBevel: false,
    forShingle: false,
    headProfile: "light_double_bevel",
    bestUse: "carve_rough_shape",
  },
  shingling_hatchet_roof: {
    hewFlat: 7,
    controlSwing: 8,
    edgeKeep: 7,
    weightBalance: 8,
    cost: 4,
    singleBevel: false,
    forShingle: true,
    headProfile: "shingle_nail_slot",
    bestUse: "roof_shingle_split",
  },
};

export function hewFlat(type: BroadHatchetType): number {
  return HATCHET_DATA[type].hewFlat;
}
export function controlSwing(type: BroadHatchetType): number {
  return HATCHET_DATA[type].controlSwing;
}
export function edgeKeep(type: BroadHatchetType): number {
  return HATCHET_DATA[type].edgeKeep;
}
export function weightBalance(type: BroadHatchetType): number {
  return HATCHET_DATA[type].weightBalance;
}
export function hatchetCost(type: BroadHatchetType): number {
  return HATCHET_DATA[type].cost;
}
export function singleBevel(type: BroadHatchetType): boolean {
  return HATCHET_DATA[type].singleBevel;
}
export function forShingle(type: BroadHatchetType): boolean {
  return HATCHET_DATA[type].forShingle;
}
export function headProfile(type: BroadHatchetType): string {
  return HATCHET_DATA[type].headProfile;
}
export function bestUse(type: BroadHatchetType): string {
  return HATCHET_DATA[type].bestUse;
}
export function broadHatchets(): BroadHatchetType[] {
  return Object.keys(HATCHET_DATA) as BroadHatchetType[];
}
