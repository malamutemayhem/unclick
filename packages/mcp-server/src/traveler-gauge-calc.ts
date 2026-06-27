export type TravelerGaugeType =
  | "wheel_traveler_standard"
  | "folding_traveler_pocket"
  | "adjustable_traveler_set"
  | "digital_measure_modern"
  | "chain_measure_large";

const specs: Record<TravelerGaugeType, {
  measureAccuracy: number; repeatConsist: number; speedMeasure: number;
  sizeRange: number; cost: number; digital: boolean; portable: boolean;
  readoutType: string; use: string;
}> = {
  wheel_traveler_standard: {
    measureAccuracy: 85, repeatConsist: 88, speedMeasure: 80,
    sizeRange: 75, cost: 45, digital: false, portable: true,
    readoutType: "click_count_wheel", use: "general_rim_measure",
  },
  folding_traveler_pocket: {
    measureAccuracy: 78, repeatConsist: 80, speedMeasure: 70,
    sizeRange: 60, cost: 30, digital: false, portable: true,
    readoutType: "fold_ruler_arc", use: "field_quick_measure",
  },
  adjustable_traveler_set: {
    measureAccuracy: 82, repeatConsist: 85, speedMeasure: 75,
    sizeRange: 90, cost: 65, digital: false, portable: true,
    readoutType: "sliding_scale_read", use: "multi_size_measure",
  },
  digital_measure_modern: {
    measureAccuracy: 95, repeatConsist: 92, speedMeasure: 90,
    sizeRange: 85, cost: 200, digital: true, portable: true,
    readoutType: "lcd_digital_display", use: "precision_wheel_measure",
  },
  chain_measure_large: {
    measureAccuracy: 72, repeatConsist: 75, speedMeasure: 65,
    sizeRange: 95, cost: 40, digital: false, portable: false,
    readoutType: "chain_link_count", use: "large_wheel_circum",
  },
};

export function measureAccuracy(t: TravelerGaugeType): number { return specs[t].measureAccuracy; }
export function repeatConsist(t: TravelerGaugeType): number { return specs[t].repeatConsist; }
export function speedMeasure(t: TravelerGaugeType): number { return specs[t].speedMeasure; }
export function sizeRange(t: TravelerGaugeType): number { return specs[t].sizeRange; }
export function gaugeCost(t: TravelerGaugeType): number { return specs[t].cost; }
export function digital(t: TravelerGaugeType): boolean { return specs[t].digital; }
export function portable(t: TravelerGaugeType): boolean { return specs[t].portable; }
export function readoutType(t: TravelerGaugeType): string { return specs[t].readoutType; }
export function bestUse(t: TravelerGaugeType): string { return specs[t].use; }
export function travelerGauges(): TravelerGaugeType[] { return Object.keys(specs) as TravelerGaugeType[]; }
