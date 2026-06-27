export type PicklePotType = "ceramic_crock_slow" | "electric_heated_warm" | "glass_jar_cold" | "ultrasonic_clean_combo" | "copper_lined_fast";

export function cleaningSpeed(t: PicklePotType): number {
  const m: Record<PicklePotType, number> = {
    ceramic_crock_slow: 5, electric_heated_warm: 9, glass_jar_cold: 3, ultrasonic_clean_combo: 10, copper_lined_fast: 8,
  };
  return m[t];
}

export function acidSafety(t: PicklePotType): number {
  const m: Record<PicklePotType, number> = {
    ceramic_crock_slow: 9, electric_heated_warm: 8, glass_jar_cold: 10, ultrasonic_clean_combo: 7, copper_lined_fast: 6,
  };
  return m[t];
}

export function capacity(t: PicklePotType): number {
  const m: Record<PicklePotType, number> = {
    ceramic_crock_slow: 8, electric_heated_warm: 7, glass_jar_cold: 5, ultrasonic_clean_combo: 6, copper_lined_fast: 9,
  };
  return m[t];
}

export function tempControl(t: PicklePotType): number {
  const m: Record<PicklePotType, number> = {
    ceramic_crock_slow: 4, electric_heated_warm: 10, glass_jar_cold: 2, ultrasonic_clean_combo: 8, copper_lined_fast: 5,
  };
  return m[t];
}

export function potCost(t: PicklePotType): number {
  const m: Record<PicklePotType, number> = {
    ceramic_crock_slow: 1, electric_heated_warm: 2, glass_jar_cold: 1, ultrasonic_clean_combo: 3, copper_lined_fast: 2,
  };
  return m[t];
}

export function heatsPickle(t: PicklePotType): boolean {
  const m: Record<PicklePotType, boolean> = {
    ceramic_crock_slow: false, electric_heated_warm: true, glass_jar_cold: false, ultrasonic_clean_combo: true, copper_lined_fast: false,
  };
  return m[t];
}

export function hasUltrasonic(t: PicklePotType): boolean {
  const m: Record<PicklePotType, boolean> = {
    ceramic_crock_slow: false, electric_heated_warm: false, glass_jar_cold: false, ultrasonic_clean_combo: true, copper_lined_fast: false,
  };
  return m[t];
}

export function vesselMaterial(t: PicklePotType): string {
  const m: Record<PicklePotType, string> = {
    ceramic_crock_slow: "glazed_stoneware_pot",
    electric_heated_warm: "polypropylene_heated",
    glass_jar_cold: "borosilicate_glass_jar",
    ultrasonic_clean_combo: "stainless_tank_unit",
    copper_lined_fast: "copper_inner_lining",
  };
  return m[t];
}

export function bestUse(t: PicklePotType): string {
  const m: Record<PicklePotType, string> = {
    ceramic_crock_slow: "hobby_studio_batch",
    electric_heated_warm: "daily_bench_work",
    glass_jar_cold: "cold_citric_soak",
    ultrasonic_clean_combo: "fine_detail_clean",
    copper_lined_fast: "production_quick_strip",
  };
  return m[t];
}

export function picklePots(): PicklePotType[] {
  return ["ceramic_crock_slow", "electric_heated_warm", "glass_jar_cold", "ultrasonic_clean_combo", "copper_lined_fast"];
}
