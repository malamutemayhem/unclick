export type CompostingMethod = "hot" | "cold" | "vermicompost" | "bokashi" | "trench";

export function decompositionWeeks(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 4, cold: 52, vermicompost: 12, bokashi: 2, trench: 26,
  };
  return m[c];
}

export function nutrientDensity(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 8, cold: 6, vermicompost: 10, bokashi: 9, trench: 7,
  };
  return m[c];
}

export function laborRequired(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 8, cold: 1, vermicompost: 5, bokashi: 4, trench: 3,
  };
  return m[c];
}

export function odorLevel(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 4, cold: 3, vermicompost: 2, bokashi: 1, trench: 1,
  };
  return m[c];
}

export function spaceRequired(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 7, cold: 6, vermicompost: 3, bokashi: 2, trench: 8,
  };
  return m[c];
}

export function killsPathogens(c: CompostingMethod): boolean {
  const m: Record<CompostingMethod, boolean> = {
    hot: true, cold: false, vermicompost: false, bokashi: true, trench: false,
  };
  return m[c];
}

export function indoorSuitable(c: CompostingMethod): boolean {
  const m: Record<CompostingMethod, boolean> = {
    hot: false, cold: false, vermicompost: true, bokashi: true, trench: false,
  };
  return m[c];
}

export function bestInput(c: CompostingMethod): string {
  const m: Record<CompostingMethod, string> = {
    hot: "mixed_yard_waste", cold: "leaves", vermicompost: "kitchen_scraps",
    bokashi: "all_food_waste", trench: "garden_debris",
  };
  return m[c];
}

export function carbonFootprint(c: CompostingMethod): number {
  const m: Record<CompostingMethod, number> = {
    hot: 4, cold: 6, vermicompost: 2, bokashi: 1, trench: 3,
  };
  return m[c];
}

export function compostingMethods(): CompostingMethod[] {
  return ["hot", "cold", "vermicompost", "bokashi", "trench"];
}
