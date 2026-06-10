export type RennetType = "animal" | "microbial" | "vegetable" | "fermentation" | "acid";

export function coagulationMinutes(rennet: RennetType): number {
  const c: Record<RennetType, number> = {
    animal: 30, microbial: 35, vegetable: 45, fermentation: 32, acid: 5,
  };
  return c[rennet];
}

export function curdFirmness(rennet: RennetType): number {
  const f: Record<RennetType, number> = {
    animal: 9, microbial: 7, vegetable: 5, fermentation: 8, acid: 4,
  };
  return f[rennet];
}

export function flavorContribution(rennet: RennetType): number {
  const c: Record<RennetType, number> = {
    animal: 8, microbial: 4, vegetable: 6, fermentation: 5, acid: 2,
  };
  return c[rennet];
}

export function agingSuitability(rennet: RennetType): number {
  const a: Record<RennetType, number> = {
    animal: 10, microbial: 6, vegetable: 4, fermentation: 8, acid: 2,
  };
  return a[rennet];
}

export function vegetarian(rennet: RennetType): boolean {
  const v: Record<RennetType, boolean> = {
    animal: false, microbial: true, vegetable: true, fermentation: true, acid: true,
  };
  return v[rennet];
}

export function yieldPercent(rennet: RennetType): number {
  const y: Record<RennetType, number> = {
    animal: 12, microbial: 11, vegetable: 9, fermentation: 12, acid: 15,
  };
  return y[rennet];
}

export function bestCheese(rennet: RennetType): string {
  const b: Record<RennetType, string> = {
    animal: "cheddar", microbial: "gouda", vegetable: "serra_da_estrela",
    fermentation: "parmesan", acid: "ricotta",
  };
  return b[rennet];
}

export function shelfLifeMonths(rennet: RennetType): number {
  const s: Record<RennetType, number> = {
    animal: 12, microbial: 18, vegetable: 6, fermentation: 24, acid: 1,
  };
  return s[rennet];
}

export function costPerLiter(rennet: RennetType): number {
  const c: Record<RennetType, number> = {
    animal: 30, microbial: 15, vegetable: 20, fermentation: 25, acid: 2,
  };
  return c[rennet];
}

export function rennetTypes(): RennetType[] {
  return ["animal", "microbial", "vegetable", "fermentation", "acid"];
}
