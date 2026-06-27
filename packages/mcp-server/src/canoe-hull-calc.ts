export type CanoeHullType = "flat_bottom" | "round_bottom" | "vee_hull" | "shallow_arch" | "tumblehome";

export function primaryStability(hull: CanoeHullType): number {
  const s: Record<CanoeHullType, number> = {
    flat_bottom: 10, round_bottom: 3, vee_hull: 5, shallow_arch: 7, tumblehome: 6,
  };
  return s[hull];
}

export function secondaryStability(hull: CanoeHullType): number {
  const s: Record<CanoeHullType, number> = {
    flat_bottom: 3, round_bottom: 8, vee_hull: 7, shallow_arch: 8, tumblehome: 9,
  };
  return s[hull];
}

export function speedRating(hull: CanoeHullType): number {
  const r: Record<CanoeHullType, number> = {
    flat_bottom: 4, round_bottom: 9, vee_hull: 7, shallow_arch: 8, tumblehome: 7,
  };
  return r[hull];
}

export function trackingRating(hull: CanoeHullType): number {
  const t: Record<CanoeHullType, number> = {
    flat_bottom: 5, round_bottom: 6, vee_hull: 9, shallow_arch: 7, tumblehome: 7,
  };
  return t[hull];
}

export function maneuverability(hull: CanoeHullType): number {
  const m: Record<CanoeHullType, number> = {
    flat_bottom: 8, round_bottom: 7, vee_hull: 4, shallow_arch: 6, tumblehome: 6,
  };
  return m[hull];
}

export function waveHandling(hull: CanoeHullType): number {
  const w: Record<CanoeHullType, number> = {
    flat_bottom: 2, round_bottom: 7, vee_hull: 9, shallow_arch: 6, tumblehome: 7,
  };
  return w[hull];
}

export function capacityRating(hull: CanoeHullType): number {
  const c: Record<CanoeHullType, number> = {
    flat_bottom: 9, round_bottom: 6, vee_hull: 7, shallow_arch: 8, tumblehome: 5,
  };
  return c[hull];
}

export function bestForWater(hull: CanoeHullType): string {
  const w: Record<CanoeHullType, string> = {
    flat_bottom: "calm_lakes", round_bottom: "racing", vee_hull: "open_water",
    shallow_arch: "all_around", tumblehome: "whitewater",
  };
  return w[hull];
}

export function buildComplexity(hull: CanoeHullType): number {
  const c: Record<CanoeHullType, number> = {
    flat_bottom: 3, round_bottom: 7, vee_hull: 6, shallow_arch: 5, tumblehome: 8,
  };
  return c[hull];
}

export function canoeHullTypes(): CanoeHullType[] {
  return ["flat_bottom", "round_bottom", "vee_hull", "shallow_arch", "tumblehome"];
}
