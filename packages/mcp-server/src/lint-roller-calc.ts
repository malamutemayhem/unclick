export type LintRollerType = "adhesive_tear_sheet" | "reusable_silicone" | "electric_fabric_shaver" | "velvet_brush_static" | "travel_mini_roll";

export function lintPickup(t: LintRollerType): number {
  const m: Record<LintRollerType, number> = {
    adhesive_tear_sheet: 9, reusable_silicone: 7, electric_fabric_shaver: 10, velvet_brush_static: 5, travel_mini_roll: 6,
  };
  return m[t];
}

export function fabricSafe(t: LintRollerType): number {
  const m: Record<LintRollerType, number> = {
    adhesive_tear_sheet: 8, reusable_silicone: 10, electric_fabric_shaver: 5, velvet_brush_static: 10, travel_mini_roll: 8,
  };
  return m[t];
}

export function costPerUse(t: LintRollerType): number {
  const m: Record<LintRollerType, number> = {
    adhesive_tear_sheet: 3, reusable_silicone: 9, electric_fabric_shaver: 8, velvet_brush_static: 9, travel_mini_roll: 4,
  };
  return m[t];
}

export function portability(t: LintRollerType): number {
  const m: Record<LintRollerType, number> = {
    adhesive_tear_sheet: 7, reusable_silicone: 7, electric_fabric_shaver: 4, velvet_brush_static: 6, travel_mini_roll: 10,
  };
  return m[t];
}

export function rollerCost(t: LintRollerType): number {
  const m: Record<LintRollerType, number> = {
    adhesive_tear_sheet: 1, reusable_silicone: 3, electric_fabric_shaver: 7, velvet_brush_static: 4, travel_mini_roll: 2,
  };
  return m[t];
}

export function reusable(t: LintRollerType): boolean {
  const m: Record<LintRollerType, boolean> = {
    adhesive_tear_sheet: false, reusable_silicone: true, electric_fabric_shaver: true, velvet_brush_static: true, travel_mini_roll: false,
  };
  return m[t];
}

export function needsPower(t: LintRollerType): boolean {
  const m: Record<LintRollerType, boolean> = {
    adhesive_tear_sheet: false, reusable_silicone: false, electric_fabric_shaver: true, velvet_brush_static: false, travel_mini_roll: false,
  };
  return m[t];
}

export function removalMethod(t: LintRollerType): string {
  const m: Record<LintRollerType, string> = {
    adhesive_tear_sheet: "sticky_paper_peel_roll",
    reusable_silicone: "washable_gel_surface",
    electric_fabric_shaver: "rotating_blade_shave",
    velvet_brush_static: "static_cling_brush_sweep",
    travel_mini_roll: "mini_adhesive_compact",
  };
  return m[t];
}

export function bestUse(t: LintRollerType): string {
  const m: Record<LintRollerType, string> = {
    adhesive_tear_sheet: "quick_pet_hair_clothes",
    reusable_silicone: "eco_daily_touch_up",
    electric_fabric_shaver: "pilling_sweater_restore",
    velvet_brush_static: "wool_suit_coat_care",
    travel_mini_roll: "purse_briefcase_on_go",
  };
  return m[t];
}

export function lintRollers(): LintRollerType[] {
  return ["adhesive_tear_sheet", "reusable_silicone", "electric_fabric_shaver", "velvet_brush_static", "travel_mini_roll"];
}
