export type BoatShuttleType = "open_bottom_basic" | "closed_bottom_slim" | "double_bobbin_wide" | "end_feed_tension" | "rag_wide_flat";

export function throwSpeed(t: BoatShuttleType): number {
  const m: Record<BoatShuttleType, number> = {
    open_bottom_basic: 8, closed_bottom_slim: 9, double_bobbin_wide: 6, end_feed_tension: 10, rag_wide_flat: 5,
  };
  return m[t];
}

export function yarnCapacity(t: BoatShuttleType): number {
  const m: Record<BoatShuttleType, number> = {
    open_bottom_basic: 7, closed_bottom_slim: 6, double_bobbin_wide: 10, end_feed_tension: 7, rag_wide_flat: 9,
  };
  return m[t];
}

export function tensionControl(t: BoatShuttleType): number {
  const m: Record<BoatShuttleType, number> = {
    open_bottom_basic: 5, closed_bottom_slim: 7, double_bobbin_wide: 6, end_feed_tension: 10, rag_wide_flat: 4,
  };
  return m[t];
}

export function aerodynamics(t: BoatShuttleType): number {
  const m: Record<BoatShuttleType, number> = {
    open_bottom_basic: 7, closed_bottom_slim: 10, double_bobbin_wide: 5, end_feed_tension: 9, rag_wide_flat: 4,
  };
  return m[t];
}

export function shuttleCost(t: BoatShuttleType): number {
  const m: Record<BoatShuttleType, number> = {
    open_bottom_basic: 2, closed_bottom_slim: 3, double_bobbin_wide: 4, end_feed_tension: 5, rag_wide_flat: 3,
  };
  return m[t];
}

export function hasTension(t: BoatShuttleType): boolean {
  const m: Record<BoatShuttleType, boolean> = {
    open_bottom_basic: false, closed_bottom_slim: false, double_bobbin_wide: false, end_feed_tension: true, rag_wide_flat: false,
  };
  return m[t];
}

export function forRag(t: BoatShuttleType): boolean {
  const m: Record<BoatShuttleType, boolean> = {
    open_bottom_basic: false, closed_bottom_slim: false, double_bobbin_wide: false, end_feed_tension: false, rag_wide_flat: true,
  };
  return m[t];
}

export function shuttleMaterial(t: BoatShuttleType): string {
  const m: Record<BoatShuttleType, string> = {
    open_bottom_basic: "cherry_wood_open",
    closed_bottom_slim: "maple_slim_closed",
    double_bobbin_wide: "walnut_wide_double",
    end_feed_tension: "rosewood_spring_feed",
    rag_wide_flat: "oak_wide_flat",
  };
  return m[t];
}

export function bestUse(t: BoatShuttleType): string {
  const m: Record<BoatShuttleType, string> = {
    open_bottom_basic: "general_floor_loom",
    closed_bottom_slim: "fast_production_weave",
    double_bobbin_wide: "two_color_pattern",
    end_feed_tension: "fine_thread_precise",
    rag_wide_flat: "rag_rug_wide_strip",
  };
  return m[t];
}

export function boatShuttles(): BoatShuttleType[] {
  return ["open_bottom_basic", "closed_bottom_slim", "double_bobbin_wide", "end_feed_tension", "rag_wide_flat"];
}
