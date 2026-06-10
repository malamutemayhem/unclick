export type TandoorFuel = "charcoal" | "wood" | "gas" | "electric" | "dung_cake";

export function maxTempCelsius(fuel: TandoorFuel): number {
  const t: Record<TandoorFuel, number> = {
    charcoal: 480, wood: 450, gas: 400, electric: 370, dung_cake: 350,
  };
  return t[fuel];
}

export function heatupTimeMinutes(fuel: TandoorFuel): number {
  const m: Record<TandoorFuel, number> = {
    charcoal: 45, wood: 60, gas: 20, electric: 15, dung_cake: 90,
  };
  return m[fuel];
}

export function smokeFlavorRating(fuel: TandoorFuel): number {
  const s: Record<TandoorFuel, number> = {
    charcoal: 8, wood: 9, gas: 1, electric: 0, dung_cake: 6,
  };
  return s[fuel];
}

export function tempConsistency(fuel: TandoorFuel): number {
  const c: Record<TandoorFuel, number> = {
    charcoal: 6, wood: 4, gas: 9, electric: 10, dung_cake: 3,
  };
  return c[fuel];
}

export function fuelCostRating(fuel: TandoorFuel): number {
  const c: Record<TandoorFuel, number> = {
    charcoal: 5, wood: 4, gas: 7, electric: 8, dung_cake: 2,
  };
  return c[fuel];
}

export function indoorSafe(fuel: TandoorFuel): boolean {
  return fuel === "gas" || fuel === "electric";
}

export function ashProduction(fuel: TandoorFuel): number {
  const a: Record<TandoorFuel, number> = {
    charcoal: 5, wood: 8, gas: 0, electric: 0, dung_cake: 9,
  };
  return a[fuel];
}

export function authenticity(fuel: TandoorFuel): number {
  const a: Record<TandoorFuel, number> = {
    charcoal: 9, wood: 8, gas: 4, electric: 2, dung_cake: 10,
  };
  return a[fuel];
}

export function costEstimate(fuel: TandoorFuel): number {
  const c: Record<TandoorFuel, number> = {
    charcoal: 500, wood: 400, gas: 800, electric: 600, dung_cake: 200,
  };
  return c[fuel];
}

export function tandoorFuels(): TandoorFuel[] {
  return ["charcoal", "wood", "gas", "electric", "dung_cake"];
}
