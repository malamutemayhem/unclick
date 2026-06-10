export type RiceCookerType = "basic_one_button" | "fuzzy_logic" | "induction_pressure" | "microwave_pot" | "multi_cooker_combo";

export function cookQuality(t: RiceCookerType): number {
  const m: Record<RiceCookerType, number> = {
    basic_one_button: 5, fuzzy_logic: 8, induction_pressure: 10, microwave_pot: 3, multi_cooker_combo: 7,
  };
  return m[t];
}

export function grainVariety(t: RiceCookerType): number {
  const m: Record<RiceCookerType, number> = {
    basic_one_button: 3, fuzzy_logic: 8, induction_pressure: 10, microwave_pot: 2, multi_cooker_combo: 7,
  };
  return m[t];
}

export function cookSpeed(t: RiceCookerType): number {
  const m: Record<RiceCookerType, number> = {
    basic_one_button: 5, fuzzy_logic: 6, induction_pressure: 9, microwave_pot: 10, multi_cooker_combo: 7,
  };
  return m[t];
}

export function keepWarm(t: RiceCookerType): number {
  const m: Record<RiceCookerType, number> = {
    basic_one_button: 4, fuzzy_logic: 9, induction_pressure: 10, microwave_pot: 1, multi_cooker_combo: 8,
  };
  return m[t];
}

export function cookerCost(t: RiceCookerType): number {
  const m: Record<RiceCookerType, number> = {
    basic_one_button: 1, fuzzy_logic: 5, induction_pressure: 10, microwave_pot: 1, multi_cooker_combo: 6,
  };
  return m[t];
}

export function timerDelay(t: RiceCookerType): boolean {
  const m: Record<RiceCookerType, boolean> = {
    basic_one_button: false, fuzzy_logic: true, induction_pressure: true, microwave_pot: false, multi_cooker_combo: true,
  };
  return m[t];
}

export function multiFunction(t: RiceCookerType): boolean {
  const m: Record<RiceCookerType, boolean> = {
    basic_one_button: false, fuzzy_logic: false, induction_pressure: true, microwave_pot: false, multi_cooker_combo: true,
  };
  return m[t];
}

export function heatMethod(t: RiceCookerType): string {
  const m: Record<RiceCookerType, string> = {
    basic_one_button: "simple_plate_heater",
    fuzzy_logic: "microchip_temp_sensor",
    induction_pressure: "induction_coil_pressure_seal",
    microwave_pot: "microwave_radiation_steam",
    multi_cooker_combo: "multi_element_programmable",
  };
  return m[t];
}

export function bestFor(t: RiceCookerType): string {
  const m: Record<RiceCookerType, string> = {
    basic_one_button: "budget_white_rice_only",
    fuzzy_logic: "daily_japanese_rice",
    induction_pressure: "sushi_chef_premium",
    microwave_pot: "dorm_room_quick",
    multi_cooker_combo: "one_pot_meal_versatile",
  };
  return m[t];
}

export function riceCookers(): RiceCookerType[] {
  return ["basic_one_button", "fuzzy_logic", "induction_pressure", "microwave_pot", "multi_cooker_combo"];
}
