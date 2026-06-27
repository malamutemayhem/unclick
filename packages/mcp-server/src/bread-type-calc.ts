export type BreadType = "sourdough" | "baguette" | "rye" | "ciabatta" | "brioche";

export function hydrationPercent(bread: BreadType): number {
  const m: Record<BreadType, number> = {
    sourdough: 75, baguette: 65, rye: 70, ciabatta: 85, brioche: 55,
  };
  return m[bread];
}

export function crustThickness(bread: BreadType): number {
  const m: Record<BreadType, number> = {
    sourdough: 8, baguette: 10, rye: 6, ciabatta: 7, brioche: 3,
  };
  return m[bread];
}

export function fermentationHours(bread: BreadType): number {
  const m: Record<BreadType, number> = {
    sourdough: 24, baguette: 8, rye: 12, ciabatta: 18, brioche: 6,
  };
  return m[bread];
}

export function openCrumb(bread: BreadType): number {
  const m: Record<BreadType, number> = {
    sourdough: 8, baguette: 7, rye: 3, ciabatta: 10, brioche: 2,
  };
  return m[bread];
}

export function shelfLifeDays(bread: BreadType): number {
  const m: Record<BreadType, number> = {
    sourdough: 5, baguette: 1, rye: 7, ciabatta: 2, brioche: 3,
  };
  return m[bread];
}

export function enriched(bread: BreadType): boolean {
  const m: Record<BreadType, boolean> = {
    sourdough: false, baguette: false, rye: false, ciabatta: false, brioche: true,
  };
  return m[bread];
}

export function naturalLeaven(bread: BreadType): boolean {
  const m: Record<BreadType, boolean> = {
    sourdough: true, baguette: false, rye: false, ciabatta: false, brioche: false,
  };
  return m[bread];
}

export function originCountry(bread: BreadType): string {
  const m: Record<BreadType, string> = {
    sourdough: "egypt", baguette: "france", rye: "germany",
    ciabatta: "italy", brioche: "france",
  };
  return m[bread];
}

export function bestPairing(bread: BreadType): string {
  const m: Record<BreadType, string> = {
    sourdough: "soup", baguette: "cheese", rye: "deli_meat",
    ciabatta: "olive_oil", brioche: "butter",
  };
  return m[bread];
}

export function breadTypes(): BreadType[] {
  return ["sourdough", "baguette", "rye", "ciabatta", "brioche"];
}
