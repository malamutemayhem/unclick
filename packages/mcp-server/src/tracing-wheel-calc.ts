export type TracingWheelType = "needle_point_sharp" | "smooth_edge_blunt" | "serrated_fine_tooth" | "double_wheel_seam" | "ergonomic_grip_comfort";

export function traceAccuracy(t: TracingWheelType): number {
  const m: Record<TracingWheelType, number> = {
    needle_point_sharp: 10, smooth_edge_blunt: 6, serrated_fine_tooth: 8, double_wheel_seam: 7, ergonomic_grip_comfort: 7,
  };
  return m[t];
}

export function fabricPreserve(t: TracingWheelType): number {
  const m: Record<TracingWheelType, number> = {
    needle_point_sharp: 3, smooth_edge_blunt: 10, serrated_fine_tooth: 5, double_wheel_seam: 6, ergonomic_grip_comfort: 7,
  };
  return m[t];
}

export function carbonTransfer(t: TracingWheelType): number {
  const m: Record<TracingWheelType, number> = {
    needle_point_sharp: 9, smooth_edge_blunt: 5, serrated_fine_tooth: 10, double_wheel_seam: 8, ergonomic_grip_comfort: 7,
  };
  return m[t];
}

export function handComfort(t: TracingWheelType): number {
  const m: Record<TracingWheelType, number> = {
    needle_point_sharp: 6, smooth_edge_blunt: 7, serrated_fine_tooth: 6, double_wheel_seam: 5, ergonomic_grip_comfort: 10,
  };
  return m[t];
}

export function wheelCost(t: TracingWheelType): number {
  const m: Record<TracingWheelType, number> = {
    needle_point_sharp: 1, smooth_edge_blunt: 1, serrated_fine_tooth: 1, double_wheel_seam: 2, ergonomic_grip_comfort: 2,
  };
  return m[t];
}

export function sharp(t: TracingWheelType): boolean {
  const m: Record<TracingWheelType, boolean> = {
    needle_point_sharp: true, smooth_edge_blunt: false, serrated_fine_tooth: true, double_wheel_seam: true, ergonomic_grip_comfort: false,
  };
  return m[t];
}

export function dualWheel(t: TracingWheelType): boolean {
  const m: Record<TracingWheelType, boolean> = {
    needle_point_sharp: false, smooth_edge_blunt: false, serrated_fine_tooth: false, double_wheel_seam: true, ergonomic_grip_comfort: false,
  };
  return m[t];
}

export function handleType(t: TracingWheelType): string {
  const m: Record<TracingWheelType, string> = {
    needle_point_sharp: "wood_straight_handle",
    smooth_edge_blunt: "plastic_molded_grip",
    serrated_fine_tooth: "metal_knurl_handle",
    double_wheel_seam: "dual_fork_handle",
    ergonomic_grip_comfort: "rubber_contour_grip",
  };
  return m[t];
}

export function bestUse(t: TracingWheelType): string {
  const m: Record<TracingWheelType, string> = {
    needle_point_sharp: "precise_line_trace",
    smooth_edge_blunt: "delicate_fabric_safe",
    serrated_fine_tooth: "carbon_paper_mark",
    double_wheel_seam: "seam_allowance_trace",
    ergonomic_grip_comfort: "long_session_trace",
  };
  return m[t];
}

export function tracingWheels(): TracingWheelType[] {
  return ["needle_point_sharp", "smooth_edge_blunt", "serrated_fine_tooth", "double_wheel_seam", "ergonomic_grip_comfort"];
}
