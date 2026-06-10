export type TattooNeedle = "round_liner" | "round_shader" | "magnum" | "curved_magnum" | "flat";

export function lineDefinition(n: TattooNeedle): number {
  const m: Record<TattooNeedle, number> = {
    round_liner: 10, round_shader: 6, magnum: 4, curved_magnum: 5, flat: 7,
  };
  return m[n];
}

export function shadingAbility(n: TattooNeedle): number {
  const m: Record<TattooNeedle, number> = {
    round_liner: 3, round_shader: 8, magnum: 10, curved_magnum: 9, flat: 7,
  };
  return m[n];
}

export function colorPacking(n: TattooNeedle): number {
  const m: Record<TattooNeedle, number> = {
    round_liner: 4, round_shader: 7, magnum: 10, curved_magnum: 9, flat: 8,
  };
  return m[n];
}

export function skinTrauma(n: TattooNeedle): number {
  const m: Record<TattooNeedle, number> = {
    round_liner: 3, round_shader: 5, magnum: 7, curved_magnum: 5, flat: 6,
  };
  return m[n];
}

export function versatility(n: TattooNeedle): number {
  const m: Record<TattooNeedle, number> = {
    round_liner: 6, round_shader: 8, magnum: 9, curved_magnum: 10, flat: 5,
  };
  return m[n];
}

export function suitableForFill(n: TattooNeedle): boolean {
  const m: Record<TattooNeedle, boolean> = {
    round_liner: false, round_shader: true, magnum: true, curved_magnum: true, flat: true,
  };
  return m[n];
}

export function singlePassCoverage(n: TattooNeedle): boolean {
  const m: Record<TattooNeedle, boolean> = {
    round_liner: false, round_shader: false, magnum: true, curved_magnum: true, flat: false,
  };
  return m[n];
}

export function bestUseCase(n: TattooNeedle): string {
  const m: Record<TattooNeedle, string> = {
    round_liner: "fine_lines_detail", round_shader: "smooth_shading_blending",
    magnum: "large_color_fill", curved_magnum: "smooth_gradients_realism",
    flat: "geometric_lines_shading",
  };
  return m[n];
}

export function needleConfig(n: TattooNeedle): string {
  const m: Record<TattooNeedle, string> = {
    round_liner: "tight_circular", round_shader: "loose_circular",
    magnum: "stacked_double_row", curved_magnum: "arched_double_row",
    flat: "single_row_straight",
  };
  return m[n];
}

export function tattooNeedles(): TattooNeedle[] {
  return ["round_liner", "round_shader", "magnum", "curved_magnum", "flat"];
}
