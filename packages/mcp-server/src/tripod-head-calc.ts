export type TripodHeadType = "ball_head_quick" | "pan_tilt_three_way" | "fluid_video_smooth" | "gimbal_telephoto" | "geared_macro_precise";

export function smoothness(t: TripodHeadType): number {
  const m: Record<TripodHeadType, number> = {
    ball_head_quick: 7, pan_tilt_three_way: 6, fluid_video_smooth: 10, gimbal_telephoto: 8, geared_macro_precise: 5,
  };
  return m[t];
}

export function precision(t: TripodHeadType): number {
  const m: Record<TripodHeadType, number> = {
    ball_head_quick: 6, pan_tilt_three_way: 8, fluid_video_smooth: 7, gimbal_telephoto: 5, geared_macro_precise: 10,
  };
  return m[t];
}

export function loadCapacity(t: TripodHeadType): number {
  const m: Record<TripodHeadType, number> = {
    ball_head_quick: 7, pan_tilt_three_way: 6, fluid_video_smooth: 8, gimbal_telephoto: 10, geared_macro_precise: 5,
  };
  return m[t];
}

export function setupSpeed(t: TripodHeadType): number {
  const m: Record<TripodHeadType, number> = {
    ball_head_quick: 10, pan_tilt_three_way: 6, fluid_video_smooth: 7, gimbal_telephoto: 5, geared_macro_precise: 3,
  };
  return m[t];
}

export function headCost(t: TripodHeadType): number {
  const m: Record<TripodHeadType, number> = {
    ball_head_quick: 5, pan_tilt_three_way: 4, fluid_video_smooth: 8, gimbal_telephoto: 9, geared_macro_precise: 7,
  };
  return m[t];
}

export function quickRelease(t: TripodHeadType): boolean {
  const m: Record<TripodHeadType, boolean> = {
    ball_head_quick: true, pan_tilt_three_way: true, fluid_video_smooth: true, gimbal_telephoto: true, geared_macro_precise: true,
  };
  return m[t];
}

export function arcaSwissCompat(t: TripodHeadType): boolean {
  const m: Record<TripodHeadType, boolean> = {
    ball_head_quick: true, pan_tilt_three_way: false, fluid_video_smooth: false, gimbal_telephoto: true, geared_macro_precise: true,
  };
  return m[t];
}

export function headMechanism(t: TripodHeadType): string {
  const m: Record<TripodHeadType, string> = {
    ball_head_quick: "single_lock_ball_socket",
    pan_tilt_three_way: "three_axis_handle_lock",
    fluid_video_smooth: "hydraulic_drag_cartridge",
    gimbal_telephoto: "pivoting_cradle_balance",
    geared_macro_precise: "worm_gear_knob_drive",
  };
  return m[t];
}

export function bestShot(t: TripodHeadType): string {
  const m: Record<TripodHeadType, string> = {
    ball_head_quick: "travel_landscape_general",
    pan_tilt_three_way: "architecture_studio_level",
    fluid_video_smooth: "video_cinematic_pan",
    gimbal_telephoto: "wildlife_sports_telephoto",
    geared_macro_precise: "macro_product_still_life",
  };
  return m[t];
}

export function tripodHeads(): TripodHeadType[] {
  return ["ball_head_quick", "pan_tilt_three_way", "fluid_video_smooth", "gimbal_telephoto", "geared_macro_precise"];
}
