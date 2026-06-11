export type SumitsuboLineType =
  | "traditional_ink_pot"
  | "chalk_line_modern"
  | "laser_line_digital"
  | "string_ink_simple"
  | "bamboo_ink_natural";

const specs: Record<SumitsuboLineType, {
  lineAccuracy: number; markVisible: number; speedSnap: number;
  lineLength: number; cost: number; digital: boolean; traditional: boolean;
  inkMethod: string; use: string;
}> = {
  traditional_ink_pot: {
    lineAccuracy: 88, markVisible: 85, speedSnap: 82,
    lineLength: 80, cost: 40, digital: false, traditional: true,
    inkMethod: "silk_cotton_ink_pad", use: "traditional_timber_mark",
  },
  chalk_line_modern: {
    lineAccuracy: 85, markVisible: 90, speedSnap: 92,
    lineLength: 88, cost: 10, digital: false, traditional: false,
    inkMethod: "chalk_powder_fill", use: "general_snap_line",
  },
  laser_line_digital: {
    lineAccuracy: 95, markVisible: 78, speedSnap: 88,
    lineLength: 95, cost: 80, digital: true, traditional: false,
    inkMethod: "laser_beam_project", use: "precise_long_layout",
  },
  string_ink_simple: {
    lineAccuracy: 80, markVisible: 82, speedSnap: 78,
    lineLength: 75, cost: 5, digital: false, traditional: true,
    inkMethod: "ink_soaked_string", use: "simple_short_mark",
  },
  bamboo_ink_natural: {
    lineAccuracy: 85, markVisible: 80, speedSnap: 80,
    lineLength: 78, cost: 30, digital: false, traditional: true,
    inkMethod: "bamboo_body_ink", use: "natural_craft_mark",
  },
};

export function lineAccuracy(t: SumitsuboLineType): number { return specs[t].lineAccuracy; }
export function markVisible(t: SumitsuboLineType): number { return specs[t].markVisible; }
export function speedSnap(t: SumitsuboLineType): number { return specs[t].speedSnap; }
export function lineLength(t: SumitsuboLineType): number { return specs[t].lineLength; }
export function lineCost(t: SumitsuboLineType): number { return specs[t].cost; }
export function digital(t: SumitsuboLineType): boolean { return specs[t].digital; }
export function traditional(t: SumitsuboLineType): boolean { return specs[t].traditional; }
export function inkMethod(t: SumitsuboLineType): string { return specs[t].inkMethod; }
export function bestUse(t: SumitsuboLineType): string { return specs[t].use; }
export function sumitsuboLines(): SumitsuboLineType[] { return Object.keys(specs) as SumitsuboLineType[]; }
