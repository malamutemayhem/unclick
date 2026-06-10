export type TravelPillowType = "memory_foam_u" | "inflatable_compact" | "scarf_wrap" | "hooded_privacy" | "chin_support_j";

export function neckSupport(t: TravelPillowType): number {
  const m: Record<TravelPillowType, number> = {
    memory_foam_u: 8, inflatable_compact: 6, scarf_wrap: 5, hooded_privacy: 7, chin_support_j: 9,
  };
  return m[t];
}

export function packability(t: TravelPillowType): number {
  const m: Record<TravelPillowType, number> = {
    memory_foam_u: 4, inflatable_compact: 10, scarf_wrap: 8, hooded_privacy: 5, chin_support_j: 3,
  };
  return m[t];
}

export function breathability(t: TravelPillowType): number {
  const m: Record<TravelPillowType, number> = {
    memory_foam_u: 5, inflatable_compact: 7, scarf_wrap: 9, hooded_privacy: 4, chin_support_j: 6,
  };
  return m[t];
}

export function privacyFactor(t: TravelPillowType): number {
  const m: Record<TravelPillowType, number> = {
    memory_foam_u: 2, inflatable_compact: 2, scarf_wrap: 3, hooded_privacy: 10, chin_support_j: 2,
  };
  return m[t];
}

export function pillowCost(t: TravelPillowType): number {
  const m: Record<TravelPillowType, number> = {
    memory_foam_u: 5, inflatable_compact: 3, scarf_wrap: 6, hooded_privacy: 7, chin_support_j: 8,
  };
  return m[t];
}

export function machineWash(t: TravelPillowType): boolean {
  const m: Record<TravelPillowType, boolean> = {
    memory_foam_u: false, inflatable_compact: false, scarf_wrap: true, hooded_privacy: true, chin_support_j: false,
  };
  return m[t];
}

export function adjustFirmness(t: TravelPillowType): boolean {
  const m: Record<TravelPillowType, boolean> = {
    memory_foam_u: false, inflatable_compact: true, scarf_wrap: false, hooded_privacy: false, chin_support_j: false,
  };
  return m[t];
}

export function fillMaterial(t: TravelPillowType): string {
  const m: Record<TravelPillowType, string> = {
    memory_foam_u: "viscoelastic_foam_contour",
    inflatable_compact: "tpu_air_bladder",
    scarf_wrap: "microfiber_poly_fill",
    hooded_privacy: "memory_foam_hood_combo",
    chin_support_j: "ergonomic_foam_block",
  };
  return m[t];
}

export function bestTravel(t: TravelPillowType): string {
  const m: Record<TravelPillowType, string> = {
    memory_foam_u: "long_haul_flight_seat",
    inflatable_compact: "backpacking_light_travel",
    scarf_wrap: "train_bus_casual",
    hooded_privacy: "red_eye_flight_sleep",
    chin_support_j: "window_seat_side_lean",
  };
  return m[t];
}

export function travelPillows(): TravelPillowType[] {
  return ["memory_foam_u", "inflatable_compact", "scarf_wrap", "hooded_privacy", "chin_support_j"];
}
