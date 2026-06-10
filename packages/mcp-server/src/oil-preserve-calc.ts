export type OilPreserve = "olive_oil" | "duck_fat" | "lard" | "coconut_oil" | "ghee";

export function shelfLifeMonths(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 6, duck_fat: 8, lard: 12, coconut_oil: 18, ghee: 24,
  };
  return m[oil];
}

export function smokePtCelsius(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 190, duck_fat: 190, lard: 185, coconut_oil: 175, ghee: 250,
  };
  return m[oil];
}

export function flavorTransfer(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 8, duck_fat: 9, lard: 5, coconut_oil: 6, ghee: 7,
  };
  return m[oil];
}

export function oxygenBarrier(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 7, duck_fat: 9, lard: 8, coconut_oil: 7, ghee: 8,
  };
  return m[oil];
}

export function solidAtRoomTemp(oil: OilPreserve): boolean {
  const m: Record<OilPreserve, boolean> = {
    olive_oil: false, duck_fat: true, lard: true, coconut_oil: true, ghee: true,
  };
  return m[oil];
}

export function dairyFree(oil: OilPreserve): boolean {
  const m: Record<OilPreserve, boolean> = {
    olive_oil: true, duck_fat: true, lard: true, coconut_oil: true, ghee: false,
  };
  return m[oil];
}

export function bestPreservedFood(oil: OilPreserve): string {
  const m: Record<OilPreserve, string> = {
    olive_oil: "sun_dried_tomatoes", duck_fat: "confit",
    lard: "sausage", coconut_oil: "tropical_fruit", ghee: "herbs",
  };
  return m[oil];
}

export function nutritionalValue(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 8, duck_fat: 6, lard: 4, coconut_oil: 7, ghee: 7,
  };
  return m[oil];
}

export function costPerLiter(oil: OilPreserve): number {
  const m: Record<OilPreserve, number> = {
    olive_oil: 12, duck_fat: 20, lard: 5, coconut_oil: 10, ghee: 15,
  };
  return m[oil];
}

export function oilPreserves(): OilPreserve[] {
  return ["olive_oil", "duck_fat", "lard", "coconut_oil", "ghee"];
}
