export type GrainBill = "single_malt" | "bourbon" | "rye_whiskey" | "wheat_whiskey" | "corn_whiskey";

export function baseGrainPercent(bill: GrainBill): number {
  const b: Record<GrainBill, number> = {
    single_malt: 100, bourbon: 51, rye_whiskey: 51, wheat_whiskey: 51, corn_whiskey: 80,
  };
  return b[bill];
}

export function mashTempCelsius(bill: GrainBill): number {
  const m: Record<GrainBill, number> = {
    single_malt: 63, bourbon: 65, rye_whiskey: 62, wheat_whiskey: 66, corn_whiskey: 68,
  };
  return m[bill];
}

export function fermentationDays(bill: GrainBill): number {
  const f: Record<GrainBill, number> = {
    single_malt: 5, bourbon: 4, rye_whiskey: 4, wheat_whiskey: 5, corn_whiskey: 3,
  };
  return f[bill];
}

export function flavorComplexity(bill: GrainBill): number {
  const c: Record<GrainBill, number> = {
    single_malt: 9, bourbon: 8, rye_whiskey: 8, wheat_whiskey: 6, corn_whiskey: 5,
  };
  return c[bill];
}

export function bodyRating(bill: GrainBill): number {
  const b: Record<GrainBill, number> = {
    single_malt: 8, bourbon: 7, rye_whiskey: 7, wheat_whiskey: 5, corn_whiskey: 6,
  };
  return b[bill];
}

export function spiciness(bill: GrainBill): number {
  const s: Record<GrainBill, number> = {
    single_malt: 3, bourbon: 5, rye_whiskey: 9, wheat_whiskey: 2, corn_whiskey: 1,
  };
  return s[bill];
}

export function sweetness(bill: GrainBill): number {
  const s: Record<GrainBill, number> = {
    single_malt: 5, bourbon: 7, rye_whiskey: 3, wheat_whiskey: 8, corn_whiskey: 9,
  };
  return s[bill];
}

export function agingYearsMin(bill: GrainBill): number {
  const a: Record<GrainBill, number> = {
    single_malt: 3, bourbon: 2, rye_whiskey: 2, wheat_whiskey: 2, corn_whiskey: 0,
  };
  return a[bill];
}

export function costPerBushel(bill: GrainBill): number {
  const c: Record<GrainBill, number> = {
    single_malt: 12, bourbon: 8, rye_whiskey: 10, wheat_whiskey: 7, corn_whiskey: 5,
  };
  return c[bill];
}

export function grainBills(): GrainBill[] {
  return ["single_malt", "bourbon", "rye_whiskey", "wheat_whiskey", "corn_whiskey"];
}
