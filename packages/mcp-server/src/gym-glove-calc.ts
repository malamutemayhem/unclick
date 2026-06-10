export type GymGloveType = "full_finger_padded" | "fingerless_leather_classic" | "wrist_wrap_integrated" | "grip_pad_minimalist" | "crossfit_pull_up_guard";

export function gripStrength(t: GymGloveType): number {
  const m: Record<GymGloveType, number> = {
    full_finger_padded: 8, fingerless_leather_classic: 9, wrist_wrap_integrated: 8, grip_pad_minimalist: 7, crossfit_pull_up_guard: 9,
  };
  return m[t];
}

export function palmProtect(t: GymGloveType): number {
  const m: Record<GymGloveType, number> = {
    full_finger_padded: 10, fingerless_leather_classic: 8, wrist_wrap_integrated: 7, grip_pad_minimalist: 6, crossfit_pull_up_guard: 9,
  };
  return m[t];
}

export function breathability(t: GymGloveType): number {
  const m: Record<GymGloveType, number> = {
    full_finger_padded: 4, fingerless_leather_classic: 7, wrist_wrap_integrated: 6, grip_pad_minimalist: 10, crossfit_pull_up_guard: 8,
  };
  return m[t];
}

export function wristSupport(t: GymGloveType): number {
  const m: Record<GymGloveType, number> = {
    full_finger_padded: 6, fingerless_leather_classic: 4, wrist_wrap_integrated: 10, grip_pad_minimalist: 2, crossfit_pull_up_guard: 5,
  };
  return m[t];
}

export function gloveCost(t: GymGloveType): number {
  const m: Record<GymGloveType, number> = {
    full_finger_padded: 2, fingerless_leather_classic: 2, wrist_wrap_integrated: 3, grip_pad_minimalist: 1, crossfit_pull_up_guard: 2,
  };
  return m[t];
}

export function machineWashable(t: GymGloveType): boolean {
  const m: Record<GymGloveType, boolean> = {
    full_finger_padded: true, fingerless_leather_classic: false, wrist_wrap_integrated: true, grip_pad_minimalist: true, crossfit_pull_up_guard: true,
  };
  return m[t];
}

export function hasWristWrap(t: GymGloveType): boolean {
  const m: Record<GymGloveType, boolean> = {
    full_finger_padded: false, fingerless_leather_classic: false, wrist_wrap_integrated: true, grip_pad_minimalist: false, crossfit_pull_up_guard: false,
  };
  return m[t];
}

export function palmMaterial(t: GymGloveType): string {
  const m: Record<GymGloveType, string> = {
    full_finger_padded: "synthetic_leather_gel_pad",
    fingerless_leather_classic: "genuine_cowhide_leather",
    wrist_wrap_integrated: "microfiber_suede_grip",
    grip_pad_minimalist: "rubber_grip_strip",
    crossfit_pull_up_guard: "carbon_fiber_leather",
  };
  return m[t];
}

export function bestWorkout(t: GymGloveType): string {
  const m: Record<GymGloveType, string> = {
    full_finger_padded: "heavy_barbell_pressing",
    fingerless_leather_classic: "general_weight_training",
    wrist_wrap_integrated: "heavy_overhead_press",
    grip_pad_minimalist: "machine_dumbbell_light",
    crossfit_pull_up_guard: "kipping_muscle_up",
  };
  return m[t];
}

export function gymGloves(): GymGloveType[] {
  return ["full_finger_padded", "fingerless_leather_classic", "wrist_wrap_integrated", "grip_pad_minimalist", "crossfit_pull_up_guard"];
}
