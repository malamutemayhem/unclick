export type Element = "earth" | "water" | "fire" | "air" | "aether";

export function calcination(tempC: number, hours: number): number {
  return parseFloat((tempC * hours * 0.01).toFixed(1));
}

export function dissolution(soluteG: number, solventMl: number): number {
  if (solventMl <= 0) return 0;
  return parseFloat(((soluteG / solventMl) * 100).toFixed(1));
}

export function separation(mixtureG: number, purity: number): number {
  return parseFloat((mixtureG * purity / 100).toFixed(1));
}

export function conjunction(partA: number, partB: number, ratio: number): number {
  return parseFloat((partA * ratio + partB * (1 - ratio)).toFixed(1));
}

export function fermentation(sugarG: number, yeastG: number, hours: number): number {
  const rate = Math.min(yeastG / sugarG, 1);
  return parseFloat((sugarG * rate * (1 - Math.exp(-hours / 24))).toFixed(1));
}

export function distillation(volumeMl: number, boilingPointC: number, heatC: number): number {
  if (heatC < boilingPointC) return 0;
  const efficiency = Math.min((heatC - boilingPointC) / 100, 0.95);
  return parseFloat((volumeMl * efficiency).toFixed(1));
}

export function coagulation(tempC: number, concentrationPct: number): boolean {
  return tempC > 60 && concentrationPct > 10;
}

export function sublimation(massG: number, tempC: number, sublimationTempC: number): number {
  if (tempC < sublimationTempC) return 0;
  return parseFloat((massG * 0.8).toFixed(1));
}

export function philosopherStoneSteps(): number {
  return 12;
}

export function elementalBalance(elements: Record<Element, number>): Element {
  let max: Element = "earth";
  let maxVal = 0;
  for (const [el, val] of Object.entries(elements) as [Element, number][]) {
    if (val > maxVal) { max = el; maxVal = val; }
  }
  return max;
}

export function elements(): Element[] {
  return ["earth", "water", "fire", "air", "aether"];
}
