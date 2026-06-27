// hairpin-lace-calc - hairpin lace loom types

export type HairpinLace =
  | "adjustable_loom_wide"
  | "fixed_loom_standard"
  | "mini_loom_narrow"
  | "metal_fork_classic"
  | "ergonomic_loom_comfort";

const DATA: Record<HairpinLace, {
  widthRange: number; loopConsist: number; speedWork: number; portability: number;
  cost: number; adjustable: boolean; forBeginner: boolean; loomFrame: string; bestUse: string;
}> = {
  adjustable_loom_wide:   { widthRange: 10, loopConsist: 8, speedWork: 7, portability: 5, cost: 7, adjustable: true, forBeginner: false, loomFrame: "sliding_rail_frame", bestUse: "variable_width_strip" },
  fixed_loom_standard:    { widthRange: 5, loopConsist: 9, speedWork: 8, portability: 7, cost: 4, adjustable: false, forBeginner: true, loomFrame: "fixed_prong_frame", bestUse: "general_hairpin_strip" },
  mini_loom_narrow:       { widthRange: 3, loopConsist: 8, speedWork: 9, portability: 10, cost: 3, adjustable: false, forBeginner: true, loomFrame: "compact_prong_frame", bestUse: "narrow_trim_edging" },
  metal_fork_classic:     { widthRange: 4, loopConsist: 6, speedWork: 6, portability: 9, cost: 2, adjustable: false, forBeginner: false, loomFrame: "bent_wire_fork", bestUse: "traditional_hairpin_work" },
  ergonomic_loom_comfort: { widthRange: 7, loopConsist: 9, speedWork: 8, portability: 6, cost: 8, adjustable: true, forBeginner: true, loomFrame: "cushion_grip_frame", bestUse: "long_session_comfort" },
};

const get = (l: HairpinLace) => DATA[l];
export const widthRange = (l: HairpinLace) => get(l).widthRange;
export const loopConsist = (l: HairpinLace) => get(l).loopConsist;
export const speedWork = (l: HairpinLace) => get(l).speedWork;
export const portability = (l: HairpinLace) => get(l).portability;
export const laceCost = (l: HairpinLace) => get(l).cost;
export const adjustable = (l: HairpinLace) => get(l).adjustable;
export const forBeginner = (l: HairpinLace) => get(l).forBeginner;
export const loomFrame = (l: HairpinLace) => get(l).loomFrame;
export const bestUse = (l: HairpinLace) => get(l).bestUse;
export const hairpinLaces = (): HairpinLace[] => Object.keys(DATA) as HairpinLace[];
