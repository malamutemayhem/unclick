export type GraphiteStickType = "soft_6b_dark_shade" | "medium_hb_general" | "hard_2h_fine_detail" | "woodless_full_graphite" | "water_soluble_wash";

export function darknessRange(t: GraphiteStickType): number {
  const m: Record<GraphiteStickType, number> = {
    soft_6b_dark_shade: 10, medium_hb_general: 6, hard_2h_fine_detail: 3, woodless_full_graphite: 8, water_soluble_wash: 7,
  };
  return m[t];
}

export function lineControl(t: GraphiteStickType): number {
  const m: Record<GraphiteStickType, number> = {
    soft_6b_dark_shade: 5, medium_hb_general: 8, hard_2h_fine_detail: 10, woodless_full_graphite: 6, water_soluble_wash: 6,
  };
  return m[t];
}

export function blendability(t: GraphiteStickType): number {
  const m: Record<GraphiteStickType, number> = {
    soft_6b_dark_shade: 10, medium_hb_general: 7, hard_2h_fine_detail: 3, woodless_full_graphite: 9, water_soluble_wash: 10,
  };
  return m[t];
}

export function smudgeResist(t: GraphiteStickType): number {
  const m: Record<GraphiteStickType, number> = {
    soft_6b_dark_shade: 2, medium_hb_general: 6, hard_2h_fine_detail: 9, woodless_full_graphite: 3, water_soluble_wash: 7,
  };
  return m[t];
}

export function stickCost(t: GraphiteStickType): number {
  const m: Record<GraphiteStickType, number> = {
    soft_6b_dark_shade: 2, medium_hb_general: 1, hard_2h_fine_detail: 2, woodless_full_graphite: 3, water_soluble_wash: 3,
  };
  return m[t];
}

export function waterSoluble(t: GraphiteStickType): boolean {
  const m: Record<GraphiteStickType, boolean> = {
    soft_6b_dark_shade: false, medium_hb_general: false, hard_2h_fine_detail: false, woodless_full_graphite: false, water_soluble_wash: true,
  };
  return m[t];
}

export function woodCased(t: GraphiteStickType): boolean {
  const m: Record<GraphiteStickType, boolean> = {
    soft_6b_dark_shade: false, medium_hb_general: false, hard_2h_fine_detail: false, woodless_full_graphite: false, water_soluble_wash: false,
  };
  return m[t];
}

export function gradeType(t: GraphiteStickType): string {
  const m: Record<GraphiteStickType, string> = {
    soft_6b_dark_shade: "extra_soft_6b",
    medium_hb_general: "standard_hb_middle",
    hard_2h_fine_detail: "firm_2h_light",
    woodless_full_graphite: "pure_graphite_lacquer",
    water_soluble_wash: "graphite_gum_arabic",
  };
  return m[t];
}

export function bestTechnique(t: GraphiteStickType): string {
  const m: Record<GraphiteStickType, string> = {
    soft_6b_dark_shade: "expressive_shading_tonal",
    medium_hb_general: "everyday_sketch_note",
    hard_2h_fine_detail: "architectural_precise",
    woodless_full_graphite: "broad_stroke_coverage",
    water_soluble_wash: "wash_effect_mixed",
  };
  return m[t];
}

export function graphiteSticks(): GraphiteStickType[] {
  return ["soft_6b_dark_shade", "medium_hb_general", "hard_2h_fine_detail", "woodless_full_graphite", "water_soluble_wash"];
}
