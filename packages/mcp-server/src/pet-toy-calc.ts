export type PetToyType = "rope_tug_knot" | "rubber_kong_stuff" | "plush_squeaker_soft" | "ball_tennis_fetch" | "puzzle_treat_dispense";

export function durability(t: PetToyType): number {
  const m: Record<PetToyType, number> = {
    rope_tug_knot: 7, rubber_kong_stuff: 10, plush_squeaker_soft: 3, ball_tennis_fetch: 6, puzzle_treat_dispense: 8,
  };
  return m[t];
}

export function engagement(t: PetToyType): number {
  const m: Record<PetToyType, number> = {
    rope_tug_knot: 8, rubber_kong_stuff: 9, plush_squeaker_soft: 7, ball_tennis_fetch: 8, puzzle_treat_dispense: 10,
  };
  return m[t];
}

export function mentalStimulation(t: PetToyType): number {
  const m: Record<PetToyType, number> = {
    rope_tug_knot: 4, rubber_kong_stuff: 8, plush_squeaker_soft: 3, ball_tennis_fetch: 5, puzzle_treat_dispense: 10,
  };
  return m[t];
}

export function safetyRating(t: PetToyType): number {
  const m: Record<PetToyType, number> = {
    rope_tug_knot: 6, rubber_kong_stuff: 9, plush_squeaker_soft: 5, ball_tennis_fetch: 8, puzzle_treat_dispense: 9,
  };
  return m[t];
}

export function toyCost(t: PetToyType): number {
  const m: Record<PetToyType, number> = {
    rope_tug_knot: 3, rubber_kong_stuff: 5, plush_squeaker_soft: 3, ball_tennis_fetch: 2, puzzle_treat_dispense: 8,
  };
  return m[t];
}

export function holdsTreats(t: PetToyType): boolean {
  const m: Record<PetToyType, boolean> = {
    rope_tug_knot: false, rubber_kong_stuff: true, plush_squeaker_soft: false, ball_tennis_fetch: false, puzzle_treat_dispense: true,
  };
  return m[t];
}

export function machineWashable(t: PetToyType): boolean {
  const m: Record<PetToyType, boolean> = {
    rope_tug_knot: true, rubber_kong_stuff: true, plush_squeaker_soft: true, ball_tennis_fetch: false, puzzle_treat_dispense: false,
  };
  return m[t];
}

export function toyMaterial(t: PetToyType): string {
  const m: Record<PetToyType, string> = {
    rope_tug_knot: "cotton_poly_braided",
    rubber_kong_stuff: "natural_rubber_vulcanized",
    plush_squeaker_soft: "polyester_fill_fabric",
    ball_tennis_fetch: "pressurized_felt_rubber",
    puzzle_treat_dispense: "abs_plastic_composite",
  };
  return m[t];
}

export function bestPlayStyle(t: PetToyType): string {
  const m: Record<PetToyType, string> = {
    rope_tug_knot: "interactive_tug_of_war",
    rubber_kong_stuff: "solo_chew_stuff_freeze",
    plush_squeaker_soft: "gentle_comfort_cuddle",
    ball_tennis_fetch: "outdoor_fetch_retrieve",
    puzzle_treat_dispense: "boredom_buster_slow_feed",
  };
  return m[t];
}

export function petToys(): PetToyType[] {
  return ["rope_tug_knot", "rubber_kong_stuff", "plush_squeaker_soft", "ball_tennis_fetch", "puzzle_treat_dispense"];
}
