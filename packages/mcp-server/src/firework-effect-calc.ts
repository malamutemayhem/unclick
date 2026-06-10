export type FireworkEffect = "peony" | "chrysanthemum" | "willow" | "brocade" | "comet";

export function burstDiameter(e: FireworkEffect): number {
  const m: Record<FireworkEffect, number> = {
    peony: 8, chrysanthemum: 9, willow: 10, brocade: 7, comet: 4,
  };
  return m[e];
}

export function hangTime(e: FireworkEffect): number {
  const m: Record<FireworkEffect, number> = {
    peony: 5, chrysanthemum: 6, willow: 10, brocade: 8, comet: 3,
  };
  return m[e];
}

export function brightnessLevel(e: FireworkEffect): number {
  const m: Record<FireworkEffect, number> = {
    peony: 8, chrysanthemum: 9, willow: 6, brocade: 10, comet: 7,
  };
  return m[e];
}

export function colorVariety(e: FireworkEffect): number {
  const m: Record<FireworkEffect, number> = {
    peony: 10, chrysanthemum: 8, willow: 4, brocade: 6, comet: 5,
  };
  return m[e];
}

export function spectacleRating(e: FireworkEffect): number {
  const m: Record<FireworkEffect, number> = {
    peony: 8, chrysanthemum: 9, willow: 7, brocade: 10, comet: 5,
  };
  return m[e];
}

export function starTrail(e: FireworkEffect): boolean {
  const m: Record<FireworkEffect, boolean> = {
    peony: false, chrysanthemum: true, willow: true, brocade: true, comet: true,
  };
  return m[e];
}

export function usedAsFinale(e: FireworkEffect): boolean {
  const m: Record<FireworkEffect, boolean> = {
    peony: true, chrysanthemum: true, willow: true, brocade: true, comet: false,
  };
  return m[e];
}

export function shellConstruction(e: FireworkEffect): string {
  const m: Record<FireworkEffect, string> = {
    peony: "round_stars_no_tail", chrysanthemum: "round_stars_with_trail",
    willow: "heavy_charcoal_stars", brocade: "titanium_charcoal_stars",
    comet: "single_large_star",
  };
  return m[e];
}

export function bestViewDistance(e: FireworkEffect): string {
  const m: Record<FireworkEffect, string> = {
    peony: "medium_range", chrysanthemum: "medium_to_long",
    willow: "long_range", brocade: "medium_range",
    comet: "short_to_medium",
  };
  return m[e];
}

export function fireworkEffects(): FireworkEffect[] {
  return ["peony", "chrysanthemum", "willow", "brocade", "comet"];
}
