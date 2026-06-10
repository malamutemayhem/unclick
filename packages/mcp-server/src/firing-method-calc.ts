export type FiringMethod = "oxidation" | "reduction" | "wood" | "pit" | "soda";

export function maxTempC(f: FiringMethod): number {
  const m: Record<FiringMethod, number> = {
    oxidation: 1300, reduction: 1300, wood: 1350, pit: 900, soda: 1280,
  };
  return m[f];
}

export function controlPrecision(f: FiringMethod): number {
  const m: Record<FiringMethod, number> = {
    oxidation: 10, reduction: 8, wood: 4, pit: 2, soda: 7,
  };
  return m[f];
}

export function resultUniqueness(f: FiringMethod): number {
  const m: Record<FiringMethod, number> = {
    oxidation: 3, reduction: 6, wood: 10, pit: 8, soda: 7,
  };
  return m[f];
}

export function fuelCost(f: FiringMethod): number {
  const m: Record<FiringMethod, number> = {
    oxidation: 5, reduction: 6, wood: 8, pit: 3, soda: 5,
  };
  return m[f];
}

export function firingDuration(f: FiringMethod): number {
  const m: Record<FiringMethod, number> = {
    oxidation: 5, reduction: 6, wood: 10, pit: 3, soda: 5,
  };
  return m[f];
}

export function electricCompatible(f: FiringMethod): boolean {
  const m: Record<FiringMethod, boolean> = {
    oxidation: true, reduction: false, wood: false, pit: false, soda: false,
  };
  return m[f];
}

export function atmosphereControlled(f: FiringMethod): boolean {
  const m: Record<FiringMethod, boolean> = {
    oxidation: true, reduction: true, wood: false, pit: false, soda: true,
  };
  return m[f];
}

export function surfaceEffect(f: FiringMethod): string {
  const m: Record<FiringMethod, string> = {
    oxidation: "bright_clean_colors", reduction: "muted_metallic",
    wood: "ash_deposits_flashing", pit: "smoke_marks_carbon",
    soda: "glossy_orange_peel",
  };
  return m[f];
}

export function bestSuitedWare(f: FiringMethod): string {
  const m: Record<FiringMethod, string> = {
    oxidation: "functional_pottery", reduction: "stoneware_porcelain",
    wood: "art_pottery", pit: "primitive_decorative",
    soda: "architectural_sculpture",
  };
  return m[f];
}

export function firingMethods(): FiringMethod[] {
  return ["oxidation", "reduction", "wood", "pit", "soda"];
}
