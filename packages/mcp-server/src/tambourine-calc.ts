export type TambourineType = "single_row_headed" | "double_row_headed" | "headless_half_moon" | "orchestral_tunable" | "mini_finger_jingle";

export function volume(t: TambourineType): number {
  const m: Record<TambourineType, number> = {
    single_row_headed: 6, double_row_headed: 10, headless_half_moon: 7, orchestral_tunable: 8, mini_finger_jingle: 4,
  };
  return m[t];
}

export function jinglBrightness(t: TambourineType): number {
  const m: Record<TambourineType, number> = {
    single_row_headed: 7, double_row_headed: 10, headless_half_moon: 8, orchestral_tunable: 6, mini_finger_jingle: 5,
  };
  return m[t];
}

export function playability(t: TambourineType): number {
  const m: Record<TambourineType, number> = {
    single_row_headed: 8, double_row_headed: 6, headless_half_moon: 9, orchestral_tunable: 7, mini_finger_jingle: 10,
  };
  return m[t];
}

export function toneRange(t: TambourineType): number {
  const m: Record<TambourineType, number> = {
    single_row_headed: 7, double_row_headed: 8, headless_half_moon: 5, orchestral_tunable: 10, mini_finger_jingle: 3,
  };
  return m[t];
}

export function tambourineCost(t: TambourineType): number {
  const m: Record<TambourineType, number> = {
    single_row_headed: 2, double_row_headed: 4, headless_half_moon: 3, orchestral_tunable: 7, mini_finger_jingle: 1,
  };
  return m[t];
}

export function hasHead(t: TambourineType): boolean {
  const m: Record<TambourineType, boolean> = {
    single_row_headed: true, double_row_headed: true, headless_half_moon: false, orchestral_tunable: true, mini_finger_jingle: false,
  };
  return m[t];
}

export function tunable(t: TambourineType): boolean {
  const m: Record<TambourineType, boolean> = {
    single_row_headed: false, double_row_headed: false, headless_half_moon: false, orchestral_tunable: true, mini_finger_jingle: false,
  };
  return m[t];
}

export function jingleMaterial(t: TambourineType): string {
  const m: Record<TambourineType, string> = {
    single_row_headed: "nickel_plated_steel",
    double_row_headed: "brass_silver_mix",
    headless_half_moon: "steel_bright_cut",
    orchestral_tunable: "german_silver_precise",
    mini_finger_jingle: "tin_alloy_light",
  };
  return m[t];
}

export function bestGenre(t: TambourineType): string {
  const m: Record<TambourineType, string> = {
    single_row_headed: "pop_rock_worship",
    double_row_headed: "latin_world_percussion",
    headless_half_moon: "acoustic_singer_songwriter",
    orchestral_tunable: "classical_concert_ensemble",
    mini_finger_jingle: "classroom_kids_casual",
  };
  return m[t];
}

export function tambourines(): TambourineType[] {
  return ["single_row_headed", "double_row_headed", "headless_half_moon", "orchestral_tunable", "mini_finger_jingle"];
}
