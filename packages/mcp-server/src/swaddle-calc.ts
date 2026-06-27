export type SwaddleType = "muslin_wrap_classic" | "velcro_pod_easy" | "zipper_sleep_sack" | "arms_up_starfish" | "weighted_calming";

export function wrapSecure(t: SwaddleType): number {
  const m: Record<SwaddleType, number> = {
    muslin_wrap_classic: 6, velcro_pod_easy: 9, zipper_sleep_sack: 8, arms_up_starfish: 7, weighted_calming: 8,
  };
  return m[t];
}

export function breathability(t: SwaddleType): number {
  const m: Record<SwaddleType, number> = {
    muslin_wrap_classic: 10, velcro_pod_easy: 7, zipper_sleep_sack: 6, arms_up_starfish: 8, weighted_calming: 5,
  };
  return m[t];
}

export function easeOfUse(t: SwaddleType): number {
  const m: Record<SwaddleType, number> = {
    muslin_wrap_classic: 4, velcro_pod_easy: 10, zipper_sleep_sack: 9, arms_up_starfish: 8, weighted_calming: 7,
  };
  return m[t];
}

export function transitionFriendly(t: SwaddleType): number {
  const m: Record<SwaddleType, number> = {
    muslin_wrap_classic: 5, velcro_pod_easy: 6, zipper_sleep_sack: 8, arms_up_starfish: 10, weighted_calming: 7,
  };
  return m[t];
}

export function swaddleCost(t: SwaddleType): number {
  const m: Record<SwaddleType, number> = {
    muslin_wrap_classic: 4, velcro_pod_easy: 6, zipper_sleep_sack: 7, arms_up_starfish: 8, weighted_calming: 9,
  };
  return m[t];
}

export function machineWash(t: SwaddleType): boolean {
  const m: Record<SwaddleType, boolean> = {
    muslin_wrap_classic: true, velcro_pod_easy: true, zipper_sleep_sack: true, arms_up_starfish: true, weighted_calming: true,
  };
  return m[t];
}

export function hipSafe(t: SwaddleType): boolean {
  const m: Record<SwaddleType, boolean> = {
    muslin_wrap_classic: true, velcro_pod_easy: true, zipper_sleep_sack: true, arms_up_starfish: true, weighted_calming: false,
  };
  return m[t];
}

export function fabricType(t: SwaddleType): string {
  const m: Record<SwaddleType, string> = {
    muslin_wrap_classic: "organic_cotton_muslin_layer",
    velcro_pod_easy: "cotton_spandex_hook_loop",
    zipper_sleep_sack: "bamboo_rayon_zip_front",
    arms_up_starfish: "cotton_jersey_arm_pouch",
    weighted_calming: "quilted_poly_micro_bead",
  };
  return m[t];
}

export function bestAge(t: SwaddleType): string {
  const m: Record<SwaddleType, string> = {
    muslin_wrap_classic: "newborn_first_weeks",
    velcro_pod_easy: "new_parent_learning_wrap",
    zipper_sleep_sack: "three_to_twelve_months",
    arms_up_starfish: "rolling_transition_phase",
    weighted_calming: "fussy_colic_calm_need",
  };
  return m[t];
}

export function swaddles(): SwaddleType[] {
  return ["muslin_wrap_classic", "velcro_pod_easy", "zipper_sleep_sack", "arms_up_starfish", "weighted_calming"];
}
