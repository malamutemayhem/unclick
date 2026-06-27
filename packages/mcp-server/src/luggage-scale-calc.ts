export type LuggageScaleType = "digital_hanging" | "analog_spring" | "built_in_suitcase" | "portable_fish_hook" | "smart_bluetooth";

export function accuracy(t: LuggageScaleType): number {
  const m: Record<LuggageScaleType, number> = {
    digital_hanging: 9, analog_spring: 5, built_in_suitcase: 8, portable_fish_hook: 6, smart_bluetooth: 10,
  };
  return m[t];
}

export function maxWeight(t: LuggageScaleType): number {
  const m: Record<LuggageScaleType, number> = {
    digital_hanging: 8, analog_spring: 7, built_in_suitcase: 6, portable_fish_hook: 9, smart_bluetooth: 8,
  };
  return m[t];
}

export function portability(t: LuggageScaleType): number {
  const m: Record<LuggageScaleType, number> = {
    digital_hanging: 9, analog_spring: 7, built_in_suitcase: 10, portable_fish_hook: 8, smart_bluetooth: 9,
  };
  return m[t];
}

export function readability(t: LuggageScaleType): number {
  const m: Record<LuggageScaleType, number> = {
    digital_hanging: 9, analog_spring: 4, built_in_suitcase: 7, portable_fish_hook: 5, smart_bluetooth: 10,
  };
  return m[t];
}

export function scaleCost(t: LuggageScaleType): number {
  const m: Record<LuggageScaleType, number> = {
    digital_hanging: 3, analog_spring: 2, built_in_suitcase: 8, portable_fish_hook: 2, smart_bluetooth: 7,
  };
  return m[t];
}

export function needsBattery(t: LuggageScaleType): boolean {
  const m: Record<LuggageScaleType, boolean> = {
    digital_hanging: true, analog_spring: false, built_in_suitcase: true, portable_fish_hook: false, smart_bluetooth: true,
  };
  return m[t];
}

export function unitToggle(t: LuggageScaleType): boolean {
  const m: Record<LuggageScaleType, boolean> = {
    digital_hanging: true, analog_spring: false, built_in_suitcase: true, portable_fish_hook: false, smart_bluetooth: true,
  };
  return m[t];
}

export function displayType(t: LuggageScaleType): string {
  const m: Record<LuggageScaleType, string> = {
    digital_hanging: "backlit_lcd_screen",
    analog_spring: "mechanical_dial_gauge",
    built_in_suitcase: "embedded_led_panel",
    portable_fish_hook: "analog_needle_face",
    smart_bluetooth: "app_phone_display",
  };
  return m[t];
}

export function bestTrip(t: LuggageScaleType): string {
  const m: Record<LuggageScaleType, string> = {
    digital_hanging: "airline_travel_checkin",
    analog_spring: "budget_camping_simple",
    built_in_suitcase: "frequent_flyer_premium",
    portable_fish_hook: "fishing_outdoor_gear",
    smart_bluetooth: "business_travel_tech",
  };
  return m[t];
}

export function luggageScales(): LuggageScaleType[] {
  return ["digital_hanging", "analog_spring", "built_in_suitcase", "portable_fish_hook", "smart_bluetooth"];
}
