export type NostepinneType = "birch_classic_smooth" | "walnut_heavy_grip" | "cherry_tapered_tip" | "maple_wide_barrel" | "rosewood_carved_deco";

export function windSpeed(t: NostepinneType): number {
  const m: Record<NostepinneType, number> = {
    birch_classic_smooth: 8, walnut_heavy_grip: 6, cherry_tapered_tip: 9, maple_wide_barrel: 7, rosewood_carved_deco: 5,
  };
  return m[t];
}

export function ballShape(t: NostepinneType): number {
  const m: Record<NostepinneType, number> = {
    birch_classic_smooth: 7, walnut_heavy_grip: 8, cherry_tapered_tip: 9, maple_wide_barrel: 6, rosewood_carved_deco: 7,
  };
  return m[t];
}

export function gripComfort(t: NostepinneType): number {
  const m: Record<NostepinneType, number> = {
    birch_classic_smooth: 7, walnut_heavy_grip: 9, cherry_tapered_tip: 6, maple_wide_barrel: 8, rosewood_carved_deco: 10,
  };
  return m[t];
}

export function yarnCapacity(t: NostepinneType): number {
  const m: Record<NostepinneType, number> = {
    birch_classic_smooth: 7, walnut_heavy_grip: 8, cherry_tapered_tip: 6, maple_wide_barrel: 10, rosewood_carved_deco: 5,
  };
  return m[t];
}

export function stickCost(t: NostepinneType): number {
  const m: Record<NostepinneType, number> = {
    birch_classic_smooth: 1, walnut_heavy_grip: 2, cherry_tapered_tip: 2, maple_wide_barrel: 2, rosewood_carved_deco: 3,
  };
  return m[t];
}

export function tapered(t: NostepinneType): boolean {
  const m: Record<NostepinneType, boolean> = {
    birch_classic_smooth: false, walnut_heavy_grip: false, cherry_tapered_tip: true, maple_wide_barrel: false, rosewood_carved_deco: false,
  };
  return m[t];
}

export function decorative(t: NostepinneType): boolean {
  const m: Record<NostepinneType, boolean> = {
    birch_classic_smooth: false, walnut_heavy_grip: false, cherry_tapered_tip: false, maple_wide_barrel: false, rosewood_carved_deco: true,
  };
  return m[t];
}

export function woodType(t: NostepinneType): string {
  const m: Record<NostepinneType, string> = {
    birch_classic_smooth: "birch_turned_smooth",
    walnut_heavy_grip: "walnut_textured_grip",
    cherry_tapered_tip: "cherry_tapered_shaft",
    maple_wide_barrel: "maple_wide_turned",
    rosewood_carved_deco: "rosewood_hand_carved",
  };
  return m[t];
}

export function bestUse(t: NostepinneType): string {
  const m: Record<NostepinneType, string> = {
    birch_classic_smooth: "everyday_center_pull",
    walnut_heavy_grip: "bulky_yarn_wind",
    cherry_tapered_tip: "neat_ball_form",
    maple_wide_barrel: "large_skein_wind",
    rosewood_carved_deco: "gift_display_wind",
  };
  return m[t];
}

export function nostepinnes(): NostepinneType[] {
  return ["birch_classic_smooth", "walnut_heavy_grip", "cherry_tapered_tip", "maple_wide_barrel", "rosewood_carved_deco"];
}
