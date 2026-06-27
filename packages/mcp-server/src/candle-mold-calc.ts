export type CandleMoldType = "silicone_flex_detail" | "metal_pillar_round" | "polycarbonate_clear_view" | "plaster_carved_custom" | "rubber_latex_stretch";

export function detailCapture(t: CandleMoldType): number {
  const m: Record<CandleMoldType, number> = {
    silicone_flex_detail: 10, metal_pillar_round: 5, polycarbonate_clear_view: 7, plaster_carved_custom: 9, rubber_latex_stretch: 8,
  };
  return m[t];
}

export function releaseEase(t: CandleMoldType): number {
  const m: Record<CandleMoldType, number> = {
    silicone_flex_detail: 10, metal_pillar_round: 7, polycarbonate_clear_view: 8, plaster_carved_custom: 5, rubber_latex_stretch: 9,
  };
  return m[t];
}

export function durability(t: CandleMoldType): number {
  const m: Record<CandleMoldType, number> = {
    silicone_flex_detail: 8, metal_pillar_round: 10, polycarbonate_clear_view: 9, plaster_carved_custom: 4, rubber_latex_stretch: 6,
  };
  return m[t];
}

export function heatResist(t: CandleMoldType): number {
  const m: Record<CandleMoldType, number> = {
    silicone_flex_detail: 9, metal_pillar_round: 10, polycarbonate_clear_view: 7, plaster_carved_custom: 8, rubber_latex_stretch: 6,
  };
  return m[t];
}

export function moldCost(t: CandleMoldType): number {
  const m: Record<CandleMoldType, number> = {
    silicone_flex_detail: 2, metal_pillar_round: 2, polycarbonate_clear_view: 2, plaster_carved_custom: 1, rubber_latex_stretch: 3,
  };
  return m[t];
}

export function seesFillLevel(t: CandleMoldType): boolean {
  const m: Record<CandleMoldType, boolean> = {
    silicone_flex_detail: false, metal_pillar_round: false, polycarbonate_clear_view: true, plaster_carved_custom: false, rubber_latex_stretch: false,
  };
  return m[t];
}

export function customShape(t: CandleMoldType): boolean {
  const m: Record<CandleMoldType, boolean> = {
    silicone_flex_detail: true, metal_pillar_round: false, polycarbonate_clear_view: false, plaster_carved_custom: true, rubber_latex_stretch: true,
  };
  return m[t];
}

export function moldMaterial(t: CandleMoldType): string {
  const m: Record<CandleMoldType, string> = {
    silicone_flex_detail: "food_grade_silicone",
    metal_pillar_round: "seamless_aluminum_tube",
    polycarbonate_clear_view: "clear_polycarbonate",
    plaster_carved_custom: "plaster_of_paris_cast",
    rubber_latex_stretch: "natural_latex_rubber",
  };
  return m[t];
}

export function bestCandle(t: CandleMoldType): string {
  const m: Record<CandleMoldType, string> = {
    silicone_flex_detail: "sculpted_figure_candle",
    metal_pillar_round: "smooth_pillar_classic",
    polycarbonate_clear_view: "layered_color_pillar",
    plaster_carved_custom: "ornate_custom_design",
    rubber_latex_stretch: "complex_undercut_shape",
  };
  return m[t];
}

export function candleMolds(): CandleMoldType[] {
  return ["silicone_flex_detail", "metal_pillar_round", "polycarbonate_clear_view", "plaster_carved_custom", "rubber_latex_stretch"];
}
