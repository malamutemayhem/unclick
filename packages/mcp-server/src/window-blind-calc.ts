export type WindowBlindType = "venetian_aluminum" | "roller_fabric" | "cellular_honeycomb" | "vertical_pvc" | "roman_fold";

export function lightControl(t: WindowBlindType): number {
  const m: Record<WindowBlindType, number> = {
    venetian_aluminum: 9, roller_fabric: 7, cellular_honeycomb: 6, vertical_pvc: 8, roman_fold: 5,
  };
  return m[t];
}

export function insulation(t: WindowBlindType): number {
  const m: Record<WindowBlindType, number> = {
    venetian_aluminum: 3, roller_fabric: 5, cellular_honeycomb: 10, vertical_pvc: 4, roman_fold: 7,
  };
  return m[t];
}

export function privacyLevel(t: WindowBlindType): number {
  const m: Record<WindowBlindType, number> = {
    venetian_aluminum: 7, roller_fabric: 8, cellular_honeycomb: 9, vertical_pvc: 7, roman_fold: 8,
  };
  return m[t];
}

export function cleaningEase(t: WindowBlindType): number {
  const m: Record<WindowBlindType, number> = {
    venetian_aluminum: 6, roller_fabric: 8, cellular_honeycomb: 5, vertical_pvc: 9, roman_fold: 3,
  };
  return m[t];
}

export function blindCost(t: WindowBlindType): number {
  const m: Record<WindowBlindType, number> = {
    venetian_aluminum: 4, roller_fabric: 5, cellular_honeycomb: 8, vertical_pvc: 3, roman_fold: 9,
  };
  return m[t];
}

export function cordless(t: WindowBlindType): boolean {
  const m: Record<WindowBlindType, boolean> = {
    venetian_aluminum: false, roller_fabric: true, cellular_honeycomb: true, vertical_pvc: false, roman_fold: false,
  };
  return m[t];
}

export function motorizable(t: WindowBlindType): boolean {
  const m: Record<WindowBlindType, boolean> = {
    venetian_aluminum: true, roller_fabric: true, cellular_honeycomb: true, vertical_pvc: true, roman_fold: false,
  };
  return m[t];
}

export function slatMaterial(t: WindowBlindType): string {
  const m: Record<WindowBlindType, string> = {
    venetian_aluminum: "powder_coated_aluminum",
    roller_fabric: "polyester_blackout_weave",
    cellular_honeycomb: "spunbond_polyester_cell",
    vertical_pvc: "rigid_pvc_vane",
    roman_fold: "linen_cotton_cascade",
  };
  return m[t];
}

export function bestWindow(t: WindowBlindType): string {
  const m: Record<WindowBlindType, string> = {
    venetian_aluminum: "office_kitchen_moisture",
    roller_fabric: "bedroom_media_room",
    cellular_honeycomb: "energy_conscious_climate",
    vertical_pvc: "sliding_door_wide_span",
    roman_fold: "living_room_decorative",
  };
  return m[t];
}

export function windowBlinds(): WindowBlindType[] {
  return ["venetian_aluminum", "roller_fabric", "cellular_honeycomb", "vertical_pvc", "roman_fold"];
}
