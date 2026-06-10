export type CommandStripType = "small_picture_hang" | "medium_utility_hook" | "large_damage_free" | "outdoor_weatherproof" | "velcro_industrial_hold";

export function holdWeight(t: CommandStripType): number {
  const m: Record<CommandStripType, number> = {
    small_picture_hang: 3, medium_utility_hook: 5, large_damage_free: 7, outdoor_weatherproof: 6, velcro_industrial_hold: 9,
  };
  return m[t];
}

export function removeClean(t: CommandStripType): number {
  const m: Record<CommandStripType, number> = {
    small_picture_hang: 10, medium_utility_hook: 9, large_damage_free: 9, outdoor_weatherproof: 7, velcro_industrial_hold: 5,
  };
  return m[t];
}

export function reapplyEase(t: CommandStripType): number {
  const m: Record<CommandStripType, number> = {
    small_picture_hang: 8, medium_utility_hook: 7, large_damage_free: 7, outdoor_weatherproof: 5, velcro_industrial_hold: 4,
  };
  return m[t];
}

export function surfaceRange(t: CommandStripType): number {
  const m: Record<CommandStripType, number> = {
    small_picture_hang: 7, medium_utility_hook: 8, large_damage_free: 8, outdoor_weatherproof: 9, velcro_industrial_hold: 6,
  };
  return m[t];
}

export function stripCost(t: CommandStripType): number {
  const m: Record<CommandStripType, number> = {
    small_picture_hang: 3, medium_utility_hook: 5, large_damage_free: 6, outdoor_weatherproof: 7, velcro_industrial_hold: 8,
  };
  return m[t];
}

export function waterResistant(t: CommandStripType): boolean {
  const m: Record<CommandStripType, boolean> = {
    small_picture_hang: false, medium_utility_hook: false, large_damage_free: false, outdoor_weatherproof: true, velcro_industrial_hold: true,
  };
  return m[t];
}

export function renterFriendly(t: CommandStripType): boolean {
  const m: Record<CommandStripType, boolean> = {
    small_picture_hang: true, medium_utility_hook: true, large_damage_free: true, outdoor_weatherproof: true, velcro_industrial_hold: false,
  };
  return m[t];
}

export function adhesiveType(t: CommandStripType): string {
  const m: Record<CommandStripType, string> = {
    small_picture_hang: "stretch_release_foam",
    medium_utility_hook: "stretch_release_reinforced",
    large_damage_free: "dual_lock_stretch_tab",
    outdoor_weatherproof: "all_weather_acrylic_bond",
    velcro_industrial_hold: "industrial_loop_hook_tape",
  };
  return m[t];
}

export function bestUse(t: CommandStripType): string {
  const m: Record<CommandStripType, string> = {
    small_picture_hang: "lightweight_photo_poster",
    medium_utility_hook: "coat_hook_key_holder",
    large_damage_free: "mirror_canvas_heavy_frame",
    outdoor_weatherproof: "patio_decor_outdoor_light",
    velcro_industrial_hold: "workshop_tool_mount_heavy",
  };
  return m[t];
}

export function commandStrips(): CommandStripType[] {
  return ["small_picture_hang", "medium_utility_hook", "large_damage_free", "outdoor_weatherproof", "velcro_industrial_hold"];
}
