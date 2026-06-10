export type CompostType = "hot" | "cold" | "vermicompost" | "bokashi" | "leaf_mold";

export function decompositionWeeks(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 4, cold: 52, vermicompost: 12, bokashi: 2, leaf_mold: 104,
  };
  return m[comp];
}

export function nutrientDensity(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 8, cold: 6, vermicompost: 10, bokashi: 7, leaf_mold: 4,
  };
  return m[comp];
}

export function effortRequired(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 8, cold: 2, vermicompost: 5, bokashi: 4, leaf_mold: 1,
  };
  return m[comp];
}

export function spaceRequired(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 7, cold: 6, vermicompost: 3, bokashi: 2, leaf_mold: 5,
  };
  return m[comp];
}

export function odorLevel(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 5, cold: 3, vermicompost: 2, bokashi: 7, leaf_mold: 1,
  };
  return m[comp];
}

export function indoorSuitable(comp: CompostType): boolean {
  const m: Record<CompostType, boolean> = {
    hot: false, cold: false, vermicompost: true, bokashi: true, leaf_mold: false,
  };
  return m[comp];
}

export function killsPathogens(comp: CompostType): boolean {
  const m: Record<CompostType, boolean> = {
    hot: true, cold: false, vermicompost: false, bokashi: true, leaf_mold: false,
  };
  return m[comp];
}

export function bestInput(comp: CompostType): string {
  const m: Record<CompostType, string> = {
    hot: "mixed_greens_browns", cold: "yard_waste", vermicompost: "kitchen_scraps",
    bokashi: "food_waste", leaf_mold: "autumn_leaves",
  };
  return m[comp];
}

export function soilImprovementScore(comp: CompostType): number {
  const m: Record<CompostType, number> = {
    hot: 9, cold: 7, vermicompost: 10, bokashi: 6, leaf_mold: 8,
  };
  return m[comp];
}

export function compostTypes(): CompostType[] {
  return ["hot", "cold", "vermicompost", "bokashi", "leaf_mold"];
}
