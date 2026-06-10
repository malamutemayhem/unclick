export type DovetailType = "through" | "half_blind" | "sliding" | "secret_mitre" | "french";

export function pinCount(boardWidthMm: number, pinSpacingMm: number): number {
  if (pinSpacingMm <= 0) return 0;
  return Math.max(1, Math.floor(boardWidthMm / pinSpacingMm));
}

export function tailAngleDeg(wood: "softwood" | "hardwood"): number {
  return wood === "softwood" ? 83 : 80;
}

export function pinWidthMm(boardThicknessMm: number): number {
  return parseFloat((boardThicknessMm * 0.5).toFixed(1));
}

export function tailWidthMm(boardThicknessMm: number): number {
  return parseFloat((boardThicknessMm * 1.5).toFixed(1));
}

export function cuttingDepthMm(boardThicknessMm: number, type: DovetailType): number {
  if (type === "half_blind") return parseFloat((boardThicknessMm * 0.67).toFixed(1));
  if (type === "sliding") return parseFloat((boardThicknessMm * 0.33).toFixed(1));
  return boardThicknessMm;
}

export function glueSurfaceAreaCm2(pinCount: number, pinWidthMm: number, boardThicknessMm: number): number {
  return parseFloat((pinCount * pinWidthMm * boardThicknessMm * 2 / 100).toFixed(1));
}

export function cuttingTimeMinutes(pinCount: number, skill: "beginner" | "intermediate" | "expert"): number {
  const rates: Record<string, number> = { beginner: 15, intermediate: 8, expert: 4 };
  return pinCount * rates[skill];
}

export function jointStrengthRating(type: DovetailType): number {
  const ratings: Record<DovetailType, number> = {
    through: 8, half_blind: 7, sliding: 5, secret_mitre: 6, french: 9,
  };
  return ratings[type];
}

export function chiselSizesMm(boardThicknessMm: number): number[] {
  const pinW = boardThicknessMm * 0.5;
  return [Math.floor(pinW), Math.ceil(pinW * 0.75)];
}

export function wastewoodPercent(type: DovetailType): number {
  const waste: Record<DovetailType, number> = {
    through: 25, half_blind: 20, sliding: 15, secret_mitre: 30, french: 35,
  };
  return waste[type];
}

export function dovetailTypes(): DovetailType[] {
  return ["through", "half_blind", "sliding", "secret_mitre", "french"];
}
