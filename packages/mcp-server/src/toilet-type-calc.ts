export type ToiletType = "gravity_flush" | "pressure_assist" | "dual_flush" | "wall_hung" | "bidet_smart";

export function flushPower(t: ToiletType): number {
  const m: Record<ToiletType, number> = {
    gravity_flush: 6, pressure_assist: 10, dual_flush: 7, wall_hung: 7, bidet_smart: 8,
  };
  return m[t];
}

export function waterPerFlush(t: ToiletType): number {
  const m: Record<ToiletType, number> = {
    gravity_flush: 7, pressure_assist: 8, dual_flush: 3, wall_hung: 5, bidet_smart: 4,
  };
  return m[t];
}

export function noiseLevel(t: ToiletType): number {
  const m: Record<ToiletType, number> = {
    gravity_flush: 4, pressure_assist: 9, dual_flush: 4, wall_hung: 3, bidet_smart: 3,
  };
  return m[t];
}

export function cleaningEase(t: ToiletType): number {
  const m: Record<ToiletType, number> = {
    gravity_flush: 5, pressure_assist: 5, dual_flush: 6, wall_hung: 10, bidet_smart: 8,
  };
  return m[t];
}

export function toiletCost(t: ToiletType): number {
  const m: Record<ToiletType, number> = {
    gravity_flush: 2, pressure_assist: 5, dual_flush: 4, wall_hung: 8, bidet_smart: 10,
  };
  return m[t];
}

export function waterSaving(t: ToiletType): boolean {
  const m: Record<ToiletType, boolean> = {
    gravity_flush: false, pressure_assist: false, dual_flush: true, wall_hung: true, bidet_smart: true,
  };
  return m[t];
}

export function heatedSeat(t: ToiletType): boolean {
  const m: Record<ToiletType, boolean> = {
    gravity_flush: false, pressure_assist: false, dual_flush: false, wall_hung: false, bidet_smart: true,
  };
  return m[t];
}

export function flushMechanism(t: ToiletType): string {
  const m: Record<ToiletType, string> = {
    gravity_flush: "siphon_jet_gravity_fed", pressure_assist: "compressed_air_vessel",
    dual_flush: "half_full_button_valve", wall_hung: "concealed_in_wall_carrier",
    bidet_smart: "tornado_flush_auto_lid",
  };
  return m[t];
}

export function bestInstall(t: ToiletType): string {
  const m: Record<ToiletType, string> = {
    gravity_flush: "budget_replacement_standard", pressure_assist: "commercial_high_traffic",
    dual_flush: "eco_conscious_household", wall_hung: "modern_minimalist_bath",
    bidet_smart: "luxury_comfort_hygiene",
  };
  return m[t];
}

export function toiletTypes(): ToiletType[] {
  return ["gravity_flush", "pressure_assist", "dual_flush", "wall_hung", "bidet_smart"];
}
