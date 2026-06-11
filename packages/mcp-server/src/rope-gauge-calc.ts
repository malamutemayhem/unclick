export type RopeGaugeType =
  | "notch_gauge_standard"
  | "caliper_gauge_precise"
  | "ring_gauge_pass"
  | "digital_gauge_modern"
  | "template_gauge_quick";

const specs: Record<RopeGaugeType, {
  accuracy: number; speedMeasure: number; sizeRange: number;
  repeatConsist: number; cost: number; digital: boolean; passNoPass: boolean;
  readMethod: string; use: string;
}> = {
  notch_gauge_standard: {
    accuracy: 75, speedMeasure: 85, sizeRange: 80,
    repeatConsist: 78, cost: 20, digital: false, passNoPass: false,
    readMethod: "notch_fit_read", use: "general_rope_size",
  },
  caliper_gauge_precise: {
    accuracy: 95, speedMeasure: 65, sizeRange: 90,
    repeatConsist: 90, cost: 60, digital: false, passNoPass: false,
    readMethod: "vernier_scale_read", use: "precise_diameter_check",
  },
  ring_gauge_pass: {
    accuracy: 80, speedMeasure: 95, sizeRange: 60,
    repeatConsist: 85, cost: 35, digital: false, passNoPass: true,
    readMethod: "ring_pass_check", use: "quick_go_nogo_check",
  },
  digital_gauge_modern: {
    accuracy: 92, speedMeasure: 88, sizeRange: 85,
    repeatConsist: 92, cost: 150, digital: true, passNoPass: false,
    readMethod: "lcd_digital_read", use: "production_measure",
  },
  template_gauge_quick: {
    accuracy: 70, speedMeasure: 92, sizeRange: 70,
    repeatConsist: 75, cost: 15, digital: false, passNoPass: false,
    readMethod: "template_compare", use: "field_quick_check",
  },
};

export function accuracy(t: RopeGaugeType): number { return specs[t].accuracy; }
export function speedMeasure(t: RopeGaugeType): number { return specs[t].speedMeasure; }
export function sizeRange(t: RopeGaugeType): number { return specs[t].sizeRange; }
export function repeatConsist(t: RopeGaugeType): number { return specs[t].repeatConsist; }
export function gaugeCost(t: RopeGaugeType): number { return specs[t].cost; }
export function digital(t: RopeGaugeType): boolean { return specs[t].digital; }
export function passNoPass(t: RopeGaugeType): boolean { return specs[t].passNoPass; }
export function readMethod(t: RopeGaugeType): string { return specs[t].readMethod; }
export function bestUse(t: RopeGaugeType): string { return specs[t].use; }
export function ropeGauges(): RopeGaugeType[] { return Object.keys(specs) as RopeGaugeType[]; }
