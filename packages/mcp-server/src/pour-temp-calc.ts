export type PourTempType =
  | "soy_wax_low"
  | "paraffin_wax_medium"
  | "beeswax_high"
  | "coconut_wax_cool"
  | "palm_wax_crystal";

const specs: Record<PourTempType, {
  throwScent: number; surfaceSmooth: number; adhesion: number;
  tempRange: number; cost: number; natural: boolean; crystalForming: boolean;
  meltPoint: string; use: string;
}> = {
  soy_wax_low: {
    throwScent: 88, surfaceSmooth: 82, adhesion: 85,
    tempRange: 80, cost: 7, natural: true, crystalForming: false,
    meltPoint: "low_120f_pour", use: "container_candle_pour",
  },
  paraffin_wax_medium: {
    throwScent: 92, surfaceSmooth: 88, adhesion: 80,
    tempRange: 90, cost: 5, natural: false, crystalForming: false,
    meltPoint: "medium_160f_pour", use: "general_pillar_candle",
  },
  beeswax_high: {
    throwScent: 78, surfaceSmooth: 85, adhesion: 90,
    tempRange: 82, cost: 10, natural: true, crystalForming: false,
    meltPoint: "high_170f_pour", use: "pure_beeswax_taper",
  },
  coconut_wax_cool: {
    throwScent: 90, surfaceSmooth: 90, adhesion: 82,
    tempRange: 78, cost: 9, natural: true, crystalForming: false,
    meltPoint: "cool_100f_pour", use: "luxury_container_candle",
  },
  palm_wax_crystal: {
    throwScent: 85, surfaceSmooth: 75, adhesion: 78,
    tempRange: 85, cost: 6, natural: true, crystalForming: true,
    meltPoint: "medium_145f_pour", use: "crystal_pattern_pillar",
  },
};

export function throwScent(t: PourTempType): number { return specs[t].throwScent; }
export function surfaceSmooth(t: PourTempType): number { return specs[t].surfaceSmooth; }
export function adhesion(t: PourTempType): number { return specs[t].adhesion; }
export function tempRange(t: PourTempType): number { return specs[t].tempRange; }
export function pourCost(t: PourTempType): number { return specs[t].cost; }
export function natural(t: PourTempType): boolean { return specs[t].natural; }
export function crystalForming(t: PourTempType): boolean { return specs[t].crystalForming; }
export function meltPoint(t: PourTempType): string { return specs[t].meltPoint; }
export function bestUse(t: PourTempType): string { return specs[t].use; }
export function pourTemps(): PourTempType[] { return Object.keys(specs) as PourTempType[]; }
