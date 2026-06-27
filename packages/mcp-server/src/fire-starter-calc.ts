export type FireStarterType = "ferro_rod_striker" | "waterproof_match_box" | "magnesium_bar_shave" | "fire_piston_compress" | "electric_arc_usb";

export function ignitionReliability(t: FireStarterType): number {
  const m: Record<FireStarterType, number> = {
    ferro_rod_striker: 9, waterproof_match_box: 7, magnesium_bar_shave: 8, fire_piston_compress: 5, electric_arc_usb: 6,
  };
  return m[t];
}

export function sparkTemperature(t: FireStarterType): number {
  const m: Record<FireStarterType, number> = {
    ferro_rod_striker: 10, waterproof_match_box: 6, magnesium_bar_shave: 9, fire_piston_compress: 7, electric_arc_usb: 5,
  };
  return m[t];
}

export function easeOfUse(t: FireStarterType): number {
  const m: Record<FireStarterType, number> = {
    ferro_rod_striker: 6, waterproof_match_box: 10, magnesium_bar_shave: 5, fire_piston_compress: 3, electric_arc_usb: 9,
  };
  return m[t];
}

export function lifespan(t: FireStarterType): number {
  const m: Record<FireStarterType, number> = {
    ferro_rod_striker: 10, waterproof_match_box: 3, magnesium_bar_shave: 8, fire_piston_compress: 10, electric_arc_usb: 7,
  };
  return m[t];
}

export function starterCost(t: FireStarterType): number {
  const m: Record<FireStarterType, number> = {
    ferro_rod_striker: 4, waterproof_match_box: 2, magnesium_bar_shave: 3, fire_piston_compress: 8, electric_arc_usb: 6,
  };
  return m[t];
}

export function windProof(t: FireStarterType): boolean {
  const m: Record<FireStarterType, boolean> = {
    ferro_rod_striker: true, waterproof_match_box: false, magnesium_bar_shave: true, fire_piston_compress: true, electric_arc_usb: true,
  };
  return m[t];
}

export function needsFuel(t: FireStarterType): boolean {
  const m: Record<FireStarterType, boolean> = {
    ferro_rod_striker: false, waterproof_match_box: false, magnesium_bar_shave: false, fire_piston_compress: false, electric_arc_usb: false,
  };
  return m[t];
}

export function ignitionMethod(t: FireStarterType): string {
  const m: Record<FireStarterType, string> = {
    ferro_rod_striker: "ferrocerium_scrape_spark",
    waterproof_match_box: "strike_anywhere_coated",
    magnesium_bar_shave: "shave_pile_spark_ignite",
    fire_piston_compress: "rapid_air_compression",
    electric_arc_usb: "plasma_arc_rechargeable",
  };
  return m[t];
}

export function bestScenario(t: FireStarterType): string {
  const m: Record<FireStarterType, string> = {
    ferro_rod_striker: "survival_bushcraft_wet",
    waterproof_match_box: "casual_camp_easy",
    magnesium_bar_shave: "emergency_kit_backup",
    fire_piston_compress: "primitive_skill_demo",
    electric_arc_usb: "urban_prep_candle_light",
  };
  return m[t];
}

export function fireStarters(): FireStarterType[] {
  return ["ferro_rod_striker", "waterproof_match_box", "magnesium_bar_shave", "fire_piston_compress", "electric_arc_usb"];
}
