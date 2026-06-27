export type CorrectionTapeType = "roller_dry_instant" | "mini_pocket_compact" | "wide_coverage_fast" | "retractable_pen_style" | "refillable_eco_spool";

export function coverageWidth(t: CorrectionTapeType): number {
  const m: Record<CorrectionTapeType, number> = {
    roller_dry_instant: 7, mini_pocket_compact: 4, wide_coverage_fast: 10, retractable_pen_style: 5, refillable_eco_spool: 7,
  };
  return m[t];
}

export function precision(t: CorrectionTapeType): number {
  const m: Record<CorrectionTapeType, number> = {
    roller_dry_instant: 7, mini_pocket_compact: 6, wide_coverage_fast: 4, retractable_pen_style: 10, refillable_eco_spool: 7,
  };
  return m[t];
}

export function tapeLength(t: CorrectionTapeType): number {
  const m: Record<CorrectionTapeType, number> = {
    roller_dry_instant: 7, mini_pocket_compact: 4, wide_coverage_fast: 6, retractable_pen_style: 5, refillable_eco_spool: 10,
  };
  return m[t];
}

export function portability(t: CorrectionTapeType): number {
  const m: Record<CorrectionTapeType, number> = {
    roller_dry_instant: 6, mini_pocket_compact: 10, wide_coverage_fast: 4, retractable_pen_style: 9, refillable_eco_spool: 5,
  };
  return m[t];
}

export function tapeCost(t: CorrectionTapeType): number {
  const m: Record<CorrectionTapeType, number> = {
    roller_dry_instant: 4, mini_pocket_compact: 3, wide_coverage_fast: 6, retractable_pen_style: 5, refillable_eco_spool: 7,
  };
  return m[t];
}

export function dryInstant(t: CorrectionTapeType): boolean {
  const m: Record<CorrectionTapeType, boolean> = {
    roller_dry_instant: true, mini_pocket_compact: true, wide_coverage_fast: true, retractable_pen_style: true, refillable_eco_spool: true,
  };
  return m[t];
}

export function refillable(t: CorrectionTapeType): boolean {
  const m: Record<CorrectionTapeType, boolean> = {
    roller_dry_instant: false, mini_pocket_compact: false, wide_coverage_fast: false, retractable_pen_style: false, refillable_eco_spool: true,
  };
  return m[t];
}

export function applicatorStyle(t: CorrectionTapeType): string {
  const m: Record<CorrectionTapeType, string> = {
    roller_dry_instant: "sideways_roller_head",
    mini_pocket_compact: "compact_body_roller",
    wide_coverage_fast: "wide_flat_applicator",
    retractable_pen_style: "retractable_tip_pen",
    refillable_eco_spool: "snap_in_spool_body",
  };
  return m[t];
}

export function bestUse(t: CorrectionTapeType): string {
  const m: Record<CorrectionTapeType, string> = {
    roller_dry_instant: "office_letter_form",
    mini_pocket_compact: "pencil_case_student",
    wide_coverage_fast: "spreadsheet_column_fix",
    retractable_pen_style: "margin_note_edit",
    refillable_eco_spool: "high_volume_eco_office",
  };
  return m[t];
}

export function correctionTapes(): CorrectionTapeType[] {
  return ["roller_dry_instant", "mini_pocket_compact", "wide_coverage_fast", "retractable_pen_style", "refillable_eco_spool"];
}
