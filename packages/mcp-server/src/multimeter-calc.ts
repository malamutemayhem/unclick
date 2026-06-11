// multimeter-calc - multimeter types for electronics

export type Multimeter =
  | "digital_handheld_std"
  | "analog_panel_classic"
  | "bench_precision_lab"
  | "clamp_meter_current"
  | "auto_range_compact";

const DATA: Record<Multimeter, {
  accuracy: number; rangeSpan: number; durability: number; portability: number;
  cost: number; autoRange: boolean; trueRms: boolean; displayType: string; bestUse: string;
}> = {
  digital_handheld_std:  { accuracy: 7, rangeSpan: 8, durability: 7, portability: 9, cost: 4, autoRange: false, trueRms: false, displayType: "lcd_digit_count", bestUse: "general_field_test" },
  analog_panel_classic:  { accuracy: 5, rangeSpan: 6, durability: 8, portability: 6, cost: 3, autoRange: false, trueRms: false, displayType: "analog_needle_scale", bestUse: "trend_observation" },
  bench_precision_lab:   { accuracy: 10, rangeSpan: 10, durability: 9, portability: 2, cost: 9, autoRange: true, trueRms: true, displayType: "high_res_digit", bestUse: "precision_lab_measure" },
  clamp_meter_current:   { accuracy: 7, rangeSpan: 6, durability: 8, portability: 8, cost: 5, autoRange: true, trueRms: true, displayType: "lcd_with_clamp", bestUse: "non_contact_current" },
  auto_range_compact:    { accuracy: 8, rangeSpan: 7, durability: 6, portability: 10, cost: 6, autoRange: true, trueRms: false, displayType: "backlit_lcd", bestUse: "quick_pocket_test" },
};

const get = (m: Multimeter) => DATA[m];
export const accuracy = (m: Multimeter) => get(m).accuracy;
export const rangeSpan = (m: Multimeter) => get(m).rangeSpan;
export const durability = (m: Multimeter) => get(m).durability;
export const portability = (m: Multimeter) => get(m).portability;
export const meterCost = (m: Multimeter) => get(m).cost;
export const autoRange = (m: Multimeter) => get(m).autoRange;
export const trueRms = (m: Multimeter) => get(m).trueRms;
export const displayType = (m: Multimeter) => get(m).displayType;
export const bestUse = (m: Multimeter) => get(m).bestUse;
export const multimeters = (): Multimeter[] => Object.keys(DATA) as Multimeter[];
