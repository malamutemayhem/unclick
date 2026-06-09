export type GameType = "8ball" | "9ball" | "10ball" | "straight" | "snooker" | "carom";
export type ShotType = "stop" | "follow" | "draw" | "stun" | "masse" | "jump";

export function tableArea(lengthFt: number, widthFt: number): number {
  return parseFloat((lengthFt * widthFt).toFixed(1));
}

export function roomSize(tableLengthFt: number, tableWidthFt: number, cueInch: number = 58): number {
  const cueFt = cueInch / 12;
  return parseFloat(((tableLengthFt + cueFt * 2) * (tableWidthFt + cueFt * 2)).toFixed(1));
}

export function ballCount(game: GameType): number {
  const counts: Record<GameType, number> = {
    "8ball": 16, "9ball": 10, "10ball": 11, straight: 16, snooker: 22, carom: 3,
  };
  return counts[game];
}

export function rackPattern(game: GameType): string {
  const patterns: Record<GameType, string> = {
    "8ball": "triangle 15",
    "9ball": "diamond 9",
    "10ball": "triangle 10",
    straight: "triangle 15",
    snooker: "triangle 15 + colors on spots",
    carom: "no rack",
  };
  return patterns[game];
}

export function shotAngle(cutAngleDeg: number): number {
  return parseFloat((90 - cutAngleDeg).toFixed(1));
}

export function deflection(cutAngleDeg: number, spinPercent: number): number {
  const rad = cutAngleDeg * Math.PI / 180;
  return parseFloat((Math.sin(rad) * spinPercent / 100 * 5).toFixed(2));
}

export function cueSpeed(distanceFt: number, rollResistance: number = 0.2): number {
  return parseFloat((Math.sqrt(2 * 32.2 * rollResistance * distanceFt) * 0.68).toFixed(1));
}

export function spinRpm(tipOffset: number, cueSpeedMph: number): number {
  return Math.round(tipOffset * cueSpeedMph * 150);
}

export function throwAngle(cutAngleDeg: number, spinRpmVal: number): number {
  return parseFloat((Math.min(spinRpmVal / 1000, 3) * Math.sin(cutAngleDeg * Math.PI / 180)).toFixed(2));
}

export function pocketSpeed(angleDeg: number): string {
  if (angleDeg < 20) return "slow";
  if (angleDeg < 40) return "medium";
  return "firm";
}

export function handicap(winPct: number): number {
  return Math.round((50 - winPct) * 0.2);
}

export function raceLength(skillGap: number): number {
  if (skillGap < 2) return 7;
  if (skillGap < 4) return 5;
  return 3;
}

export function gameTypes(): GameType[] {
  return ["8ball", "9ball", "10ball", "straight", "snooker", "carom"];
}
