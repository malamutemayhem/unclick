export type DrainageType = "stream" | "culvert" | "cesspit" | "channel" | "sewer";

export function seatCount(monkCount: number): number {
  return Math.max(4, Math.ceil(monkCount * 0.5));
}

export function partitionHeightCm(ceilingHeightM: number): number {
  return parseFloat((ceilingHeightM * 100 * 0.6).toFixed(1));
}

export function floorAreaM2(seatCount: number): number {
  return parseFloat((seatCount * 1.2).toFixed(1));
}

export function drainGradientPercent(drainLengthM: number, dropM: number): number {
  if (drainLengthM <= 0) return 0;
  return parseFloat((dropM / drainLengthM * 100).toFixed(2));
}

export function waterFlowLitersPerDay(seatCount: number): number {
  return parseFloat((seatCount * 50).toFixed(1));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 3));
}

export function limewashCoats(): number {
  return 3;
}

export function drainChannelWidthCm(drainageType: DrainageType): number {
  const widths: Record<DrainageType, number> = {
    stream: 60, culvert: 40, cesspit: 50, channel: 35, sewer: 45,
  };
  return widths[drainageType];
}

export function cleaningFrequencyDays(drainageType: DrainageType): number {
  const days: Record<DrainageType, number> = {
    stream: 30, culvert: 14, cesspit: 7, channel: 21, sewer: 60,
  };
  return days[drainageType];
}

export function constructionCost(seatCount: number, drainageType: DrainageType, baseCost: number): number {
  const multipliers: Record<DrainageType, number> = {
    stream: 1.5, culvert: 2.0, cesspit: 1.0, channel: 1.3, sewer: 2.5,
  };
  return parseFloat((seatCount * baseCost * multipliers[drainageType]).toFixed(2));
}

export function drainageTypes(): DrainageType[] {
  return ["stream", "culvert", "cesspit", "channel", "sewer"];
}
