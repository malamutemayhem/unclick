export type CenterPunchType = "automatic_spring_load" | "pin_punch_through" | "prick_punch_layout" | "transfer_punch_hole" | "dot_punch_witness";

export function markDepth(t: CenterPunchType): number {
  const m: Record<CenterPunchType, number> = {
    automatic_spring_load: 8, pin_punch_through: 6, prick_punch_layout: 7, transfer_punch_hole: 5, dot_punch_witness: 9,
  };
  return m[t];
}

export function pointAccuracy(t: CenterPunchType): number {
  const m: Record<CenterPunchType, number> = {
    automatic_spring_load: 9, pin_punch_through: 6, prick_punch_layout: 10, transfer_punch_hole: 8, dot_punch_witness: 7,
  };
  return m[t];
}

export function forceControl(t: CenterPunchType): number {
  const m: Record<CenterPunchType, number> = {
    automatic_spring_load: 10, pin_punch_through: 5, prick_punch_layout: 6, transfer_punch_hole: 7, dot_punch_witness: 8,
  };
  return m[t];
}

export function versatility(t: CenterPunchType): number {
  const m: Record<CenterPunchType, number> = {
    automatic_spring_load: 8, pin_punch_through: 9, prick_punch_layout: 6, transfer_punch_hole: 5, dot_punch_witness: 7,
  };
  return m[t];
}

export function punchCost(t: CenterPunchType): number {
  const m: Record<CenterPunchType, number> = {
    automatic_spring_load: 2, pin_punch_through: 1, prick_punch_layout: 1, transfer_punch_hole: 1, dot_punch_witness: 1,
  };
  return m[t];
}

export function springLoaded(t: CenterPunchType): boolean {
  const m: Record<CenterPunchType, boolean> = {
    automatic_spring_load: true, pin_punch_through: false, prick_punch_layout: false, transfer_punch_hole: false, dot_punch_witness: false,
  };
  return m[t];
}

export function needsHammer(t: CenterPunchType): boolean {
  const m: Record<CenterPunchType, boolean> = {
    automatic_spring_load: false, pin_punch_through: true, prick_punch_layout: true, transfer_punch_hole: false, dot_punch_witness: true,
  };
  return m[t];
}

export function tipAngle(t: CenterPunchType): string {
  const m: Record<CenterPunchType, string> = {
    automatic_spring_load: "90_degree_center",
    pin_punch_through: "flat_end_drive",
    prick_punch_layout: "30_degree_fine",
    transfer_punch_hole: "spring_retract_pin",
    dot_punch_witness: "60_degree_dot",
  };
  return m[t];
}

export function bestUse(t: CenterPunchType): string {
  const m: Record<CenterPunchType, string> = {
    automatic_spring_load: "drill_start_center",
    pin_punch_through: "pin_drive_remove",
    prick_punch_layout: "layout_line_mark",
    transfer_punch_hole: "hole_pattern_copy",
    dot_punch_witness: "witness_mark_align",
  };
  return m[t];
}

export function centerPunches(): CenterPunchType[] {
  return ["automatic_spring_load", "pin_punch_through", "prick_punch_layout", "transfer_punch_hole", "dot_punch_witness"];
}
