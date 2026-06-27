export type TurboType = "single_scroll" | "twin_scroll" | "variable_geometry" | "electric" | "sequential";

export function spoolTimeMs(t: TurboType): number {
  const m: Record<TurboType, number> = {
    single_scroll: 6, twin_scroll: 4, variable_geometry: 3, electric: 1, sequential: 2,
  };
  return m[t];
}

export function peakBoostPsi(t: TurboType): number {
  const m: Record<TurboType, number> = {
    single_scroll: 7, twin_scroll: 8, variable_geometry: 7, electric: 5, sequential: 9,
  };
  return m[t];
}

export function complexity(t: TurboType): number {
  const m: Record<TurboType, number> = {
    single_scroll: 2, twin_scroll: 5, variable_geometry: 8, electric: 7, sequential: 10,
  };
  return m[t];
}

export function costScore(t: TurboType): number {
  const m: Record<TurboType, number> = {
    single_scroll: 2, twin_scroll: 5, variable_geometry: 7, electric: 8, sequential: 10,
  };
  return m[t];
}

export function lowEndTorque(t: TurboType): number {
  const m: Record<TurboType, number> = {
    single_scroll: 4, twin_scroll: 7, variable_geometry: 9, electric: 10, sequential: 8,
  };
  return m[t];
}

export function requiresExhaustGas(t: TurboType): boolean {
  const m: Record<TurboType, boolean> = {
    single_scroll: true, twin_scroll: true, variable_geometry: true, electric: false, sequential: true,
  };
  return m[t];
}

export function hasTurboLag(t: TurboType): boolean {
  const m: Record<TurboType, boolean> = {
    single_scroll: true, twin_scroll: true, variable_geometry: false, electric: false, sequential: false,
  };
  return m[t];
}

export function commonVehicle(t: TurboType): string {
  const m: Record<TurboType, string> = {
    single_scroll: "budget_turbo_sedan", twin_scroll: "bmw_sport",
    variable_geometry: "diesel_truck", electric: "mild_hybrid",
    sequential: "jdm_sports_car",
  };
  return m[t];
}

export function boostControl(t: TurboType): string {
  const m: Record<TurboType, string> = {
    single_scroll: "wastegate", twin_scroll: "wastegate",
    variable_geometry: "vane_position", electric: "motor_speed",
    sequential: "bypass_valve",
  };
  return m[t];
}

export function turboTypes(): TurboType[] {
  return ["single_scroll", "twin_scroll", "variable_geometry", "electric", "sequential"];
}
