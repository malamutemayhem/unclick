export type CampKnifeType = "fixed_blade_full_tang" | "folding_liner_lock" | "multi_tool_swiss" | "mora_scandi_grind" | "machete_bush_clear";

export function cuttingPower(t: CampKnifeType): number {
  const m: Record<CampKnifeType, number> = {
    fixed_blade_full_tang: 10, folding_liner_lock: 6, multi_tool_swiss: 4, mora_scandi_grind: 8, machete_bush_clear: 9,
  };
  return m[t];
}

export function versatility(t: CampKnifeType): number {
  const m: Record<CampKnifeType, number> = {
    fixed_blade_full_tang: 7, folding_liner_lock: 8, multi_tool_swiss: 10, mora_scandi_grind: 6, machete_bush_clear: 5,
  };
  return m[t];
}

export function portability(t: CampKnifeType): number {
  const m: Record<CampKnifeType, number> = {
    fixed_blade_full_tang: 4, folding_liner_lock: 9, multi_tool_swiss: 10, mora_scandi_grind: 5, machete_bush_clear: 2,
  };
  return m[t];
}

export function edgeRetention(t: CampKnifeType): number {
  const m: Record<CampKnifeType, number> = {
    fixed_blade_full_tang: 9, folding_liner_lock: 7, multi_tool_swiss: 5, mora_scandi_grind: 8, machete_bush_clear: 6,
  };
  return m[t];
}

export function knifeCost(t: CampKnifeType): number {
  const m: Record<CampKnifeType, number> = {
    fixed_blade_full_tang: 3, folding_liner_lock: 2, multi_tool_swiss: 3, mora_scandi_grind: 1, machete_bush_clear: 1,
  };
  return m[t];
}

export function oneHandOpen(t: CampKnifeType): boolean {
  const m: Record<CampKnifeType, boolean> = {
    fixed_blade_full_tang: false, folding_liner_lock: true, multi_tool_swiss: false, mora_scandi_grind: false, machete_bush_clear: false,
  };
  return m[t];
}

export function hasSheath(t: CampKnifeType): boolean {
  const m: Record<CampKnifeType, boolean> = {
    fixed_blade_full_tang: true, folding_liner_lock: false, multi_tool_swiss: false, mora_scandi_grind: true, machete_bush_clear: true,
  };
  return m[t];
}

export function steelType(t: CampKnifeType): string {
  const m: Record<CampKnifeType, string> = {
    fixed_blade_full_tang: "high_carbon_1095_steel",
    folding_liner_lock: "stainless_8cr13mov",
    multi_tool_swiss: "stainless_420hc_steel",
    mora_scandi_grind: "carbon_steel_scandi",
    machete_bush_clear: "spring_steel_1075",
  };
  return m[t];
}

export function bestTask(t: CampKnifeType): string {
  const m: Record<CampKnifeType, string> = {
    fixed_blade_full_tang: "batoning_shelter_build",
    folding_liner_lock: "edc_camp_general",
    multi_tool_swiss: "repair_cook_multi_use",
    mora_scandi_grind: "carving_fire_prep",
    machete_bush_clear: "trail_clear_brush_cut",
  };
  return m[t];
}

export function campKnives(): CampKnifeType[] {
  return ["fixed_blade_full_tang", "folding_liner_lock", "multi_tool_swiss", "mora_scandi_grind", "machete_bush_clear"];
}
