export type ScrewGaugeType = "standard_metric_dial" | "digital_lcd_read" | "imperial_inch_thimble" | "sheet_metal_slot" | "wire_round_notch";

export function readAccuracy(t: ScrewGaugeType): number {
  const m: Record<ScrewGaugeType, number> = {
    standard_metric_dial: 8, digital_lcd_read: 10, imperial_inch_thimble: 7, sheet_metal_slot: 5, wire_round_notch: 6,
  };
  return m[t];
}

export function readSpeed(t: ScrewGaugeType): number {
  const m: Record<ScrewGaugeType, number> = {
    standard_metric_dial: 6, digital_lcd_read: 10, imperial_inch_thimble: 5, sheet_metal_slot: 9, wire_round_notch: 8,
  };
  return m[t];
}

export function durability(t: ScrewGaugeType): number {
  const m: Record<ScrewGaugeType, number> = {
    standard_metric_dial: 9, digital_lcd_read: 5, imperial_inch_thimble: 9, sheet_metal_slot: 10, wire_round_notch: 10,
  };
  return m[t];
}

export function rangeSpan(t: ScrewGaugeType): number {
  const m: Record<ScrewGaugeType, number> = {
    standard_metric_dial: 8, digital_lcd_read: 8, imperial_inch_thimble: 7, sheet_metal_slot: 6, wire_round_notch: 5,
  };
  return m[t];
}

export function gaugeCost(t: ScrewGaugeType): number {
  const m: Record<ScrewGaugeType, number> = {
    standard_metric_dial: 2, digital_lcd_read: 3, imperial_inch_thimble: 2, sheet_metal_slot: 1, wire_round_notch: 1,
  };
  return m[t];
}

export function digital(t: ScrewGaugeType): boolean {
  const m: Record<ScrewGaugeType, boolean> = {
    standard_metric_dial: false, digital_lcd_read: true, imperial_inch_thimble: false, sheet_metal_slot: false, wire_round_notch: false,
  };
  return m[t];
}

export function needsBattery(t: ScrewGaugeType): boolean {
  const m: Record<ScrewGaugeType, boolean> = {
    standard_metric_dial: false, digital_lcd_read: true, imperial_inch_thimble: false, sheet_metal_slot: false, wire_round_notch: false,
  };
  return m[t];
}

export function scaleType(t: ScrewGaugeType): string {
  const m: Record<ScrewGaugeType, string> = {
    standard_metric_dial: "metric_vernier_dial",
    digital_lcd_read: "lcd_digital_readout",
    imperial_inch_thimble: "imperial_thimble_scale",
    sheet_metal_slot: "stamped_slot_number",
    wire_round_notch: "notch_gauge_number",
  };
  return m[t];
}

export function bestUse(t: ScrewGaugeType): string {
  const m: Record<ScrewGaugeType, string> = {
    standard_metric_dial: "precision_thickness_mm",
    digital_lcd_read: "fast_digital_measure",
    imperial_inch_thimble: "imperial_diameter_read",
    sheet_metal_slot: "sheet_gauge_check",
    wire_round_notch: "wire_diameter_check",
  };
  return m[t];
}

export function screwGauges(): ScrewGaugeType[] {
  return ["standard_metric_dial", "digital_lcd_read", "imperial_inch_thimble", "sheet_metal_slot", "wire_round_notch"];
}
