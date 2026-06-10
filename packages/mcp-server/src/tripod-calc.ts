export type TripodType = "aluminum_travel" | "carbon_fiber_pro" | "tabletop_mini" | "flexible_gorilla" | "video_fluid_head";

export function loadCapacity(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 6, carbon_fiber_pro: 9, tabletop_mini: 3, flexible_gorilla: 4, video_fluid_head: 10,
  };
  return m[t];
}

export function tripodWeight(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 6, carbon_fiber_pro: 9, tabletop_mini: 10, flexible_gorilla: 9, video_fluid_head: 2,
  };
  return m[t];
}

export function maxHeight(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 7, carbon_fiber_pro: 9, tabletop_mini: 2, flexible_gorilla: 3, video_fluid_head: 8,
  };
  return m[t];
}

export function stability(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 6, carbon_fiber_pro: 9, tabletop_mini: 5, flexible_gorilla: 4, video_fluid_head: 10,
  };
  return m[t];
}

export function tripodCost(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 3, carbon_fiber_pro: 9, tabletop_mini: 2, flexible_gorilla: 4, video_fluid_head: 8,
  };
  return m[t];
}

export function quickRelease(t: TripodType): boolean {
  const m: Record<TripodType, boolean> = {
    aluminum_travel: true, carbon_fiber_pro: true, tabletop_mini: false, flexible_gorilla: true, video_fluid_head: true,
  };
  return m[t];
}

export function panSmooth(t: TripodType): boolean {
  const m: Record<TripodType, boolean> = {
    aluminum_travel: false, carbon_fiber_pro: false, tabletop_mini: false, flexible_gorilla: false, video_fluid_head: true,
  };
  return m[t];
}

export function headType(t: TripodType): string {
  const m: Record<TripodType, string> = {
    aluminum_travel: "ball_head_compact", carbon_fiber_pro: "arca_swiss_ball",
    tabletop_mini: "tilt_head_simple", flexible_gorilla: "ball_socket_wrap",
    video_fluid_head: "fluid_drag_pan_tilt",
  };
  return m[t];
}

export function bestShoot(t: TripodType): string {
  const m: Record<TripodType, string> = {
    aluminum_travel: "travel_landscape_general", carbon_fiber_pro: "studio_long_exposure_pro",
    tabletop_mini: "desk_vlog_product_shot", flexible_gorilla: "creative_angle_mount_anywhere",
    video_fluid_head: "cinema_interview_pan_track",
  };
  return m[t];
}

export function tripods(): TripodType[] {
  return ["aluminum_travel", "carbon_fiber_pro", "tabletop_mini", "flexible_gorilla", "video_fluid_head"];
}
