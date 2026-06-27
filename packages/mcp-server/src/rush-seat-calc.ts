export type RushSeatType =
  | "natural_rush_standard"
  | "fiber_rush_modern"
  | "seagrass_twist_green"
  | "paper_rush_budget"
  | "danish_cord_woven";

const specs: Record<RushSeatType, {
  weaveTight: number; comfortSit: number; durability: number;
  speedWeave: number; cost: number; natural: boolean; twisted: boolean;
  fiberSource: string; use: string;
}> = {
  natural_rush_standard: {
    weaveTight: 85, comfortSit: 88, durability: 78,
    speedWeave: 70, cost: 25, natural: true, twisted: true,
    fiberSource: "cattail_leaf_rush", use: "traditional_rush_seat",
  },
  fiber_rush_modern: {
    weaveTight: 82, comfortSit: 82, durability: 88,
    speedWeave: 82, cost: 15, natural: false, twisted: true,
    fiberSource: "kraft_paper_twist", use: "durable_modern_seat",
  },
  seagrass_twist_green: {
    weaveTight: 88, comfortSit: 80, durability: 85,
    speedWeave: 78, cost: 18, natural: true, twisted: true,
    fiberSource: "woven_seagrass_cord", use: "decorative_green_seat",
  },
  paper_rush_budget: {
    weaveTight: 78, comfortSit: 75, durability: 70,
    speedWeave: 88, cost: 8, natural: false, twisted: true,
    fiberSource: "recycled_paper_cord", use: "budget_practice_seat",
  },
  danish_cord_woven: {
    weaveTight: 92, comfortSit: 90, durability: 92,
    speedWeave: 75, cost: 35, natural: false, twisted: false,
    fiberSource: "laced_paper_cord", use: "premium_danish_seat",
  },
};

export function weaveTight(t: RushSeatType): number { return specs[t].weaveTight; }
export function comfortSit(t: RushSeatType): number { return specs[t].comfortSit; }
export function durability(t: RushSeatType): number { return specs[t].durability; }
export function speedWeave(t: RushSeatType): number { return specs[t].speedWeave; }
export function seatCost(t: RushSeatType): number { return specs[t].cost; }
export function natural(t: RushSeatType): boolean { return specs[t].natural; }
export function twisted(t: RushSeatType): boolean { return specs[t].twisted; }
export function fiberSource(t: RushSeatType): string { return specs[t].fiberSource; }
export function bestUse(t: RushSeatType): string { return specs[t].use; }
export function rushSeats(): RushSeatType[] { return Object.keys(specs) as RushSeatType[]; }
