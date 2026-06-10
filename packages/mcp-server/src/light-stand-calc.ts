export type LightStandType = "standard_air_cushion" | "c_stand_turtle_base" | "boom_arm_counterweight" | "mini_backlight_low" | "rolling_caster_heavy";

export function maxHeight(t: LightStandType): number {
  const m: Record<LightStandType, number> = {
    standard_air_cushion: 7, c_stand_turtle_base: 9, boom_arm_counterweight: 10, mini_backlight_low: 3, rolling_caster_heavy: 8,
  };
  return m[t];
}

export function stability(t: LightStandType): number {
  const m: Record<LightStandType, number> = {
    standard_air_cushion: 6, c_stand_turtle_base: 10, boom_arm_counterweight: 8, mini_backlight_low: 7, rolling_caster_heavy: 9,
  };
  return m[t];
}

export function portability(t: LightStandType): number {
  const m: Record<LightStandType, number> = {
    standard_air_cushion: 8, c_stand_turtle_base: 3, boom_arm_counterweight: 2, mini_backlight_low: 10, rolling_caster_heavy: 4,
  };
  return m[t];
}

export function loadCapacity(t: LightStandType): number {
  const m: Record<LightStandType, number> = {
    standard_air_cushion: 5, c_stand_turtle_base: 9, boom_arm_counterweight: 10, mini_backlight_low: 3, rolling_caster_heavy: 9,
  };
  return m[t];
}

export function standCost(t: LightStandType): number {
  const m: Record<LightStandType, number> = {
    standard_air_cushion: 3, c_stand_turtle_base: 7, boom_arm_counterweight: 8, mini_backlight_low: 2, rolling_caster_heavy: 6,
  };
  return m[t];
}

export function hasWheels(t: LightStandType): boolean {
  const m: Record<LightStandType, boolean> = {
    standard_air_cushion: false, c_stand_turtle_base: false, boom_arm_counterweight: false, mini_backlight_low: false, rolling_caster_heavy: true,
  };
  return m[t];
}

export function nestableLegs(t: LightStandType): boolean {
  const m: Record<LightStandType, boolean> = {
    standard_air_cushion: false, c_stand_turtle_base: true, boom_arm_counterweight: true, mini_backlight_low: false, rolling_caster_heavy: false,
  };
  return m[t];
}

export function legType(t: LightStandType): string {
  const m: Record<LightStandType, string> = {
    standard_air_cushion: "tripod_aluminum_tube",
    c_stand_turtle_base: "steel_turtle_base_flat",
    boom_arm_counterweight: "steel_sandbag_weighted",
    mini_backlight_low: "compact_folding_tripod",
    rolling_caster_heavy: "steel_tri_caster_lock",
  };
  return m[t];
}

export function bestUse(t: LightStandType): string {
  const m: Record<LightStandType, string> = {
    standard_air_cushion: "location_travel_general",
    c_stand_turtle_base: "studio_flag_arm_grip",
    boom_arm_counterweight: "overhead_hair_light",
    mini_backlight_low: "tabletop_floor_accent",
    rolling_caster_heavy: "film_set_repositioning",
  };
  return m[t];
}

export function lightStands(): LightStandType[] {
  return ["standard_air_cushion", "c_stand_turtle_base", "boom_arm_counterweight", "mini_backlight_low", "rolling_caster_heavy"];
}
