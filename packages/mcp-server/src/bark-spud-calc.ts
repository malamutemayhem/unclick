export type BarkSpudType = "flat_blade_push" | "curved_blade_peel" | "chisel_edge_chop" | "spoon_scoop_lift" | "drawknife_pull_strip";

export function barkRemove(t: BarkSpudType): number {
  const m: Record<BarkSpudType, number> = {
    flat_blade_push: 8, curved_blade_peel: 9, chisel_edge_chop: 6, spoon_scoop_lift: 7, drawknife_pull_strip: 10,
  };
  return m[t];
}

export function woodSafe(t: BarkSpudType): number {
  const m: Record<BarkSpudType, number> = {
    flat_blade_push: 7, curved_blade_peel: 9, chisel_edge_chop: 4, spoon_scoop_lift: 10, drawknife_pull_strip: 6,
  };
  return m[t];
}

export function handleReach(t: BarkSpudType): number {
  const m: Record<BarkSpudType, number> = {
    flat_blade_push: 8, curved_blade_peel: 7, chisel_edge_chop: 6, spoon_scoop_lift: 5, drawknife_pull_strip: 9,
  };
  return m[t];
}

export function controlPrecision(t: BarkSpudType): number {
  const m: Record<BarkSpudType, number> = {
    flat_blade_push: 7, curved_blade_peel: 8, chisel_edge_chop: 9, spoon_scoop_lift: 6, drawknife_pull_strip: 5,
  };
  return m[t];
}

export function spudCost(t: BarkSpudType): number {
  const m: Record<BarkSpudType, number> = {
    flat_blade_push: 1, curved_blade_peel: 2, chisel_edge_chop: 1, spoon_scoop_lift: 2, drawknife_pull_strip: 2,
  };
  return m[t];
}

export function curved(t: BarkSpudType): boolean {
  const m: Record<BarkSpudType, boolean> = {
    flat_blade_push: false, curved_blade_peel: true, chisel_edge_chop: false, spoon_scoop_lift: true, drawknife_pull_strip: false,
  };
  return m[t];
}

export function twoHand(t: BarkSpudType): boolean {
  const m: Record<BarkSpudType, boolean> = {
    flat_blade_push: false, curved_blade_peel: false, chisel_edge_chop: false, spoon_scoop_lift: false, drawknife_pull_strip: true,
  };
  return m[t];
}

export function edgeShape(t: BarkSpudType): string {
  const m: Record<BarkSpudType, string> = {
    flat_blade_push: "flat_beveled_edge",
    curved_blade_peel: "curved_spoon_edge",
    chisel_edge_chop: "chisel_single_bevel",
    spoon_scoop_lift: "rounded_scoop_lip",
    drawknife_pull_strip: "wide_draw_edge",
  };
  return m[t];
}

export function bestUse(t: BarkSpudType): string {
  const m: Record<BarkSpudType, string> = {
    flat_blade_push: "flat_bark_push_off",
    curved_blade_peel: "round_log_peel",
    chisel_edge_chop: "tight_spot_chop",
    spoon_scoop_lift: "gentle_bark_lift",
    drawknife_pull_strip: "long_strip_pull",
  };
  return m[t];
}

export function barkSpuds(): BarkSpudType[] {
  return ["flat_blade_push", "curved_blade_peel", "chisel_edge_chop", "spoon_scoop_lift", "drawknife_pull_strip"];
}
