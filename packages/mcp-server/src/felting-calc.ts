export type FeltMethod = "wet" | "needle" | "nuno" | "cobweb";
export type WoolType = "merino" | "corriedale" | "romney" | "alpaca" | "silk_blend";

export function shrinkagePercent(method: FeltMethod): number {
  const s: Record<FeltMethod, number> = {
    wet: 30, needle: 5, nuno: 25, cobweb: 35,
  };
  return s[method];
}

export function preFeltSize(finishedCm: number, method: FeltMethod): number {
  const shrink = shrinkagePercent(method) / 100;
  return parseFloat((finishedCm / (1 - shrink)).toFixed(1));
}

export function woolWeight(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 * thicknessMm * 0.001).toFixed(1));
}

export function layerCount(method: FeltMethod): number {
  const layers: Record<FeltMethod, number> = {
    wet: 4, needle: 2, nuno: 2, cobweb: 1,
  };
  return layers[method];
}

export function fullingTime(areaCm2: number): number {
  return parseFloat((areaCm2 / 500 * 15).toFixed(0));
}

export function needleGauge(detail: string): number {
  if (detail === "coarse") return 36;
  if (detail === "medium") return 38;
  if (detail === "fine") return 40;
  return 42;
}

export function waterTempC(method: FeltMethod): number {
  if (method === "wet" || method === "nuno" || method === "cobweb") return 60;
  return 0;
}

export function soapAmount(waterLiters: number): number {
  return parseFloat((waterLiters * 5).toFixed(1));
}

export function fiberMicrons(wool: WoolType): number {
  const m: Record<WoolType, number> = {
    merino: 18, corriedale: 27, romney: 35, alpaca: 22, silk_blend: 15,
  };
  return m[wool];
}

export function feltability(wool: WoolType): number {
  const f: Record<WoolType, number> = {
    merino: 9, corriedale: 7, romney: 5, alpaca: 3, silk_blend: 4,
  };
  return f[wool];
}

export function dryingHours(thicknessMm: number): number {
  return parseFloat((thicknessMm * 4).toFixed(0));
}

export function feltMethods(): FeltMethod[] {
  return ["wet", "needle", "nuno", "cobweb"];
}
