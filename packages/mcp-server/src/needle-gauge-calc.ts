export type NeedleGaugeType = "flat_card_basic" | "round_metal_key" | "ruler_combo_dual" | "digital_caliper_exact" | "swatch_window_check";

export function accuracy(t: NeedleGaugeType): number {
  const m: Record<NeedleGaugeType, number> = {
    flat_card_basic: 7, round_metal_key: 8, ruler_combo_dual: 9, digital_caliper_exact: 10, swatch_window_check: 6,
  };
  return m[t];
}

export function easeOfUse(t: NeedleGaugeType): number {
  const m: Record<NeedleGaugeType, number> = {
    flat_card_basic: 9, round_metal_key: 8, ruler_combo_dual: 7, digital_caliper_exact: 6, swatch_window_check: 10,
  };
  return m[t];
}

export function sizeRange(t: NeedleGaugeType): number {
  const m: Record<NeedleGaugeType, number> = {
    flat_card_basic: 8, round_metal_key: 9, ruler_combo_dual: 10, digital_caliper_exact: 10, swatch_window_check: 5,
  };
  return m[t];
}

export function portability(t: NeedleGaugeType): number {
  const m: Record<NeedleGaugeType, number> = {
    flat_card_basic: 10, round_metal_key: 9, ruler_combo_dual: 7, digital_caliper_exact: 5, swatch_window_check: 8,
  };
  return m[t];
}

export function gaugeCost(t: NeedleGaugeType): number {
  const m: Record<NeedleGaugeType, number> = {
    flat_card_basic: 1, round_metal_key: 2, ruler_combo_dual: 3, digital_caliper_exact: 5, swatch_window_check: 2,
  };
  return m[t];
}

export function measuresGauge(t: NeedleGaugeType): boolean {
  const m: Record<NeedleGaugeType, boolean> = {
    flat_card_basic: false, round_metal_key: false, ruler_combo_dual: true, digital_caliper_exact: false, swatch_window_check: true,
  };
  return m[t];
}

export function hasRuler(t: NeedleGaugeType): boolean {
  const m: Record<NeedleGaugeType, boolean> = {
    flat_card_basic: false, round_metal_key: false, ruler_combo_dual: true, digital_caliper_exact: false, swatch_window_check: true,
  };
  return m[t];
}

export function gaugeMaterial(t: NeedleGaugeType): string {
  const m: Record<NeedleGaugeType, string> = {
    flat_card_basic: "printed_card_stock",
    round_metal_key: "aluminum_etched_ring",
    ruler_combo_dual: "acrylic_laser_cut",
    digital_caliper_exact: "stainless_steel_lcd",
    swatch_window_check: "plastic_window_frame",
  };
  return m[t];
}

export function bestUse(t: NeedleGaugeType): string {
  const m: Record<NeedleGaugeType, string> = {
    flat_card_basic: "quick_size_check",
    round_metal_key: "keychain_carry_ready",
    ruler_combo_dual: "swatch_measure_combo",
    digital_caliper_exact: "precision_size_verify",
    swatch_window_check: "pattern_gauge_match",
  };
  return m[t];
}

export function needleGauges(): NeedleGaugeType[] {
  return ["flat_card_basic", "round_metal_key", "ruler_combo_dual", "digital_caliper_exact", "swatch_window_check"];
}
