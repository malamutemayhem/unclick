export type PetFeederType = "gravity_hopper_basic" | "automatic_timer_portion" | "slow_feeder_puzzle" | "elevated_stand_raised" | "smart_wifi_camera";

export function portionControl(t: PetFeederType): number {
  const m: Record<PetFeederType, number> = {
    gravity_hopper_basic: 2, automatic_timer_portion: 9, slow_feeder_puzzle: 7, elevated_stand_raised: 3, smart_wifi_camera: 10,
  };
  return m[t];
}

export function convenience(t: PetFeederType): number {
  const m: Record<PetFeederType, number> = {
    gravity_hopper_basic: 8, automatic_timer_portion: 9, slow_feeder_puzzle: 4, elevated_stand_raised: 6, smart_wifi_camera: 10,
  };
  return m[t];
}

export function eatingPace(t: PetFeederType): number {
  const m: Record<PetFeederType, number> = {
    gravity_hopper_basic: 2, automatic_timer_portion: 5, slow_feeder_puzzle: 10, elevated_stand_raised: 4, smart_wifi_camera: 6,
  };
  return m[t];
}

export function cleanEase(t: PetFeederType): number {
  const m: Record<PetFeederType, number> = {
    gravity_hopper_basic: 7, automatic_timer_portion: 5, slow_feeder_puzzle: 6, elevated_stand_raised: 9, smart_wifi_camera: 4,
  };
  return m[t];
}

export function feederCost(t: PetFeederType): number {
  const m: Record<PetFeederType, number> = {
    gravity_hopper_basic: 2, automatic_timer_portion: 6, slow_feeder_puzzle: 3, elevated_stand_raised: 5, smart_wifi_camera: 10,
  };
  return m[t];
}

export function needsPower(t: PetFeederType): boolean {
  const m: Record<PetFeederType, boolean> = {
    gravity_hopper_basic: false, automatic_timer_portion: true, slow_feeder_puzzle: false, elevated_stand_raised: false, smart_wifi_camera: true,
  };
  return m[t];
}

export function dishwasherSafe(t: PetFeederType): boolean {
  const m: Record<PetFeederType, boolean> = {
    gravity_hopper_basic: true, automatic_timer_portion: false, slow_feeder_puzzle: true, elevated_stand_raised: true, smart_wifi_camera: false,
  };
  return m[t];
}

export function bowlMaterial(t: PetFeederType): string {
  const m: Record<PetFeederType, string> = {
    gravity_hopper_basic: "bpa_free_plastic",
    automatic_timer_portion: "abs_plastic_stainless",
    slow_feeder_puzzle: "food_grade_melamine",
    elevated_stand_raised: "stainless_steel_bamboo",
    smart_wifi_camera: "stainless_steel_app",
  };
  return m[t];
}

export function bestPet(t: PetFeederType): string {
  const m: Record<PetFeederType, string> = {
    gravity_hopper_basic: "multi_pet_free_feed",
    automatic_timer_portion: "single_pet_schedule",
    slow_feeder_puzzle: "fast_eater_overweight",
    elevated_stand_raised: "large_senior_arthritis",
    smart_wifi_camera: "away_travel_monitor",
  };
  return m[t];
}

export function petFeeders(): PetFeederType[] {
  return ["gravity_hopper_basic", "automatic_timer_portion", "slow_feeder_puzzle", "elevated_stand_raised", "smart_wifi_camera"];
}
