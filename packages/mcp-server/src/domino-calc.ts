export type DominoSet = "double_six" | "double_nine" | "double_twelve" | "double_fifteen" | "double_eighteen";

export function tileCount(maxPips: number): number {
  return ((maxPips + 1) * (maxPips + 2)) / 2;
}

export function setSize(set: DominoSet): number {
  const pips: Record<DominoSet, number> = {
    double_six: 6, double_nine: 9, double_twelve: 12,
    double_fifteen: 15, double_eighteen: 18,
  };
  return tileCount(pips[set]);
}

export function totalPips(maxPips: number): number {
  const n = maxPips + 1;
  return maxPips * n * (n + 1) / 4;
}

export function doublesCount(maxPips: number): number {
  return maxPips + 1;
}

export function tilesPerPlayer(totalTiles: number, players: number): number {
  if (players <= 0) return 0;
  return Math.floor(totalTiles / players);
}

export function boneyard(totalTiles: number, players: number, tilesEach: number): number {
  return totalTiles - players * tilesEach;
}

export function matchingTiles(pip: number, maxPips: number): number {
  if (pip < 0 || pip > maxPips) return 0;
  return maxPips - pip + 1;
}

export function probability(pip: number, maxPips: number): number {
  const total = tileCount(maxPips);
  const matching = matchingTiles(pip, maxPips);
  if (total <= 0) return 0;
  return parseFloat((matching / total).toFixed(4));
}

export function chainLength(tiles: number, tileLengthCm: number): number {
  return parseFloat((tiles * tileLengthCm).toFixed(1));
}

export function toppleSpeed(spacingCm: number): number {
  return parseFloat((spacingCm * 10).toFixed(1));
}

export function maxPlayers(set: DominoSet): number {
  const max: Record<DominoSet, number> = {
    double_six: 4, double_nine: 6, double_twelve: 8,
    double_fifteen: 10, double_eighteen: 12,
  };
  return max[set];
}

export function scoringMultiple(): number {
  return 5;
}

export function dominoSets(): DominoSet[] {
  return ["double_six", "double_nine", "double_twelve", "double_fifteen", "double_eighteen"];
}
