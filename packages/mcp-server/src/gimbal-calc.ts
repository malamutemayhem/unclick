export type GimbalType = "phone_single_axis" | "phone_three_axis" | "camera_dslr_heavy" | "action_cam_compact" | "vest_arm_cinema";

export function stabilization(t: GimbalType): number {
  const m: Record<GimbalType, number> = {
    phone_single_axis: 4, phone_three_axis: 8, camera_dslr_heavy: 9, action_cam_compact: 7, vest_arm_cinema: 10,
  };
  return m[t];
}

export function payload(t: GimbalType): number {
  const m: Record<GimbalType, number> = {
    phone_single_axis: 2, phone_three_axis: 3, camera_dslr_heavy: 9, action_cam_compact: 2, vest_arm_cinema: 10,
  };
  return m[t];
}

export function portability(t: GimbalType): number {
  const m: Record<GimbalType, number> = {
    phone_single_axis: 10, phone_three_axis: 8, camera_dslr_heavy: 3, action_cam_compact: 9, vest_arm_cinema: 1,
  };
  return m[t];
}

export function batteryLife(t: GimbalType): number {
  const m: Record<GimbalType, number> = {
    phone_single_axis: 7, phone_three_axis: 8, camera_dslr_heavy: 6, action_cam_compact: 7, vest_arm_cinema: 5,
  };
  return m[t];
}

export function gimbalCost(t: GimbalType): number {
  const m: Record<GimbalType, number> = {
    phone_single_axis: 2, phone_three_axis: 4, camera_dslr_heavy: 7, action_cam_compact: 3, vest_arm_cinema: 10,
  };
  return m[t];
}

export function hasTracking(t: GimbalType): boolean {
  const m: Record<GimbalType, boolean> = {
    phone_single_axis: false, phone_three_axis: true, camera_dslr_heavy: true, action_cam_compact: false, vest_arm_cinema: false,
  };
  return m[t];
}

export function foldable(t: GimbalType): boolean {
  const m: Record<GimbalType, boolean> = {
    phone_single_axis: true, phone_three_axis: true, camera_dslr_heavy: false, action_cam_compact: false, vest_arm_cinema: false,
  };
  return m[t];
}

export function axisType(t: GimbalType): string {
  const m: Record<GimbalType, string> = {
    phone_single_axis: "single_axis_tilt",
    phone_three_axis: "three_axis_brushless",
    camera_dslr_heavy: "three_axis_high_torque",
    action_cam_compact: "three_axis_mini_motor",
    vest_arm_cinema: "spring_arm_vest_iso",
  };
  return m[t];
}

export function bestCamera(t: GimbalType): string {
  const m: Record<GimbalType, string> = {
    phone_single_axis: "casual_phone_vlog",
    phone_three_axis: "creator_phone_content",
    camera_dslr_heavy: "dslr_mirrorless_cinema",
    action_cam_compact: "gopro_action_sport",
    vest_arm_cinema: "film_production_heavy",
  };
  return m[t];
}

export function gimbals(): GimbalType[] {
  return ["phone_single_axis", "phone_three_axis", "camera_dslr_heavy", "action_cam_compact", "vest_arm_cinema"];
}
