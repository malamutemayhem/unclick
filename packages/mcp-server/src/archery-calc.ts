export type BowType = "recurve" | "compound" | "longbow" | "crossbow";
export type ArrowMaterial = "carbon" | "aluminum" | "wood" | "fiberglass";

export function drawWeight(peakLbs: number, bowType: BowType): number {
  if (bowType === "compound") return parseFloat((peakLbs * 0.2).toFixed(1));
  return peakLbs;
}

export function arrowSpine(drawWeightLbs: number, arrowLengthInch: number): number {
  return Math.round(drawWeightLbs * 1000 / (arrowLengthInch * 2));
}

export function arrowSpeed(drawWeightLbs: number, arrowGrains: number, bowType: BowType): number {
  const efficiency: Record<BowType, number> = {
    compound: 0.85, recurve: 0.75, longbow: 0.65, crossbow: 0.9,
  };
  const ke = drawWeightLbs * 0.5 * efficiency[bowType];
  return parseFloat((Math.sqrt(2 * ke * 7000 / arrowGrains) * 10).toFixed(0));
}

export function kineticEnergy(arrowGrains: number, speedFps: number): number {
  return parseFloat((arrowGrains * speedFps ** 2 / 450240).toFixed(1));
}

export function momentum(arrowGrains: number, speedFps: number): number {
  return parseFloat((arrowGrains * speedFps / 225120).toFixed(2));
}

export function foc(arrowLengthInch: number, balancePointFromNock: number): number {
  return parseFloat(((balancePointFromNock / arrowLengthInch - 0.5) * 100).toFixed(1));
}

export function dropAtDistance(speedFps: number, distanceYards: number): number {
  const timeS = (distanceYards * 3) / speedFps;
  const dropFt = 0.5 * 32.2 * timeS ** 2;
  return parseFloat((dropFt * 12).toFixed(1));
}

export function sightMarks(speedFps: number, distances: number[]): Map<number, number> {
  const marks = new Map<number, number>();
  for (const d of distances) {
    const timeS = (d * 3) / speedFps;
    const dropInch = 0.5 * 32.2 * timeS ** 2 * 12;
    marks.set(d, parseFloat(dropInch.toFixed(1)));
  }
  return marks;
}

export function arrowWeight(shaftGrains: number, pointGrains: number, nockGrains: number, fletchGrains: number, insertGrains: number): number {
  return shaftGrains + pointGrains + nockGrains + fletchGrains + insertGrains;
}

export function grainsPerPound(arrowTotalGrains: number, drawWeightLbs: number): number {
  return parseFloat((arrowTotalGrains / drawWeightLbs).toFixed(1));
}

export function letoffPercent(peakLbs: number, holdingLbs: number): number {
  return parseFloat(((1 - holdingLbs / peakLbs) * 100).toFixed(1));
}

export function bowEnergy(drawWeightLbs: number, drawLengthInch: number): number {
  return parseFloat((drawWeightLbs * drawLengthInch / 2).toFixed(1));
}

export function maxEffectiveRange(speedFps: number, keFtLbs: number): number {
  if (keFtLbs < 25) return 20;
  if (speedFps > 300) return 60;
  if (speedFps > 250) return 50;
  return 30;
}

export function bowTypes(): BowType[] {
  return ["recurve", "compound", "longbow", "crossbow"];
}
