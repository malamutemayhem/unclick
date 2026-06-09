export type ResinType = "epoxy" | "polyester" | "polyurethane" | "uv";

export function mixVolume(lengthCm: number, widthCm: number, depthCm: number): number {
  return parseFloat((lengthCm * widthCm * depthCm).toFixed(1));
}

export function resinWeight(volumeMl: number, type: ResinType): number {
  const density: Record<ResinType, number> = {
    epoxy: 1.1,
    polyester: 1.12,
    polyurethane: 1.05,
    uv: 1.08,
  };
  return parseFloat((volumeMl * density[type]).toFixed(1));
}

export function mixRatio(type: ResinType): { resin: number; hardener: number } {
  const ratios: Record<ResinType, { resin: number; hardener: number }> = {
    epoxy: { resin: 2, hardener: 1 },
    polyester: { resin: 100, hardener: 2 },
    polyurethane: { resin: 1, hardener: 1 },
    uv: { resin: 1, hardener: 0 },
  };
  return ratios[type];
}

export function resinAmount(totalMl: number, type: ResinType): { resinMl: number; hardenerMl: number } {
  const ratio = mixRatio(type);
  const total = ratio.resin + ratio.hardener;
  return {
    resinMl: parseFloat((totalMl * ratio.resin / total).toFixed(1)),
    hardenerMl: parseFloat((totalMl * ratio.hardener / total).toFixed(1)),
  };
}

export function potLife(type: ResinType, tempC: number = 20): number {
  const baseMinutes: Record<ResinType, number> = {
    epoxy: 30,
    polyester: 15,
    polyurethane: 10,
    uv: Infinity,
  };
  const base = baseMinutes[type];
  if (!isFinite(base)) return Infinity;
  const tempFactor = 1 - (tempC - 20) * 0.03;
  return parseFloat((base * Math.max(0.3, tempFactor)).toFixed(0));
}

export function cureTime(type: ResinType, tempC: number = 20): number {
  const baseHours: Record<ResinType, number> = {
    epoxy: 24,
    polyester: 12,
    polyurethane: 16,
    uv: 0.1,
  };
  const base = baseHours[type];
  const tempFactor = 1 - (tempC - 20) * 0.02;
  return parseFloat((base * Math.max(0.3, tempFactor)).toFixed(1));
}

export function layerCount(totalDepthMm: number, maxPourMm: number = 10): number {
  return Math.ceil(totalDepthMm / maxPourMm);
}

export function colorantAmount(resinMl: number, percentByWeight: number = 3): number {
  return parseFloat((resinMl * percentByWeight / 100).toFixed(1));
}

export function bubbleRisk(tempC: number, humidity: number): string {
  let score = 0;
  if (tempC > 25) score += 2;
  if (tempC < 18) score += 1;
  if (humidity > 60) score += 2;
  if (score >= 3) return "high";
  if (score >= 1) return "moderate";
  return "low";
}

export function shrinkagePercent(type: ResinType): number {
  const shrink: Record<ResinType, number> = {
    epoxy: 2,
    polyester: 7,
    polyurethane: 3,
    uv: 5,
  };
  return shrink[type];
}

export function sandingGrits(): number[] {
  return [120, 220, 400, 600, 800, 1000, 1500, 2000, 3000];
}

export function polishingSteps(): string[] {
  return ["wet sand 1500", "wet sand 2000", "wet sand 3000", "polishing compound", "final buff"];
}

export function costEstimate(resinMl: number, pricePerLiter: number, hardenerMl: number, hardenerPricePerLiter: number): number {
  return parseFloat((resinMl / 1000 * pricePerLiter + hardenerMl / 1000 * hardenerPricePerLiter).toFixed(2));
}

export function resinTypes(): ResinType[] {
  return ["epoxy", "polyester", "polyurethane", "uv"];
}
