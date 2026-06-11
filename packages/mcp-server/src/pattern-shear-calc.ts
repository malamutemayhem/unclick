export type PatternShearType =
  | "straight_blade_standard"
  | "curved_blade_detail"
  | "double_blade_pair"
  | "spring_loaded_easy"
  | "heavy_duty_thick";

const specs: Record<PatternShearType, {
  cutAccuracy: number; edgeClean: number; comfortGrip: number;
  materialRange: number; cost: number; springLoaded: boolean; forThick: boolean;
  bladeLength: string; use: string;
}> = {
  straight_blade_standard: {
    cutAccuracy: 85, edgeClean: 82, comfortGrip: 80,
    materialRange: 85, cost: 15, springLoaded: false, forThick: false,
    bladeLength: "six_inch_straight", use: "general_pattern_cut",
  },
  curved_blade_detail: {
    cutAccuracy: 92, edgeClean: 88, comfortGrip: 78,
    materialRange: 70, cost: 20, springLoaded: false, forThick: false,
    bladeLength: "four_inch_curved", use: "detail_curve_cut",
  },
  double_blade_pair: {
    cutAccuracy: 80, edgeClean: 85, comfortGrip: 75,
    materialRange: 78, cost: 25, springLoaded: false, forThick: false,
    bladeLength: "three_blade_offset", use: "strip_cut_pattern",
  },
  spring_loaded_easy: {
    cutAccuracy: 78, edgeClean: 80, comfortGrip: 92,
    materialRange: 82, cost: 18, springLoaded: true, forThick: false,
    bladeLength: "five_inch_spring", use: "extended_cut_session",
  },
  heavy_duty_thick: {
    cutAccuracy: 75, edgeClean: 78, comfortGrip: 70,
    materialRange: 95, cost: 30, springLoaded: false, forThick: true,
    bladeLength: "eight_inch_heavy", use: "thick_glass_pattern",
  },
};

export function cutAccuracy(t: PatternShearType): number { return specs[t].cutAccuracy; }
export function edgeClean(t: PatternShearType): number { return specs[t].edgeClean; }
export function comfortGrip(t: PatternShearType): number { return specs[t].comfortGrip; }
export function materialRange(t: PatternShearType): number { return specs[t].materialRange; }
export function shearCost(t: PatternShearType): number { return specs[t].cost; }
export function springLoaded(t: PatternShearType): boolean { return specs[t].springLoaded; }
export function forThick(t: PatternShearType): boolean { return specs[t].forThick; }
export function bladeLength(t: PatternShearType): string { return specs[t].bladeLength; }
export function bestUse(t: PatternShearType): string { return specs[t].use; }
export function patternShears(): PatternShearType[] { return Object.keys(specs) as PatternShearType[]; }
