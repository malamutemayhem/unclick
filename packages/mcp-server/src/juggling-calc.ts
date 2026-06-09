export type PropType = "ball" | "club" | "ring" | "diabolo" | "poi" | "hat";
export type Pattern = "cascade" | "fountain" | "shower" | "columns" | "mills_mess" | "box";

export function siteswapAverage(siteswap: number[]): number {
  if (siteswap.length === 0) return 0;
  const sum = siteswap.reduce((a, b) => a + b, 0);
  return parseFloat((sum / siteswap.length).toFixed(1));
}

export function objectCount(siteswap: number[]): number {
  if (siteswap.length === 0) return 0;
  return Math.round(siteswap.reduce((a, b) => a + b, 0) / siteswap.length);
}

export function throwHeight(beatTimeS: number, throwValue: number): number {
  const airTimeS = beatTimeS * throwValue;
  return parseFloat((0.5 * 9.81 * (airTimeS / 2) ** 2 * 100).toFixed(1));
}

export function beatsPerSecond(tempo: number): number {
  return parseFloat((tempo / 60).toFixed(2));
}

export function dwellRatio(handCount: number, objectsCount: number): number {
  return parseFloat(((handCount * 2 / (objectsCount + handCount)) * 100).toFixed(0));
}

export function catchesPerMinute(objectsCount: number, tempo: number): number {
  return Math.round(tempo * objectsCount / 2);
}

export function practiceMinutes(difficulty: number): number {
  return Math.round(15 * (1 + difficulty * 0.5));
}

export function propWeight(type: PropType): number {
  const grams: Record<PropType, number> = {
    ball: 130, club: 225, ring: 80, diabolo: 280, poi: 150, hat: 120,
  };
  return grams[type];
}

export function recommendedSize(propType: PropType, handSizeCm: number): string {
  if (propType === "ball") return handSizeCm < 18 ? "65mm" : "75mm";
  if (propType === "club") return handSizeCm < 18 ? "short (48cm)" : "standard (52cm)";
  return "standard";
}

export function spacingM(objectsCount: number): number {
  return parseFloat((1 + objectsCount * 0.3).toFixed(1));
}

export function heightNeededM(objectsCount: number): number {
  return parseFloat((2 + objectsCount * 0.4).toFixed(1));
}

export function difficultyRating(objects: number, pattern: Pattern): number {
  const patternFactor: Record<Pattern, number> = {
    cascade: 1, fountain: 1.2, shower: 1.5, columns: 1.3, mills_mess: 1.8, box: 2.0,
  };
  return parseFloat((objects * patternFactor[pattern]).toFixed(1));
}

export function propTypes(): PropType[] {
  return ["ball", "club", "ring", "diabolo", "poi", "hat"];
}
