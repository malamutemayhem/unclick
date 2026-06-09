export type PenType = "fountain" | "ballpoint" | "rollerball" | "gel" | "felt_tip" | "brush";
export type InkColor = "black" | "blue" | "red" | "green" | "brown" | "purple";

export interface PenSpec {
  type: PenType;
  nibMm: number;
  inkCapacityMl: number;
  lineWidthMm: number;
}

const PEN_DEFAULTS: Record<PenType, PenSpec> = {
  fountain: { type: "fountain", nibMm: 0.5, inkCapacityMl: 1.0, lineWidthMm: 0.4 },
  ballpoint: { type: "ballpoint", nibMm: 0.7, inkCapacityMl: 0.5, lineWidthMm: 0.3 },
  rollerball: { type: "rollerball", nibMm: 0.5, inkCapacityMl: 0.7, lineWidthMm: 0.35 },
  gel: { type: "gel", nibMm: 0.5, inkCapacityMl: 0.4, lineWidthMm: 0.3 },
  felt_tip: { type: "felt_tip", nibMm: 2.0, inkCapacityMl: 2.0, lineWidthMm: 1.5 },
  brush: { type: "brush", nibMm: 3.0, inkCapacityMl: 1.5, lineWidthMm: 2.0 },
};

export function penDefaults(type: PenType): PenSpec {
  return { ...PEN_DEFAULTS[type] };
}

export function inkUsagePerPage(linesPerPage: number, charsPerLine: number, lineWidthMm: number): number {
  const avgCharWidthMm = 2.5;
  const totalLineMm = linesPerPage * charsPerLine * avgCharWidthMm;
  const volumeMl = totalLineMm * lineWidthMm * 0.01 * 0.001;
  return parseFloat((volumeMl * 1000).toFixed(4));
}

export function pagesPerFill(inkCapacityMl: number, inkPerPageMl: number): number {
  if (inkPerPageMl <= 0) return Infinity;
  return Math.floor(inkCapacityMl / inkPerPageMl);
}

export function writingDistance(inkCapacityMl: number, lineWidthMm: number): number {
  const crossSectionMm2 = lineWidthMm * 0.01;
  const volumeMm3 = inkCapacityMl * 1000;
  const distanceMm = volumeMm3 / crossSectionMm2;
  return parseFloat((distanceMm / 1000).toFixed(1));
}

export function dryingTime(inkType: "dye" | "pigment" | "iron_gall"): number {
  const times: Record<string, number> = { dye: 5, pigment: 15, iron_gall: 30 };
  return times[inkType] ?? 10;
}

export function inkCost(bottleMl: number, bottlePrice: number, usageMlPerPage: number, pages: number): number {
  const totalMl = usageMlPerPage * pages;
  return parseFloat((totalMl / bottleMl * bottlePrice).toFixed(2));
}

export function nibSize(label: "EF" | "F" | "M" | "B" | "BB"): number {
  const sizes: Record<string, number> = { EF: 0.3, F: 0.5, M: 0.7, B: 1.0, BB: 1.4 };
  return sizes[label];
}

export function convertNibWesternToJapanese(westernMm: number): number {
  return parseFloat((westernMm * 0.7).toFixed(2));
}

export function convertNibJapaneseToWestern(japaneseMm: number): number {
  return parseFloat((japaneseMm / 0.7).toFixed(2));
}

export function inkMixRatio(parts: number[]): number[] {
  const total = parts.reduce((s, p) => s + p, 0);
  if (total === 0) return parts.map(() => 0);
  return parts.map(p => parseFloat((p / total * 100).toFixed(1)));
}

export function inkDilution(inkMl: number, waterMl: number): number {
  const total = inkMl + waterMl;
  if (total === 0) return 0;
  return parseFloat((inkMl / total * 100).toFixed(1));
}

export function cartridgeVolume(type: "standard_international" | "proprietary_long" | "proprietary_short"): number {
  const volumes: Record<string, number> = {
    standard_international: 0.75,
    proprietary_long: 1.4,
    proprietary_short: 0.6,
  };
  return volumes[type] ?? 0.75;
}

export function converterCapacity(type: "piston" | "squeeze" | "vacuum"): number {
  const capacities: Record<string, number> = { piston: 0.7, squeeze: 0.5, vacuum: 1.5 };
  return capacities[type] ?? 0.7;
}

export function sheenAngle(inkLayerThickness: number): number {
  if (inkLayerThickness <= 0) return 0;
  return parseFloat((Math.atan(inkLayerThickness * 10) * 180 / Math.PI).toFixed(1));
}

export function featheringRisk(paperGsm: number, nibMm: number): string {
  const score = nibMm / (paperGsm / 80);
  if (score < 0.5) return "low";
  if (score < 1.0) return "moderate";
  return "high";
}

export function bleedThroughRisk(paperGsm: number, inkWetness: "dry" | "normal" | "wet"): string {
  const wetnessMultiplier: Record<string, number> = { dry: 0.5, normal: 1.0, wet: 1.5 };
  const risk = wetnessMultiplier[inkWetness] * (80 / paperGsm);
  if (risk < 0.7) return "low";
  if (risk < 1.2) return "moderate";
  return "high";
}

export function penTypes(): PenType[] {
  return ["fountain", "ballpoint", "rollerball", "gel", "felt_tip", "brush"];
}

export function inkColors(): InkColor[] {
  return ["black", "blue", "red", "green", "brown", "purple"];
}
