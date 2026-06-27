export type MacrameKnot = "square_knot" | "spiral_knot" | "half_hitch" | "gathering_knot" | "berry_knot";

export function cordUsageCm(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 8, spiral_knot: 10, half_hitch: 4, gathering_knot: 12, berry_knot: 15,
  };
  return m[knot];
}

export function difficultyRating(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 2, spiral_knot: 3, half_hitch: 1, gathering_knot: 4, berry_knot: 7,
  };
  return m[knot];
}

export function textureRating(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 5, spiral_knot: 7, half_hitch: 3, gathering_knot: 4, berry_knot: 9,
  };
  return m[knot];
}

export function densityResult(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 6, spiral_knot: 5, half_hitch: 4, gathering_knot: 8, berry_knot: 9,
  };
  return m[knot];
}

export function speedPerKnot(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 8, spiral_knot: 7, half_hitch: 9, gathering_knot: 5, berry_knot: 3,
  };
  return m[knot];
}

export function reversible(knot: MacrameKnot): boolean {
  const m: Record<MacrameKnot, boolean> = {
    square_knot: true, spiral_knot: false, half_hitch: true, gathering_knot: false, berry_knot: false,
  };
  return m[knot];
}

export function structural(knot: MacrameKnot): boolean {
  const m: Record<MacrameKnot, boolean> = {
    square_knot: true, spiral_knot: false, half_hitch: false, gathering_knot: true, berry_knot: false,
  };
  return m[knot];
}

export function bestProject(knot: MacrameKnot): string {
  const m: Record<MacrameKnot, string> = {
    square_knot: "wall_hanging", spiral_knot: "plant_hanger", half_hitch: "bracelet",
    gathering_knot: "curtain", berry_knot: "statement_piece",
  };
  return m[knot];
}

export function costPerMeter(knot: MacrameKnot): number {
  const m: Record<MacrameKnot, number> = {
    square_knot: 3, spiral_knot: 4, half_hitch: 2, gathering_knot: 5, berry_knot: 7,
  };
  return m[knot];
}

export function macrameKnots(): MacrameKnot[] {
  return ["square_knot", "spiral_knot", "half_hitch", "gathering_knot", "berry_knot"];
}
