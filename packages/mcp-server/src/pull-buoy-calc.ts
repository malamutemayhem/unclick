export type PullBuoyType = "figure_eight_classic" | "ergonomic_contour_fit" | "ankle_strap_lock" | "junior_small_size" | "soft_foam_comfort";

export function legIsolation(t: PullBuoyType): number {
  const m: Record<PullBuoyType, number> = {
    figure_eight_classic: 8, ergonomic_contour_fit: 9, ankle_strap_lock: 10, junior_small_size: 6, soft_foam_comfort: 7,
  };
  return m[t];
}

export function buoyancy(t: PullBuoyType): number {
  const m: Record<PullBuoyType, number> = {
    figure_eight_classic: 8, ergonomic_contour_fit: 8, ankle_strap_lock: 7, junior_small_size: 5, soft_foam_comfort: 7,
  };
  return m[t];
}

export function gripStay(t: PullBuoyType): number {
  const m: Record<PullBuoyType, number> = {
    figure_eight_classic: 7, ergonomic_contour_fit: 9, ankle_strap_lock: 10, junior_small_size: 6, soft_foam_comfort: 6,
  };
  return m[t];
}

export function comfort(t: PullBuoyType): number {
  const m: Record<PullBuoyType, number> = {
    figure_eight_classic: 6, ergonomic_contour_fit: 9, ankle_strap_lock: 7, junior_small_size: 7, soft_foam_comfort: 10,
  };
  return m[t];
}

export function buoyCost(t: PullBuoyType): number {
  const m: Record<PullBuoyType, number> = {
    figure_eight_classic: 1, ergonomic_contour_fit: 3, ankle_strap_lock: 3, junior_small_size: 1, soft_foam_comfort: 2,
  };
  return m[t];
}

export function hasStrap(t: PullBuoyType): boolean {
  const m: Record<PullBuoyType, boolean> = {
    figure_eight_classic: false, ergonomic_contour_fit: false, ankle_strap_lock: true, junior_small_size: false, soft_foam_comfort: false,
  };
  return m[t];
}

export function kidsSize(t: PullBuoyType): boolean {
  const m: Record<PullBuoyType, boolean> = {
    figure_eight_classic: false, ergonomic_contour_fit: false, ankle_strap_lock: false, junior_small_size: true, soft_foam_comfort: false,
  };
  return m[t];
}

export function foamType(t: PullBuoyType): string {
  const m: Record<PullBuoyType, string> = {
    figure_eight_classic: "dual_density_eva",
    ergonomic_contour_fit: "contoured_pe_foam",
    ankle_strap_lock: "firm_eva_with_strap",
    junior_small_size: "soft_eva_mini",
    soft_foam_comfort: "plush_nbr_foam",
  };
  return m[t];
}

export function bestDrill(t: PullBuoyType): string {
  const m: Record<PullBuoyType, string> = {
    figure_eight_classic: "pull_set_arm_focus",
    ergonomic_contour_fit: "long_distance_pull",
    ankle_strap_lock: "sprint_no_slip_drill",
    junior_small_size: "youth_stroke_learn",
    soft_foam_comfort: "recovery_easy_swim",
  };
  return m[t];
}

export function pullBuoys(): PullBuoyType[] {
  return ["figure_eight_classic", "ergonomic_contour_fit", "ankle_strap_lock", "junior_small_size", "soft_foam_comfort"];
}
