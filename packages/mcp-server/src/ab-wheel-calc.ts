export type AbWheelType = "single_wheel_basic" | "dual_wheel_wide" | "four_wheel_stable" | "spring_assist" | "roller_slide_track";

export function coreActivation(t: AbWheelType): number {
  const m: Record<AbWheelType, number> = {
    single_wheel_basic: 10, dual_wheel_wide: 8, four_wheel_stable: 6, spring_assist: 5, roller_slide_track: 7,
  };
  return m[t];
}

export function balanceDifficulty(t: AbWheelType): number {
  const m: Record<AbWheelType, number> = {
    single_wheel_basic: 10, dual_wheel_wide: 6, four_wheel_stable: 3, spring_assist: 4, roller_slide_track: 2,
  };
  return m[t];
}

export function beginnerFriendly(t: AbWheelType): number {
  const m: Record<AbWheelType, number> = {
    single_wheel_basic: 3, dual_wheel_wide: 6, four_wheel_stable: 9, spring_assist: 10, roller_slide_track: 8,
  };
  return m[t];
}

export function portability(t: AbWheelType): number {
  const m: Record<AbWheelType, number> = {
    single_wheel_basic: 10, dual_wheel_wide: 9, four_wheel_stable: 7, spring_assist: 6, roller_slide_track: 3,
  };
  return m[t];
}

export function wheelCost(t: AbWheelType): number {
  const m: Record<AbWheelType, number> = {
    single_wheel_basic: 1, dual_wheel_wide: 3, four_wheel_stable: 4, spring_assist: 6, roller_slide_track: 8,
  };
  return m[t];
}

export function hasKneePad(t: AbWheelType): boolean {
  const m: Record<AbWheelType, boolean> = {
    single_wheel_basic: false, dual_wheel_wide: true, four_wheel_stable: true, spring_assist: true, roller_slide_track: true,
  };
  return m[t];
}

export function returnAssist(t: AbWheelType): boolean {
  const m: Record<AbWheelType, boolean> = {
    single_wheel_basic: false, dual_wheel_wide: false, four_wheel_stable: false, spring_assist: true, roller_slide_track: false,
  };
  return m[t];
}

export function wheelDesign(t: AbWheelType): string {
  const m: Record<AbWheelType, string> = {
    single_wheel_basic: "narrow_rubber_single",
    dual_wheel_wide: "parallel_twin_grip",
    four_wheel_stable: "quad_corner_platform",
    spring_assist: "coil_rebound_center",
    roller_slide_track: "rail_guided_carriage",
  };
  return m[t];
}

export function bestUser(t: AbWheelType): string {
  const m: Record<AbWheelType, string> = {
    single_wheel_basic: "advanced_core_strength",
    dual_wheel_wide: "intermediate_home_gym",
    four_wheel_stable: "beginner_learning_form",
    spring_assist: "rehab_gradual_progress",
    roller_slide_track: "full_body_guided_workout",
  };
  return m[t];
}

export function abWheels(): AbWheelType[] {
  return ["single_wheel_basic", "dual_wheel_wide", "four_wheel_stable", "spring_assist", "roller_slide_track"];
}
