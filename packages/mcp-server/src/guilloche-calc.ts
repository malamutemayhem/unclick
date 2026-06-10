export type GuillochePattern = "engine_turn" | "wave" | "barley" | "sunburst" | "basket";

export function lineCount(diameter: number, lineSpacingMm: number): number {
  if (lineSpacingMm <= 0) return 0;
  return Math.ceil((Math.PI * diameter) / lineSpacingMm);
}

export function roseTeeth(lobes: number): number {
  return lobes * 2;
}

export function eccentricDistance(amplitude: number, frequency: number): number {
  if (frequency <= 0) return 0;
  return parseFloat((amplitude / frequency).toFixed(2));
}

export function spinSpeed(toolMaterial: string): number {
  const rpms: Record<string, number> = {
    steel: 200, carbide: 400, diamond: 600, hss: 150,
  };
  return rpms[toolMaterial] || 200;
}

export function cutDepth(material: string): number {
  const depths: Record<string, number> = {
    gold: 0.05, silver: 0.04, brass: 0.06, copper: 0.05, steel: 0.03,
  };
  return depths[material] || 0.04;
}

export function patternPeriod(lobes: number, rpm: number): number {
  if (rpm <= 0 || lobes <= 0) return 0;
  return parseFloat(((60 / rpm) * lobes).toFixed(3));
}

export function overlapAngle(lines: number): number {
  if (lines <= 0) return 0;
  return parseFloat((360 / lines).toFixed(2));
}

export function engraveTime(lines: number, passesPerLine: number, rpmSpeed: number): number {
  if (rpmSpeed <= 0) return 0;
  return parseFloat(((lines * passesPerLine) / rpmSpeed).toFixed(1));
}

export function symmetryFold(lobes: number): number {
  return lobes;
}

export function antiCounterfeitRating(pattern: GuillochePattern): number {
  const ratings: Record<GuillochePattern, number> = {
    engine_turn: 6, wave: 4, barley: 7, sunburst: 5, basket: 8,
  };
  return ratings[pattern];
}

export function guillochePatterns(): GuillochePattern[] {
  return ["engine_turn", "wave", "barley", "sunburst", "basket"];
}
