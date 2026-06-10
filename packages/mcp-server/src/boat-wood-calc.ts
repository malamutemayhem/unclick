export type BoatWood = "teak" | "mahogany" | "white_oak" | "western_red_cedar" | "marine_plywood";

export function rotResistance(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 10, mahogany: 7, white_oak: 8, western_red_cedar: 9, marine_plywood: 6,
  };
  return m[wood];
}

export function strengthToWeight(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 7, mahogany: 8, white_oak: 6, western_red_cedar: 9, marine_plywood: 8,
  };
  return m[wood];
}

export function bendability(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 4, mahogany: 6, white_oak: 9, western_red_cedar: 3, marine_plywood: 2,
  };
  return m[wood];
}

export function oilContent(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 10, mahogany: 4, white_oak: 3, western_red_cedar: 7, marine_plywood: 1,
  };
  return m[wood];
}

export function glueability(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 3, mahogany: 8, white_oak: 7, western_red_cedar: 6, marine_plywood: 9,
  };
  return m[wood];
}

export function dimensionalStability(wood: BoatWood): boolean {
  const m: Record<BoatWood, boolean> = {
    teak: true, mahogany: true, white_oak: false, western_red_cedar: true, marine_plywood: true,
  };
  return m[wood];
}

export function sustainablySourced(wood: BoatWood): boolean {
  const m: Record<BoatWood, boolean> = {
    teak: false, mahogany: false, white_oak: true, western_red_cedar: true, marine_plywood: true,
  };
  return m[wood];
}

export function bestUse(wood: BoatWood): string {
  const m: Record<BoatWood, string> = {
    teak: "deck_planking", mahogany: "hull_planking", white_oak: "frames_ribs",
    western_red_cedar: "strip_planking", marine_plywood: "bulkheads",
  };
  return m[wood];
}

export function costPerBoardFoot(wood: BoatWood): number {
  const m: Record<BoatWood, number> = {
    teak: 35, mahogany: 18, white_oak: 8, western_red_cedar: 10, marine_plywood: 6,
  };
  return m[wood];
}

export function boatWoods(): BoatWood[] {
  return ["teak", "mahogany", "white_oak", "western_red_cedar", "marine_plywood"];
}
