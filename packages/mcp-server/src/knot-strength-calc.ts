export type KnotType = "bowline" | "clove_hitch" | "figure_eight" | "reef" | "sheet_bend";

export function strengthRetentionPercent(knot: KnotType): number {
  const retention: Record<KnotType, number> = {
    bowline: 60, clove_hitch: 55, figure_eight: 75, reef: 45, sheet_bend: 50,
  };
  return retention[knot];
}

export function securityRating(knot: KnotType): number {
  const security: Record<KnotType, number> = {
    bowline: 4, clove_hitch: 2, figure_eight: 5, reef: 3, sheet_bend: 3,
  };
  return security[knot];
}

export function easeOfUntying(knot: KnotType): number {
  const ease: Record<KnotType, number> = {
    bowline: 5, clove_hitch: 4, figure_eight: 4, reef: 3, sheet_bend: 4,
  };
  return ease[knot];
}

export function tyingTimeSeconds(knot: KnotType): number {
  const secs: Record<KnotType, number> = {
    bowline: 5, clove_hitch: 3, figure_eight: 4, reef: 3, sheet_bend: 5,
  };
  return secs[knot];
}

export function jamsPermanently(knot: KnotType): boolean {
  return knot === "reef";
}

export function worksWhenWet(knot: KnotType): boolean {
  return knot !== "reef";
}

export function joinsDifferentDiameters(knot: KnotType): boolean {
  return knot === "sheet_bend";
}

export function loadDirection(knot: KnotType): string {
  const direction: Record<KnotType, string> = {
    bowline: "axial", clove_hitch: "perpendicular", figure_eight: "axial",
    reef: "axial", sheet_bend: "axial",
  };
  return direction[knot];
}

export function difficultyRating(knot: KnotType): number {
  const diff: Record<KnotType, number> = {
    bowline: 2, clove_hitch: 1, figure_eight: 1, reef: 1, sheet_bend: 2,
  };
  return diff[knot];
}

export function knotTypes(): KnotType[] {
  return ["bowline", "clove_hitch", "figure_eight", "reef", "sheet_bend"];
}
