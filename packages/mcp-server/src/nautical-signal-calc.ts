export type NauticalSignal = "flag" | "light" | "horn" | "radio" | "flare";

export function dayVisibility(s: NauticalSignal): number {
  const m: Record<NauticalSignal, number> = {
    flag: 9, light: 4, horn: 3, radio: 10, flare: 8,
  };
  return m[s];
}

export function nightEffectiveness(s: NauticalSignal): number {
  const m: Record<NauticalSignal, number> = {
    flag: 1, light: 10, horn: 7, radio: 10, flare: 9,
  };
  return m[s];
}

export function rangeNauticalMiles(s: NauticalSignal): number {
  const m: Record<NauticalSignal, number> = {
    flag: 3, light: 5, horn: 4, radio: 10, flare: 6,
  };
  return m[s];
}

export function fogEffectiveness(s: NauticalSignal): number {
  const m: Record<NauticalSignal, number> = {
    flag: 1, light: 3, horn: 10, radio: 10, flare: 4,
  };
  return m[s];
}

export function equipmentCost(s: NauticalSignal): number {
  const m: Record<NauticalSignal, number> = {
    flag: 2, light: 5, horn: 4, radio: 8, flare: 3,
  };
  return m[s];
}

export function requiresPower(s: NauticalSignal): boolean {
  const m: Record<NauticalSignal, boolean> = {
    flag: false, light: true, horn: true, radio: true, flare: false,
  };
  return m[s];
}

export function reusable(s: NauticalSignal): boolean {
  const m: Record<NauticalSignal, boolean> = {
    flag: true, light: true, horn: true, radio: true, flare: false,
  };
  return m[s];
}

export function colregsCategory(s: NauticalSignal): string {
  const m: Record<NauticalSignal, string> = {
    flag: "visual_day_signal", light: "visual_night_signal",
    horn: "sound_signal", radio: "electronic_signal",
    flare: "distress_pyrotechnic",
  };
  return m[s];
}

export function bestEmergencyUse(s: NauticalSignal): string {
  const m: Record<NauticalSignal, string> = {
    flag: "request_assistance", light: "position_marking",
    horn: "collision_avoidance", radio: "mayday_broadcast",
    flare: "location_marking",
  };
  return m[s];
}

export function nauticalSignals(): NauticalSignal[] {
  return ["flag", "light", "horn", "radio", "flare"];
}
