export type TrekkingPoleType = "aluminum_telescoping" | "carbon_fiber_folding" | "ultralight_z_pole" | "shock_absorbing" | "ski_touring_dual";

export function durability(t: TrekkingPoleType): number {
  const m: Record<TrekkingPoleType, number> = {
    aluminum_telescoping: 9, carbon_fiber_folding: 6, ultralight_z_pole: 5, shock_absorbing: 8, ski_touring_dual: 9,
  };
  return m[t];
}

export function poleWeight(t: TrekkingPoleType): number {
  const m: Record<TrekkingPoleType, number> = {
    aluminum_telescoping: 5, carbon_fiber_folding: 9, ultralight_z_pole: 10, shock_absorbing: 4, ski_touring_dual: 3,
  };
  return m[t];
}

export function packability(t: TrekkingPoleType): number {
  const m: Record<TrekkingPoleType, number> = {
    aluminum_telescoping: 6, carbon_fiber_folding: 9, ultralight_z_pole: 10, shock_absorbing: 5, ski_touring_dual: 4,
  };
  return m[t];
}

export function jointStability(t: TrekkingPoleType): number {
  const m: Record<TrekkingPoleType, number> = {
    aluminum_telescoping: 8, carbon_fiber_folding: 7, ultralight_z_pole: 6, shock_absorbing: 8, ski_touring_dual: 9,
  };
  return m[t];
}

export function poleCost(t: TrekkingPoleType): number {
  const m: Record<TrekkingPoleType, number> = {
    aluminum_telescoping: 3, carbon_fiber_folding: 8, ultralight_z_pole: 7, shock_absorbing: 5, ski_touring_dual: 9,
  };
  return m[t];
}

export function adjustable(t: TrekkingPoleType): boolean {
  const m: Record<TrekkingPoleType, boolean> = {
    aluminum_telescoping: true, carbon_fiber_folding: false, ultralight_z_pole: false, shock_absorbing: true, ski_touring_dual: true,
  };
  return m[t];
}

export function snowBasket(t: TrekkingPoleType): boolean {
  const m: Record<TrekkingPoleType, boolean> = {
    aluminum_telescoping: false, carbon_fiber_folding: false, ultralight_z_pole: false, shock_absorbing: false, ski_touring_dual: true,
  };
  return m[t];
}

export function lockType(t: TrekkingPoleType): string {
  const m: Record<TrekkingPoleType, string> = {
    aluminum_telescoping: "flick_lock_lever", carbon_fiber_folding: "speed_cone_tension",
    ultralight_z_pole: "cord_tension_fixed", shock_absorbing: "twist_lock_internal",
    ski_touring_dual: "flick_lock_plus_strap",
  };
  return m[t];
}

export function bestActivity(t: TrekkingPoleType): string {
  const m: Record<TrekkingPoleType, string> = {
    aluminum_telescoping: "general_hiking_rugged_trail", carbon_fiber_folding: "long_distance_thru_hike",
    ultralight_z_pole: "fast_packing_trail_running", shock_absorbing: "knee_relief_downhill",
    ski_touring_dual: "backcountry_skiing_snowshoe",
  };
  return m[t];
}

export function trekkingPoles(): TrekkingPoleType[] {
  return ["aluminum_telescoping", "carbon_fiber_folding", "ultralight_z_pole", "shock_absorbing", "ski_touring_dual"];
}
