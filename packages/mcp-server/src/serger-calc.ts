export type SergerType = "three_thread_basic" | "four_thread_safety" | "five_thread_coverlock" | "chain_stitch" | "air_jet_threading";

export function edgeFinish(t: SergerType): number {
  const m: Record<SergerType, number> = {
    three_thread_basic: 7, four_thread_safety: 9, five_thread_coverlock: 10, chain_stitch: 5, air_jet_threading: 8,
  };
  return m[t];
}

export function seamStrength(t: SergerType): number {
  const m: Record<SergerType, number> = {
    three_thread_basic: 5, four_thread_safety: 9, five_thread_coverlock: 10, chain_stitch: 7, air_jet_threading: 8,
  };
  return m[t];
}

export function threadingEase(t: SergerType): number {
  const m: Record<SergerType, number> = {
    three_thread_basic: 7, four_thread_safety: 5, five_thread_coverlock: 3, chain_stitch: 6, air_jet_threading: 10,
  };
  return m[t];
}

export function versatilityScore(t: SergerType): number {
  const m: Record<SergerType, number> = {
    three_thread_basic: 5, four_thread_safety: 7, five_thread_coverlock: 10, chain_stitch: 6, air_jet_threading: 8,
  };
  return m[t];
}

export function sergerCost(t: SergerType): number {
  const m: Record<SergerType, number> = {
    three_thread_basic: 3, four_thread_safety: 5, five_thread_coverlock: 9, chain_stitch: 6, air_jet_threading: 10,
  };
  return m[t];
}

export function differentialFeed(t: SergerType): boolean {
  const m: Record<SergerType, boolean> = {
    three_thread_basic: false, four_thread_safety: true, five_thread_coverlock: true, chain_stitch: true, air_jet_threading: true,
  };
  return m[t];
}

export function coverstitch(t: SergerType): boolean {
  const m: Record<SergerType, boolean> = {
    three_thread_basic: false, four_thread_safety: false, five_thread_coverlock: true, chain_stitch: false, air_jet_threading: false,
  };
  return m[t];
}

export function looperType(t: SergerType): string {
  const m: Record<SergerType, string> = {
    three_thread_basic: "upper_lower_looper",
    four_thread_safety: "dual_needle_looper",
    five_thread_coverlock: "triple_cover_looper",
    chain_stitch: "single_chain_looper",
    air_jet_threading: "pneumatic_auto_looper",
  };
  return m[t];
}

export function bestUse(t: SergerType): string {
  const m: Record<SergerType, string> = {
    three_thread_basic: "home_seam_finishing",
    four_thread_safety: "garment_construction",
    five_thread_coverlock: "professional_knitwear",
    chain_stitch: "decorative_chain_hem",
    air_jet_threading: "production_speed_sew",
  };
  return m[t];
}

export function sergers(): SergerType[] {
  return ["three_thread_basic", "four_thread_safety", "five_thread_coverlock", "chain_stitch", "air_jet_threading"];
}
