export type SlowCookerType = "basic_manual_dial" | "programmable_digital" | "multi_cooker_pressure" | "travel_portable_mini" | "commercial_large_batch";

export function capacity(t: SlowCookerType): number {
  const m: Record<SlowCookerType, number> = {
    basic_manual_dial: 6, programmable_digital: 7, multi_cooker_pressure: 7, travel_portable_mini: 3, commercial_large_batch: 10,
  };
  return m[t];
}

export function versatility(t: SlowCookerType): number {
  const m: Record<SlowCookerType, number> = {
    basic_manual_dial: 4, programmable_digital: 7, multi_cooker_pressure: 10, travel_portable_mini: 3, commercial_large_batch: 6,
  };
  return m[t];
}

export function setAndForget(t: SlowCookerType): number {
  const m: Record<SlowCookerType, number> = {
    basic_manual_dial: 6, programmable_digital: 10, multi_cooker_pressure: 8, travel_portable_mini: 5, commercial_large_batch: 9,
  };
  return m[t];
}

export function portability(t: SlowCookerType): number {
  const m: Record<SlowCookerType, number> = {
    basic_manual_dial: 5, programmable_digital: 5, multi_cooker_pressure: 4, travel_portable_mini: 10, commercial_large_batch: 2,
  };
  return m[t];
}

export function cookerCost(t: SlowCookerType): number {
  const m: Record<SlowCookerType, number> = {
    basic_manual_dial: 2, programmable_digital: 4, multi_cooker_pressure: 7, travel_portable_mini: 3, commercial_large_batch: 8,
  };
  return m[t];
}

export function hasTimer(t: SlowCookerType): boolean {
  const m: Record<SlowCookerType, boolean> = {
    basic_manual_dial: false, programmable_digital: true, multi_cooker_pressure: true, travel_portable_mini: false, commercial_large_batch: true,
  };
  return m[t];
}

export function pressureCook(t: SlowCookerType): boolean {
  const m: Record<SlowCookerType, boolean> = {
    basic_manual_dial: false, programmable_digital: false, multi_cooker_pressure: true, travel_portable_mini: false, commercial_large_batch: false,
  };
  return m[t];
}

export function insertType(t: SlowCookerType): string {
  const m: Record<SlowCookerType, string> = {
    basic_manual_dial: "ceramic_stoneware_oval",
    programmable_digital: "ceramic_stoneware_digital",
    multi_cooker_pressure: "stainless_steel_sealed",
    travel_portable_mini: "ceramic_mini_round",
    commercial_large_batch: "aluminum_heavy_gauge",
  };
  return m[t];
}

export function bestMeal(t: SlowCookerType): string {
  const m: Record<SlowCookerType, string> = {
    basic_manual_dial: "simple_stew_chili_roast",
    programmable_digital: "weekday_set_before_work",
    multi_cooker_pressure: "any_meal_fast_or_slow",
    travel_portable_mini: "dip_sauce_small_portion",
    commercial_large_batch: "catering_event_potluck",
  };
  return m[t];
}

export function slowCookers(): SlowCookerType[] {
  return ["basic_manual_dial", "programmable_digital", "multi_cooker_pressure", "travel_portable_mini", "commercial_large_batch"];
}
