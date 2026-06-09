export type YarnWeight = "lace" | "fingering" | "sport" | "dk" | "worsted" | "aran" | "bulky" | "super_bulky";

export interface GaugeSpec {
  stitchesPer10cm: number;
  rowsPer10cm: number;
  needleMm: number;
  yarnWeight: YarnWeight;
}

export interface ProjectEstimate {
  stitches: number;
  rows: number;
  yarnMeters: number;
  yarnGrams: number;
  timeHours: number;
}

const YARN_GAUGE: Record<YarnWeight, { stitches: number; rows: number; needleMm: number; metersPerGram: number }> = {
  lace: { stitches: 32, rows: 44, needleMm: 2.0, metersPerGram: 5.0 },
  fingering: { stitches: 28, rows: 36, needleMm: 2.75, metersPerGram: 3.8 },
  sport: { stitches: 24, rows: 32, needleMm: 3.5, metersPerGram: 3.0 },
  dk: { stitches: 22, rows: 28, needleMm: 4.0, metersPerGram: 2.5 },
  worsted: { stitches: 18, rows: 24, needleMm: 5.0, metersPerGram: 1.8 },
  aran: { stitches: 16, rows: 20, needleMm: 5.5, metersPerGram: 1.5 },
  bulky: { stitches: 14, rows: 18, needleMm: 6.5, metersPerGram: 1.2 },
  super_bulky: { stitches: 10, rows: 14, needleMm: 9.0, metersPerGram: 0.8 },
};

export function defaultGauge(weight: YarnWeight): GaugeSpec {
  const g = YARN_GAUGE[weight];
  return { stitchesPer10cm: g.stitches, rowsPer10cm: g.rows, needleMm: g.needleMm, yarnWeight: weight };
}

export function stitchesForWidth(widthCm: number, gauge: GaugeSpec): number {
  return Math.round(widthCm * gauge.stitchesPer10cm / 10);
}

export function rowsForHeight(heightCm: number, gauge: GaugeSpec): number {
  return Math.round(heightCm * gauge.rowsPer10cm / 10);
}

export function fabricArea(stitches: number, rows: number, gauge: GaugeSpec): number {
  const widthCm = stitches / gauge.stitchesPer10cm * 10;
  const heightCm = rows / gauge.rowsPer10cm * 10;
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function yarnNeeded(stitches: number, rows: number, gauge: GaugeSpec): number {
  const totalStitches = stitches * rows;
  const stitchLengthCm = 10 / gauge.stitchesPer10cm * 3;
  return parseFloat((totalStitches * stitchLengthCm / 100).toFixed(1));
}

export function yarnWeight(meters: number, weight: YarnWeight): number {
  const mpg = YARN_GAUGE[weight].metersPerGram;
  return Math.round(meters / mpg);
}

export function skeinsNeeded(totalMeters: number, metersPerSkein: number): number {
  return Math.ceil(totalMeters / metersPerSkein);
}

export function castOnForCircular(circumferenceCm: number, gauge: GaugeSpec): number {
  return Math.round(circumferenceCm * gauge.stitchesPer10cm / 10);
}

export function decreaseEvenly(currentStitches: number, decreaseCount: number): number {
  if (decreaseCount <= 0) return 0;
  return Math.floor(currentStitches / decreaseCount);
}

export function increaseEvenly(currentStitches: number, increaseCount: number): number {
  if (increaseCount <= 0) return 0;
  return Math.floor(currentStitches / increaseCount);
}

export function shortRowWrap(totalStitches: number, sections: number): number[] {
  const result: number[] = [];
  const step = Math.floor(totalStitches / (sections + 1));
  for (let i = 1; i <= sections; i++) {
    result.push(totalStitches - step * i);
  }
  return result;
}

export function estimateTime(totalStitches: number, stitchesPerMinute: number = 20): number {
  return parseFloat((totalStitches / stitchesPerMinute / 60).toFixed(1));
}

export function projectEstimate(widthCm: number, heightCm: number, gauge: GaugeSpec, stitchesPerMinute: number = 20): ProjectEstimate {
  const stitches = stitchesForWidth(widthCm, gauge);
  const rows = rowsForHeight(heightCm, gauge);
  const meters = yarnNeeded(stitches, rows, gauge);
  const grams = yarnWeight(meters, gauge.yarnWeight);
  const timeHours = estimateTime(stitches * rows, stitchesPerMinute);
  return { stitches, rows, yarnMeters: meters, yarnGrams: grams, timeHours };
}

export function needleSizeConvert(mm: number): { us: string; uk: number } {
  const usMap: Record<number, string> = {
    2.0: "0", 2.25: "1", 2.75: "2", 3.0: "2.5", 3.25: "3", 3.5: "4",
    3.75: "5", 4.0: "6", 4.5: "7", 5.0: "8", 5.5: "9", 6.0: "10",
    6.5: "10.5", 8.0: "11", 9.0: "13", 10.0: "15", 12.75: "17",
  };
  const ukMap: Record<number, number> = {
    2.0: 14, 2.25: 13, 2.75: 12, 3.0: 11, 3.25: 10, 3.5: 9,
    3.75: 9, 4.0: 8, 4.5: 7, 5.0: 6, 5.5: 5, 6.0: 4,
    6.5: 3, 8.0: 0, 9.0: 0, 10.0: 0,
  };
  return { us: usMap[mm] ?? "N/A", uk: ukMap[mm] ?? 0 };
}

export function ribStitches(totalStitches: number, ribPattern: [number, number]): boolean {
  const repeat = ribPattern[0] + ribPattern[1];
  return totalStitches % repeat === 0;
}

export function buttonSpacing(totalLength: number, buttonCount: number): number {
  if (buttonCount <= 1) return totalLength;
  return parseFloat((totalLength / (buttonCount + 1)).toFixed(1));
}

export function colorworkYarn(stitches: number, rows: number, colorCount: number, gauge: GaugeSpec): number {
  const base = yarnNeeded(stitches, rows, gauge);
  return parseFloat((base * (1 + (colorCount - 1) * 0.15)).toFixed(1));
}

export function yarnWeights(): YarnWeight[] {
  return ["lace", "fingering", "sport", "dk", "worsted", "aran", "bulky", "super_bulky"];
}
