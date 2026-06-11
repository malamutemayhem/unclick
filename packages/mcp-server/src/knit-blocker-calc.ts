// knit-blocker-calc - knit blocking tool types

export type KnitBlocker =
  | "t_pin_standard"
  | "blocking_comb_multi"
  | "foam_mat_interlock"
  | "blocking_board_grid"
  | "sock_blocker_form";

const DATA: Record<KnitBlocker, {
  shapeAccuracy: number; holdStrength: number; setupSpeed: number; sizeRange: number;
  cost: number; reusable: boolean; forLace: boolean; blockMethod: string; bestUse: string;
}> = {
  t_pin_standard:       { shapeAccuracy: 8, holdStrength: 9, setupSpeed: 5, sizeRange: 9, cost: 2, reusable: true, forLace: true, blockMethod: "individual_pin_place", bestUse: "general_wet_block" },
  blocking_comb_multi:  { shapeAccuracy: 7, holdStrength: 8, setupSpeed: 9, sizeRange: 8, cost: 5, reusable: true, forLace: false, blockMethod: "multi_pin_comb_row", bestUse: "fast_straight_edge" },
  foam_mat_interlock:   { shapeAccuracy: 6, holdStrength: 7, setupSpeed: 8, sizeRange: 10, cost: 4, reusable: true, forLace: false, blockMethod: "interlocking_foam_tile", bestUse: "large_piece_surface" },
  blocking_board_grid:  { shapeAccuracy: 10, holdStrength: 8, setupSpeed: 7, sizeRange: 6, cost: 7, reusable: true, forLace: true, blockMethod: "printed_grid_board", bestUse: "precise_gauge_block" },
  sock_blocker_form:    { shapeAccuracy: 9, holdStrength: 7, setupSpeed: 10, sizeRange: 3, cost: 4, reusable: true, forLace: false, blockMethod: "shaped_wood_form", bestUse: "sock_shape_block" },
};

const get = (b: KnitBlocker) => DATA[b];
export const shapeAccuracy = (b: KnitBlocker) => get(b).shapeAccuracy;
export const holdStrength = (b: KnitBlocker) => get(b).holdStrength;
export const setupSpeed = (b: KnitBlocker) => get(b).setupSpeed;
export const sizeRange = (b: KnitBlocker) => get(b).sizeRange;
export const blockerCost = (b: KnitBlocker) => get(b).cost;
export const reusable = (b: KnitBlocker) => get(b).reusable;
export const forLace = (b: KnitBlocker) => get(b).forLace;
export const blockMethod = (b: KnitBlocker) => get(b).blockMethod;
export const bestUse = (b: KnitBlocker) => get(b).bestUse;
export const knitBlockers = (): KnitBlocker[] => Object.keys(DATA) as KnitBlocker[];
