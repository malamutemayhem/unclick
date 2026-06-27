export type WoodChiselType = "bench_bevel_edge" | "mortise_heavy" | "paring_long" | "corner_skew" | "carving_gouge";

export function edgeRetention(t: WoodChiselType): number {
  const m: Record<WoodChiselType, number> = {
    bench_bevel_edge: 7, mortise_heavy: 8, paring_long: 9, corner_skew: 6, carving_gouge: 8,
  };
  return m[t];
}

export function impactResist(t: WoodChiselType): number {
  const m: Record<WoodChiselType, number> = {
    bench_bevel_edge: 7, mortise_heavy: 10, paring_long: 3, corner_skew: 5, carving_gouge: 6,
  };
  return m[t];
}

export function controlFinesse(t: WoodChiselType): number {
  const m: Record<WoodChiselType, number> = {
    bench_bevel_edge: 7, mortise_heavy: 4, paring_long: 10, corner_skew: 8, carving_gouge: 9,
  };
  return m[t];
}

export function versatility(t: WoodChiselType): number {
  const m: Record<WoodChiselType, number> = {
    bench_bevel_edge: 10, mortise_heavy: 4, paring_long: 5, corner_skew: 3, carving_gouge: 6,
  };
  return m[t];
}

export function chiselCost(t: WoodChiselType): number {
  const m: Record<WoodChiselType, number> = {
    bench_bevel_edge: 5, mortise_heavy: 7, paring_long: 8, corner_skew: 6, carving_gouge: 7,
  };
  return m[t];
}

export function malletSafe(t: WoodChiselType): boolean {
  const m: Record<WoodChiselType, boolean> = {
    bench_bevel_edge: true, mortise_heavy: true, paring_long: false, corner_skew: false, carving_gouge: true,
  };
  return m[t];
}

export function handPushOnly(t: WoodChiselType): boolean {
  const m: Record<WoodChiselType, boolean> = {
    bench_bevel_edge: false, mortise_heavy: false, paring_long: true, corner_skew: true, carving_gouge: false,
  };
  return m[t];
}

export function steelType(t: WoodChiselType): string {
  const m: Record<WoodChiselType, string> = {
    bench_bevel_edge: "chrome_vanadium_alloy",
    mortise_heavy: "high_carbon_thick_blade",
    paring_long: "high_speed_steel_thin",
    corner_skew: "tool_steel_angled_edge",
    carving_gouge: "sheffield_carbon_curved",
  };
  return m[t];
}

export function bestJoint(t: WoodChiselType): string {
  const m: Record<WoodChiselType, string> = {
    bench_bevel_edge: "dovetail_general_joinery",
    mortise_heavy: "mortise_tenon_frame",
    paring_long: "fitting_trim_flush",
    corner_skew: "hinge_recess_corner",
    carving_gouge: "relief_sculpture_detail",
  };
  return m[t];
}

export function woodChisels(): WoodChiselType[] {
  return ["bench_bevel_edge", "mortise_heavy", "paring_long", "corner_skew", "carving_gouge"];
}
