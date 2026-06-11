// skew-chisel-calc - wood lathe skew chisel types

export type SkewChisel =
  | "oval_skew_standard"
  | "flat_skew_traditional"
  | "radius_skew_round"
  | "mini_skew_detail"
  | "wide_skew_planing";

const DATA: Record<SkewChisel, {
  planingSmooth: number; beadCut: number; controlRoll: number; durability: number;
  cost: number; forBeginners: boolean; radiusEdge: boolean; crossSection: string; bestUse: string;
}> = {
  oval_skew_standard:    { planingSmooth: 9, beadCut: 8, controlRoll: 8, durability: 8, cost: 7, forBeginners: true, radiusEdge: false, crossSection: "oval_bar_stock", bestUse: "general_spindle_finish" },
  flat_skew_traditional: { planingSmooth: 8, beadCut: 9, controlRoll: 6, durability: 7, cost: 5, forBeginners: false, radiusEdge: false, crossSection: "flat_bar_stock", bestUse: "traditional_bead_work" },
  radius_skew_round:     { planingSmooth: 7, beadCut: 7, controlRoll: 10, durability: 8, cost: 8, forBeginners: true, radiusEdge: true, crossSection: "radius_ground_edge", bestUse: "catch_resistant_turn" },
  mini_skew_detail:      { planingSmooth: 6, beadCut: 10, controlRoll: 7, durability: 6, cost: 4, forBeginners: false, radiusEdge: false, crossSection: "narrow_flat_bar", bestUse: "fine_bead_detail" },
  wide_skew_planing:     { planingSmooth: 10, beadCut: 6, controlRoll: 5, durability: 9, cost: 6, forBeginners: false, radiusEdge: false, crossSection: "wide_oval_bar", bestUse: "large_spindle_plane" },
};

const get = (s: SkewChisel) => DATA[s];
export const planingSmooth = (s: SkewChisel) => get(s).planingSmooth;
export const beadCut = (s: SkewChisel) => get(s).beadCut;
export const controlRoll = (s: SkewChisel) => get(s).controlRoll;
export const durability = (s: SkewChisel) => get(s).durability;
export const skewCost = (s: SkewChisel) => get(s).cost;
export const forBeginners = (s: SkewChisel) => get(s).forBeginners;
export const radiusEdge = (s: SkewChisel) => get(s).radiusEdge;
export const crossSection = (s: SkewChisel) => get(s).crossSection;
export const bestUse = (s: SkewChisel) => get(s).bestUse;
export const skewChisels = (): SkewChisel[] => Object.keys(DATA) as SkewChisel[];
