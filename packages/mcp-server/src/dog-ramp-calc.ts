export type DogRampType = "folding_plastic_bi_fold" | "telescoping_aluminum_slide" | "foam_step_stair" | "wooden_furniture_match" | "car_portable_lightweight";

export function weightCapacity(t: DogRampType): number {
  const m: Record<DogRampType, number> = {
    folding_plastic_bi_fold: 7, telescoping_aluminum_slide: 9, foam_step_stair: 4, wooden_furniture_match: 8, car_portable_lightweight: 6,
  };
  return m[t];
}

export function gripSurface(t: DogRampType): number {
  const m: Record<DogRampType, number> = {
    folding_plastic_bi_fold: 7, telescoping_aluminum_slide: 8, foam_step_stair: 9, wooden_furniture_match: 6, car_portable_lightweight: 8,
  };
  return m[t];
}

export function portability(t: DogRampType): number {
  const m: Record<DogRampType, number> = {
    folding_plastic_bi_fold: 8, telescoping_aluminum_slide: 7, foam_step_stair: 3, wooden_furniture_match: 2, car_portable_lightweight: 10,
  };
  return m[t];
}

export function stability(t: DogRampType): number {
  const m: Record<DogRampType, number> = {
    folding_plastic_bi_fold: 7, telescoping_aluminum_slide: 8, foam_step_stair: 9, wooden_furniture_match: 10, car_portable_lightweight: 6,
  };
  return m[t];
}

export function rampCost(t: DogRampType): number {
  const m: Record<DogRampType, number> = {
    folding_plastic_bi_fold: 2, telescoping_aluminum_slide: 4, foam_step_stair: 3, wooden_furniture_match: 4, car_portable_lightweight: 2,
  };
  return m[t];
}

export function foldable(t: DogRampType): boolean {
  const m: Record<DogRampType, boolean> = {
    folding_plastic_bi_fold: true, telescoping_aluminum_slide: true, foam_step_stair: false, wooden_furniture_match: false, car_portable_lightweight: true,
  };
  return m[t];
}

export function indoorUse(t: DogRampType): boolean {
  const m: Record<DogRampType, boolean> = {
    folding_plastic_bi_fold: true, telescoping_aluminum_slide: false, foam_step_stair: true, wooden_furniture_match: true, car_portable_lightweight: false,
  };
  return m[t];
}

export function surfaceType(t: DogRampType): string {
  const m: Record<DogRampType, string> = {
    folding_plastic_bi_fold: "textured_plastic_grip",
    telescoping_aluminum_slide: "rubber_tread_strip",
    foam_step_stair: "fleece_covered_foam",
    wooden_furniture_match: "carpet_runner_stapled",
    car_portable_lightweight: "sandpaper_grit_tape",
  };
  return m[t];
}

export function bestUse(t: DogRampType): string {
  const m: Record<DogRampType, string> = {
    folding_plastic_bi_fold: "bed_couch_access",
    telescoping_aluminum_slide: "suv_truck_loading",
    foam_step_stair: "senior_dog_low_step",
    wooden_furniture_match: "permanent_furniture_set",
    car_portable_lightweight: "travel_car_trunk",
  };
  return m[t];
}

export function dogRamps(): DogRampType[] {
  return ["folding_plastic_bi_fold", "telescoping_aluminum_slide", "foam_step_stair", "wooden_furniture_match", "car_portable_lightweight"];
}
