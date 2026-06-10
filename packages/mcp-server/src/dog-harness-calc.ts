export type DogHarnessType = "front_clip_no_pull" | "back_clip_standard" | "dual_clip_versatile" | "step_in_easy" | "tactical_molle";

export function pullControl(t: DogHarnessType): number {
  const m: Record<DogHarnessType, number> = {
    front_clip_no_pull: 10, back_clip_standard: 3, dual_clip_versatile: 8, step_in_easy: 4, tactical_molle: 7,
  };
  return m[t];
}

export function comfort(t: DogHarnessType): number {
  const m: Record<DogHarnessType, number> = {
    front_clip_no_pull: 6, back_clip_standard: 8, dual_clip_versatile: 7, step_in_easy: 9, tactical_molle: 5,
  };
  return m[t];
}

export function easeOnOff(t: DogHarnessType): number {
  const m: Record<DogHarnessType, number> = {
    front_clip_no_pull: 5, back_clip_standard: 7, dual_clip_versatile: 4, step_in_easy: 10, tactical_molle: 3,
  };
  return m[t];
}

export function durability(t: DogHarnessType): number {
  const m: Record<DogHarnessType, number> = {
    front_clip_no_pull: 6, back_clip_standard: 7, dual_clip_versatile: 8, step_in_easy: 5, tactical_molle: 10,
  };
  return m[t];
}

export function harnessCost(t: DogHarnessType): number {
  const m: Record<DogHarnessType, number> = {
    front_clip_no_pull: 4, back_clip_standard: 3, dual_clip_versatile: 5, step_in_easy: 3, tactical_molle: 8,
  };
  return m[t];
}

export function reflective(t: DogHarnessType): boolean {
  const m: Record<DogHarnessType, boolean> = {
    front_clip_no_pull: true, back_clip_standard: false, dual_clip_versatile: true, step_in_easy: false, tactical_molle: true,
  };
  return m[t];
}

export function hasHandle(t: DogHarnessType): boolean {
  const m: Record<DogHarnessType, boolean> = {
    front_clip_no_pull: false, back_clip_standard: false, dual_clip_versatile: true, step_in_easy: false, tactical_molle: true,
  };
  return m[t];
}

export function strapDesign(t: DogHarnessType): string {
  const m: Record<DogHarnessType, string> = {
    front_clip_no_pull: "chest_plate_redirect",
    back_clip_standard: "simple_strap_y_shape",
    dual_clip_versatile: "padded_dual_d_ring",
    step_in_easy: "vest_wrap_velcro_snap",
    tactical_molle: "nylon_molle_webbing",
  };
  return m[t];
}

export function bestDog(t: DogHarnessType): string {
  const m: Record<DogHarnessType, string> = {
    front_clip_no_pull: "strong_puller_training",
    back_clip_standard: "calm_walker_casual",
    dual_clip_versatile: "reactive_dog_management",
    step_in_easy: "small_senior_arthritic",
    tactical_molle: "working_dog_service",
  };
  return m[t];
}

export function dogHarnesses(): DogHarnessType[] {
  return ["front_clip_no_pull", "back_clip_standard", "dual_clip_versatile", "step_in_easy", "tactical_molle"];
}
