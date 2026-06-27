export type CribMobileType = "musical_wind_up" | "projection_light_show" | "wooden_montessori" | "plush_animal_spin" | "smart_app_control";

export function visualStimulation(t: CribMobileType): number {
  const m: Record<CribMobileType, number> = {
    musical_wind_up: 6, projection_light_show: 10, wooden_montessori: 7, plush_animal_spin: 8, smart_app_control: 9,
  };
  return m[t];
}

export function soothingSound(t: CribMobileType): number {
  const m: Record<CribMobileType, number> = {
    musical_wind_up: 8, projection_light_show: 7, wooden_montessori: 3, plush_animal_spin: 6, smart_app_control: 10,
  };
  return m[t];
}

export function craftQuality(t: CribMobileType): number {
  const m: Record<CribMobileType, number> = {
    musical_wind_up: 7, projection_light_show: 5, wooden_montessori: 10, plush_animal_spin: 8, smart_app_control: 6,
  };
  return m[t];
}

export function installEase(t: CribMobileType): number {
  const m: Record<CribMobileType, number> = {
    musical_wind_up: 8, projection_light_show: 7, wooden_montessori: 9, plush_animal_spin: 7, smart_app_control: 5,
  };
  return m[t];
}

export function mobileCost(t: CribMobileType): number {
  const m: Record<CribMobileType, number> = {
    musical_wind_up: 4, projection_light_show: 7, wooden_montessori: 8, plush_animal_spin: 5, smart_app_control: 9,
  };
  return m[t];
}

export function needsBatteries(t: CribMobileType): boolean {
  const m: Record<CribMobileType, boolean> = {
    musical_wind_up: false, projection_light_show: true, wooden_montessori: false, plush_animal_spin: true, smart_app_control: true,
  };
  return m[t];
}

export function machineWash(t: CribMobileType): boolean {
  const m: Record<CribMobileType, boolean> = {
    musical_wind_up: false, projection_light_show: false, wooden_montessori: false, plush_animal_spin: true, smart_app_control: false,
  };
  return m[t];
}

export function hangStyle(t: CribMobileType): string {
  const m: Record<CribMobileType, string> = {
    musical_wind_up: "clamp_arm_wind_spring",
    projection_light_show: "ceiling_mount_projector",
    wooden_montessori: "dowel_rod_balance_hang",
    plush_animal_spin: "bracket_arm_motor_spin",
    smart_app_control: "universal_clamp_bluetooth",
  };
  return m[t];
}

export function bestStage(t: CribMobileType): string {
  const m: Record<CribMobileType, string> = {
    musical_wind_up: "newborn_sleep_routine",
    projection_light_show: "toddler_night_light_combo",
    wooden_montessori: "visual_tracking_early_dev",
    plush_animal_spin: "tummy_time_engagement",
    smart_app_control: "parent_remote_nursery",
  };
  return m[t];
}

export function cribMobiles(): CribMobileType[] {
  return ["musical_wind_up", "projection_light_show", "wooden_montessori", "plush_animal_spin", "smart_app_control"];
}
