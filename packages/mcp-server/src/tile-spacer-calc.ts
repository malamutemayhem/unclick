// tile-spacer-calc - mosaic tile spacer types

export type TileSpacer =
  | "cross_spacer_standard"
  | "wedge_spacer_adjust"
  | "clip_spacer_level"
  | "tee_spacer_edge"
  | "horseshoe_spacer_wall";

const DATA: Record<TileSpacer, {
  gapConsist: number; adjustRange: number; holdSecure: number; removeEase: number;
  cost: number; reusable: boolean; selfLeveling: boolean; spacerShape: string; bestUse: string;
}> = {
  cross_spacer_standard:  { gapConsist: 8, adjustRange: 3, holdSecure: 7, removeEase: 8, cost: 2, reusable: false, selfLeveling: false, spacerShape: "four_arm_cross", bestUse: "general_floor_tile" },
  wedge_spacer_adjust:    { gapConsist: 7, adjustRange: 10, holdSecure: 8, removeEase: 7, cost: 4, reusable: true, selfLeveling: false, spacerShape: "tapered_wedge_pair", bestUse: "variable_gap_adjust" },
  clip_spacer_level:      { gapConsist: 9, adjustRange: 5, holdSecure: 10, removeEase: 6, cost: 7, reusable: false, selfLeveling: true, spacerShape: "clip_wedge_system", bestUse: "level_large_format" },
  tee_spacer_edge:        { gapConsist: 8, adjustRange: 3, holdSecure: 6, removeEase: 9, cost: 2, reusable: false, selfLeveling: false, spacerShape: "three_arm_tee", bestUse: "wall_edge_tile" },
  horseshoe_spacer_wall:  { gapConsist: 7, adjustRange: 6, holdSecure: 7, removeEase: 10, cost: 3, reusable: true, selfLeveling: false, spacerShape: "u_shaped_horseshoe", bestUse: "wall_mount_tile" },
};

const get = (s: TileSpacer) => DATA[s];
export const gapConsist = (s: TileSpacer) => get(s).gapConsist;
export const adjustRange = (s: TileSpacer) => get(s).adjustRange;
export const holdSecure = (s: TileSpacer) => get(s).holdSecure;
export const removeEase = (s: TileSpacer) => get(s).removeEase;
export const spacerCost = (s: TileSpacer) => get(s).cost;
export const reusable = (s: TileSpacer) => get(s).reusable;
export const selfLeveling = (s: TileSpacer) => get(s).selfLeveling;
export const spacerShape = (s: TileSpacer) => get(s).spacerShape;
export const bestUse = (s: TileSpacer) => get(s).bestUse;
export const tileSpacers = (): TileSpacer[] => Object.keys(DATA) as TileSpacer[];
