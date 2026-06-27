export type CookingMethod = "roasting" | "braising" | "sauteing" | "steaming" | "sous_vide";

export function temperatureCelsius(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 200, braising: 160, sauteing: 230, steaming: 100, sous_vide: 60,
  };
  return m[method];
}

export function cookTimeMultiplier(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 3, braising: 5, sauteing: 1, steaming: 2, sous_vide: 8,
  };
  return m[method];
}

export function nutrientRetention(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 6, braising: 5, sauteing: 7, steaming: 10, sous_vide: 9,
  };
  return m[method];
}

export function flavorDevelopment(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 9, braising: 10, sauteing: 8, steaming: 4, sous_vide: 6,
  };
  return m[method];
}

export function skillRequired(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 4, braising: 5, sauteing: 6, steaming: 2, sous_vide: 7,
  };
  return m[method];
}

export function dryHeat(method: CookingMethod): boolean {
  const m: Record<CookingMethod, boolean> = {
    roasting: true, braising: false, sauteing: true, steaming: false, sous_vide: false,
  };
  return m[method];
}

export function createsCrust(method: CookingMethod): boolean {
  const m: Record<CookingMethod, boolean> = {
    roasting: true, braising: false, sauteing: true, steaming: false, sous_vide: false,
  };
  return m[method];
}

export function bestProtein(method: CookingMethod): string {
  const m: Record<CookingMethod, string> = {
    roasting: "chicken", braising: "beef_chuck", sauteing: "fish_fillet",
    steaming: "vegetables", sous_vide: "steak",
  };
  return m[method];
}

export function equipmentCost(method: CookingMethod): number {
  const m: Record<CookingMethod, number> = {
    roasting: 3, braising: 4, sauteing: 2, steaming: 1, sous_vide: 7,
  };
  return m[method];
}

export function cookingMethods(): CookingMethod[] {
  return ["roasting", "braising", "sauteing", "steaming", "sous_vide"];
}
