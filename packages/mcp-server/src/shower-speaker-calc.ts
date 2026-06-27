export type ShowerSpeakerType = "suction_cup_bluetooth" | "hanging_hook_portable" | "built_in_led_light" | "floating_pool_dual" | "mirror_mount_clock";

export function soundQuality(t: ShowerSpeakerType): number {
  const m: Record<ShowerSpeakerType, number> = {
    suction_cup_bluetooth: 6, hanging_hook_portable: 7, built_in_led_light: 7, floating_pool_dual: 8, mirror_mount_clock: 6,
  };
  return m[t];
}

export function waterproofRating(t: ShowerSpeakerType): number {
  const m: Record<ShowerSpeakerType, number> = {
    suction_cup_bluetooth: 8, hanging_hook_portable: 7, built_in_led_light: 8, floating_pool_dual: 10, mirror_mount_clock: 7,
  };
  return m[t];
}

export function batteryLife(t: ShowerSpeakerType): number {
  const m: Record<ShowerSpeakerType, number> = {
    suction_cup_bluetooth: 7, hanging_hook_portable: 8, built_in_led_light: 5, floating_pool_dual: 9, mirror_mount_clock: 6,
  };
  return m[t];
}

export function mountEase(t: ShowerSpeakerType): number {
  const m: Record<ShowerSpeakerType, number> = {
    suction_cup_bluetooth: 10, hanging_hook_portable: 9, built_in_led_light: 7, floating_pool_dual: 10, mirror_mount_clock: 8,
  };
  return m[t];
}

export function speakerCost(t: ShowerSpeakerType): number {
  const m: Record<ShowerSpeakerType, number> = {
    suction_cup_bluetooth: 2, hanging_hook_portable: 2, built_in_led_light: 3, floating_pool_dual: 3, mirror_mount_clock: 3,
  };
  return m[t];
}

export function hasLedLight(t: ShowerSpeakerType): boolean {
  const m: Record<ShowerSpeakerType, boolean> = {
    suction_cup_bluetooth: false, hanging_hook_portable: false, built_in_led_light: true, floating_pool_dual: true, mirror_mount_clock: false,
  };
  return m[t];
}

export function floats(t: ShowerSpeakerType): boolean {
  const m: Record<ShowerSpeakerType, boolean> = {
    suction_cup_bluetooth: false, hanging_hook_portable: false, built_in_led_light: false, floating_pool_dual: true, mirror_mount_clock: false,
  };
  return m[t];
}

export function connectType(t: ShowerSpeakerType): string {
  const m: Record<ShowerSpeakerType, string> = {
    suction_cup_bluetooth: "bluetooth_5_0_standard",
    hanging_hook_portable: "bluetooth_aux_dual",
    built_in_led_light: "bluetooth_rgb_sync",
    floating_pool_dual: "bluetooth_tws_stereo",
    mirror_mount_clock: "bluetooth_fm_radio",
  };
  return m[t];
}

export function bestSpot(t: ShowerSpeakerType): string {
  const m: Record<ShowerSpeakerType, string> = {
    suction_cup_bluetooth: "shower_wall_tile",
    hanging_hook_portable: "shower_door_hook",
    built_in_led_light: "party_mood_bathroom",
    floating_pool_dual: "pool_hot_tub_float",
    mirror_mount_clock: "vanity_mirror_routine",
  };
  return m[t];
}

export function showerSpeakers(): ShowerSpeakerType[] {
  return ["suction_cup_bluetooth", "hanging_hook_portable", "built_in_led_light", "floating_pool_dual", "mirror_mount_clock"];
}
