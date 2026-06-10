export type HairStraightenerType = "ceramic_plate_standard" | "titanium_pro_salon" | "tourmaline_ionic" | "steam_moisture_infuse" | "cordless_mini_travel";

export function heatSpeed(t: HairStraightenerType): number {
  const m: Record<HairStraightenerType, number> = {
    ceramic_plate_standard: 7, titanium_pro_salon: 10, tourmaline_ionic: 8, steam_moisture_infuse: 6, cordless_mini_travel: 5,
  };
  return m[t];
}

export function hairProtection(t: HairStraightenerType): number {
  const m: Record<HairStraightenerType, number> = {
    ceramic_plate_standard: 7, titanium_pro_salon: 5, tourmaline_ionic: 9, steam_moisture_infuse: 10, cordless_mini_travel: 6,
  };
  return m[t];
}

export function smoothResult(t: HairStraightenerType): number {
  const m: Record<HairStraightenerType, number> = {
    ceramic_plate_standard: 7, titanium_pro_salon: 10, tourmaline_ionic: 9, steam_moisture_infuse: 8, cordless_mini_travel: 5,
  };
  return m[t];
}

export function portability(t: HairStraightenerType): number {
  const m: Record<HairStraightenerType, number> = {
    ceramic_plate_standard: 6, titanium_pro_salon: 4, tourmaline_ionic: 5, steam_moisture_infuse: 3, cordless_mini_travel: 10,
  };
  return m[t];
}

export function straightenerCost(t: HairStraightenerType): number {
  const m: Record<HairStraightenerType, number> = {
    ceramic_plate_standard: 4, titanium_pro_salon: 9, tourmaline_ionic: 7, steam_moisture_infuse: 8, cordless_mini_travel: 5,
  };
  return m[t];
}

export function dualVoltage(t: HairStraightenerType): boolean {
  const m: Record<HairStraightenerType, boolean> = {
    ceramic_plate_standard: false, titanium_pro_salon: true, tourmaline_ionic: true, steam_moisture_infuse: false, cordless_mini_travel: true,
  };
  return m[t];
}

export function autoShutoff(t: HairStraightenerType): boolean {
  const m: Record<HairStraightenerType, boolean> = {
    ceramic_plate_standard: true, titanium_pro_salon: true, tourmaline_ionic: true, steam_moisture_infuse: true, cordless_mini_travel: false,
  };
  return m[t];
}

export function plateMaterial(t: HairStraightenerType): string {
  const m: Record<HairStraightenerType, string> = {
    ceramic_plate_standard: "solid_ceramic_even_heat",
    titanium_pro_salon: "titanium_coated_fast_heat",
    tourmaline_ionic: "crushed_tourmaline_ion_emit",
    steam_moisture_infuse: "ceramic_steam_vent_plate",
    cordless_mini_travel: "ceramic_compact_rechargeable",
  };
  return m[t];
}

export function bestHairType(t: HairStraightenerType): string {
  const m: Record<HairStraightenerType, string> = {
    ceramic_plate_standard: "normal_fine_everyday",
    titanium_pro_salon: "thick_coarse_curly_pro",
    tourmaline_ionic: "frizzy_damaged_dry",
    steam_moisture_infuse: "color_treated_delicate",
    cordless_mini_travel: "touch_up_bangs_travel",
  };
  return m[t];
}

export function hairStraighteners(): HairStraightenerType[] {
  return ["ceramic_plate_standard", "titanium_pro_salon", "tourmaline_ionic", "steam_moisture_infuse", "cordless_mini_travel"];
}
