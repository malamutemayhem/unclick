// needle-lace-calc - needle lace stitch types

export type NeedleLace =
  | "buttonhole_stitch_basic"
  | "detached_bar_bridge"
  | "corded_fill_dense"
  | "woven_picot_edge"
  | "punto_in_aria_free";

const DATA: Record<NeedleLace, {
  detailFine: number; structureStrong: number; speedWork: number; patternRange: number;
  cost: number; freestanding: boolean; forEdging: boolean; stitchBase: string; bestUse: string;
}> = {
  buttonhole_stitch_basic: { detailFine: 6, structureStrong: 7, speedWork: 8, patternRange: 7, cost: 2, freestanding: false, forEdging: false, stitchBase: "looped_buttonhole_row", bestUse: "general_fill_stitch" },
  detached_bar_bridge:     { detailFine: 8, structureStrong: 9, speedWork: 5, patternRange: 6, cost: 4, freestanding: true, forEdging: false, stitchBase: "woven_bar_bridge", bestUse: "structural_bridge_element" },
  corded_fill_dense:       { detailFine: 7, structureStrong: 10, speedWork: 4, patternRange: 5, cost: 5, freestanding: false, forEdging: false, stitchBase: "corded_buttonhole_fill", bestUse: "dense_solid_fill" },
  woven_picot_edge:        { detailFine: 9, structureStrong: 6, speedWork: 6, patternRange: 8, cost: 3, freestanding: false, forEdging: true, stitchBase: "looped_picot_point", bestUse: "decorative_edge_finish" },
  punto_in_aria_free:      { detailFine: 10, structureStrong: 8, speedWork: 3, patternRange: 10, cost: 7, freestanding: true, forEdging: false, stitchBase: "free_air_lace_stitch", bestUse: "fine_art_lace_panel" },
};

const get = (l: NeedleLace) => DATA[l];
export const detailFine = (l: NeedleLace) => get(l).detailFine;
export const structureStrong = (l: NeedleLace) => get(l).structureStrong;
export const speedWork = (l: NeedleLace) => get(l).speedWork;
export const patternRange = (l: NeedleLace) => get(l).patternRange;
export const laceCost = (l: NeedleLace) => get(l).cost;
export const freestanding = (l: NeedleLace) => get(l).freestanding;
export const forEdging = (l: NeedleLace) => get(l).forEdging;
export const stitchBase = (l: NeedleLace) => get(l).stitchBase;
export const bestUse = (l: NeedleLace) => get(l).bestUse;
export const needleLaces = (): NeedleLace[] => Object.keys(DATA) as NeedleLace[];
