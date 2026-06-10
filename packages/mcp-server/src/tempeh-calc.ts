export type TempehBean = "soybean" | "black_bean" | "chickpea" | "lentil" | "peanut";

export function soakingHours(bean: TempehBean): number {
  const h: Record<TempehBean, number> = {
    soybean: 12, black_bean: 10, chickpea: 14, lentil: 6, peanut: 8,
  };
  return h[bean];
}

export function cookingMinutes(bean: TempehBean): number {
  const m: Record<TempehBean, number> = {
    soybean: 45, black_bean: 40, chickpea: 50, lentil: 20, peanut: 30,
  };
  return m[bean];
}

export function fermentationTempCelsius(bean: TempehBean): number {
  const t: Record<TempehBean, number> = {
    soybean: 31, black_bean: 30, chickpea: 32, lentil: 30, peanut: 31,
  };
  return t[bean];
}

export function fermentationHours(bean: TempehBean): number {
  const h: Record<TempehBean, number> = {
    soybean: 36, black_bean: 40, chickpea: 42, lentil: 30, peanut: 38,
  };
  return h[bean];
}

export function proteinPercentDry(bean: TempehBean): number {
  const p: Record<TempehBean, number> = {
    soybean: 40, black_bean: 22, chickpea: 20, lentil: 25, peanut: 26,
  };
  return p[bean];
}

export function myceliumCoverage(bean: TempehBean): number {
  const m: Record<TempehBean, number> = {
    soybean: 9, black_bean: 7, chickpea: 6, lentil: 8, peanut: 7,
  };
  return m[bean];
}

export function textureRating(bean: TempehBean): number {
  const t: Record<TempehBean, number> = {
    soybean: 8, black_bean: 7, chickpea: 6, lentil: 5, peanut: 7,
  };
  return t[bean];
}

export function dehullingRequired(bean: TempehBean): boolean {
  return bean === "soybean" || bean === "black_bean";
}

export function costPerKg(bean: TempehBean): number {
  const c: Record<TempehBean, number> = {
    soybean: 3, black_bean: 4, chickpea: 5, lentil: 4, peanut: 6,
  };
  return c[bean];
}

export function tempehBeans(): TempehBean[] {
  return ["soybean", "black_bean", "chickpea", "lentil", "peanut"];
}
