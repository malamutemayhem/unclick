export type MarkingGaugeType = "wheel_cutter_precise" | "pin_scratch_classic" | "mortise_twin_pin" | "panel_long_beam" | "knife_bevel_clean";

export function lineClarity(t: MarkingGaugeType): number {
  const m: Record<MarkingGaugeType, number> = {
    wheel_cutter_precise: 10, pin_scratch_classic: 7, mortise_twin_pin: 7, panel_long_beam: 6, knife_bevel_clean: 9,
  };
  return m[t];
}

export function crossGrain(t: MarkingGaugeType): number {
  const m: Record<MarkingGaugeType, number> = {
    wheel_cutter_precise: 10, pin_scratch_classic: 5, mortise_twin_pin: 5, panel_long_beam: 6, knife_bevel_clean: 9,
  };
  return m[t];
}

export function durability(t: MarkingGaugeType): number {
  const m: Record<MarkingGaugeType, number> = {
    wheel_cutter_precise: 8, pin_scratch_classic: 10, mortise_twin_pin: 9, panel_long_beam: 9, knife_bevel_clean: 7,
  };
  return m[t];
}

export function reachLength(t: MarkingGaugeType): number {
  const m: Record<MarkingGaugeType, number> = {
    wheel_cutter_precise: 6, pin_scratch_classic: 6, mortise_twin_pin: 6, panel_long_beam: 10, knife_bevel_clean: 6,
  };
  return m[t];
}

export function gaugeCost(t: MarkingGaugeType): number {
  const m: Record<MarkingGaugeType, number> = {
    wheel_cutter_precise: 3, pin_scratch_classic: 1, mortise_twin_pin: 2, panel_long_beam: 2, knife_bevel_clean: 3,
  };
  return m[t];
}

export function dualMark(t: MarkingGaugeType): boolean {
  const m: Record<MarkingGaugeType, boolean> = {
    wheel_cutter_precise: false, pin_scratch_classic: false, mortise_twin_pin: true, panel_long_beam: false, knife_bevel_clean: false,
  };
  return m[t];
}

export function seversfiber(t: MarkingGaugeType): boolean {
  const m: Record<MarkingGaugeType, boolean> = {
    wheel_cutter_precise: true, pin_scratch_classic: false, mortise_twin_pin: false, panel_long_beam: false, knife_bevel_clean: true,
  };
  return m[t];
}

export function markingTip(t: MarkingGaugeType): string {
  const m: Record<MarkingGaugeType, string> = {
    wheel_cutter_precise: "hardened_wheel_disc",
    pin_scratch_classic: "steel_pin_point",
    mortise_twin_pin: "dual_pin_parallel",
    panel_long_beam: "steel_pin_extended",
    knife_bevel_clean: "single_bevel_knife",
  };
  return m[t];
}

export function bestLayout(t: MarkingGaugeType): string {
  const m: Record<MarkingGaugeType, string> = {
    wheel_cutter_precise: "dovetail_baseline_mark",
    pin_scratch_classic: "general_edge_scribe",
    mortise_twin_pin: "mortise_width_layout",
    panel_long_beam: "wide_panel_center",
    knife_bevel_clean: "tenon_shoulder_knife",
  };
  return m[t];
}

export function markingGauges(): MarkingGaugeType[] {
  return ["wheel_cutter_precise", "pin_scratch_classic", "mortise_twin_pin", "panel_long_beam", "knife_bevel_clean"];
}
