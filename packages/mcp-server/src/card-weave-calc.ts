export type CardWeaveType =
  | "square_card_standard"
  | "hexagonal_card_complex"
  | "triangular_card_simple"
  | "round_card_tablet"
  | "double_hole_pickup";

const specs: Record<CardWeaveType, {
  patternRange: number; turnEase: number; threadCapacity: number;
  setupSpeed: number; cost: number; multiHole: boolean; forComplex: boolean;
  cardShape: string; use: string;
}> = {
  square_card_standard: {
    patternRange: 82, turnEase: 88, threadCapacity: 80,
    setupSpeed: 85, cost: 8, multiHole: false, forComplex: false,
    cardShape: "four_hole_square", use: "general_band_weave",
  },
  hexagonal_card_complex: {
    patternRange: 95, turnEase: 75, threadCapacity: 90,
    setupSpeed: 70, cost: 15, multiHole: true, forComplex: true,
    cardShape: "six_hole_hexagon", use: "complex_pattern_band",
  },
  triangular_card_simple: {
    patternRange: 72, turnEase: 92, threadCapacity: 70,
    setupSpeed: 90, cost: 6, multiHole: false, forComplex: false,
    cardShape: "three_hole_triangle", use: "simple_narrow_band",
  },
  round_card_tablet: {
    patternRange: 85, turnEase: 85, threadCapacity: 82,
    setupSpeed: 82, cost: 10, multiHole: false, forComplex: false,
    cardShape: "four_hole_round", use: "smooth_turn_weave",
  },
  double_hole_pickup: {
    patternRange: 88, turnEase: 78, threadCapacity: 85,
    setupSpeed: 75, cost: 12, multiHole: true, forComplex: true,
    cardShape: "eight_hole_double", use: "pickup_pattern_band",
  },
};

export function patternRange(t: CardWeaveType): number { return specs[t].patternRange; }
export function turnEase(t: CardWeaveType): number { return specs[t].turnEase; }
export function threadCapacity(t: CardWeaveType): number { return specs[t].threadCapacity; }
export function setupSpeed(t: CardWeaveType): number { return specs[t].setupSpeed; }
export function cardCost(t: CardWeaveType): number { return specs[t].cost; }
export function multiHole(t: CardWeaveType): boolean { return specs[t].multiHole; }
export function forComplex(t: CardWeaveType): boolean { return specs[t].forComplex; }
export function cardShape(t: CardWeaveType): string { return specs[t].cardShape; }
export function bestUse(t: CardWeaveType): string { return specs[t].use; }
export function cardWeaves(): CardWeaveType[] { return Object.keys(specs) as CardWeaveType[]; }
