export type ClimbingHarness = "sit" | "chest" | "full_body" | "alpine" | "big_wall";

export function comfortRating(h: ClimbingHarness): number {
  const m: Record<ClimbingHarness, number> = {
    sit: 8, chest: 4, full_body: 6, alpine: 5, big_wall: 10,
  };
  return m[h];
}

export function weightGrams(h: ClimbingHarness): number {
  const m: Record<ClimbingHarness, number> = {
    sit: 5, chest: 3, full_body: 8, alpine: 2, big_wall: 9,
  };
  return m[h];
}

export function gearLoops(h: ClimbingHarness): number {
  const m: Record<ClimbingHarness, number> = {
    sit: 6, chest: 1, full_body: 5, alpine: 3, big_wall: 10,
  };
  return m[h];
}

export function fallProtection(h: ClimbingHarness): number {
  const m: Record<ClimbingHarness, number> = {
    sit: 7, chest: 5, full_body: 10, alpine: 6, big_wall: 8,
  };
  return m[h];
}

export function adjustability(h: ClimbingHarness): number {
  const m: Record<ClimbingHarness, number> = {
    sit: 7, chest: 4, full_body: 9, alpine: 8, big_wall: 6,
  };
  return m[h];
}

export function suitableForChildren(h: ClimbingHarness): boolean {
  const m: Record<ClimbingHarness, boolean> = {
    sit: false, chest: false, full_body: true, alpine: false, big_wall: false,
  };
  return m[h];
}

export function hasLegLoops(h: ClimbingHarness): boolean {
  const m: Record<ClimbingHarness, boolean> = {
    sit: true, chest: false, full_body: true, alpine: true, big_wall: true,
  };
  return m[h];
}

export function tieInSystem(h: ClimbingHarness): string {
  const m: Record<ClimbingHarness, string> = {
    sit: "belay_loop_tie_in", chest: "chest_loop_only",
    full_body: "dorsal_sternal_attachment", alpine: "ice_clipper_slots",
    big_wall: "haul_loop_belay_seat",
  };
  return m[h];
}

export function bestActivity(h: ClimbingHarness): string {
  const m: Record<ClimbingHarness, string> = {
    sit: "sport_trad_climbing", chest: "caving_supplement",
    full_body: "via_ferrata_youth", alpine: "mountaineering_ski",
    big_wall: "multi_day_vertical",
  };
  return m[h];
}

export function climbingHarnesses(): ClimbingHarness[] {
  return ["sit", "chest", "full_body", "alpine", "big_wall"];
}
