export type PetHarnessType = "step_in_vest_basic" | "front_clip_no_pull" | "back_clip_sport" | "dual_clip_training" | "car_safety_seatbelt";

export function pullControl(t: PetHarnessType): number {
  const m: Record<PetHarnessType, number> = {
    step_in_vest_basic: 4, front_clip_no_pull: 10, back_clip_sport: 3, dual_clip_training: 9, car_safety_seatbelt: 5,
  };
  return m[t];
}

export function comfort(t: PetHarnessType): number {
  const m: Record<PetHarnessType, number> = {
    step_in_vest_basic: 9, front_clip_no_pull: 7, back_clip_sport: 8, dual_clip_training: 6, car_safety_seatbelt: 5,
  };
  return m[t];
}

export function easeOfUse(t: PetHarnessType): number {
  const m: Record<PetHarnessType, number> = {
    step_in_vest_basic: 10, front_clip_no_pull: 6, back_clip_sport: 8, dual_clip_training: 5, car_safety_seatbelt: 7,
  };
  return m[t];
}

export function neckPressure(t: PetHarnessType): number {
  const m: Record<PetHarnessType, number> = {
    step_in_vest_basic: 10, front_clip_no_pull: 9, back_clip_sport: 10, dual_clip_training: 8, car_safety_seatbelt: 10,
  };
  return m[t];
}

export function harnessCost(t: PetHarnessType): number {
  const m: Record<PetHarnessType, number> = {
    step_in_vest_basic: 2, front_clip_no_pull: 4, back_clip_sport: 3, dual_clip_training: 5, car_safety_seatbelt: 4,
  };
  return m[t];
}

export function reflective(t: PetHarnessType): boolean {
  const m: Record<PetHarnessType, boolean> = {
    step_in_vest_basic: true, front_clip_no_pull: true, back_clip_sport: true, dual_clip_training: true, car_safety_seatbelt: true,
  };
  return m[t];
}

export function crashTested(t: PetHarnessType): boolean {
  const m: Record<PetHarnessType, boolean> = {
    step_in_vest_basic: false, front_clip_no_pull: false, back_clip_sport: false, dual_clip_training: false, car_safety_seatbelt: true,
  };
  return m[t];
}

export function strapDesign(t: PetHarnessType): string {
  const m: Record<PetHarnessType, string> = {
    step_in_vest_basic: "vest_mesh_step_through",
    front_clip_no_pull: "chest_strap_front_ring",
    back_clip_sport: "padded_back_dorsal_ring",
    dual_clip_training: "dual_ring_front_back",
    car_safety_seatbelt: "padded_vest_tether_loop",
  };
  return m[t];
}

export function bestDog(t: PetHarnessType): string {
  const m: Record<PetHarnessType, string> = {
    step_in_vest_basic: "small_breed_gentle_walk",
    front_clip_no_pull: "puller_leash_training",
    back_clip_sport: "running_hiking_active",
    dual_clip_training: "reactive_dog_versatile",
    car_safety_seatbelt: "car_travel_road_trip",
  };
  return m[t];
}

export function petHarnesses(): PetHarnessType[] {
  return ["step_in_vest_basic", "front_clip_no_pull", "back_clip_sport", "dual_clip_training", "car_safety_seatbelt"];
}
