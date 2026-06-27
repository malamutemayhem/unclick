export type SoapCutterType = "wire_cutter_multi" | "single_blade_straight" | "crinkle_wave_blade" | "log_splitter_slab" | "column_cutter_round";

export function cutPrecision(t: SoapCutterType): number {
  const m: Record<SoapCutterType, number> = {
    wire_cutter_multi: 9, single_blade_straight: 8, crinkle_wave_blade: 6, log_splitter_slab: 10, column_cutter_round: 7,
  };
  return m[t];
}

export function barConsistency(t: SoapCutterType): number {
  const m: Record<SoapCutterType, number> = {
    wire_cutter_multi: 10, single_blade_straight: 7, crinkle_wave_blade: 6, log_splitter_slab: 9, column_cutter_round: 8,
  };
  return m[t];
}

export function speedOutput(t: SoapCutterType): number {
  const m: Record<SoapCutterType, number> = {
    wire_cutter_multi: 10, single_blade_straight: 6, crinkle_wave_blade: 5, log_splitter_slab: 8, column_cutter_round: 4,
  };
  return m[t];
}

export function decorativeEdge(t: SoapCutterType): number {
  const m: Record<SoapCutterType, number> = {
    wire_cutter_multi: 3, single_blade_straight: 3, crinkle_wave_blade: 10, log_splitter_slab: 3, column_cutter_round: 5,
  };
  return m[t];
}

export function cutterCost(t: SoapCutterType): number {
  const m: Record<SoapCutterType, number> = {
    wire_cutter_multi: 3, single_blade_straight: 1, crinkle_wave_blade: 1, log_splitter_slab: 3, column_cutter_round: 2,
  };
  return m[t];
}

export function cutsMultiple(t: SoapCutterType): boolean {
  const m: Record<SoapCutterType, boolean> = {
    wire_cutter_multi: true, single_blade_straight: false, crinkle_wave_blade: false, log_splitter_slab: true, column_cutter_round: false,
  };
  return m[t];
}

export function wavyEdge(t: SoapCutterType): boolean {
  const m: Record<SoapCutterType, boolean> = {
    wire_cutter_multi: false, single_blade_straight: false, crinkle_wave_blade: true, log_splitter_slab: false, column_cutter_round: false,
  };
  return m[t];
}

export function bladeType(t: SoapCutterType): string {
  const m: Record<SoapCutterType, string> = {
    wire_cutter_multi: "stainless_wire_array",
    single_blade_straight: "straight_knife_blade",
    crinkle_wave_blade: "wavy_stainless_blade",
    log_splitter_slab: "adjustable_wire_frame",
    column_cutter_round: "curved_wire_guide",
  };
  return m[t];
}

export function bestSoap(t: SoapCutterType): string {
  const m: Record<SoapCutterType, string> = {
    wire_cutter_multi: "production_batch_even",
    single_blade_straight: "single_bar_trim",
    crinkle_wave_blade: "artisan_rustic_edge",
    log_splitter_slab: "large_slab_portion",
    column_cutter_round: "round_loaf_slice",
  };
  return m[t];
}

export function soapCutters(): SoapCutterType[] {
  return ["wire_cutter_multi", "single_blade_straight", "crinkle_wave_blade", "log_splitter_slab", "column_cutter_round"];
}
