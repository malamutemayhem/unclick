export type StiltsKilnType =
  | "three_point_standard"
  | "four_point_stable"
  | "star_stilt_flat"
  | "wire_stilt_minimal"
  | "high_fire_heavy";

const specs: Record<StiltsKilnType, {
  markMinimal: number; stability: number; tempRange: number;
  reuse: number; cost: number; highFire: boolean; flatBase: boolean;
  pointCount: string; use: string;
}> = {
  three_point_standard: {
    markMinimal: 85, stability: 78, tempRange: 82,
    reuse: 80, cost: 3, highFire: false, flatBase: false,
    pointCount: "three_wire_point", use: "general_low_fire_stilt",
  },
  four_point_stable: {
    markMinimal: 82, stability: 90, tempRange: 80,
    reuse: 78, cost: 4, highFire: false, flatBase: false,
    pointCount: "four_wire_point", use: "heavy_piece_support",
  },
  star_stilt_flat: {
    markMinimal: 78, stability: 85, tempRange: 78,
    reuse: 85, cost: 5, highFire: false, flatBase: true,
    pointCount: "six_point_star", use: "flat_tile_support",
  },
  wire_stilt_minimal: {
    markMinimal: 92, stability: 72, tempRange: 75,
    reuse: 70, cost: 2, highFire: false, flatBase: false,
    pointCount: "two_wire_point", use: "small_piece_minimal",
  },
  high_fire_heavy: {
    markMinimal: 75, stability: 88, tempRange: 95,
    reuse: 90, cost: 8, highFire: true, flatBase: false,
    pointCount: "three_heavy_point", use: "stoneware_high_temp",
  },
};

export function markMinimal(t: StiltsKilnType): number { return specs[t].markMinimal; }
export function stability(t: StiltsKilnType): number { return specs[t].stability; }
export function tempRange(t: StiltsKilnType): number { return specs[t].tempRange; }
export function reuse(t: StiltsKilnType): number { return specs[t].reuse; }
export function stiltCost(t: StiltsKilnType): number { return specs[t].cost; }
export function highFire(t: StiltsKilnType): boolean { return specs[t].highFire; }
export function flatBase(t: StiltsKilnType): boolean { return specs[t].flatBase; }
export function pointCount(t: StiltsKilnType): string { return specs[t].pointCount; }
export function bestUse(t: StiltsKilnType): string { return specs[t].use; }
export function stiltsKilns(): StiltsKilnType[] { return Object.keys(specs) as StiltsKilnType[]; }
