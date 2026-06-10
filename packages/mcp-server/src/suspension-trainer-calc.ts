export type SuspensionTrainerType = "nylon_strap_basic" | "military_grade_heavy" | "door_anchor_home" | "ceiling_mount_gym" | "outdoor_tree_wrap";

export function exerciseRange(t: SuspensionTrainerType): number {
  const m: Record<SuspensionTrainerType, number> = {
    nylon_strap_basic: 7, military_grade_heavy: 9, door_anchor_home: 7, ceiling_mount_gym: 10, outdoor_tree_wrap: 8,
  };
  return m[t];
}

export function portability(t: SuspensionTrainerType): number {
  const m: Record<SuspensionTrainerType, number> = {
    nylon_strap_basic: 8, military_grade_heavy: 6, door_anchor_home: 9, ceiling_mount_gym: 2, outdoor_tree_wrap: 10,
  };
  return m[t];
}

export function weightCapacity(t: SuspensionTrainerType): number {
  const m: Record<SuspensionTrainerType, number> = {
    nylon_strap_basic: 7, military_grade_heavy: 10, door_anchor_home: 6, ceiling_mount_gym: 10, outdoor_tree_wrap: 8,
  };
  return m[t];
}

export function adjustability(t: SuspensionTrainerType): number {
  const m: Record<SuspensionTrainerType, number> = {
    nylon_strap_basic: 7, military_grade_heavy: 9, door_anchor_home: 7, ceiling_mount_gym: 9, outdoor_tree_wrap: 6,
  };
  return m[t];
}

export function trainerCost(t: SuspensionTrainerType): number {
  const m: Record<SuspensionTrainerType, number> = {
    nylon_strap_basic: 1, military_grade_heavy: 3, door_anchor_home: 2, ceiling_mount_gym: 3, outdoor_tree_wrap: 1,
  };
  return m[t];
}

export function noDrilling(t: SuspensionTrainerType): boolean {
  const m: Record<SuspensionTrainerType, boolean> = {
    nylon_strap_basic: true, military_grade_heavy: true, door_anchor_home: true, ceiling_mount_gym: false, outdoor_tree_wrap: true,
  };
  return m[t];
}

export function outdoorReady(t: SuspensionTrainerType): boolean {
  const m: Record<SuspensionTrainerType, boolean> = {
    nylon_strap_basic: true, military_grade_heavy: true, door_anchor_home: false, ceiling_mount_gym: false, outdoor_tree_wrap: true,
  };
  return m[t];
}

export function anchorStyle(t: SuspensionTrainerType): string {
  const m: Record<SuspensionTrainerType, string> = {
    nylon_strap_basic: "carabiner_clip_loop",
    military_grade_heavy: "reinforced_loop_plate",
    door_anchor_home: "foam_wedge_over_door",
    ceiling_mount_gym: "bolt_flange_mount",
    outdoor_tree_wrap: "padded_wrap_strap",
  };
  return m[t];
}

export function bestSetup(t: SuspensionTrainerType): string {
  const m: Record<SuspensionTrainerType, string> = {
    nylon_strap_basic: "budget_home_starter",
    military_grade_heavy: "tactical_field_training",
    door_anchor_home: "apartment_no_install",
    ceiling_mount_gym: "dedicated_home_gym",
    outdoor_tree_wrap: "park_travel_workout",
  };
  return m[t];
}

export function suspensionTrainers(): SuspensionTrainerType[] {
  return ["nylon_strap_basic", "military_grade_heavy", "door_anchor_home", "ceiling_mount_gym", "outdoor_tree_wrap"];
}
