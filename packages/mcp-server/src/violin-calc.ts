export type ViolinSize = "4/4" | "3/4" | "1/2" | "1/4" | "1/8" | "1/10" | "1/16";
export type StringType = "E" | "A" | "D" | "G";

const SIZE_MM: Record<ViolinSize, { bodyLength: number; totalLength: number; bowLength: number }> = {
  "4/4": { bodyLength: 356, totalLength: 590, bowLength: 745 },
  "3/4": { bodyLength: 335, totalLength: 558, bowLength: 686 },
  "1/2": { bodyLength: 310, totalLength: 520, bowLength: 620 },
  "1/4": { bodyLength: 280, totalLength: 470, bowLength: 570 },
  "1/8": { bodyLength: 255, totalLength: 430, bowLength: 510 },
  "1/10": { bodyLength: 230, totalLength: 400, bowLength: 470 },
  "1/16": { bodyLength: 210, totalLength: 370, bowLength: 430 },
};

export function sizeByArmLength(armLengthCm: number): ViolinSize {
  if (armLengthCm >= 60) return "4/4";
  if (armLengthCm >= 56) return "3/4";
  if (armLengthCm >= 51) return "1/2";
  if (armLengthCm >= 45) return "1/4";
  if (armLengthCm >= 40) return "1/8";
  if (armLengthCm >= 36) return "1/10";
  return "1/16";
}

export function dimensions(size: ViolinSize): { bodyLength: number; totalLength: number; bowLength: number } {
  return { ...SIZE_MM[size] };
}

export function stringFrequency(str: StringType): number {
  const freqs: Record<StringType, number> = { G: 196, D: 293.66, A: 440, E: 659.26 };
  return freqs[str];
}

export function stringTension(frequency: number, length: number, mass: number): number {
  return parseFloat((4 * mass * length * length * frequency * frequency / 1000000).toFixed(1));
}

export function vibratoRate(): { minHz: number; maxHz: number; idealHz: number } {
  return { minHz: 4, maxHz: 7, idealHz: 5.5 };
}

export function fingerPosition(stringLength: number, semitones: number): number {
  const ratio = 1 - 1 / Math.pow(2, semitones / 12);
  return parseFloat((stringLength * ratio).toFixed(1));
}

export function bowWeight(size: ViolinSize): number {
  const weights: Record<ViolinSize, number> = {
    "4/4": 60, "3/4": 56, "1/2": 50, "1/4": 44,
    "1/8": 40, "1/10": 36, "1/16": 32,
  };
  return weights[size];
}

export function rosinFrequency(hoursPlayed: number): number {
  return Math.ceil(hoursPlayed / 4);
}

export function stringLifeWeeks(hoursPerWeek: number): number {
  if (hoursPerWeek <= 3) return 12;
  if (hoursPerWeek <= 7) return 8;
  if (hoursPerWeek <= 14) return 4;
  return 2;
}

export function practiceMinutes(level: "beginner" | "intermediate" | "advanced" | "professional"): number {
  const minutes: Record<string, number> = { beginner: 30, intermediate: 60, advanced: 120, professional: 240 };
  return minutes[level];
}

export function bridgeHeight(size: ViolinSize): number {
  const heights: Record<ViolinSize, number> = {
    "4/4": 33, "3/4": 31, "1/2": 29, "1/4": 27,
    "1/8": 25, "1/10": 24, "1/16": 23,
  };
  return heights[size];
}

export function soundpostPosition(bodyLength: number): number {
  return parseFloat((bodyLength * 0.27).toFixed(1));
}

export function tuningDifference(current: number, target: number): number {
  return parseFloat((1200 * Math.log2(current / target)).toFixed(1));
}

export function violinSizes(): ViolinSize[] {
  return ["4/4", "3/4", "1/2", "1/4", "1/8", "1/10", "1/16"];
}
