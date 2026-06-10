export type DentalFlosserType = "water_flosser_countertop" | "water_flosser_cordless" | "air_flosser_burst" | "string_flosser_pick" | "interdental_brush_tiny";

export function cleaningPower(t: DentalFlosserType): number {
  const m: Record<DentalFlosserType, number> = {
    water_flosser_countertop: 10, water_flosser_cordless: 8, air_flosser_burst: 6, string_flosser_pick: 7, interdental_brush_tiny: 8,
  };
  return m[t];
}

export function easeOfUse(t: DentalFlosserType): number {
  const m: Record<DentalFlosserType, number> = {
    water_flosser_countertop: 8, water_flosser_cordless: 9, air_flosser_burst: 10, string_flosser_pick: 6, interdental_brush_tiny: 7,
  };
  return m[t];
}

export function portability(t: DentalFlosserType): number {
  const m: Record<DentalFlosserType, number> = {
    water_flosser_countertop: 2, water_flosser_cordless: 8, air_flosser_burst: 8, string_flosser_pick: 10, interdental_brush_tiny: 10,
  };
  return m[t];
}

export function gentleness(t: DentalFlosserType): number {
  const m: Record<DentalFlosserType, number> = {
    water_flosser_countertop: 9, water_flosser_cordless: 8, air_flosser_burst: 9, string_flosser_pick: 5, interdental_brush_tiny: 6,
  };
  return m[t];
}

export function flosserCost(t: DentalFlosserType): number {
  const m: Record<DentalFlosserType, number> = {
    water_flosser_countertop: 7, water_flosser_cordless: 5, air_flosser_burst: 6, string_flosser_pick: 1, interdental_brush_tiny: 2,
  };
  return m[t];
}

export function needsPower(t: DentalFlosserType): boolean {
  const m: Record<DentalFlosserType, boolean> = {
    water_flosser_countertop: true, water_flosser_cordless: true, air_flosser_burst: true, string_flosser_pick: false, interdental_brush_tiny: false,
  };
  return m[t];
}

export function reusable(t: DentalFlosserType): boolean {
  const m: Record<DentalFlosserType, boolean> = {
    water_flosser_countertop: true, water_flosser_cordless: true, air_flosser_burst: true, string_flosser_pick: false, interdental_brush_tiny: true,
  };
  return m[t];
}

export function cleanMethod(t: DentalFlosserType): string {
  const m: Record<DentalFlosserType, string> = {
    water_flosser_countertop: "pulsating_water_jet",
    water_flosser_cordless: "battery_water_pulse",
    air_flosser_burst: "micro_air_water_burst",
    string_flosser_pick: "nylon_thread_manual",
    interdental_brush_tiny: "bristle_cone_twist",
  };
  return m[t];
}

export function bestFor(t: DentalFlosserType): string {
  const m: Record<DentalFlosserType, string> = {
    water_flosser_countertop: "braces_implants_bridges",
    water_flosser_cordless: "travel_bathroom_shared",
    air_flosser_burst: "sensitive_gums_quick",
    string_flosser_pick: "on_the_go_disposable",
    interdental_brush_tiny: "wide_gaps_implants",
  };
  return m[t];
}

export function dentalFlossers(): DentalFlosserType[] {
  return ["water_flosser_countertop", "water_flosser_cordless", "air_flosser_burst", "string_flosser_pick", "interdental_brush_tiny"];
}
