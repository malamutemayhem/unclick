export type SpeakerStandType = "floor_pillar" | "desk_isolation_pad" | "wall_mount_bracket" | "ceiling_pendant" | "studio_monitor_arm";

export function vibrationIsolation(t: SpeakerStandType): number {
  const m: Record<SpeakerStandType, number> = {
    floor_pillar: 8, desk_isolation_pad: 9, wall_mount_bracket: 5, ceiling_pendant: 7, studio_monitor_arm: 10,
  };
  return m[t];
}

export function heightAdjust(t: SpeakerStandType): number {
  const m: Record<SpeakerStandType, number> = {
    floor_pillar: 6, desk_isolation_pad: 2, wall_mount_bracket: 4, ceiling_pendant: 3, studio_monitor_arm: 10,
  };
  return m[t];
}

export function weightCapacity(t: SpeakerStandType): number {
  const m: Record<SpeakerStandType, number> = {
    floor_pillar: 9, desk_isolation_pad: 7, wall_mount_bracket: 6, ceiling_pendant: 5, studio_monitor_arm: 8,
  };
  return m[t];
}

export function floorSaving(t: SpeakerStandType): number {
  const m: Record<SpeakerStandType, number> = {
    floor_pillar: 3, desk_isolation_pad: 7, wall_mount_bracket: 10, ceiling_pendant: 10, studio_monitor_arm: 8,
  };
  return m[t];
}

export function standCost(t: SpeakerStandType): number {
  const m: Record<SpeakerStandType, number> = {
    floor_pillar: 5, desk_isolation_pad: 2, wall_mount_bracket: 4, ceiling_pendant: 6, studio_monitor_arm: 9,
  };
  return m[t];
}

export function fillable(t: SpeakerStandType): boolean {
  const m: Record<SpeakerStandType, boolean> = {
    floor_pillar: true, desk_isolation_pad: false, wall_mount_bracket: false, ceiling_pendant: false, studio_monitor_arm: false,
  };
  return m[t];
}

export function tiltSwivel(t: SpeakerStandType): boolean {
  const m: Record<SpeakerStandType, boolean> = {
    floor_pillar: false, desk_isolation_pad: false, wall_mount_bracket: true, ceiling_pendant: true, studio_monitor_arm: true,
  };
  return m[t];
}

export function mountStyle(t: SpeakerStandType): string {
  const m: Record<SpeakerStandType, string> = {
    floor_pillar: "weighted_base_column",
    desk_isolation_pad: "foam_rubber_decouple_pad",
    wall_mount_bracket: "stud_mount_pivot_arm",
    ceiling_pendant: "drop_rod_swivel_plate",
    studio_monitor_arm: "clamp_arm_gas_spring",
  };
  return m[t];
}

export function bestSetup(t: SpeakerStandType): string {
  const m: Record<SpeakerStandType, string> = {
    floor_pillar: "hifi_stereo_listening",
    desk_isolation_pad: "desktop_nearfield_mix",
    wall_mount_bracket: "surround_sound_rear",
    ceiling_pendant: "commercial_install_pa",
    studio_monitor_arm: "studio_flexible_position",
  };
  return m[t];
}

export function speakerStands(): SpeakerStandType[] {
  return ["floor_pillar", "desk_isolation_pad", "wall_mount_bracket", "ceiling_pendant", "studio_monitor_arm"];
}
