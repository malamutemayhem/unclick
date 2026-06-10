export type InkType = "iron_gall" | "carbon" | "walnut" | "sepia" | "oak_gall";

export function lightfastness(ink: InkType): number {
  const l: Record<InkType, number> = {
    iron_gall: 8, carbon: 10, walnut: 4, sepia: 6, oak_gall: 7,
  };
  return l[ink];
}

export function waterproof(ink: InkType): boolean {
  const w: Record<InkType, boolean> = {
    iron_gall: true, carbon: true, walnut: false, sepia: false, oak_gall: true,
  };
  return w[ink];
}

export function dryTimeMinutes(ink: InkType): number {
  const d: Record<InkType, number> = {
    iron_gall: 5, carbon: 10, walnut: 3, sepia: 4, oak_gall: 6,
  };
  return d[ink];
}

export function colorIntensity(ink: InkType): number {
  const c: Record<InkType, number> = {
    iron_gall: 8, carbon: 10, walnut: 5, sepia: 6, oak_gall: 7,
  };
  return c[ink];
}

export function corrosive(ink: InkType): boolean {
  const c: Record<InkType, boolean> = {
    iron_gall: true, carbon: false, walnut: false, sepia: false, oak_gall: true,
  };
  return c[ink];
}

export function preparationHours(ink: InkType): number {
  const p: Record<InkType, number> = {
    iron_gall: 48, carbon: 2, walnut: 24, sepia: 1, oak_gall: 72,
  };
  return p[ink];
}

export function bestPenType(ink: InkType): string {
  const b: Record<InkType, string> = {
    iron_gall: "dip_pen", carbon: "brush", walnut: "quill",
    sepia: "reed_pen", oak_gall: "dip_pen",
  };
  return b[ink];
}

export function shelfLifeMonths(ink: InkType): number {
  const s: Record<InkType, number> = {
    iron_gall: 6, carbon: 24, walnut: 3, sepia: 12, oak_gall: 4,
  };
  return s[ink];
}

export function costPerLiter(ink: InkType): number {
  const c: Record<InkType, number> = {
    iron_gall: 15, carbon: 10, walnut: 5, sepia: 30, oak_gall: 20,
  };
  return c[ink];
}

export function inkTypes(): InkType[] {
  return ["iron_gall", "carbon", "walnut", "sepia", "oak_gall"];
}
