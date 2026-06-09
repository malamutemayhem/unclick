export type OilType = "olive" | "coconut" | "palm" | "castor" | "shea" | "cocoa" | "avocado" | "sweet_almond";

export interface OilSpec {
  name: OilType;
  sapNaOH: number;
  sapKOH: number;
  iodine: number;
  ins: number;
}

const OIL_DATA: Record<OilType, OilSpec> = {
  olive: { name: "olive", sapNaOH: 0.1353, sapKOH: 0.1897, iodine: 85, ins: 105 },
  coconut: { name: "coconut", sapNaOH: 0.1910, sapKOH: 0.2680, iodine: 10, ins: 258 },
  palm: { name: "palm", sapNaOH: 0.1413, sapKOH: 0.1982, iodine: 53, ins: 145 },
  castor: { name: "castor", sapNaOH: 0.1286, sapKOH: 0.1804, iodine: 86, ins: 95 },
  shea: { name: "shea", sapNaOH: 0.1282, sapKOH: 0.1799, iodine: 59, ins: 116 },
  cocoa: { name: "cocoa", sapNaOH: 0.1378, sapKOH: 0.1933, iodine: 37, ins: 157 },
  avocado: { name: "avocado", sapNaOH: 0.1339, sapKOH: 0.1879, iodine: 86, ins: 99 },
  sweet_almond: { name: "sweet_almond", sapNaOH: 0.1360, sapKOH: 0.1907, iodine: 99, ins: 97 },
};

export function oilInfo(oil: OilType): OilSpec {
  return { ...OIL_DATA[oil] };
}

export function lyeAmount(oilGrams: number, oil: OilType, superfat: number = 5): number {
  const sap = OIL_DATA[oil].sapNaOH;
  const lye = oilGrams * sap * (1 - superfat / 100);
  return parseFloat(lye.toFixed(1));
}

export function lyeAmountKOH(oilGrams: number, oil: OilType, superfat: number = 5): number {
  const sap = OIL_DATA[oil].sapKOH;
  const lye = oilGrams * sap * (1 - superfat / 100);
  return parseFloat(lye.toFixed(1));
}

export function waterAmount(lyeGrams: number, lyeConcentration: number = 33): number {
  return parseFloat((lyeGrams * (100 - lyeConcentration) / lyeConcentration).toFixed(1));
}

export function totalBatchWeight(oils: { oil: OilType; grams: number }[], superfat: number = 5): number {
  let totalOil = 0;
  let totalLye = 0;
  for (const o of oils) {
    totalOil += o.grams;
    totalLye += lyeAmount(o.grams, o.oil, superfat);
  }
  const water = waterAmount(totalLye);
  return parseFloat((totalOil + totalLye + water).toFixed(0));
}

export function batchLye(oils: { oil: OilType; grams: number }[], superfat: number = 5): number {
  let total = 0;
  for (const o of oils) {
    total += lyeAmount(o.grams, o.oil, superfat);
  }
  return parseFloat(total.toFixed(1));
}

export function hardnessIndex(oils: { oil: OilType; percent: number }[]): number {
  let weighted = 0;
  for (const o of oils) {
    weighted += OIL_DATA[o.oil].ins * o.percent / 100;
  }
  return Math.round(weighted);
}

export function iodineValue(oils: { oil: OilType; percent: number }[]): number {
  let weighted = 0;
  for (const o of oils) {
    weighted += OIL_DATA[o.oil].iodine * o.percent / 100;
  }
  return Math.round(weighted);
}

export function cureWeeks(type: "cold_process" | "hot_process" | "melt_and_pour"): number {
  const weeks: Record<string, number> = { cold_process: 6, hot_process: 2, melt_and_pour: 0 };
  return weeks[type] ?? 6;
}

export function moldVolumeMl(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat((lengthCm * widthCm * heightCm).toFixed(0));
}

export function barsFromMold(moldVolumeMl: number, barVolumeMl: number = 100): number {
  return Math.floor(moldVolumeMl / barVolumeMl);
}

export function fragranceAmount(oilGrams: number, percentUsage: number = 6): number {
  return parseFloat((oilGrams * percentUsage / 100).toFixed(1));
}

export function colorantAmount(oilGrams: number, tspPerPound: number = 1): number {
  const pounds = oilGrams / 453.6;
  return parseFloat((pounds * tspPerPound).toFixed(1));
}

export function costPerBar(totalIngredientCost: number, barCount: number): number {
  if (barCount <= 0) return 0;
  return parseFloat((totalIngredientCost / barCount).toFixed(2));
}

export function oilTypes(): OilType[] {
  return ["olive", "coconut", "palm", "castor", "shea", "cocoa", "avocado", "sweet_almond"];
}
