export type SnowHelmetType = "in_mold_lightweight" | "hard_shell_abs" | "hybrid_construction" | "full_face_freeride" | "visor_integrated";

export function impactProtection(t: SnowHelmetType): number {
  const m: Record<SnowHelmetType, number> = {
    in_mold_lightweight: 7, hard_shell_abs: 9, hybrid_construction: 8, full_face_freeride: 10, visor_integrated: 7,
  };
  return m[t];
}

export function weightScore(t: SnowHelmetType): number {
  const m: Record<SnowHelmetType, number> = {
    in_mold_lightweight: 2, hard_shell_abs: 8, hybrid_construction: 5, full_face_freeride: 9, visor_integrated: 6,
  };
  return m[t];
}

export function ventilationFlow(t: SnowHelmetType): number {
  const m: Record<SnowHelmetType, number> = {
    in_mold_lightweight: 9, hard_shell_abs: 5, hybrid_construction: 8, full_face_freeride: 4, visor_integrated: 7,
  };
  return m[t];
}

export function warmthInsulation(t: SnowHelmetType): number {
  const m: Record<SnowHelmetType, number> = {
    in_mold_lightweight: 6, hard_shell_abs: 8, hybrid_construction: 7, full_face_freeride: 9, visor_integrated: 7,
  };
  return m[t];
}

export function helmetCost(t: SnowHelmetType): number {
  const m: Record<SnowHelmetType, number> = {
    in_mold_lightweight: 6, hard_shell_abs: 4, hybrid_construction: 7, full_face_freeride: 9, visor_integrated: 10,
  };
  return m[t];
}

export function mipsEquipped(t: SnowHelmetType): boolean {
  const m: Record<SnowHelmetType, boolean> = {
    in_mold_lightweight: true, hard_shell_abs: false, hybrid_construction: true, full_face_freeride: true, visor_integrated: true,
  };
  return m[t];
}

export function audioCompatible(t: SnowHelmetType): boolean {
  const m: Record<SnowHelmetType, boolean> = {
    in_mold_lightweight: true, hard_shell_abs: false, hybrid_construction: true, full_face_freeride: false, visor_integrated: true,
  };
  return m[t];
}

export function shellDesign(t: SnowHelmetType): string {
  const m: Record<SnowHelmetType, string> = {
    in_mold_lightweight: "eps_fused_polycarbonate", hard_shell_abs: "injected_abs_eps_liner",
    hybrid_construction: "in_mold_top_abs_ear", full_face_freeride: "carbon_reinforced_chin_bar",
    visor_integrated: "in_mold_photochromic_visor",
  };
  return m[t];
}

export function bestRider(t: SnowHelmetType): string {
  const m: Record<SnowHelmetType, string> = {
    in_mold_lightweight: "resort_all_day_comfort", hard_shell_abs: "rental_budget_durable",
    hybrid_construction: "advanced_mixed_terrain", full_face_freeride: "big_mountain_cliff_drop",
    visor_integrated: "goggle_free_cruiser",
  };
  return m[t];
}

export function snowHelmets(): SnowHelmetType[] {
  return ["in_mold_lightweight", "hard_shell_abs", "hybrid_construction", "full_face_freeride", "visor_integrated"];
}
