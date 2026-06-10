export type RouterToolType = "fixed_base" | "plunge_base" | "combo_kit" | "trim_compact" | "cnc_desktop";

export function cuttingDepth(t: RouterToolType): number {
  const m: Record<RouterToolType, number> = {
    fixed_base: 7, plunge_base: 9, combo_kit: 9, trim_compact: 4, cnc_desktop: 6,
  };
  return m[t];
}

export function precisionControl(t: RouterToolType): number {
  const m: Record<RouterToolType, number> = {
    fixed_base: 8, plunge_base: 7, combo_kit: 8, trim_compact: 6, cnc_desktop: 10,
  };
  return m[t];
}

export function versatility(t: RouterToolType): number {
  const m: Record<RouterToolType, number> = {
    fixed_base: 6, plunge_base: 8, combo_kit: 10, trim_compact: 4, cnc_desktop: 9,
  };
  return m[t];
}

export function easeOfUse(t: RouterToolType): number {
  const m: Record<RouterToolType, number> = {
    fixed_base: 8, plunge_base: 6, combo_kit: 7, trim_compact: 10, cnc_desktop: 5,
  };
  return m[t];
}

export function routerCost(t: RouterToolType): number {
  const m: Record<RouterToolType, number> = {
    fixed_base: 4, plunge_base: 5, combo_kit: 7, trim_compact: 3, cnc_desktop: 10,
  };
  return m[t];
}

export function plungeCapable(t: RouterToolType): boolean {
  const m: Record<RouterToolType, boolean> = {
    fixed_base: false, plunge_base: true, combo_kit: true, trim_compact: false, cnc_desktop: true,
  };
  return m[t];
}

export function tableMount(t: RouterToolType): boolean {
  const m: Record<RouterToolType, boolean> = {
    fixed_base: true, plunge_base: false, combo_kit: true, trim_compact: false, cnc_desktop: false,
  };
  return m[t];
}

export function colletSize(t: RouterToolType): string {
  const m: Record<RouterToolType, string> = {
    fixed_base: "half_inch_quarter_inch", plunge_base: "half_inch_quarter_inch",
    combo_kit: "half_inch_quarter_inch", trim_compact: "quarter_inch_only",
    cnc_desktop: "er_collet_variable",
  };
  return m[t];
}

export function bestProject(t: RouterToolType): string {
  const m: Record<RouterToolType, string> = {
    fixed_base: "edge_profile_dado_joint", plunge_base: "mortise_inlay_template",
    combo_kit: "complete_shop_all_tasks", trim_compact: "laminate_edge_hinge_mortise",
    cnc_desktop: "sign_carving_engraving",
  };
  return m[t];
}

export function routerTools(): RouterToolType[] {
  return ["fixed_base", "plunge_base", "combo_kit", "trim_compact", "cnc_desktop"];
}
