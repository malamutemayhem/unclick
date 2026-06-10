export type PullUpBarType = "doorway_mount" | "wall_ceiling" | "freestanding_tower" | "outdoor_park" | "portable_travel";

export function gripVariety(t: PullUpBarType): number {
  const m: Record<PullUpBarType, number> = {
    doorway_mount: 6, wall_ceiling: 8, freestanding_tower: 10, outdoor_park: 5, portable_travel: 4,
  };
  return m[t];
}

export function weightLimit(t: PullUpBarType): number {
  const m: Record<PullUpBarType, number> = {
    doorway_mount: 5, wall_ceiling: 9, freestanding_tower: 10, outdoor_park: 10, portable_travel: 4,
  };
  return m[t];
}

export function installEase(t: PullUpBarType): number {
  const m: Record<PullUpBarType, number> = {
    doorway_mount: 10, wall_ceiling: 3, freestanding_tower: 5, outdoor_park: 1, portable_travel: 9,
  };
  return m[t];
}

export function stability(t: PullUpBarType): number {
  const m: Record<PullUpBarType, number> = {
    doorway_mount: 5, wall_ceiling: 10, freestanding_tower: 9, outdoor_park: 10, portable_travel: 3,
  };
  return m[t];
}

export function barCost(t: PullUpBarType): number {
  const m: Record<PullUpBarType, number> = {
    doorway_mount: 2, wall_ceiling: 5, freestanding_tower: 8, outdoor_park: 10, portable_travel: 3,
  };
  return m[t];
}

export function noDrillInstall(t: PullUpBarType): boolean {
  const m: Record<PullUpBarType, boolean> = {
    doorway_mount: true, wall_ceiling: false, freestanding_tower: true, outdoor_park: false, portable_travel: true,
  };
  return m[t];
}

export function multiExercise(t: PullUpBarType): boolean {
  const m: Record<PullUpBarType, boolean> = {
    doorway_mount: false, wall_ceiling: false, freestanding_tower: true, outdoor_park: true, portable_travel: false,
  };
  return m[t];
}

export function mountMethod(t: PullUpBarType): string {
  const m: Record<PullUpBarType, string> = {
    doorway_mount: "leverage_pressure_fit",
    wall_ceiling: "bolt_bracket_fixed",
    freestanding_tower: "weighted_base_frame",
    outdoor_park: "concrete_anchor_post",
    portable_travel: "strap_loop_hang",
  };
  return m[t];
}

export function bestSetup(t: PullUpBarType): string {
  const m: Record<PullUpBarType, string> = {
    doorway_mount: "apartment_no_damage",
    wall_ceiling: "garage_gym_permanent",
    freestanding_tower: "home_gym_full_station",
    outdoor_park: "community_calisthenics",
    portable_travel: "hotel_travel_workout",
  };
  return m[t];
}

export function pullUpBars(): PullUpBarType[] {
  return ["doorway_mount", "wall_ceiling", "freestanding_tower", "outdoor_park", "portable_travel"];
}
