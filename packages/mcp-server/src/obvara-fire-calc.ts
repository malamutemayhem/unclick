export type ObvaraFireType =
  | "beer_yeast_standard"
  | "flour_water_simple"
  | "sugar_yeast_dark"
  | "salt_brine_mineral"
  | "honey_yeast_golden";

const specs: Record<ObvaraFireType, {
  patternRich: number; colorDepth: number; sealTight: number;
  repeatConsist: number; cost: number; fermented: boolean; sweet: boolean;
  bathBase: string; use: string;
}> = {
  beer_yeast_standard: {
    patternRich: 85, colorDepth: 82, sealTight: 80,
    repeatConsist: 78, cost: 8, fermented: true, sweet: false,
    bathBase: "beer_yeast_flour", use: "general_obvara_pattern",
  },
  flour_water_simple: {
    patternRich: 75, colorDepth: 70, sealTight: 72,
    repeatConsist: 88, cost: 3, fermented: false, sweet: false,
    bathBase: "plain_flour_slurry", use: "beginner_simple_fire",
  },
  sugar_yeast_dark: {
    patternRich: 92, colorDepth: 95, sealTight: 85,
    repeatConsist: 72, cost: 10, fermented: true, sweet: true,
    bathBase: "sugar_yeast_active", use: "deep_dark_pattern",
  },
  salt_brine_mineral: {
    patternRich: 80, colorDepth: 78, sealTight: 88,
    repeatConsist: 82, cost: 5, fermented: false, sweet: false,
    bathBase: "salt_mineral_brine", use: "mineral_crystal_effect",
  },
  honey_yeast_golden: {
    patternRich: 88, colorDepth: 85, sealTight: 82,
    repeatConsist: 75, cost: 15, fermented: true, sweet: true,
    bathBase: "honey_yeast_warm", use: "golden_warm_pattern",
  },
};

export function patternRich(t: ObvaraFireType): number { return specs[t].patternRich; }
export function colorDepth(t: ObvaraFireType): number { return specs[t].colorDepth; }
export function sealTight(t: ObvaraFireType): number { return specs[t].sealTight; }
export function repeatConsist(t: ObvaraFireType): number { return specs[t].repeatConsist; }
export function fireCost(t: ObvaraFireType): number { return specs[t].cost; }
export function fermented(t: ObvaraFireType): boolean { return specs[t].fermented; }
export function sweet(t: ObvaraFireType): boolean { return specs[t].sweet; }
export function bathBase(t: ObvaraFireType): string { return specs[t].bathBase; }
export function bestUse(t: ObvaraFireType): string { return specs[t].use; }
export function obvaraFires(): ObvaraFireType[] { return Object.keys(specs) as ObvaraFireType[]; }
