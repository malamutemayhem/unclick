export type KalimbaSize = "8_key" | "10_key" | "17_key" | "21_key" | "34_key";
export type TinesMaterial = "steel" | "phosphor_bronze" | "nickel_silver";

export function tineCount(size: KalimbaSize): number {
  const counts: Record<KalimbaSize, number> = {
    "8_key": 8, "10_key": 10, "17_key": 17, "21_key": 21, "34_key": 34,
  };
  return counts[size];
}

export function frequency(note: number, octave: number): number {
  return parseFloat((440 * Math.pow(2, (note - 9 + (octave - 4) * 12) / 12)).toFixed(1));
}

export function tineLength(freq: number, materialDensity: number): number {
  if (freq <= 0 || materialDensity <= 0) return 0;
  const base = 200;
  return parseFloat((base / Math.sqrt(freq / 100)).toFixed(1));
}

export function resonanceFreq(boxLengthCm: number): number {
  if (boxLengthCm <= 0) return 0;
  const speedOfSound = 34300;
  return parseFloat((speedOfSound / (4 * boxLengthCm)).toFixed(1));
}

export function soundholeDiameter(boxWidthCm: number): number {
  return parseFloat((boxWidthCm * 0.3).toFixed(1));
}

export function bridgePosition(tineLength: number): number {
  return parseFloat((tineLength * 0.4).toFixed(1));
}

export function tuningRange(size: KalimbaSize): { low: string; high: string } {
  const ranges: Record<KalimbaSize, [string, string]> = {
    "8_key": ["C5", "C6"], "10_key": ["C4", "E5"],
    "17_key": ["C4", "E6"], "21_key": ["C3", "E6"],
    "34_key": ["C3", "E7"],
  };
  const [low, high] = ranges[size];
  return { low, high };
}

export function practiceMinutes(level: string): number {
  if (level === "beginner") return 15;
  if (level === "intermediate") return 30;
  return 60;
}

export function tineSpacing(boardWidthMm: number, tines: number): number {
  if (tines <= 1) return boardWidthMm;
  return parseFloat((boardWidthMm / (tines + 1)).toFixed(1));
}

export function bodyVolumeCc(lengthCm: number, widthCm: number, depthCm: number): number {
  return parseFloat((lengthCm * widthCm * depthCm).toFixed(0));
}

export function sustainSeconds(material: TinesMaterial): number {
  const sustain: Record<TinesMaterial, number> = {
    steel: 5, phosphor_bronze: 7, nickel_silver: 6,
  };
  return sustain[material];
}

export function kalimbaSizes(): KalimbaSize[] {
  return ["8_key", "10_key", "17_key", "21_key", "34_key"];
}
