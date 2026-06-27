export type GraftingMethod = "whip_tongue" | "cleft_graft" | "bark_graft" | "bud_graft" | "bridge_graft";

export function successRatePercent(method: GraftingMethod): number {
  const m: Record<GraftingMethod, number> = {
    whip_tongue: 90, cleft_graft: 80, bark_graft: 75, bud_graft: 85, bridge_graft: 70,
  };
  return m[method];
}

export function healingWeeks(method: GraftingMethod): number {
  const m: Record<GraftingMethod, number> = {
    whip_tongue: 4, cleft_graft: 6, bark_graft: 8, bud_graft: 3, bridge_graft: 10,
  };
  return m[method];
}

export function skillRequired(method: GraftingMethod): number {
  const m: Record<GraftingMethod, number> = {
    whip_tongue: 8, cleft_graft: 5, bark_graft: 4, bud_graft: 6, bridge_graft: 9,
  };
  return m[method];
}

export function bestSeason(method: GraftingMethod): string {
  const m: Record<GraftingMethod, string> = {
    whip_tongue: "late_winter", cleft_graft: "early_spring", bark_graft: "spring",
    bud_graft: "summer", bridge_graft: "spring",
  };
  return m[method];
}

export function sizeMismatchTolerance(method: GraftingMethod): number {
  const m: Record<GraftingMethod, number> = {
    whip_tongue: 2, cleft_graft: 7, bark_graft: 8, bud_graft: 3, bridge_graft: 5,
  };
  return m[method];
}

export function repairGraft(method: GraftingMethod): boolean {
  const m: Record<GraftingMethod, boolean> = {
    whip_tongue: false, cleft_graft: false, bark_graft: false, bud_graft: false, bridge_graft: true,
  };
  return m[method];
}

export function dormantWoodRequired(method: GraftingMethod): boolean {
  const m: Record<GraftingMethod, boolean> = {
    whip_tongue: true, cleft_graft: true, bark_graft: false, bud_graft: false, bridge_graft: true,
  };
  return m[method];
}

export function bestTreeType(method: GraftingMethod): string {
  const m: Record<GraftingMethod, string> = {
    whip_tongue: "apple", cleft_graft: "cherry", bark_graft: "walnut",
    bud_graft: "citrus", bridge_graft: "damaged_tree",
  };
  return m[method];
}

export function toolCost(method: GraftingMethod): number {
  const m: Record<GraftingMethod, number> = {
    whip_tongue: 45, cleft_graft: 30, bark_graft: 25, bud_graft: 20, bridge_graft: 35,
  };
  return m[method];
}

export function graftingMethods(): GraftingMethod[] {
  return ["whip_tongue", "cleft_graft", "bark_graft", "bud_graft", "bridge_graft"];
}
