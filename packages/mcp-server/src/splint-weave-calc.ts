export type SplintWeaveType =
  | "ash_splint_standard"
  | "hickory_splint_tough"
  | "oak_splint_heavy"
  | "reed_splint_light"
  | "birch_bark_natural";

const specs: Record<SplintWeaveType, {
  weaveFlex: number; strength: number; surfaceSmooth: number;
  splitEase: number; cost: number; bark: boolean; hardwood: boolean;
  woodType: string; use: string;
}> = {
  ash_splint_standard: {
    weaveFlex: 90, strength: 85, surfaceSmooth: 82,
    splitEase: 88, cost: 20, bark: false, hardwood: true,
    woodType: "black_ash_splint", use: "general_basket_weave",
  },
  hickory_splint_tough: {
    weaveFlex: 82, strength: 95, surfaceSmooth: 78,
    splitEase: 72, cost: 25, bark: false, hardwood: true,
    woodType: "shagbark_hickory", use: "heavy_duty_basket",
  },
  oak_splint_heavy: {
    weaveFlex: 78, strength: 92, surfaceSmooth: 80,
    splitEase: 70, cost: 22, bark: false, hardwood: true,
    woodType: "white_oak_splint", use: "sturdy_chair_seat",
  },
  reed_splint_light: {
    weaveFlex: 88, strength: 72, surfaceSmooth: 85,
    splitEase: 92, cost: 12, bark: false, hardwood: false,
    woodType: "flat_reed_strip", use: "light_decorative_weave",
  },
  birch_bark_natural: {
    weaveFlex: 85, strength: 78, surfaceSmooth: 90,
    splitEase: 80, cost: 18, bark: true, hardwood: false,
    woodType: "white_birch_bark", use: "natural_bark_basket",
  },
};

export function weaveFlex(t: SplintWeaveType): number { return specs[t].weaveFlex; }
export function strength(t: SplintWeaveType): number { return specs[t].strength; }
export function surfaceSmooth(t: SplintWeaveType): number { return specs[t].surfaceSmooth; }
export function splitEase(t: SplintWeaveType): number { return specs[t].splitEase; }
export function splintCost(t: SplintWeaveType): number { return specs[t].cost; }
export function bark(t: SplintWeaveType): boolean { return specs[t].bark; }
export function hardwood(t: SplintWeaveType): boolean { return specs[t].hardwood; }
export function woodType(t: SplintWeaveType): string { return specs[t].woodType; }
export function bestUse(t: SplintWeaveType): string { return specs[t].use; }
export function splintWeaves(): SplintWeaveType[] { return Object.keys(specs) as SplintWeaveType[]; }
