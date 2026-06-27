export type WoodSpecies = "oak" | "walnut" | "maple" | "cherry" | "pine";

export function hardnessJanka(w: WoodSpecies): number {
  const m: Record<WoodSpecies, number> = {
    oak: 1290, walnut: 1010, maple: 1450, cherry: 950, pine: 380,
  };
  return m[w];
}

export function densityKgM3(w: WoodSpecies): number {
  const m: Record<WoodSpecies, number> = {
    oak: 770, walnut: 640, maple: 705, cherry: 580, pine: 510,
  };
  return m[w];
}

export function workability(w: WoodSpecies): number {
  const m: Record<WoodSpecies, number> = {
    oak: 6, walnut: 8, maple: 5, cherry: 9, pine: 10,
  };
  return m[w];
}

export function grainBeauty(w: WoodSpecies): number {
  const m: Record<WoodSpecies, number> = {
    oak: 8, walnut: 10, maple: 7, cherry: 9, pine: 4,
  };
  return m[w];
}

export function costPerBoardFoot(w: WoodSpecies): number {
  const m: Record<WoodSpecies, number> = {
    oak: 6, walnut: 10, maple: 5, cherry: 8, pine: 2,
  };
  return m[w];
}

export function isHardwood(w: WoodSpecies): boolean {
  const m: Record<WoodSpecies, boolean> = {
    oak: true, walnut: true, maple: true, cherry: true, pine: false,
  };
  return m[w];
}

export function darkensWithAge(w: WoodSpecies): boolean {
  const m: Record<WoodSpecies, boolean> = {
    oak: true, walnut: false, maple: false, cherry: true, pine: true,
  };
  return m[w];
}

export function bestProject(w: WoodSpecies): string {
  const m: Record<WoodSpecies, string> = {
    oak: "flooring_cabinets", walnut: "fine_furniture_gunstocks",
    maple: "cutting_boards_instruments", cherry: "cabinets_trim",
    pine: "framing_shelves",
  };
  return m[w];
}

export function grainPattern(w: WoodSpecies): string {
  const m: Record<WoodSpecies, string> = {
    oak: "prominent_ray_fleck", walnut: "straight_figured",
    maple: "fine_curly_birdseye", cherry: "fine_straight",
    pine: "knotty_straight",
  };
  return m[w];
}

export function woodSpeciesList(): WoodSpecies[] {
  return ["oak", "walnut", "maple", "cherry", "pine"];
}
