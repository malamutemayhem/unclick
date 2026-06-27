export type WeaveShuttleType = "boat_shuttle_bobbin" | "stick_shuttle_flat" | "rag_shuttle_wide" | "ski_shuttle_long" | "end_feed_tension";

export function throwSpeed(t: WeaveShuttleType): number {
  const m: Record<WeaveShuttleType, number> = {
    boat_shuttle_bobbin: 10, stick_shuttle_flat: 5, rag_shuttle_wide: 4, ski_shuttle_long: 8, end_feed_tension: 9,
  };
  return m[t];
}

export function yarnCapacity(t: WeaveShuttleType): number {
  const m: Record<WeaveShuttleType, number> = {
    boat_shuttle_bobbin: 8, stick_shuttle_flat: 6, rag_shuttle_wide: 10, ski_shuttle_long: 7, end_feed_tension: 9,
  };
  return m[t];
}

export function tensionControl(t: WeaveShuttleType): number {
  const m: Record<WeaveShuttleType, number> = {
    boat_shuttle_bobbin: 7, stick_shuttle_flat: 4, rag_shuttle_wide: 3, ski_shuttle_long: 6, end_feed_tension: 10,
  };
  return m[t];
}

export function easeOfUse(t: WeaveShuttleType): number {
  const m: Record<WeaveShuttleType, number> = {
    boat_shuttle_bobbin: 8, stick_shuttle_flat: 10, rag_shuttle_wide: 7, ski_shuttle_long: 6, end_feed_tension: 5,
  };
  return m[t];
}

export function shuttleCost(t: WeaveShuttleType): number {
  const m: Record<WeaveShuttleType, number> = {
    boat_shuttle_bobbin: 3, stick_shuttle_flat: 1, rag_shuttle_wide: 2, ski_shuttle_long: 2, end_feed_tension: 4,
  };
  return m[t];
}

export function usesBobbin(t: WeaveShuttleType): boolean {
  const m: Record<WeaveShuttleType, boolean> = {
    boat_shuttle_bobbin: true, stick_shuttle_flat: false, rag_shuttle_wide: false, ski_shuttle_long: false, end_feed_tension: true,
  };
  return m[t];
}

export function forWideLoom(t: WeaveShuttleType): boolean {
  const m: Record<WeaveShuttleType, boolean> = {
    boat_shuttle_bobbin: true, stick_shuttle_flat: false, rag_shuttle_wide: false, ski_shuttle_long: true, end_feed_tension: true,
  };
  return m[t];
}

export function shuttleShape(t: WeaveShuttleType): string {
  const m: Record<WeaveShuttleType, string> = {
    boat_shuttle_bobbin: "curved_boat_hollow",
    stick_shuttle_flat: "flat_notched_stick",
    rag_shuttle_wide: "wide_flat_paddle",
    ski_shuttle_long: "long_tapered_ski",
    end_feed_tension: "enclosed_tension_box",
  };
  return m[t];
}

export function bestWeave(t: WeaveShuttleType): string {
  const m: Record<WeaveShuttleType, string> = {
    boat_shuttle_bobbin: "plain_weave_yardage",
    stick_shuttle_flat: "rigid_heddle_scarf",
    rag_shuttle_wide: "rag_rug_strip",
    ski_shuttle_long: "wide_blanket_throw",
    end_feed_tension: "fine_silk_fabric",
  };
  return m[t];
}

export function weaveShuttles(): WeaveShuttleType[] {
  return ["boat_shuttle_bobbin", "stick_shuttle_flat", "rag_shuttle_wide", "ski_shuttle_long", "end_feed_tension"];
}
