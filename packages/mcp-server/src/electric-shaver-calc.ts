export type ElectricShaverType = "foil_linear" | "rotary_triple_head" | "wet_dry_body" | "travel_compact" | "precision_detail";

export function closenessShave(t: ElectricShaverType): number {
  const m: Record<ElectricShaverType, number> = {
    foil_linear: 10, rotary_triple_head: 7, wet_dry_body: 6, travel_compact: 5, precision_detail: 8,
  };
  return m[t];
}

export function skinComfort(t: ElectricShaverType): number {
  const m: Record<ElectricShaverType, number> = {
    foil_linear: 7, rotary_triple_head: 9, wet_dry_body: 8, travel_compact: 5, precision_detail: 6,
  };
  return m[t];
}

export function batteryLife(t: ElectricShaverType): number {
  const m: Record<ElectricShaverType, number> = {
    foil_linear: 7, rotary_triple_head: 8, wet_dry_body: 6, travel_compact: 4, precision_detail: 5,
  };
  return m[t];
}

export function portability(t: ElectricShaverType): number {
  const m: Record<ElectricShaverType, number> = {
    foil_linear: 5, rotary_triple_head: 5, wet_dry_body: 6, travel_compact: 10, precision_detail: 8,
  };
  return m[t];
}

export function shaverCost(t: ElectricShaverType): number {
  const m: Record<ElectricShaverType, number> = {
    foil_linear: 7, rotary_triple_head: 6, wet_dry_body: 5, travel_compact: 3, precision_detail: 4,
  };
  return m[t];
}

export function wetShave(t: ElectricShaverType): boolean {
  const m: Record<ElectricShaverType, boolean> = {
    foil_linear: false, rotary_triple_head: false, wet_dry_body: true, travel_compact: false, precision_detail: false,
  };
  return m[t];
}

export function selfCleaning(t: ElectricShaverType): boolean {
  const m: Record<ElectricShaverType, boolean> = {
    foil_linear: true, rotary_triple_head: true, wet_dry_body: false, travel_compact: false, precision_detail: false,
  };
  return m[t];
}

export function cuttingSystem(t: ElectricShaverType): string {
  const m: Record<ElectricShaverType, string> = {
    foil_linear: "oscillating_foil_blade",
    rotary_triple_head: "circular_lift_cut_head",
    wet_dry_body: "rounded_tip_body_guard",
    travel_compact: "mini_foil_single_head",
    precision_detail: "narrow_blade_edge_trim",
  };
  return m[t];
}

export function bestUse(t: ElectricShaverType): string {
  const m: Record<ElectricShaverType, string> = {
    foil_linear: "daily_close_face_shave",
    rotary_triple_head: "contour_neck_jaw",
    wet_dry_body: "shower_full_body_groom",
    travel_compact: "carry_on_business_trip",
    precision_detail: "sideburn_goatee_edge",
  };
  return m[t];
}

export function electricShavers(): ElectricShaverType[] {
  return ["foil_linear", "rotary_triple_head", "wet_dry_body", "travel_compact", "precision_detail"];
}
