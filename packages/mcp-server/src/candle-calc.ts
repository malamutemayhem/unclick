export type WaxType = "soy" | "paraffin" | "beeswax" | "coconut" | "palm";

export interface CandleSpec {
  containerDiameter: number;
  containerHeight: number;
  volumeMl: number;
  waxWeightG: number;
  fragranceG: number;
  dyeG: number;
  wickSize: string;
  burnTimeHours: number;
}

const WAX_DENSITY: Record<WaxType, number> = {
  soy: 0.90,
  paraffin: 0.91,
  beeswax: 0.96,
  coconut: 0.92,
  palm: 0.93,
};

const MAX_FRAGRANCE_LOAD: Record<WaxType, number> = {
  soy: 10,
  paraffin: 12,
  beeswax: 6,
  coconut: 10,
  palm: 8,
};

export function containerVolume(diameterCm: number, heightCm: number): number {
  const radius = diameterCm / 2;
  return parseFloat((Math.PI * radius * radius * heightCm).toFixed(1));
}

export function waxWeight(volumeMl: number, waxType: WaxType): number {
  return parseFloat((volumeMl * WAX_DENSITY[waxType]).toFixed(1));
}

export function fragranceAmount(waxWeightG: number, loadPercent: number): number {
  return parseFloat((waxWeightG * loadPercent / 100).toFixed(1));
}

export function maxFragrance(waxWeightG: number, waxType: WaxType): number {
  return fragranceAmount(waxWeightG, MAX_FRAGRANCE_LOAD[waxType]);
}

export function dyeAmount(waxWeightG: number, concentrationPercent = 0.1): number {
  return parseFloat((waxWeightG * concentrationPercent / 100).toFixed(2));
}

export function wickSize(diameterCm: number): string {
  if (diameterCm <= 5) return "small";
  if (diameterCm <= 7.5) return "medium";
  if (diameterCm <= 10) return "large";
  return "extra large";
}

export function burnTime(waxWeightG: number, burnRateGPerHour = 7): number {
  return parseFloat((waxWeightG / burnRateGPerHour).toFixed(1));
}

export function burnRate(diameterCm: number): number {
  return parseFloat((diameterCm * 1.2).toFixed(1));
}

export function meltingPoint(waxType: WaxType): number {
  const temps: Record<WaxType, number> = {
    soy: 51, paraffin: 58, beeswax: 63, coconut: 36, palm: 55,
  };
  return temps[waxType];
}

export function pouringTemp(waxType: WaxType): number {
  const temps: Record<WaxType, number> = {
    soy: 60, paraffin: 71, beeswax: 71, coconut: 49, palm: 65,
  };
  return temps[waxType];
}

export function calculateCandle(diameterCm: number, heightCm: number, waxType: WaxType, fragranceLoadPercent = 8): CandleSpec {
  const vol = containerVolume(diameterCm, heightCm);
  const fillVolume = vol * 0.9;
  const waxG = waxWeight(fillVolume, waxType);
  const fragG = fragranceAmount(waxG, fragranceLoadPercent);
  const dye = dyeAmount(waxG);
  const wick = wickSize(diameterCm);
  const rate = burnRate(diameterCm);
  const bt = burnTime(waxG, rate);

  return {
    containerDiameter: diameterCm,
    containerHeight: heightCm,
    volumeMl: parseFloat(fillVolume.toFixed(1)),
    waxWeightG: waxG,
    fragranceG: fragG,
    dyeG: dye,
    wickSize: wick,
    burnTimeHours: bt,
  };
}

export function batchQuantity(totalCandles: number, candleSpec: CandleSpec): { totalWaxG: number; totalFragranceG: number; totalDyeG: number } {
  return {
    totalWaxG: parseFloat((candleSpec.waxWeightG * totalCandles).toFixed(0)),
    totalFragranceG: parseFloat((candleSpec.fragranceG * totalCandles).toFixed(0)),
    totalDyeG: parseFloat((candleSpec.dyeG * totalCandles).toFixed(1)),
  };
}

export function costPerCandle(waxCostPerKg: number, fragranceCostPerKg: number, containerCost: number, wickCost: number, spec: CandleSpec): number {
  const waxCost = (spec.waxWeightG / 1000) * waxCostPerKg;
  const fragCost = (spec.fragranceG / 1000) * fragranceCostPerKg;
  return parseFloat((waxCost + fragCost + containerCost + wickCost).toFixed(2));
}

export function hotThrowTemp(waxType: WaxType): number {
  const temps: Record<WaxType, number> = {
    soy: 82, paraffin: 85, beeswax: 85, coconut: 77, palm: 82,
  };
  return temps[waxType];
}

export function cureTime(waxType: WaxType): number {
  const days: Record<WaxType, number> = {
    soy: 14, paraffin: 3, beeswax: 7, coconut: 14, palm: 7,
  };
  return days[waxType];
}

export function waxTypes(): WaxType[] {
  return ["soy", "paraffin", "beeswax", "coconut", "palm"];
}
