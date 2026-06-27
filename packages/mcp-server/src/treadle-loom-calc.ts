export type TreadleLoomType =
  | "four_shaft_standard"
  | "eight_shaft_complex"
  | "sixteen_shaft_fine"
  | "counterbalance_pair"
  | "countermarch_independent";

const specs: Record<TreadleLoomType, {
  shedClean: number; patternRange: number; treadleEase: number;
  fabricWidth: number; cost: number; counterbalance: boolean; countermarch: boolean;
  shaftCount: string; use: string;
}> = {
  four_shaft_standard: {
    shedClean: 82, patternRange: 70, treadleEase: 88,
    fabricWidth: 85, cost: 400, counterbalance: false, countermarch: false,
    shaftCount: "four_shaft_jack", use: "general_tabby_twill",
  },
  eight_shaft_complex: {
    shedClean: 85, patternRange: 85, treadleEase: 80,
    fabricWidth: 82, cost: 700, counterbalance: false, countermarch: false,
    shaftCount: "eight_shaft_jack", use: "complex_twill_pattern",
  },
  sixteen_shaft_fine: {
    shedClean: 88, patternRange: 95, treadleEase: 72,
    fabricWidth: 80, cost: 1200, counterbalance: false, countermarch: false,
    shaftCount: "sixteen_shaft_jack", use: "fine_damask_pattern",
  },
  counterbalance_pair: {
    shedClean: 90, patternRange: 65, treadleEase: 85,
    fabricWidth: 88, cost: 500, counterbalance: true, countermarch: false,
    shaftCount: "four_shaft_balance", use: "balanced_plain_weave",
  },
  countermarch_independent: {
    shedClean: 92, patternRange: 80, treadleEase: 78,
    fabricWidth: 85, cost: 800, counterbalance: false, countermarch: true,
    shaftCount: "eight_shaft_march", use: "even_shed_all_pattern",
  },
};

export function shedClean(t: TreadleLoomType): number { return specs[t].shedClean; }
export function patternRange(t: TreadleLoomType): number { return specs[t].patternRange; }
export function treadleEase(t: TreadleLoomType): number { return specs[t].treadleEase; }
export function fabricWidth(t: TreadleLoomType): number { return specs[t].fabricWidth; }
export function loomCost(t: TreadleLoomType): number { return specs[t].cost; }
export function counterbalance(t: TreadleLoomType): boolean { return specs[t].counterbalance; }
export function countermarch(t: TreadleLoomType): boolean { return specs[t].countermarch; }
export function shaftCount(t: TreadleLoomType): string { return specs[t].shaftCount; }
export function bestUse(t: TreadleLoomType): string { return specs[t].use; }
export function treadleLooms(): TreadleLoomType[] { return Object.keys(specs) as TreadleLoomType[]; }
