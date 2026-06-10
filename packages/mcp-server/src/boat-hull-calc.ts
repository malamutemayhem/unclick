export type BoatHullType = "flat_bottom" | "v_hull_deep" | "catamaran_twin" | "pontoon_tube" | "displacement_round";

export function stabilityAtRest(t: BoatHullType): number {
  const m: Record<BoatHullType, number> = {
    flat_bottom: 10, v_hull_deep: 4, catamaran_twin: 9, pontoon_tube: 10, displacement_round: 5,
  };
  return m[t];
}

export function roughWater(t: BoatHullType): number {
  const m: Record<BoatHullType, number> = {
    flat_bottom: 2, v_hull_deep: 10, catamaran_twin: 8, pontoon_tube: 4, displacement_round: 9,
  };
  return m[t];
}

export function topSpeed(t: BoatHullType): number {
  const m: Record<BoatHullType, number> = {
    flat_bottom: 5, v_hull_deep: 9, catamaran_twin: 10, pontoon_tube: 4, displacement_round: 3,
  };
  return m[t];
}

export function cargoCapacity(t: BoatHullType): number {
  const m: Record<BoatHullType, number> = {
    flat_bottom: 7, v_hull_deep: 6, catamaran_twin: 8, pontoon_tube: 10, displacement_round: 9,
  };
  return m[t];
}

export function hullCost(t: BoatHullType): number {
  const m: Record<BoatHullType, number> = {
    flat_bottom: 2, v_hull_deep: 7, catamaran_twin: 9, pontoon_tube: 6, displacement_round: 8,
  };
  return m[t];
}

export function planing(t: BoatHullType): boolean {
  const m: Record<BoatHullType, boolean> = {
    flat_bottom: true, v_hull_deep: true, catamaran_twin: true, pontoon_tube: false, displacement_round: false,
  };
  return m[t];
}

export function shallowDraft(t: BoatHullType): boolean {
  const m: Record<BoatHullType, boolean> = {
    flat_bottom: true, v_hull_deep: false, catamaran_twin: false, pontoon_tube: true, displacement_round: false,
  };
  return m[t];
}

export function hullShape(t: BoatHullType): string {
  const m: Record<BoatHullType, string> = {
    flat_bottom: "wide_beam_flat_plate", v_hull_deep: "sharp_deadrise_keel",
    catamaran_twin: "twin_hull_bridgedeck", pontoon_tube: "aluminum_tube_platform",
    displacement_round: "full_keel_round_bilge",
  };
  return m[t];
}

export function bestWater(t: BoatHullType): string {
  const m: Record<BoatHullType, string> = {
    flat_bottom: "calm_river_marsh_fishing", v_hull_deep: "offshore_ocean_cruising",
    catamaran_twin: "coastal_speed_ferry", pontoon_tube: "lake_party_entertaining",
    displacement_round: "long_passage_liveaboard",
  };
  return m[t];
}

export function boatHulls(): BoatHullType[] {
  return ["flat_bottom", "v_hull_deep", "catamaran_twin", "pontoon_tube", "displacement_round"];
}
