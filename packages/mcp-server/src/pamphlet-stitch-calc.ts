// pamphlet-stitch-calc - pamphlet stitch binding types

export type PamphletStitch =
  | "three_hole_basic"
  | "five_hole_standard"
  | "seven_hole_decorative"
  | "japanese_stab_pattern"
  | "long_stitch_exposed";

const DATA: Record<PamphletStitch, {
  holdStrength: number; pageCapacity: number; bindSpeed: number; decorativeValue: number;
  cost: number; exposed: boolean; forThick: boolean; stitchPattern: string; bestUse: string;
}> = {
  three_hole_basic:       { holdStrength: 5, pageCapacity: 4, bindSpeed: 10, decorativeValue: 3, cost: 1, exposed: false, forThick: false, stitchPattern: "simple_three_point", bestUse: "quick_thin_booklet" },
  five_hole_standard:     { holdStrength: 7, pageCapacity: 6, bindSpeed: 8, decorativeValue: 5, cost: 2, exposed: false, forThick: false, stitchPattern: "reinforced_five_point", bestUse: "general_pamphlet_bind" },
  seven_hole_decorative:  { holdStrength: 8, pageCapacity: 7, bindSpeed: 6, decorativeValue: 8, cost: 3, exposed: true, forThick: false, stitchPattern: "decorative_seven_point", bestUse: "display_spine_booklet" },
  japanese_stab_pattern:  { holdStrength: 9, pageCapacity: 8, bindSpeed: 4, decorativeValue: 10, cost: 5, exposed: true, forThick: true, stitchPattern: "patterned_side_stab", bestUse: "decorative_art_book" },
  long_stitch_exposed:    { holdStrength: 8, pageCapacity: 9, bindSpeed: 5, decorativeValue: 9, cost: 4, exposed: true, forThick: true, stitchPattern: "long_spine_wrap", bestUse: "exposed_spine_journal" },
};

const get = (s: PamphletStitch) => DATA[s];
export const holdStrength = (s: PamphletStitch) => get(s).holdStrength;
export const pageCapacity = (s: PamphletStitch) => get(s).pageCapacity;
export const bindSpeed = (s: PamphletStitch) => get(s).bindSpeed;
export const decorativeValue = (s: PamphletStitch) => get(s).decorativeValue;
export const stitchCost = (s: PamphletStitch) => get(s).cost;
export const exposed = (s: PamphletStitch) => get(s).exposed;
export const forThick = (s: PamphletStitch) => get(s).forThick;
export const stitchPattern = (s: PamphletStitch) => get(s).stitchPattern;
export const bestUse = (s: PamphletStitch) => get(s).bestUse;
export const pamphletStitchs = (): PamphletStitch[] => Object.keys(DATA) as PamphletStitch[];
