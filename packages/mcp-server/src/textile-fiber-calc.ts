export type TextileFiber = "cotton" | "wool" | "polyester" | "silk" | "linen";

export function breathability(t: TextileFiber): number {
  const m: Record<TextileFiber, number> = {
    cotton: 9, wool: 7, polyester: 3, silk: 8, linen: 10,
  };
  return m[t];
}

export function moistureWicking(t: TextileFiber): number {
  const m: Record<TextileFiber, number> = {
    cotton: 5, wool: 9, polyester: 7, silk: 6, linen: 8,
  };
  return m[t];
}

export function tensileStrength(t: TextileFiber): number {
  const m: Record<TextileFiber, number> = {
    cotton: 5, wool: 3, polyester: 9, silk: 7, linen: 8,
  };
  return m[t];
}

export function costPerKg(t: TextileFiber): number {
  const m: Record<TextileFiber, number> = {
    cotton: 3, wool: 7, polyester: 1, silk: 10, linen: 6,
  };
  return m[t];
}

export function dyeAbsorption(t: TextileFiber): number {
  const m: Record<TextileFiber, number> = {
    cotton: 8, wool: 9, polyester: 4, silk: 10, linen: 6,
  };
  return m[t];
}

export function naturalFiber(t: TextileFiber): boolean {
  const m: Record<TextileFiber, boolean> = {
    cotton: true, wool: true, polyester: false, silk: true, linen: true,
  };
  return m[t];
}

export function animalOrigin(t: TextileFiber): boolean {
  const m: Record<TextileFiber, boolean> = {
    cotton: false, wool: true, polyester: false, silk: true, linen: false,
  };
  return m[t];
}

export function primaryUse(t: TextileFiber): string {
  const m: Record<TextileFiber, string> = {
    cotton: "everyday_apparel", wool: "winter_suiting",
    polyester: "activewear", silk: "luxury_eveningwear",
    linen: "summer_home_textiles",
  };
  return m[t];
}

export function careMethod(t: TextileFiber): string {
  const m: Record<TextileFiber, string> = {
    cotton: "machine_wash_hot", wool: "hand_wash_cold",
    polyester: "machine_wash_any", silk: "dry_clean_hand_wash",
    linen: "machine_wash_gentle",
  };
  return m[t];
}

export function textileFibers(): TextileFiber[] {
  return ["cotton", "wool", "polyester", "silk", "linen"];
}
