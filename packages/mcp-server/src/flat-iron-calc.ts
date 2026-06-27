export type FlatIronType = "ceramic_plate_basic" | "titanium_pro_salon" | "tourmaline_ionic_shine" | "steam_moisture_infuse" | "mini_travel_compact";

export function heatDistribution(t: FlatIronType): number {
  const m: Record<FlatIronType, number> = {
    ceramic_plate_basic: 7, titanium_pro_salon: 10, tourmaline_ionic_shine: 8, steam_moisture_infuse: 7, mini_travel_compact: 5,
  };
  return m[t];
}

export function smoothResult(t: FlatIronType): number {
  const m: Record<FlatIronType, number> = {
    ceramic_plate_basic: 7, titanium_pro_salon: 10, tourmaline_ionic_shine: 9, steam_moisture_infuse: 8, mini_travel_compact: 5,
  };
  return m[t];
}

export function hairProtection(t: FlatIronType): number {
  const m: Record<FlatIronType, number> = {
    ceramic_plate_basic: 6, titanium_pro_salon: 5, tourmaline_ionic_shine: 9, steam_moisture_infuse: 10, mini_travel_compact: 4,
  };
  return m[t];
}

export function heatUpSpeed(t: FlatIronType): number {
  const m: Record<FlatIronType, number> = {
    ceramic_plate_basic: 6, titanium_pro_salon: 10, tourmaline_ionic_shine: 8, steam_moisture_infuse: 5, mini_travel_compact: 7,
  };
  return m[t];
}

export function ironCost(t: FlatIronType): number {
  const m: Record<FlatIronType, number> = {
    ceramic_plate_basic: 2, titanium_pro_salon: 8, tourmaline_ionic_shine: 6, steam_moisture_infuse: 7, mini_travel_compact: 3,
  };
  return m[t];
}

export function dualVoltage(t: FlatIronType): boolean {
  const m: Record<FlatIronType, boolean> = {
    ceramic_plate_basic: false, titanium_pro_salon: true, tourmaline_ionic_shine: true, steam_moisture_infuse: false, mini_travel_compact: true,
  };
  return m[t];
}

export function autoShutoff(t: FlatIronType): boolean {
  const m: Record<FlatIronType, boolean> = {
    ceramic_plate_basic: true, titanium_pro_salon: true, tourmaline_ionic_shine: true, steam_moisture_infuse: true, mini_travel_compact: true,
  };
  return m[t];
}

export function plateCoating(t: FlatIronType): string {
  const m: Record<FlatIronType, string> = {
    ceramic_plate_basic: "ceramic_glaze_smooth",
    titanium_pro_salon: "solid_titanium_polish",
    tourmaline_ionic_shine: "tourmaline_ceramic_ion",
    steam_moisture_infuse: "ceramic_steam_vent",
    mini_travel_compact: "ceramic_mini_narrow",
  };
  return m[t];
}

export function bestHair(t: FlatIronType): string {
  const m: Record<FlatIronType, string> = {
    ceramic_plate_basic: "fine_normal_everyday",
    titanium_pro_salon: "thick_coarse_curly",
    tourmaline_ionic_shine: "frizzy_damaged_shine",
    steam_moisture_infuse: "dry_brittle_color_treated",
    mini_travel_compact: "bangs_touchup_travel",
  };
  return m[t];
}

export function flatIrons(): FlatIronType[] {
  return ["ceramic_plate_basic", "titanium_pro_salon", "tourmaline_ionic_shine", "steam_moisture_infuse", "mini_travel_compact"];
}
