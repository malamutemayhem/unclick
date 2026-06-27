export type PounceWheelType = "single_line_basic" | "double_line_parallel" | "serrated_edge_perf" | "blunt_trace_no_mark" | "adjustable_space_set";

export function markClarity(t: PounceWheelType): number {
  const m: Record<PounceWheelType, number> = {
    single_line_basic: 8, double_line_parallel: 7, serrated_edge_perf: 9, blunt_trace_no_mark: 4, adjustable_space_set: 6,
  };
  return m[t];
}

export function fabricSafe(t: PounceWheelType): number {
  const m: Record<PounceWheelType, number> = {
    single_line_basic: 6, double_line_parallel: 6, serrated_edge_perf: 3, blunt_trace_no_mark: 10, adjustable_space_set: 7,
  };
  return m[t];
}

export function patternTransfer(t: PounceWheelType): number {
  const m: Record<PounceWheelType, number> = {
    single_line_basic: 8, double_line_parallel: 9, serrated_edge_perf: 10, blunt_trace_no_mark: 5, adjustable_space_set: 7,
  };
  return m[t];
}

export function versatility(t: PounceWheelType): number {
  const m: Record<PounceWheelType, number> = {
    single_line_basic: 7, double_line_parallel: 8, serrated_edge_perf: 6, blunt_trace_no_mark: 5, adjustable_space_set: 10,
  };
  return m[t];
}

export function wheelCost(t: PounceWheelType): number {
  const m: Record<PounceWheelType, number> = {
    single_line_basic: 1, double_line_parallel: 2, serrated_edge_perf: 1, blunt_trace_no_mark: 1, adjustable_space_set: 2,
  };
  return m[t];
}

export function perforates(t: PounceWheelType): boolean {
  const m: Record<PounceWheelType, boolean> = {
    single_line_basic: true, double_line_parallel: true, serrated_edge_perf: true, blunt_trace_no_mark: false, adjustable_space_set: true,
  };
  return m[t];
}

export function dualWheel(t: PounceWheelType): boolean {
  const m: Record<PounceWheelType, boolean> = {
    single_line_basic: false, double_line_parallel: true, serrated_edge_perf: false, blunt_trace_no_mark: false, adjustable_space_set: false,
  };
  return m[t];
}

export function wheelProfile(t: PounceWheelType): string {
  const m: Record<PounceWheelType, string> = {
    single_line_basic: "single_spike_wheel",
    double_line_parallel: "dual_spike_parallel",
    serrated_edge_perf: "fine_serrated_edge",
    blunt_trace_no_mark: "smooth_blunt_wheel",
    adjustable_space_set: "variable_gap_wheel",
  };
  return m[t];
}

export function bestUse(t: PounceWheelType): string {
  const m: Record<PounceWheelType, string> = {
    single_line_basic: "basic_pattern_trace",
    double_line_parallel: "seam_allowance_mark",
    serrated_edge_perf: "carbon_paper_trace",
    blunt_trace_no_mark: "delicate_fabric_trace",
    adjustable_space_set: "custom_spacing_mark",
  };
  return m[t];
}

export function pounceWheels(): PounceWheelType[] {
  return ["single_line_basic", "double_line_parallel", "serrated_edge_perf", "blunt_trace_no_mark", "adjustable_space_set"];
}
