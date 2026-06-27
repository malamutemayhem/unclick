export type InkRecipe = "iron_gall" | "carbon_black" | "walnut" | "oak_gall" | "sepia";

export function permanence(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 9, carbon_black: 10, walnut: 4, oak_gall: 7, sepia: 6,
  };
  return m[ink];
}

export function flowability(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 8, carbon_black: 6, walnut: 9, oak_gall: 7, sepia: 7,
  };
  return m[ink];
}

export function colorIntensity(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 7, carbon_black: 10, walnut: 5, oak_gall: 6, sepia: 7,
  };
  return m[ink];
}

export function preparationHours(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 48, carbon_black: 2, walnut: 4, oak_gall: 72, sepia: 1,
  };
  return m[ink];
}

export function acidContent(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 8, carbon_black: 2, walnut: 3, oak_gall: 7, sepia: 2,
  };
  return m[ink];
}

export function waterproof(ink: InkRecipe): boolean {
  const m: Record<InkRecipe, boolean> = {
    iron_gall: true, carbon_black: true, walnut: false, oak_gall: true, sepia: false,
  };
  return m[ink];
}

export function naturalSource(ink: InkRecipe): boolean {
  const m: Record<InkRecipe, boolean> = {
    iron_gall: true, carbon_black: true, walnut: true, oak_gall: true, sepia: true,
  };
  return m[ink];
}

export function bestSurface(ink: InkRecipe): string {
  const m: Record<InkRecipe, string> = {
    iron_gall: "parchment", carbon_black: "paper", walnut: "watercolor_paper",
    oak_gall: "vellum", sepia: "drawing_paper",
  };
  return m[ink];
}

export function costPerLiter(ink: InkRecipe): number {
  const m: Record<InkRecipe, number> = {
    iron_gall: 15, carbon_black: 20, walnut: 8, oak_gall: 12, sepia: 30,
  };
  return m[ink];
}

export function inkRecipes(): InkRecipe[] {
  return ["iron_gall", "carbon_black", "walnut", "oak_gall", "sepia"];
}
