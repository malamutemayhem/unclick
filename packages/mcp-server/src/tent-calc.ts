export type TentType = "backpacking_ultra" | "car_camping_family" | "four_season_alpine" | "pop_up_instant" | "hammock_tarp";

export function weatherResist(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_ultra: 7, car_camping_family: 6, four_season_alpine: 10, pop_up_instant: 4, hammock_tarp: 5,
  };
  return m[t];
}

export function packWeight(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_ultra: 10, car_camping_family: 2, four_season_alpine: 4, pop_up_instant: 5, hammock_tarp: 9,
  };
  return m[t];
}

export function interiorSpace(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_ultra: 4, car_camping_family: 10, four_season_alpine: 5, pop_up_instant: 6, hammock_tarp: 3,
  };
  return m[t];
}

export function setupSpeed(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_ultra: 6, car_camping_family: 4, four_season_alpine: 3, pop_up_instant: 10, hammock_tarp: 7,
  };
  return m[t];
}

export function tentCost(t: TentType): number {
  const m: Record<TentType, number> = {
    backpacking_ultra: 8, car_camping_family: 5, four_season_alpine: 10, pop_up_instant: 2, hammock_tarp: 4,
  };
  return m[t];
}

export function freestanding(t: TentType): boolean {
  const m: Record<TentType, boolean> = {
    backpacking_ultra: true, car_camping_family: true, four_season_alpine: true, pop_up_instant: true, hammock_tarp: false,
  };
  return m[t];
}

export function vestibule(t: TentType): boolean {
  const m: Record<TentType, boolean> = {
    backpacking_ultra: true, car_camping_family: false, four_season_alpine: true, pop_up_instant: false, hammock_tarp: true,
  };
  return m[t];
}

export function poleType(t: TentType): string {
  const m: Record<TentType, string> = {
    backpacking_ultra: "dac_featherlite_aluminum", car_camping_family: "steel_fiberglass_combo",
    four_season_alpine: "easton_syclone_carbon", pop_up_instant: "spring_loaded_auto",
    hammock_tarp: "ridgeline_cord_only",
  };
  return m[t];
}

export function bestTrip(t: TentType): string {
  const m: Record<TentType, string> = {
    backpacking_ultra: "thru_hike_multi_day", car_camping_family: "campground_festival_weekend",
    four_season_alpine: "winter_mountaineering_expedition", pop_up_instant: "beach_park_quick_shelter",
    hammock_tarp: "forest_trail_warm_season",
  };
  return m[t];
}

export function tents(): TentType[] {
  return ["backpacking_ultra", "car_camping_family", "four_season_alpine", "pop_up_instant", "hammock_tarp"];
}
