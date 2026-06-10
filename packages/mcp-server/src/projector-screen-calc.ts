export type ProjectorScreenType = "fixed_frame_wall" | "motorized_ceiling" | "pull_down_manual" | "portable_tripod" | "ambient_light_reject";

export function imageQuality(t: ProjectorScreenType): number {
  const m: Record<ProjectorScreenType, number> = {
    fixed_frame_wall: 10, motorized_ceiling: 9, pull_down_manual: 6, portable_tripod: 5, ambient_light_reject: 8,
  };
  return m[t];
}

export function surfaceFlatness(t: ProjectorScreenType): number {
  const m: Record<ProjectorScreenType, number> = {
    fixed_frame_wall: 10, motorized_ceiling: 8, pull_down_manual: 5, portable_tripod: 4, ambient_light_reject: 9,
  };
  return m[t];
}

export function installConvenience(t: ProjectorScreenType): number {
  const m: Record<ProjectorScreenType, number> = {
    fixed_frame_wall: 3, motorized_ceiling: 4, pull_down_manual: 7, portable_tripod: 10, ambient_light_reject: 3,
  };
  return m[t];
}

export function hideAway(t: ProjectorScreenType): number {
  const m: Record<ProjectorScreenType, number> = {
    fixed_frame_wall: 1, motorized_ceiling: 10, pull_down_manual: 8, portable_tripod: 10, ambient_light_reject: 1,
  };
  return m[t];
}

export function screenCost(t: ProjectorScreenType): number {
  const m: Record<ProjectorScreenType, number> = {
    fixed_frame_wall: 6, motorized_ceiling: 8, pull_down_manual: 3, portable_tripod: 2, ambient_light_reject: 10,
  };
  return m[t];
}

export function tensionSystem(t: ProjectorScreenType): boolean {
  const m: Record<ProjectorScreenType, boolean> = {
    fixed_frame_wall: true, motorized_ceiling: true, pull_down_manual: false, portable_tripod: false, ambient_light_reject: true,
  };
  return m[t];
}

export function needsElectric(t: ProjectorScreenType): boolean {
  const m: Record<ProjectorScreenType, boolean> = {
    fixed_frame_wall: false, motorized_ceiling: true, pull_down_manual: false, portable_tripod: false, ambient_light_reject: false,
  };
  return m[t];
}

export function gainType(t: ProjectorScreenType): string {
  const m: Record<ProjectorScreenType, string> = {
    fixed_frame_wall: "matte_white_1_0_gain",
    motorized_ceiling: "fiberglass_1_1_gain",
    pull_down_manual: "vinyl_matte_0_9_gain",
    portable_tripod: "pvc_fabric_1_0_gain",
    ambient_light_reject: "angular_reflective_0_6_gain",
  };
  return m[t];
}

export function bestRoom(t: ProjectorScreenType): string {
  const m: Record<ProjectorScreenType, string> = {
    fixed_frame_wall: "dedicated_home_theater",
    motorized_ceiling: "dual_purpose_living_room",
    pull_down_manual: "classroom_conference",
    portable_tripod: "outdoor_movie_night",
    ambient_light_reject: "bright_room_daytime_view",
  };
  return m[t];
}

export function projectorScreens(): ProjectorScreenType[] {
  return ["fixed_frame_wall", "motorized_ceiling", "pull_down_manual", "portable_tripod", "ambient_light_reject"];
}
