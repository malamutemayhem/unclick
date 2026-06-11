export type PivotGaugeType =
  | "micrometer_gauge_precise"
  | "optical_gauge_visual"
  | "notch_gauge_quick"
  | "digital_gauge_modern"
  | "comparator_gauge_diff";

const specs: Record<PivotGaugeType, {
  accuracy: number; speedMeasure: number; pivotRange: number;
  repeatConsist: number; cost: number; digital: boolean; optical: boolean;
  readMethod: string; use: string;
}> = {
  micrometer_gauge_precise: {
    accuracy: 95, speedMeasure: 60, pivotRange: 80,
    repeatConsist: 92, cost: 120, digital: false, optical: false,
    readMethod: "thimble_scale_read", use: "precise_pivot_measure",
  },
  optical_gauge_visual: {
    accuracy: 90, speedMeasure: 75, pivotRange: 70,
    repeatConsist: 85, cost: 250, digital: false, optical: true,
    readMethod: "magnified_reticle", use: "visual_pivot_inspect",
  },
  notch_gauge_quick: {
    accuracy: 72, speedMeasure: 95, pivotRange: 65,
    repeatConsist: 78, cost: 30, digital: false, optical: false,
    readMethod: "notch_fit_check", use: "quick_pivot_sort",
  },
  digital_gauge_modern: {
    accuracy: 92, speedMeasure: 85, pivotRange: 88,
    repeatConsist: 90, cost: 200, digital: true, optical: false,
    readMethod: "lcd_digital_display", use: "production_pivot_check",
  },
  comparator_gauge_diff: {
    accuracy: 88, speedMeasure: 80, pivotRange: 75,
    repeatConsist: 88, cost: 180, digital: false, optical: false,
    readMethod: "dial_indicator_diff", use: "tolerance_pivot_check",
  },
};

export function accuracy(t: PivotGaugeType): number { return specs[t].accuracy; }
export function speedMeasure(t: PivotGaugeType): number { return specs[t].speedMeasure; }
export function pivotRange(t: PivotGaugeType): number { return specs[t].pivotRange; }
export function repeatConsist(t: PivotGaugeType): number { return specs[t].repeatConsist; }
export function gaugeCost(t: PivotGaugeType): number { return specs[t].cost; }
export function digital(t: PivotGaugeType): boolean { return specs[t].digital; }
export function optical(t: PivotGaugeType): boolean { return specs[t].optical; }
export function readMethod(t: PivotGaugeType): string { return specs[t].readMethod; }
export function bestUse(t: PivotGaugeType): string { return specs[t].use; }
export function pivotGauges(): PivotGaugeType[] { return Object.keys(specs) as PivotGaugeType[]; }
