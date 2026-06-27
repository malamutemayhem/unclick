export type WristWrapType = "cotton_loop_thumb" | "elastic_competition_stiff" | "neoprene_velcro_support" | "leather_buckle_old_school" | "gel_padded_comfort";

export function wristStability(t: WristWrapType): number {
  const m: Record<WristWrapType, number> = {
    cotton_loop_thumb: 7, elastic_competition_stiff: 10, neoprene_velcro_support: 6, leather_buckle_old_school: 8, gel_padded_comfort: 5,
  };
  return m[t];
}

export function comfort(t: WristWrapType): number {
  const m: Record<WristWrapType, number> = {
    cotton_loop_thumb: 8, elastic_competition_stiff: 5, neoprene_velcro_support: 8, leather_buckle_old_school: 6, gel_padded_comfort: 10,
  };
  return m[t];
}

export function easeOfUse(t: WristWrapType): number {
  const m: Record<WristWrapType, number> = {
    cotton_loop_thumb: 8, elastic_competition_stiff: 6, neoprene_velcro_support: 9, leather_buckle_old_school: 5, gel_padded_comfort: 10,
  };
  return m[t];
}

export function durability(t: WristWrapType): number {
  const m: Record<WristWrapType, number> = {
    cotton_loop_thumb: 7, elastic_competition_stiff: 8, neoprene_velcro_support: 7, leather_buckle_old_school: 10, gel_padded_comfort: 6,
  };
  return m[t];
}

export function wrapCost(t: WristWrapType): number {
  const m: Record<WristWrapType, number> = {
    cotton_loop_thumb: 1, elastic_competition_stiff: 2, neoprene_velcro_support: 2, leather_buckle_old_school: 3, gel_padded_comfort: 2,
  };
  return m[t];
}

export function thumbLoop(t: WristWrapType): boolean {
  const m: Record<WristWrapType, boolean> = {
    cotton_loop_thumb: true, elastic_competition_stiff: true, neoprene_velcro_support: false, leather_buckle_old_school: false, gel_padded_comfort: false,
  };
  return m[t];
}

export function compApproved(t: WristWrapType): boolean {
  const m: Record<WristWrapType, boolean> = {
    cotton_loop_thumb: true, elastic_competition_stiff: true, neoprene_velcro_support: false, leather_buckle_old_school: false, gel_padded_comfort: false,
  };
  return m[t];
}

export function closureMethod(t: WristWrapType): string {
  const m: Record<WristWrapType, string> = {
    cotton_loop_thumb: "velcro_self_wrap",
    elastic_competition_stiff: "velcro_long_tail",
    neoprene_velcro_support: "neoprene_velcro_strap",
    leather_buckle_old_school: "metal_buckle_prong",
    gel_padded_comfort: "slip_on_elastic_band",
  };
  return m[t];
}

export function bestLift(t: WristWrapType): string {
  const m: Record<WristWrapType, string> = {
    cotton_loop_thumb: "bench_press_general",
    elastic_competition_stiff: "max_overhead_squat",
    neoprene_velcro_support: "rehab_light_support",
    leather_buckle_old_school: "strongman_heavy_carry",
    gel_padded_comfort: "casual_gym_session",
  };
  return m[t];
}

export function wristWraps(): WristWrapType[] {
  return ["cotton_loop_thumb", "elastic_competition_stiff", "neoprene_velcro_support", "leather_buckle_old_school", "gel_padded_comfort"];
}
