export type PegLoomType =
  | "rectangular_peg_standard"
  | "round_peg_circle"
  | "fine_gauge_thin"
  | "large_gauge_bulky"
  | "adjustable_peg_multi";

const specs: Record<PegLoomType, {
  weaveEven: number; setupEase: number; yarnRange: number;
  portability: number; cost: number; round: boolean; adjustable: boolean;
  pegSpacing: string; use: string;
}> = {
  rectangular_peg_standard: {
    weaveEven: 85, setupEase: 88, yarnRange: 82,
    portability: 85, cost: 15, round: false, adjustable: false,
    pegSpacing: "standard_even_peg", use: "general_peg_weave",
  },
  round_peg_circle: {
    weaveEven: 82, setupEase: 85, yarnRange: 80,
    portability: 88, cost: 18, round: true, adjustable: false,
    pegSpacing: "circular_even_peg", use: "round_hat_weave",
  },
  fine_gauge_thin: {
    weaveEven: 88, setupEase: 80, yarnRange: 72,
    portability: 90, cost: 20, round: false, adjustable: false,
    pegSpacing: "fine_close_peg", use: "fine_fabric_weave",
  },
  large_gauge_bulky: {
    weaveEven: 80, setupEase: 92, yarnRange: 90,
    portability: 82, cost: 12, round: false, adjustable: false,
    pegSpacing: "wide_spaced_peg", use: "bulky_quick_weave",
  },
  adjustable_peg_multi: {
    weaveEven: 85, setupEase: 78, yarnRange: 95,
    portability: 78, cost: 30, round: false, adjustable: true,
    pegSpacing: "variable_slot_peg", use: "multi_gauge_weave",
  },
};

export function weaveEven(t: PegLoomType): number { return specs[t].weaveEven; }
export function setupEase(t: PegLoomType): number { return specs[t].setupEase; }
export function yarnRange(t: PegLoomType): number { return specs[t].yarnRange; }
export function portability(t: PegLoomType): number { return specs[t].portability; }
export function loomCost(t: PegLoomType): number { return specs[t].cost; }
export function round(t: PegLoomType): boolean { return specs[t].round; }
export function adjustable(t: PegLoomType): boolean { return specs[t].adjustable; }
export function pegSpacing(t: PegLoomType): string { return specs[t].pegSpacing; }
export function bestUse(t: PegLoomType): string { return specs[t].use; }
export function pegLooms(): PegLoomType[] { return Object.keys(specs) as PegLoomType[]; }
