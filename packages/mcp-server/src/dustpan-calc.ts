export type DustpanType = "basic_plastic_handheld" | "long_handle_upright" | "lobby_commercial_covered" | "brush_combo_snap_set" | "silicone_lip_seal";

export function sweepEfficiency(t: DustpanType): number {
  const m: Record<DustpanType, number> = {
    basic_plastic_handheld: 5, long_handle_upright: 8, lobby_commercial_covered: 9, brush_combo_snap_set: 7, silicone_lip_seal: 10,
  };
  return m[t];
}

export function ergonomics(t: DustpanType): number {
  const m: Record<DustpanType, number> = {
    basic_plastic_handheld: 4, long_handle_upright: 10, lobby_commercial_covered: 9, brush_combo_snap_set: 6, silicone_lip_seal: 5,
  };
  return m[t];
}

export function capacity(t: DustpanType): number {
  const m: Record<DustpanType, number> = {
    basic_plastic_handheld: 4, long_handle_upright: 7, lobby_commercial_covered: 10, brush_combo_snap_set: 5, silicone_lip_seal: 6,
  };
  return m[t];
}

export function compactStorage(t: DustpanType): number {
  const m: Record<DustpanType, number> = {
    basic_plastic_handheld: 9, long_handle_upright: 5, lobby_commercial_covered: 3, brush_combo_snap_set: 10, silicone_lip_seal: 8,
  };
  return m[t];
}

export function dustpanCost(t: DustpanType): number {
  const m: Record<DustpanType, number> = {
    basic_plastic_handheld: 1, long_handle_upright: 3, lobby_commercial_covered: 5, brush_combo_snap_set: 2, silicone_lip_seal: 3,
  };
  return m[t];
}

export function includesBrush(t: DustpanType): boolean {
  const m: Record<DustpanType, boolean> = {
    basic_plastic_handheld: false, long_handle_upright: true, lobby_commercial_covered: true, brush_combo_snap_set: true, silicone_lip_seal: false,
  };
  return m[t];
}

export function hasCover(t: DustpanType): boolean {
  const m: Record<DustpanType, boolean> = {
    basic_plastic_handheld: false, long_handle_upright: false, lobby_commercial_covered: true, brush_combo_snap_set: false, silicone_lip_seal: false,
  };
  return m[t];
}

export function lipMaterial(t: DustpanType): string {
  const m: Record<DustpanType, string> = {
    basic_plastic_handheld: "rigid_plastic_edge",
    long_handle_upright: "rubber_flex_edge",
    lobby_commercial_covered: "rubber_wide_seal",
    brush_combo_snap_set: "plastic_thin_edge",
    silicone_lip_seal: "silicone_flush_seal",
  };
  return m[t];
}

export function bestSpace(t: DustpanType): string {
  const m: Record<DustpanType, string> = {
    basic_plastic_handheld: "quick_desk_table_cleanup",
    long_handle_upright: "kitchen_floor_daily",
    lobby_commercial_covered: "lobby_hallway_commercial",
    brush_combo_snap_set: "closet_compact_home",
    silicone_lip_seal: "fine_dust_hardwood_tile",
  };
  return m[t];
}

export function dustpans(): DustpanType[] {
  return ["basic_plastic_handheld", "long_handle_upright", "lobby_commercial_covered", "brush_combo_snap_set", "silicone_lip_seal"];
}
