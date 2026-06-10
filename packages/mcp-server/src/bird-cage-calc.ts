export type BirdCageType = "flight_cage_large" | "dome_top_round" | "play_top_open" | "travel_carrier" | "aviary_outdoor";

export function flySpace(t: BirdCageType): number {
  const m: Record<BirdCageType, number> = {
    flight_cage_large: 9, dome_top_round: 6, play_top_open: 7, travel_carrier: 2, aviary_outdoor: 10,
  };
  return m[t];
}

export function barStrength(t: BirdCageType): number {
  const m: Record<BirdCageType, number> = {
    flight_cage_large: 8, dome_top_round: 7, play_top_open: 7, travel_carrier: 6, aviary_outdoor: 10,
  };
  return m[t];
}

export function cleanAccess(t: BirdCageType): number {
  const m: Record<BirdCageType, number> = {
    flight_cage_large: 7, dome_top_round: 6, play_top_open: 9, travel_carrier: 5, aviary_outdoor: 4,
  };
  return m[t];
}

export function portability(t: BirdCageType): number {
  const m: Record<BirdCageType, number> = {
    flight_cage_large: 3, dome_top_round: 5, play_top_open: 4, travel_carrier: 10, aviary_outdoor: 1,
  };
  return m[t];
}

export function cageCost(t: BirdCageType): number {
  const m: Record<BirdCageType, number> = {
    flight_cage_large: 7, dome_top_round: 5, play_top_open: 6, travel_carrier: 3, aviary_outdoor: 10,
  };
  return m[t];
}

export function seedGuard(t: BirdCageType): boolean {
  const m: Record<BirdCageType, boolean> = {
    flight_cage_large: true, dome_top_round: true, play_top_open: true, travel_carrier: false, aviary_outdoor: false,
  };
  return m[t];
}

export function weatherProof(t: BirdCageType): boolean {
  const m: Record<BirdCageType, boolean> = {
    flight_cage_large: false, dome_top_round: false, play_top_open: false, travel_carrier: false, aviary_outdoor: true,
  };
  return m[t];
}

export function barMaterial(t: BirdCageType): string {
  const m: Record<BirdCageType, string> = {
    flight_cage_large: "wrought_iron_powder_coat",
    dome_top_round: "stainless_steel_chrome",
    play_top_open: "powder_coat_with_perch",
    travel_carrier: "lightweight_aluminum_mesh",
    aviary_outdoor: "galvanized_welded_wire",
  };
  return m[t];
}

export function bestBird(t: BirdCageType): string {
  const m: Record<BirdCageType, string> = {
    flight_cage_large: "finch_canary_small_flock",
    dome_top_round: "cockatiel_conure_medium",
    play_top_open: "parrot_interactive_social",
    travel_carrier: "vet_visit_short_trip",
    aviary_outdoor: "multiple_birds_naturalistic",
  };
  return m[t];
}

export function birdCages(): BirdCageType[] {
  return ["flight_cage_large", "dome_top_round", "play_top_open", "travel_carrier", "aviary_outdoor"];
}
