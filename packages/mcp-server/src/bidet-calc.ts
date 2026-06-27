export type BidetType = "toilet_seat_attach" | "handheld_sprayer" | "standalone_ceramic" | "travel_portable" | "smart_integrated";

export function cleaningPower(t: BidetType): number {
  const m: Record<BidetType, number> = {
    toilet_seat_attach: 8, handheld_sprayer: 7, standalone_ceramic: 9, travel_portable: 4, smart_integrated: 10,
  };
  return m[t];
}

export function waterControl(t: BidetType): number {
  const m: Record<BidetType, number> = {
    toilet_seat_attach: 8, handheld_sprayer: 6, standalone_ceramic: 7, travel_portable: 3, smart_integrated: 10,
  };
  return m[t];
}

export function installEase(t: BidetType): number {
  const m: Record<BidetType, number> = {
    toilet_seat_attach: 7, handheld_sprayer: 9, standalone_ceramic: 2, travel_portable: 10, smart_integrated: 4,
  };
  return m[t];
}

export function spaceNeeded(t: BidetType): number {
  const m: Record<BidetType, number> = {
    toilet_seat_attach: 1, handheld_sprayer: 1, standalone_ceramic: 9, travel_portable: 1, smart_integrated: 1,
  };
  return m[t];
}

export function bidetCost(t: BidetType): number {
  const m: Record<BidetType, number> = {
    toilet_seat_attach: 5, handheld_sprayer: 2, standalone_ceramic: 7, travel_portable: 1, smart_integrated: 10,
  };
  return m[t];
}

export function heatedWater(t: BidetType): boolean {
  const m: Record<BidetType, boolean> = {
    toilet_seat_attach: true, handheld_sprayer: false, standalone_ceramic: true, travel_portable: false, smart_integrated: true,
  };
  return m[t];
}

export function airDry(t: BidetType): boolean {
  const m: Record<BidetType, boolean> = {
    toilet_seat_attach: false, handheld_sprayer: false, standalone_ceramic: false, travel_portable: false, smart_integrated: true,
  };
  return m[t];
}

export function nozzleType(t: BidetType): string {
  const m: Record<BidetType, string> = {
    toilet_seat_attach: "retractable_self_clean",
    handheld_sprayer: "stainless_trigger_hose",
    standalone_ceramic: "fixed_rim_mounted_jet",
    travel_portable: "squeeze_bottle_nozzle",
    smart_integrated: "oscillating_dual_wand",
  };
  return m[t];
}

export function bestSetup(t: BidetType): string {
  const m: Record<BidetType, string> = {
    toilet_seat_attach: "retrofit_existing_toilet",
    handheld_sprayer: "budget_diaper_cloth_rinse",
    standalone_ceramic: "european_dedicated_fixture",
    travel_portable: "camping_hotel_travel",
    smart_integrated: "luxury_smart_bathroom",
  };
  return m[t];
}

export function bidets(): BidetType[] {
  return ["toilet_seat_attach", "handheld_sprayer", "standalone_ceramic", "travel_portable", "smart_integrated"];
}
