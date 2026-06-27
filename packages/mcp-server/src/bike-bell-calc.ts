export type BikeBellType = "classic_dome_ding" | "rotary_spin_ring" | "electronic_horn_loud" | "mini_flick_compact" | "bear_bell_trail";

export function volume(t: BikeBellType): number {
  const m: Record<BikeBellType, number> = {
    classic_dome_ding: 7, rotary_spin_ring: 6, electronic_horn_loud: 10, mini_flick_compact: 5, bear_bell_trail: 8,
  };
  return m[t];
}

export function tonePleasant(t: BikeBellType): number {
  const m: Record<BikeBellType, number> = {
    classic_dome_ding: 9, rotary_spin_ring: 8, electronic_horn_loud: 3, mini_flick_compact: 7, bear_bell_trail: 6,
  };
  return m[t];
}

export function compactSize(t: BikeBellType): number {
  const m: Record<BikeBellType, number> = {
    classic_dome_ding: 6, rotary_spin_ring: 7, electronic_horn_loud: 4, mini_flick_compact: 10, bear_bell_trail: 5,
  };
  return m[t];
}

export function easeOfUse(t: BikeBellType): number {
  const m: Record<BikeBellType, number> = {
    classic_dome_ding: 9, rotary_spin_ring: 8, electronic_horn_loud: 7, mini_flick_compact: 10, bear_bell_trail: 6,
  };
  return m[t];
}

export function bellCost(t: BikeBellType): number {
  const m: Record<BikeBellType, number> = {
    classic_dome_ding: 3, rotary_spin_ring: 4, electronic_horn_loud: 8, mini_flick_compact: 3, bear_bell_trail: 5,
  };
  return m[t];
}

export function needsBattery(t: BikeBellType): boolean {
  const m: Record<BikeBellType, boolean> = {
    classic_dome_ding: false, rotary_spin_ring: false, electronic_horn_loud: true, mini_flick_compact: false, bear_bell_trail: false,
  };
  return m[t];
}

export function weatherproof(t: BikeBellType): boolean {
  const m: Record<BikeBellType, boolean> = {
    classic_dome_ding: true, rotary_spin_ring: true, electronic_horn_loud: false, mini_flick_compact: true, bear_bell_trail: true,
  };
  return m[t];
}

export function bellMaterial(t: BikeBellType): string {
  const m: Record<BikeBellType, string> = {
    classic_dome_ding: "brass_chrome_plated",
    rotary_spin_ring: "aluminum_cnc_anodized",
    electronic_horn_loud: "abs_plastic_speaker",
    mini_flick_compact: "stainless_spring_lever",
    bear_bell_trail: "brass_jingle_enclosed",
  };
  return m[t];
}

export function bestRide(t: BikeBellType): string {
  const m: Record<BikeBellType, string> = {
    classic_dome_ding: "city_commute_path",
    rotary_spin_ring: "casual_cruise_style",
    electronic_horn_loud: "urban_traffic_safety",
    mini_flick_compact: "road_race_minimal",
    bear_bell_trail: "mountain_trail_wildlife",
  };
  return m[t];
}

export function bikeBells(): BikeBellType[] {
  return ["classic_dome_ding", "rotary_spin_ring", "electronic_horn_loud", "mini_flick_compact", "bear_bell_trail"];
}
