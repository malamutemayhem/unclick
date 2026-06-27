export type FiberType = "cotton" | "wool" | "silk" | "polyester" | "linen";

export function tensileStrength(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 5, wool: 3, silk: 8, polyester: 9, linen: 7,
  };
  return m[fiber];
}

export function moistureAbsorption(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 9, wool: 8, silk: 6, polyester: 1, linen: 10,
  };
  return m[fiber];
}

export function elasticity(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 3, wool: 9, silk: 7, polyester: 8, linen: 2,
  };
  return m[fiber];
}

export function wrinkleResistance(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 3, wool: 7, silk: 5, polyester: 10, linen: 1,
  };
  return m[fiber];
}

export function breathability(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 9, wool: 6, silk: 7, polyester: 3, linen: 10,
  };
  return m[fiber];
}

export function natural(fiber: FiberType): boolean {
  const m: Record<FiberType, boolean> = {
    cotton: true, wool: true, silk: true, polyester: false, linen: true,
  };
  return m[fiber];
}

export function animalDerived(fiber: FiberType): boolean {
  const m: Record<FiberType, boolean> = {
    cotton: false, wool: true, silk: true, polyester: false, linen: false,
  };
  return m[fiber];
}

export function bestSeason(fiber: FiberType): string {
  const m: Record<FiberType, string> = {
    cotton: "summer", wool: "winter", silk: "year_round",
    polyester: "year_round", linen: "summer",
  };
  return m[fiber];
}

export function costPerKg(fiber: FiberType): number {
  const m: Record<FiberType, number> = {
    cotton: 3, wool: 15, silk: 50, polyester: 2, linen: 10,
  };
  return m[fiber];
}

export function fiberTypes(): FiberType[] {
  return ["cotton", "wool", "silk", "polyester", "linen"];
}
