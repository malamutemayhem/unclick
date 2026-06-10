export type ChiselSetType = "bench_bevel_edge" | "mortise_heavy_duty" | "paring_long_thin" | "skew_angled_tip" | "fishtail_dovetail_clean";

export function cuttingPrecision(t: ChiselSetType): number {
  const m: Record<ChiselSetType, number> = {
    bench_bevel_edge: 8, mortise_heavy_duty: 6, paring_long_thin: 10, skew_angled_tip: 9, fishtail_dovetail_clean: 9,
  };
  return m[t];
}

export function impactStrength(t: ChiselSetType): number {
  const m: Record<ChiselSetType, number> = {
    bench_bevel_edge: 8, mortise_heavy_duty: 10, paring_long_thin: 3, skew_angled_tip: 6, fishtail_dovetail_clean: 5,
  };
  return m[t];
}

export function versatility(t: ChiselSetType): number {
  const m: Record<ChiselSetType, number> = {
    bench_bevel_edge: 10, mortise_heavy_duty: 5, paring_long_thin: 6, skew_angled_tip: 7, fishtail_dovetail_clean: 6,
  };
  return m[t];
}

export function edgeRetention(t: ChiselSetType): number {
  const m: Record<ChiselSetType, number> = {
    bench_bevel_edge: 8, mortise_heavy_duty: 9, paring_long_thin: 7, skew_angled_tip: 8, fishtail_dovetail_clean: 7,
  };
  return m[t];
}

export function chiselCost(t: ChiselSetType): number {
  const m: Record<ChiselSetType, number> = {
    bench_bevel_edge: 2, mortise_heavy_duty: 2, paring_long_thin: 3, skew_angled_tip: 3, fishtail_dovetail_clean: 3,
  };
  return m[t];
}

export function malletSafe(t: ChiselSetType): boolean {
  const m: Record<ChiselSetType, boolean> = {
    bench_bevel_edge: true, mortise_heavy_duty: true, paring_long_thin: false, skew_angled_tip: true, fishtail_dovetail_clean: false,
  };
  return m[t];
}

export function handPushOnly(t: ChiselSetType): boolean {
  const m: Record<ChiselSetType, boolean> = {
    bench_bevel_edge: false, mortise_heavy_duty: false, paring_long_thin: true, skew_angled_tip: false, fishtail_dovetail_clean: true,
  };
  return m[t];
}

export function steelType(t: ChiselSetType): string {
  const m: Record<ChiselSetType, string> = {
    bench_bevel_edge: "high_carbon_cr_v",
    mortise_heavy_duty: "tool_steel_thick",
    paring_long_thin: "high_carbon_thin",
    skew_angled_tip: "laminated_hard_soft",
    fishtail_dovetail_clean: "white_steel_fine",
  };
  return m[t];
}

export function bestJoint(t: ChiselSetType): string {
  const m: Record<ChiselSetType, string> = {
    bench_bevel_edge: "general_joinery_all",
    mortise_heavy_duty: "mortise_tenon_deep",
    paring_long_thin: "fitting_cheek_shave",
    skew_angled_tip: "corner_cleanup_angle",
    fishtail_dovetail_clean: "dovetail_corner_clean",
  };
  return m[t];
}

export function chiselSets(): ChiselSetType[] {
  return ["bench_bevel_edge", "mortise_heavy_duty", "paring_long_thin", "skew_angled_tip", "fishtail_dovetail_clean"];
}
