// Race knife calculator - timber framing curved drawknives for hollowing

export type RaceKnifeType =
  | "open_curve_scoop"
  | "closed_hook_tight"
  | "flat_inshave_wide"
  | "spoon_bowl_deep"
  | "adjustable_radius_set";

const KNIFE_DATA: Record<
  RaceKnifeType,
  {
    hollowDepth: number;
    controlCut: number;
    finishSmooth: number;
    radiusRange: number;
    cost: number;
    adjustable: boolean;
    forBowls: boolean;
    curveProfile: string;
    bestUse: string;
  }
> = {
  open_curve_scoop: {
    hollowDepth: 7,
    controlCut: 8,
    finishSmooth: 8,
    radiusRange: 6,
    cost: 5,
    adjustable: false,
    forBowls: false,
    curveProfile: "gentle_open_arc",
    bestUse: "shallow_channel_cut",
  },
  closed_hook_tight: {
    hollowDepth: 9,
    controlCut: 7,
    finishSmooth: 6,
    radiusRange: 4,
    cost: 6,
    adjustable: false,
    forBowls: true,
    curveProfile: "tight_hook_loop",
    bestUse: "deep_hollow_gouge",
  },
  flat_inshave_wide: {
    hollowDepth: 5,
    controlCut: 9,
    finishSmooth: 9,
    radiusRange: 7,
    cost: 5,
    adjustable: false,
    forBowls: false,
    curveProfile: "wide_flat_sweep",
    bestUse: "seat_scoop_finish",
  },
  spoon_bowl_deep: {
    hollowDepth: 10,
    controlCut: 6,
    finishSmooth: 7,
    radiusRange: 5,
    cost: 7,
    adjustable: false,
    forBowls: true,
    curveProfile: "deep_spoon_cup",
    bestUse: "bowl_interior_carve",
  },
  adjustable_radius_set: {
    hollowDepth: 8,
    controlCut: 7,
    finishSmooth: 7,
    radiusRange: 10,
    cost: 9,
    adjustable: true,
    forBowls: true,
    curveProfile: "multi_radius_swap",
    bestUse: "variable_curve_work",
  },
};

export function hollowDepth(type: RaceKnifeType): number {
  return KNIFE_DATA[type].hollowDepth;
}
export function controlCut(type: RaceKnifeType): number {
  return KNIFE_DATA[type].controlCut;
}
export function finishSmooth(type: RaceKnifeType): number {
  return KNIFE_DATA[type].finishSmooth;
}
export function radiusRange(type: RaceKnifeType): number {
  return KNIFE_DATA[type].radiusRange;
}
export function knifeCost(type: RaceKnifeType): number {
  return KNIFE_DATA[type].cost;
}
export function adjustable(type: RaceKnifeType): boolean {
  return KNIFE_DATA[type].adjustable;
}
export function forBowls(type: RaceKnifeType): boolean {
  return KNIFE_DATA[type].forBowls;
}
export function curveProfile(type: RaceKnifeType): string {
  return KNIFE_DATA[type].curveProfile;
}
export function bestUse(type: RaceKnifeType): string {
  return KNIFE_DATA[type].bestUse;
}
export function raceKnives(): RaceKnifeType[] {
  return Object.keys(KNIFE_DATA) as RaceKnifeType[];
}
