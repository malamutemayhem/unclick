// deckle-edge-calc - deckle edge tool types

export type DeckleEdge =
  | "ruler_tear_straight"
  | "deckle_bar_frame"
  | "water_brush_feather"
  | "tearing_tool_guide"
  | "rotary_deckle_wheel";

const DATA: Record<DeckleEdge, {
  tearNatural: number; controlEven: number; speedEdge: number; paperRange: number;
  cost: number; forThick: boolean; reusable: boolean; edgeMethod: string; bestUse: string;
}> = {
  ruler_tear_straight:  { tearNatural: 7, controlEven: 8, speedEdge: 7, paperRange: 7, cost: 3, forThick: false, reusable: true, edgeMethod: "guided_hand_tear", bestUse: "general_torn_edge" },
  deckle_bar_frame:     { tearNatural: 10, controlEven: 6, speedEdge: 5, paperRange: 6, cost: 5, forThick: true, reusable: true, edgeMethod: "frame_press_tear", bestUse: "handmade_paper_edge" },
  water_brush_feather:  { tearNatural: 9, controlEven: 7, speedEdge: 4, paperRange: 8, cost: 4, forThick: false, reusable: true, edgeMethod: "wet_line_feather", bestUse: "watercolor_soft_edge" },
  tearing_tool_guide:   { tearNatural: 6, controlEven: 9, speedEdge: 8, paperRange: 9, cost: 7, forThick: true, reusable: true, edgeMethod: "metal_guide_tear", bestUse: "repeat_consistent_edge" },
  rotary_deckle_wheel:  { tearNatural: 5, controlEven: 10, speedEdge: 10, paperRange: 7, cost: 9, forThick: false, reusable: true, edgeMethod: "rotary_perforated_cut", bestUse: "batch_decorative_edge" },
};

const get = (e: DeckleEdge) => DATA[e];
export const tearNatural = (e: DeckleEdge) => get(e).tearNatural;
export const controlEven = (e: DeckleEdge) => get(e).controlEven;
export const speedEdge = (e: DeckleEdge) => get(e).speedEdge;
export const paperRange = (e: DeckleEdge) => get(e).paperRange;
export const edgeCost = (e: DeckleEdge) => get(e).cost;
export const forThick = (e: DeckleEdge) => get(e).forThick;
export const reusable = (e: DeckleEdge) => get(e).reusable;
export const edgeMethod = (e: DeckleEdge) => get(e).edgeMethod;
export const bestUse = (e: DeckleEdge) => get(e).bestUse;
export const deckleEdges = (): DeckleEdge[] => Object.keys(DATA) as DeckleEdge[];
