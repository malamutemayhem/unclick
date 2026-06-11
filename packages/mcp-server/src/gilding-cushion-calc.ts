// Gilding cushion calculator - bookbinding/gilding gold leaf work surfaces

export type GildingCushionType =
  | "leather_pad_standard"
  | "suede_soft_grip"
  | "draft_shield_wall"
  | "rotating_turntable_spin"
  | "mini_travel_compact";

const CUSHION_DATA: Record<
  GildingCushionType,
  {
    leafHold: number;
    cutSurface: number;
    windShield: number;
    workArea: number;
    cost: number;
    hasShield: boolean;
    portable: boolean;
    padCover: string;
    bestUse: string;
  }
> = {
  leather_pad_standard: {
    leafHold: 8,
    cutSurface: 8,
    windShield: 4,
    workArea: 7,
    cost: 5,
    hasShield: false,
    portable: false,
    padCover: "calf_skin_smooth",
    bestUse: "general_gold_work",
  },
  suede_soft_grip: {
    leafHold: 10,
    cutSurface: 7,
    windShield: 4,
    workArea: 7,
    cost: 6,
    hasShield: false,
    portable: false,
    padCover: "suede_nap_surface",
    bestUse: "thin_leaf_handle",
  },
  draft_shield_wall: {
    leafHold: 8,
    cutSurface: 8,
    windShield: 10,
    workArea: 6,
    cost: 7,
    hasShield: true,
    portable: false,
    padCover: "leather_with_wall",
    bestUse: "draft_free_gild",
  },
  rotating_turntable_spin: {
    leafHold: 7,
    cutSurface: 8,
    windShield: 5,
    workArea: 8,
    cost: 9,
    hasShield: false,
    portable: false,
    padCover: "mounted_spin_pad",
    bestUse: "round_frame_gild",
  },
  mini_travel_compact: {
    leafHold: 6,
    cutSurface: 6,
    windShield: 3,
    workArea: 4,
    cost: 4,
    hasShield: false,
    portable: true,
    padCover: "folding_leather_case",
    bestUse: "onsite_repair_gild",
  },
};

export function leafHold(type: GildingCushionType): number {
  return CUSHION_DATA[type].leafHold;
}
export function cutSurface(type: GildingCushionType): number {
  return CUSHION_DATA[type].cutSurface;
}
export function windShield(type: GildingCushionType): number {
  return CUSHION_DATA[type].windShield;
}
export function workArea(type: GildingCushionType): number {
  return CUSHION_DATA[type].workArea;
}
export function cushionCost(type: GildingCushionType): number {
  return CUSHION_DATA[type].cost;
}
export function hasShield(type: GildingCushionType): boolean {
  return CUSHION_DATA[type].hasShield;
}
export function portable(type: GildingCushionType): boolean {
  return CUSHION_DATA[type].portable;
}
export function padCover(type: GildingCushionType): string {
  return CUSHION_DATA[type].padCover;
}
export function bestUse(type: GildingCushionType): string {
  return CUSHION_DATA[type].bestUse;
}
export function gildingCushions(): GildingCushionType[] {
  return Object.keys(CUSHION_DATA) as GildingCushionType[];
}
