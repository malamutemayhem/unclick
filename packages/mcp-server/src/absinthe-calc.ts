export type HerbType = "wormwood" | "anise" | "fennel" | "hyssop" | "melissa" | "coriander";
export type LoucheLevel = "none" | "slight" | "moderate" | "full" | "opaque";

export function abvPercent(proofSpirits: number): number {
  return parseFloat((proofSpirits * 0.5).toFixed(1));
}

export function waterRatio(abv: number): number {
  if (abv <= 45) return 2;
  if (abv <= 55) return 3;
  if (abv <= 65) return 4;
  return 5;
}

export function waterMl(absintheMl: number, abv: number): number {
  return parseFloat((absintheMl * waterRatio(abv)).toFixed(0));
}

export function loucheLevel(abv: number, waterRatio: number): LoucheLevel {
  if (waterRatio < 1) return "none";
  if (abv < 50) return "slight";
  if (waterRatio < 3) return "moderate";
  if (waterRatio < 5) return "full";
  return "opaque";
}

export function servingTemp(): number {
  return 4;
}

export function sugarCubes(sweetness: string): number {
  if (sweetness === "none") return 0;
  if (sweetness === "light") return 0.5;
  return 1;
}

export function dripRate(): string {
  return "1 drop per second";
}

export function macerationDays(herb: HerbType): number {
  const days: Record<HerbType, number> = {
    wormwood: 14, anise: 7, fennel: 7, hyssop: 5, melissa: 5, coriander: 3,
  };
  return days[herb];
}

export function distillationTemp(): number {
  return 78;
}

export function thujoneLimit(): number {
  return 35;
}

export function colorSource(): string[] {
  return ["hyssop", "melissa", "petit wormwood"];
}

export function herbTypes(): HerbType[] {
  return ["wormwood", "anise", "fennel", "hyssop", "melissa", "coriander"];
}
