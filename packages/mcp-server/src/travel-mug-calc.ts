export type TravelMugType = "contigo_autoseal_snap" | "yeti_rambler_mag" | "zojirushi_flip_open" | "keepcup_glass_cork" | "hydro_flask_sip_wide";

export function leakProof(t: TravelMugType): number {
  const m: Record<TravelMugType, number> = {
    contigo_autoseal_snap: 10, yeti_rambler_mag: 7, zojirushi_flip_open: 9, keepcup_glass_cork: 5, hydro_flask_sip_wide: 8,
  };
  return m[t];
}

export function insulation(t: TravelMugType): number {
  const m: Record<TravelMugType, number> = {
    contigo_autoseal_snap: 8, yeti_rambler_mag: 9, zojirushi_flip_open: 10, keepcup_glass_cork: 4, hydro_flask_sip_wide: 9,
  };
  return m[t];
}

export function oneHandUse(t: TravelMugType): number {
  const m: Record<TravelMugType, number> = {
    contigo_autoseal_snap: 10, yeti_rambler_mag: 7, zojirushi_flip_open: 8, keepcup_glass_cork: 5, hydro_flask_sip_wide: 6,
  };
  return m[t];
}

export function cleanEase(t: TravelMugType): number {
  const m: Record<TravelMugType, number> = {
    contigo_autoseal_snap: 5, yeti_rambler_mag: 8, zojirushi_flip_open: 6, keepcup_glass_cork: 9, hydro_flask_sip_wide: 7,
  };
  return m[t];
}

export function mugCost(t: TravelMugType): number {
  const m: Record<TravelMugType, number> = {
    contigo_autoseal_snap: 5, yeti_rambler_mag: 8, zojirushi_flip_open: 7, keepcup_glass_cork: 6, hydro_flask_sip_wide: 7,
  };
  return m[t];
}

export function cupHolderFit(t: TravelMugType): boolean {
  const m: Record<TravelMugType, boolean> = {
    contigo_autoseal_snap: true, yeti_rambler_mag: true, zojirushi_flip_open: true, keepcup_glass_cork: false, hydro_flask_sip_wide: true,
  };
  return m[t];
}

export function baristaFriendly(t: TravelMugType): boolean {
  const m: Record<TravelMugType, boolean> = {
    contigo_autoseal_snap: false, yeti_rambler_mag: false, zojirushi_flip_open: false, keepcup_glass_cork: true, hydro_flask_sip_wide: false,
  };
  return m[t];
}

export function lidMechanism(t: TravelMugType): string {
  const m: Record<TravelMugType, string> = {
    contigo_autoseal_snap: "button_press_autoseal",
    yeti_rambler_mag: "magnetic_slider_cap",
    zojirushi_flip_open: "flip_open_lock_latch",
    keepcup_glass_cork: "silicone_plug_sip",
    hydro_flask_sip_wide: "flex_sip_twist_cap",
  };
  return m[t];
}

export function bestCommute(t: TravelMugType): string {
  const m: Record<TravelMugType, string> = {
    contigo_autoseal_snap: "car_commute_no_spill",
    yeti_rambler_mag: "outdoor_rugged_daily",
    zojirushi_flip_open: "long_commute_hot_all_day",
    keepcup_glass_cork: "cafe_reusable_eco",
    hydro_flask_sip_wide: "active_lifestyle_gym",
  };
  return m[t];
}

export function travelMugs(): TravelMugType[] {
  return ["contigo_autoseal_snap", "yeti_rambler_mag", "zojirushi_flip_open", "keepcup_glass_cork", "hydro_flask_sip_wide"];
}
