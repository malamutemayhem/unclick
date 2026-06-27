export type PetStrollerType = "standard_single_fold" | "jogger_three_wheel_air" | "double_decker_multi_pet" | "convertible_carrier_detach" | "bike_trailer_hitch";

export function petComfort(t: PetStrollerType): number {
  const m: Record<PetStrollerType, number> = {
    standard_single_fold: 7, jogger_three_wheel_air: 9, double_decker_multi_pet: 7, convertible_carrier_detach: 6, bike_trailer_hitch: 8,
  };
  return m[t];
}

export function maneuverability(t: PetStrollerType): number {
  const m: Record<PetStrollerType, number> = {
    standard_single_fold: 7, jogger_three_wheel_air: 10, double_decker_multi_pet: 5, convertible_carrier_detach: 6, bike_trailer_hitch: 4,
  };
  return m[t];
}

export function petCapacity(t: PetStrollerType): number {
  const m: Record<PetStrollerType, number> = {
    standard_single_fold: 6, jogger_three_wheel_air: 7, double_decker_multi_pet: 10, convertible_carrier_detach: 5, bike_trailer_hitch: 8,
  };
  return m[t];
}

export function foldSize(t: PetStrollerType): number {
  const m: Record<PetStrollerType, number> = {
    standard_single_fold: 8, jogger_three_wheel_air: 5, double_decker_multi_pet: 3, convertible_carrier_detach: 9, bike_trailer_hitch: 4,
  };
  return m[t];
}

export function strollerCost(t: PetStrollerType): number {
  const m: Record<PetStrollerType, number> = {
    standard_single_fold: 2, jogger_three_wheel_air: 4, double_decker_multi_pet: 4, convertible_carrier_detach: 3, bike_trailer_hitch: 4,
  };
  return m[t];
}

export function allTerrain(t: PetStrollerType): boolean {
  const m: Record<PetStrollerType, boolean> = {
    standard_single_fold: false, jogger_three_wheel_air: true, double_decker_multi_pet: false, convertible_carrier_detach: false, bike_trailer_hitch: true,
  };
  return m[t];
}

export function detachableCarrier(t: PetStrollerType): boolean {
  const m: Record<PetStrollerType, boolean> = {
    standard_single_fold: false, jogger_three_wheel_air: false, double_decker_multi_pet: false, convertible_carrier_detach: true, bike_trailer_hitch: true,
  };
  return m[t];
}

export function wheelType(t: PetStrollerType): string {
  const m: Record<PetStrollerType, string> = {
    standard_single_fold: "plastic_swivel_caster",
    jogger_three_wheel_air: "air_filled_rubber_tire",
    double_decker_multi_pet: "foam_filled_no_flat",
    convertible_carrier_detach: "eva_foam_wheel",
    bike_trailer_hitch: "spoke_pneumatic_20in",
  };
  return m[t];
}

export function bestUse(t: PetStrollerType): string {
  const m: Record<PetStrollerType, string> = {
    standard_single_fold: "mall_sidewalk_casual",
    jogger_three_wheel_air: "trail_run_active",
    double_decker_multi_pet: "two_pet_vet_visit",
    convertible_carrier_detach: "airline_travel_combo",
    bike_trailer_hitch: "bike_path_adventure",
  };
  return m[t];
}

export function petStrollers(): PetStrollerType[] {
  return ["standard_single_fold", "jogger_three_wheel_air", "double_decker_multi_pet", "convertible_carrier_detach", "bike_trailer_hitch"];
}
