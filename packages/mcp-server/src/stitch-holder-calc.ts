// stitch-holder-calc - knitting stitch holder types

export type StitchHolder =
  | "safety_pin_basic"
  | "cable_holder_curved"
  | "locking_holder_long"
  | "circular_holder_flex"
  | "waste_yarn_hold";

const DATA: Record<StitchHolder, {
  holdSecure: number; stitchCapacity: number; accessEase: number; portability: number;
  cost: number; reusable: boolean; forLarge: boolean; holderStyle: string; bestUse: string;
}> = {
  safety_pin_basic:     { holdSecure: 7, stitchCapacity: 3, accessEase: 8, portability: 10, cost: 1, reusable: true, forLarge: false, holderStyle: "coiled_pin_clasp", bestUse: "small_stitch_hold" },
  cable_holder_curved:  { holdSecure: 8, stitchCapacity: 5, accessEase: 7, portability: 9, cost: 3, reusable: true, forLarge: false, holderStyle: "curved_metal_hook", bestUse: "cable_cross_hold" },
  locking_holder_long:  { holdSecure: 9, stitchCapacity: 8, accessEase: 6, portability: 7, cost: 4, reusable: true, forLarge: true, holderStyle: "locking_bar_clasp", bestUse: "sleeve_section_hold" },
  circular_holder_flex: { holdSecure: 8, stitchCapacity: 10, accessEase: 9, portability: 6, cost: 5, reusable: true, forLarge: true, holderStyle: "flexible_cord_loop", bestUse: "large_section_hold" },
  waste_yarn_hold:      { holdSecure: 6, stitchCapacity: 10, accessEase: 10, portability: 10, cost: 1, reusable: false, forLarge: true, holderStyle: "scrap_yarn_thread", bestUse: "temporary_any_size" },
};

const get = (h: StitchHolder) => DATA[h];
export const holdSecure = (h: StitchHolder) => get(h).holdSecure;
export const stitchCapacity = (h: StitchHolder) => get(h).stitchCapacity;
export const accessEase = (h: StitchHolder) => get(h).accessEase;
export const portability = (h: StitchHolder) => get(h).portability;
export const holderCost = (h: StitchHolder) => get(h).cost;
export const reusable = (h: StitchHolder) => get(h).reusable;
export const forLarge = (h: StitchHolder) => get(h).forLarge;
export const holderStyle = (h: StitchHolder) => get(h).holderStyle;
export const bestUse = (h: StitchHolder) => get(h).bestUse;
export const stitchHolders = (): StitchHolder[] => Object.keys(DATA) as StitchHolder[];
