export type ExerciseBallType = "standard_pvc_55cm" | "anti_burst_65cm" | "mini_pilates_25cm" | "weighted_medicine_slam" | "peanut_stability_physio";

export function stability(t: ExerciseBallType): number {
  const m: Record<ExerciseBallType, number> = {
    standard_pvc_55cm: 6, anti_burst_65cm: 8, mini_pilates_25cm: 4, weighted_medicine_slam: 3, peanut_stability_physio: 10,
  };
  return m[t];
}

export function exerciseRange(t: ExerciseBallType): number {
  const m: Record<ExerciseBallType, number> = {
    standard_pvc_55cm: 8, anti_burst_65cm: 9, mini_pilates_25cm: 5, weighted_medicine_slam: 7, peanut_stability_physio: 6,
  };
  return m[t];
}

export function durability(t: ExerciseBallType): number {
  const m: Record<ExerciseBallType, number> = {
    standard_pvc_55cm: 5, anti_burst_65cm: 10, mini_pilates_25cm: 7, weighted_medicine_slam: 9, peanut_stability_physio: 8,
  };
  return m[t];
}

export function portability(t: ExerciseBallType): number {
  const m: Record<ExerciseBallType, number> = {
    standard_pvc_55cm: 4, anti_burst_65cm: 3, mini_pilates_25cm: 10, weighted_medicine_slam: 5, peanut_stability_physio: 4,
  };
  return m[t];
}

export function ballCost(t: ExerciseBallType): number {
  const m: Record<ExerciseBallType, number> = {
    standard_pvc_55cm: 2, anti_burst_65cm: 3, mini_pilates_25cm: 1, weighted_medicine_slam: 5, peanut_stability_physio: 4,
  };
  return m[t];
}

export function antiBurst(t: ExerciseBallType): boolean {
  const m: Record<ExerciseBallType, boolean> = {
    standard_pvc_55cm: false, anti_burst_65cm: true, mini_pilates_25cm: false, weighted_medicine_slam: true, peanut_stability_physio: true,
  };
  return m[t];
}

export function weighted(t: ExerciseBallType): boolean {
  const m: Record<ExerciseBallType, boolean> = {
    standard_pvc_55cm: false, anti_burst_65cm: false, mini_pilates_25cm: false, weighted_medicine_slam: true, peanut_stability_physio: false,
  };
  return m[t];
}

export function shellMaterial(t: ExerciseBallType): string {
  const m: Record<ExerciseBallType, string> = {
    standard_pvc_55cm: "pvc_smooth_inflate",
    anti_burst_65cm: "thick_pvc_anti_burst",
    mini_pilates_25cm: "soft_pvc_squeeze",
    weighted_medicine_slam: "rubber_sand_fill_shell",
    peanut_stability_physio: "pvc_peanut_dual_dome",
  };
  return m[t];
}

export function bestWorkout(t: ExerciseBallType): string {
  const m: Record<ExerciseBallType, string> = {
    standard_pvc_55cm: "core_balance_desk_sit",
    anti_burst_65cm: "gym_class_heavy_use",
    mini_pilates_25cm: "pilates_barre_squeeze",
    weighted_medicine_slam: "hiit_slam_partner_throw",
    peanut_stability_physio: "physio_rehab_balance",
  };
  return m[t];
}

export function exerciseBalls(): ExerciseBallType[] {
  return ["standard_pvc_55cm", "anti_burst_65cm", "mini_pilates_25cm", "weighted_medicine_slam", "peanut_stability_physio"];
}
