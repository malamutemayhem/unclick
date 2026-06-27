export type GroutFloatType = "rubber_pad_standard" | "epoxy_hard_float" | "sponge_cleanup_soft" | "notched_spread_thinset" | "margin_small_tight";

export function groutPush(t: GroutFloatType): number {
  const m: Record<GroutFloatType, number> = {
    rubber_pad_standard: 9, epoxy_hard_float: 10, sponge_cleanup_soft: 3, notched_spread_thinset: 6, margin_small_tight: 7,
  };
  return m[t];
}

export function surfaceFinish(t: GroutFloatType): number {
  const m: Record<GroutFloatType, number> = {
    rubber_pad_standard: 8, epoxy_hard_float: 7, sponge_cleanup_soft: 10, notched_spread_thinset: 5, margin_small_tight: 8,
  };
  return m[t];
}

export function controlFeel(t: GroutFloatType): number {
  const m: Record<GroutFloatType, number> = {
    rubber_pad_standard: 8, epoxy_hard_float: 7, sponge_cleanup_soft: 9, notched_spread_thinset: 7, margin_small_tight: 10,
  };
  return m[t];
}

export function durability(t: GroutFloatType): number {
  const m: Record<GroutFloatType, number> = {
    rubber_pad_standard: 8, epoxy_hard_float: 10, sponge_cleanup_soft: 4, notched_spread_thinset: 9, margin_small_tight: 7,
  };
  return m[t];
}

export function floatCost(t: GroutFloatType): number {
  const m: Record<GroutFloatType, number> = {
    rubber_pad_standard: 1, epoxy_hard_float: 2, sponge_cleanup_soft: 1, notched_spread_thinset: 1, margin_small_tight: 1,
  };
  return m[t];
}

export function forCleanup(t: GroutFloatType): boolean {
  const m: Record<GroutFloatType, boolean> = {
    rubber_pad_standard: false, epoxy_hard_float: false, sponge_cleanup_soft: true, notched_spread_thinset: false, margin_small_tight: false,
  };
  return m[t];
}

export function forThinset(t: GroutFloatType): boolean {
  const m: Record<GroutFloatType, boolean> = {
    rubber_pad_standard: false, epoxy_hard_float: false, sponge_cleanup_soft: false, notched_spread_thinset: true, margin_small_tight: false,
  };
  return m[t];
}

export function padMaterial(t: GroutFloatType): string {
  const m: Record<GroutFloatType, string> = {
    rubber_pad_standard: "dense_rubber_pad",
    epoxy_hard_float: "hard_rubber_epoxy_resist",
    sponge_cleanup_soft: "cellulose_sponge_soft",
    notched_spread_thinset: "steel_notched_blade",
    margin_small_tight: "dense_rubber_small",
  };
  return m[t];
}

export function bestTask(t: GroutFloatType): string {
  const m: Record<GroutFloatType, string> = {
    rubber_pad_standard: "floor_tile_grout",
    epoxy_hard_float: "epoxy_grout_press",
    sponge_cleanup_soft: "haze_wipe_clean",
    notched_spread_thinset: "adhesive_bed_spread",
    margin_small_tight: "mosaic_detail_grout",
  };
  return m[t];
}

export function groutFloats(): GroutFloatType[] {
  return ["rubber_pad_standard", "epoxy_hard_float", "sponge_cleanup_soft", "notched_spread_thinset", "margin_small_tight"];
}
