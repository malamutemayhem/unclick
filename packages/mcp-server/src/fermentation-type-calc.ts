export type FermentationType = "alcoholic" | "lactic" | "acetic" | "koji" | "wild";

export function durationDays(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 14, lactic: 7, acetic: 30, koji: 3, wild: 60,
  };
  return m[ferm];
}

export function temperatureCelsius(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 22, lactic: 25, acetic: 30, koji: 32, wild: 20,
  };
  return m[ferm];
}

export function flavorComplexity(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 7, lactic: 6, acetic: 5, koji: 9, wild: 10,
  };
  return m[ferm];
}

export function controlDifficulty(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 5, lactic: 3, acetic: 4, koji: 7, wild: 10,
  };
  return m[ferm];
}

export function healthBenefits(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 3, lactic: 10, acetic: 7, koji: 8, wild: 6,
  };
  return m[ferm];
}

export function producesAlcohol(ferm: FermentationType): boolean {
  const m: Record<FermentationType, boolean> = {
    alcoholic: true, lactic: false, acetic: false, koji: false, wild: true,
  };
  return m[ferm];
}

export function requiresStarter(ferm: FermentationType): boolean {
  const m: Record<FermentationType, boolean> = {
    alcoholic: true, lactic: true, acetic: true, koji: true, wild: false,
  };
  return m[ferm];
}

export function exampleProduct(ferm: FermentationType): string {
  const m: Record<FermentationType, string> = {
    alcoholic: "wine", lactic: "yogurt", acetic: "vinegar",
    koji: "miso", wild: "sourdough",
  };
  return m[ferm];
}

export function shelfLifeMonths(ferm: FermentationType): number {
  const m: Record<FermentationType, number> = {
    alcoholic: 60, lactic: 3, acetic: 24, koji: 12, wild: 6,
  };
  return m[ferm];
}

export function fermentationTypes(): FermentationType[] {
  return ["alcoholic", "lactic", "acetic", "koji", "wild"];
}
