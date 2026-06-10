export type WireGaugeType = "gauge_20_medium" | "gauge_24_thin" | "gauge_18_heavy" | "gauge_26_fine" | "gauge_16_thick";

export function strength(t: WireGaugeType): number {
  const m: Record<WireGaugeType, number> = {
    gauge_20_medium: 7, gauge_24_thin: 4, gauge_18_heavy: 9, gauge_26_fine: 3, gauge_16_thick: 10,
  };
  return m[t];
}

export function flexibility(t: WireGaugeType): number {
  const m: Record<WireGaugeType, number> = {
    gauge_20_medium: 7, gauge_24_thin: 9, gauge_18_heavy: 4, gauge_26_fine: 10, gauge_16_thick: 3,
  };
  return m[t];
}

export function detailWork(t: WireGaugeType): number {
  const m: Record<WireGaugeType, number> = {
    gauge_20_medium: 7, gauge_24_thin: 9, gauge_18_heavy: 4, gauge_26_fine: 10, gauge_16_thick: 2,
  };
  return m[t];
}

export function structuralUse(t: WireGaugeType): number {
  const m: Record<WireGaugeType, number> = {
    gauge_20_medium: 7, gauge_24_thin: 3, gauge_18_heavy: 9, gauge_26_fine: 2, gauge_16_thick: 10,
  };
  return m[t];
}

export function wireCost(t: WireGaugeType): number {
  const m: Record<WireGaugeType, number> = {
    gauge_20_medium: 3, gauge_24_thin: 2, gauge_18_heavy: 4, gauge_26_fine: 2, gauge_16_thick: 5,
  };
  return m[t];
}

export function forWrapping(t: WireGaugeType): boolean {
  const m: Record<WireGaugeType, boolean> = {
    gauge_20_medium: true, gauge_24_thin: true, gauge_18_heavy: false, gauge_26_fine: true, gauge_16_thick: false,
  };
  return m[t];
}

export function forFramework(t: WireGaugeType): boolean {
  const m: Record<WireGaugeType, boolean> = {
    gauge_20_medium: true, gauge_24_thin: false, gauge_18_heavy: true, gauge_26_fine: false, gauge_16_thick: true,
  };
  return m[t];
}

export function wireMetal(t: WireGaugeType): string {
  const m: Record<WireGaugeType, string> = {
    gauge_20_medium: "copper_half_hard",
    gauge_24_thin: "silver_dead_soft",
    gauge_18_heavy: "brass_half_hard",
    gauge_26_fine: "gold_filled_soft",
    gauge_16_thick: "copper_full_hard",
  };
  return m[t];
}

export function bestUse(t: WireGaugeType): string {
  const m: Record<WireGaugeType, string> = {
    gauge_20_medium: "general_wire_wrap",
    gauge_24_thin: "weave_coil_detail",
    gauge_18_heavy: "bangle_frame_clasp",
    gauge_26_fine: "seed_bead_thread",
    gauge_16_thick: "cuff_armature_heavy",
  };
  return m[t];
}

export function wireGauges(): WireGaugeType[] {
  return ["gauge_20_medium", "gauge_24_thin", "gauge_18_heavy", "gauge_26_fine", "gauge_16_thick"];
}
