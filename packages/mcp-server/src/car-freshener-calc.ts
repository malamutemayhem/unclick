export type CarFreshenerType = "hanging_tree_paper" | "vent_clip_diffuser" | "gel_can_slow_release" | "charcoal_bag_absorber" | "spray_mist_instant";

export function scentStrength(t: CarFreshenerType): number {
  const m: Record<CarFreshenerType, number> = {
    hanging_tree_paper: 7, vent_clip_diffuser: 8, gel_can_slow_release: 5, charcoal_bag_absorber: 2, spray_mist_instant: 10,
  };
  return m[t];
}

export function longevity(t: CarFreshenerType): number {
  const m: Record<CarFreshenerType, number> = {
    hanging_tree_paper: 4, vent_clip_diffuser: 7, gel_can_slow_release: 8, charcoal_bag_absorber: 10, spray_mist_instant: 2,
  };
  return m[t];
}

export function odorElimination(t: CarFreshenerType): number {
  const m: Record<CarFreshenerType, number> = {
    hanging_tree_paper: 3, vent_clip_diffuser: 5, gel_can_slow_release: 4, charcoal_bag_absorber: 10, spray_mist_instant: 6,
  };
  return m[t];
}

export function subtlety(t: CarFreshenerType): number {
  const m: Record<CarFreshenerType, number> = {
    hanging_tree_paper: 4, vent_clip_diffuser: 7, gel_can_slow_release: 8, charcoal_bag_absorber: 10, spray_mist_instant: 3,
  };
  return m[t];
}

export function freshenerCost(t: CarFreshenerType): number {
  const m: Record<CarFreshenerType, number> = {
    hanging_tree_paper: 1, vent_clip_diffuser: 3, gel_can_slow_release: 2, charcoal_bag_absorber: 3, spray_mist_instant: 2,
  };
  return m[t];
}

export function chemicalFree(t: CarFreshenerType): boolean {
  const m: Record<CarFreshenerType, boolean> = {
    hanging_tree_paper: false, vent_clip_diffuser: false, gel_can_slow_release: false, charcoal_bag_absorber: true, spray_mist_instant: false,
  };
  return m[t];
}

export function adjustable(t: CarFreshenerType): boolean {
  const m: Record<CarFreshenerType, boolean> = {
    hanging_tree_paper: false, vent_clip_diffuser: true, gel_can_slow_release: true, charcoal_bag_absorber: false, spray_mist_instant: false,
  };
  return m[t];
}

export function deliveryMethod(t: CarFreshenerType): string {
  const m: Record<CarFreshenerType, string> = {
    hanging_tree_paper: "paper_cellulose_evaporate",
    vent_clip_diffuser: "essential_oil_vent_flow",
    gel_can_slow_release: "gel_bead_slow_evaporate",
    charcoal_bag_absorber: "activated_charcoal_absorb",
    spray_mist_instant: "aerosol_mist_spray",
  };
  return m[t];
}

export function bestUse(t: CarFreshenerType): string {
  const m: Record<CarFreshenerType, string> = {
    hanging_tree_paper: "budget_quick_fragrance",
    vent_clip_diffuser: "daily_driver_pleasant",
    gel_can_slow_release: "under_seat_steady",
    charcoal_bag_absorber: "pet_smoke_odor_remove",
    spray_mist_instant: "quick_refresh_rideshare",
  };
  return m[t];
}

export function carFresheners(): CarFreshenerType[] {
  return ["hanging_tree_paper", "vent_clip_diffuser", "gel_can_slow_release", "charcoal_bag_absorber", "spray_mist_instant"];
}
