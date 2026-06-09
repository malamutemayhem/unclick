export type HookSize = "2.0" | "2.5" | "3.0" | "3.5" | "4.0" | "4.5" | "5.0" | "5.5" | "6.0" | "6.5" | "8.0" | "9.0" | "10.0";
export type StitchType = "chain" | "single" | "half_double" | "double" | "treble" | "slip";

const STITCH_HEIGHT_MM: Record<StitchType, number> = {
  chain: 3, single: 6, half_double: 9, double: 12, treble: 18, slip: 2,
};

export function stitchHeight(stitch: StitchType, hookMm: number): number {
  const base = STITCH_HEIGHT_MM[stitch];
  return parseFloat((base * hookMm / 4).toFixed(1));
}

export function chainsForWidth(widthCm: number, gaugeStitchesPer10cm: number): number {
  return Math.round(widthCm * gaugeStitchesPer10cm / 10) + 1;
}

export function rowsForHeight(heightCm: number, gaugeRowsPer10cm: number): number {
  return Math.round(heightCm * gaugeRowsPer10cm / 10);
}

export function totalStitches(stitchesPerRow: number, rows: number): number {
  return stitchesPerRow * rows;
}

export function yarnNeeded(totalStitches: number, stitchType: StitchType, hookMm: number): number {
  const height = stitchHeight(stitchType, hookMm);
  const yarnPerStitchCm = height * 0.3;
  return parseFloat((totalStitches * yarnPerStitchCm / 100).toFixed(1));
}

export function skeinsNeeded(metersNeeded: number, metersPerSkein: number): number {
  return Math.ceil(metersNeeded / metersPerSkein);
}

export function grannySquareSize(rounds: number, hookMm: number): number {
  return parseFloat((rounds * hookMm * 1.2).toFixed(1));
}

export function squaresForBlanket(blanketWidthCm: number, blanketHeightCm: number, squareSizeCm: number): number {
  const cols = Math.ceil(blanketWidthCm / squareSizeCm);
  const rows = Math.ceil(blanketHeightCm / squareSizeCm);
  return cols * rows;
}

export function amigurumiRounds(diameterCm: number, gaugeStitchesPer10cm: number): number {
  const circumference = Math.PI * diameterCm;
  return Math.round(circumference * gaugeStitchesPer10cm / 10 / 6);
}

export function stuffingAmount(volumeCm3: number): number {
  return parseFloat((volumeCm3 * 0.015).toFixed(0));
}

export function borderLength(widthCm: number, heightCm: number): number {
  return parseFloat((2 * (widthCm + heightCm)).toFixed(0));
}

export function hookToUS(mm: number): string {
  const map: Record<number, string> = {
    2.0: "B/1", 2.25: "B/1", 2.5: "C/2", 2.75: "C/2",
    3.0: "D/3", 3.25: "D/3", 3.5: "E/4", 3.75: "F/5",
    4.0: "G/6", 4.5: "7", 5.0: "H/8", 5.5: "I/9",
    6.0: "J/10", 6.5: "K/10.5", 8.0: "L/11", 9.0: "M/13", 10.0: "N/15",
  };
  return map[mm] ?? "N/A";
}

export function estimateTime(totalStitches: number, stitchesPerMinute: number = 15): number {
  return parseFloat((totalStitches / stitchesPerMinute / 60).toFixed(1));
}

export function stitchTypes(): StitchType[] {
  return ["chain", "single", "half_double", "double", "treble", "slip"];
}
