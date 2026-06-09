export type DiscType = "putter" | "midrange" | "fairway_driver" | "distance_driver";
export type PlasticGrade = "base" | "premium" | "champion" | "star";

export function flightNumbers(speed: number, glide: number, turn: number, fade: number): string {
  return `${speed}/${glide}/${turn}/${fade}`;
}

export function maxDistance(armSpeedMph: number, discSpeed: number): number {
  return parseFloat((armSpeedMph * discSpeed * 0.35).toFixed(0));
}

export function discSelection(distanceFt: number): DiscType {
  if (distanceFt < 100) return "putter";
  if (distanceFt < 250) return "midrange";
  if (distanceFt < 350) return "fairway_driver";
  return "distance_driver";
}

export function hyzerAngle(fade: number): number {
  return parseFloat((fade * 5).toFixed(0));
}

export function anhyzerAngle(turn: number): number {
  return parseFloat((Math.abs(turn) * 8).toFixed(0));
}

export function skipDistance(discSpeedMph: number, groundHardness: "soft" | "medium" | "hard"): number {
  const factor: Record<string, number> = { soft: 0.1, medium: 0.3, hard: 0.5 };
  return parseFloat((discSpeedMph * factor[groundHardness]).toFixed(0));
}

export function windEffect(windSpeedMph: number, direction: "headwind" | "tailwind" | "crosswind"): string {
  if (direction === "headwind") return windSpeedMph > 10 ? "disc flies more overstable" : "slight overstable shift";
  if (direction === "tailwind") return windSpeedMph > 10 ? "disc flies more understable" : "slight understable shift";
  return "disc pushed sideways, adjust aim";
}

export function puttingCircle(): number {
  return 10;
}

export function parEstimate(distanceFt: number): number {
  if (distanceFt < 250) return 3;
  if (distanceFt < 400) return 4;
  return 5;
}

export function courseRating(totalPar: number, avgScores: number): number {
  return parseFloat((avgScores / totalPar).toFixed(2));
}

export function plasticDurability(grade: PlasticGrade): number {
  const years: Record<PlasticGrade, number> = { base: 1, premium: 3, champion: 5, star: 4 };
  return years[grade];
}

export function bagCapacity(discCount: number): string {
  if (discCount <= 8) return "starter bag";
  if (discCount <= 15) return "mid bag";
  if (discCount <= 25) return "tournament bag";
  return "cart";
}

export function costPerRound(discsCost: number, expectedRounds: number): number {
  if (expectedRounds === 0) return 0;
  return parseFloat((discsCost / expectedRounds).toFixed(2));
}

export function discTypes(): DiscType[] {
  return ["putter", "midrange", "fairway_driver", "distance_driver"];
}
