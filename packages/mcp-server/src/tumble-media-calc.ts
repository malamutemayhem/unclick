export type TumbleMediaType = "stainless_shot_burnish" | "ceramic_triangle_deburr" | "walnut_shell_dry" | "plastic_pyramid_prepolish" | "corn_cob_absorb";

export function polishSpeed(t: TumbleMediaType): number {
  const m: Record<TumbleMediaType, number> = {
    stainless_shot_burnish: 9, ceramic_triangle_deburr: 7, walnut_shell_dry: 5, plastic_pyramid_prepolish: 6, corn_cob_absorb: 4,
  };
  return m[t];
}

export function surfaceFinish(t: TumbleMediaType): number {
  const m: Record<TumbleMediaType, number> = {
    stainless_shot_burnish: 10, ceramic_triangle_deburr: 6, walnut_shell_dry: 7, plastic_pyramid_prepolish: 8, corn_cob_absorb: 5,
  };
  return m[t];
}

export function deburring(t: TumbleMediaType): number {
  const m: Record<TumbleMediaType, number> = {
    stainless_shot_burnish: 4, ceramic_triangle_deburr: 10, walnut_shell_dry: 2, plastic_pyramid_prepolish: 7, corn_cob_absorb: 1,
  };
  return m[t];
}

export function mediaLife(t: TumbleMediaType): number {
  const m: Record<TumbleMediaType, number> = {
    stainless_shot_burnish: 10, ceramic_triangle_deburr: 7, walnut_shell_dry: 4, plastic_pyramid_prepolish: 6, corn_cob_absorb: 3,
  };
  return m[t];
}

export function mediaCost(t: TumbleMediaType): number {
  const m: Record<TumbleMediaType, number> = {
    stainless_shot_burnish: 4, ceramic_triangle_deburr: 2, walnut_shell_dry: 1, plastic_pyramid_prepolish: 2, corn_cob_absorb: 1,
  };
  return m[t];
}

export function wetProcess(t: TumbleMediaType): boolean {
  const m: Record<TumbleMediaType, boolean> = {
    stainless_shot_burnish: true, ceramic_triangle_deburr: true, walnut_shell_dry: false, plastic_pyramid_prepolish: true, corn_cob_absorb: false,
  };
  return m[t];
}

export function reusable(t: TumbleMediaType): boolean {
  const m: Record<TumbleMediaType, boolean> = {
    stainless_shot_burnish: true, ceramic_triangle_deburr: true, walnut_shell_dry: false, plastic_pyramid_prepolish: true, corn_cob_absorb: false,
  };
  return m[t];
}

export function mediaShape(t: TumbleMediaType): string {
  const m: Record<TumbleMediaType, string> = {
    stainless_shot_burnish: "mixed_pin_ball_shape",
    ceramic_triangle_deburr: "triangle_angle_cut",
    walnut_shell_dry: "crushed_shell_granule",
    plastic_pyramid_prepolish: "pyramid_cone_shape",
    corn_cob_absorb: "ground_cob_granule",
  };
  return m[t];
}

export function bestUse(t: TumbleMediaType): string {
  const m: Record<TumbleMediaType, string> = {
    stainless_shot_burnish: "high_shine_burnish",
    ceramic_triangle_deburr: "rough_edge_removal",
    walnut_shell_dry: "gentle_dry_polish",
    plastic_pyramid_prepolish: "smooth_prepolish_step",
    corn_cob_absorb: "compound_absorb_final",
  };
  return m[t];
}

export function tumbleMedias(): TumbleMediaType[] {
  return ["stainless_shot_burnish", "ceramic_triangle_deburr", "walnut_shell_dry", "plastic_pyramid_prepolish", "corn_cob_absorb"];
}
