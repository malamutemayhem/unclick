export type WhiskeyType = "bourbon" | "scotch" | "irish" | "rye" | "japanese" | "canadian";
export type CaskType = "bourbon_barrel" | "sherry_butt" | "port_pipe" | "rum_cask" | "virgin_oak";

export function proofToAbv(proof: number): number {
  return parseFloat((proof / 2).toFixed(1));
}

export function abvToProof(abv: number): number {
  return parseFloat((abv * 2).toFixed(1));
}

export function dilutionWater(currentAbv: number, targetAbv: number, volumeMl: number): number {
  if (targetAbv >= currentAbv || targetAbv <= 0) return 0;
  return parseFloat((volumeMl * (currentAbv / targetAbv - 1)).toFixed(1));
}

export function angelsShare(yearAged: number, annualLossPercent: number = 2): number {
  return parseFloat(((1 - Math.pow(1 - annualLossPercent / 100, yearAged)) * 100).toFixed(1));
}

export function remainingVolume(initialLiters: number, yearsAged: number, annualLossPercent: number = 2): number {
  return parseFloat((initialLiters * Math.pow(1 - annualLossPercent / 100, yearsAged)).toFixed(1));
}

export function caskCapacity(caskType: CaskType): number {
  const liters: Record<CaskType, number> = {
    bourbon_barrel: 200, sherry_butt: 500, port_pipe: 550, rum_cask: 200, virgin_oak: 200,
  };
  return liters[caskType];
}

export function bottles(volumeLiters: number, bottleMl: number = 700): number {
  return Math.floor(volumeLiters * 1000 / bottleMl);
}

export function nosingSuggestion(abv: number): string {
  if (abv > 50) return "add a few drops of water";
  if (abv > 43) return "try neat, then add water";
  return "enjoy neat";
}

export function servingTemp(whiskeyType: WhiskeyType): { minC: number; maxC: number } {
  if (whiskeyType === "scotch" || whiskeyType === "japanese") return { minC: 15, maxC: 18 };
  return { minC: 18, maxC: 22 };
}

export function iceEffect(startAbv: number, iceMeltMl: number, pourMl: number): number {
  return parseFloat((startAbv * pourMl / (pourMl + iceMeltMl)).toFixed(1));
}

export function maturationFactor(years: number): number {
  return parseFloat(Math.min(1, Math.log(years + 1) / Math.log(26)).toFixed(2));
}

export function colorEstimate(years: number, caskType: CaskType): string {
  const caskFactor = caskType === "sherry_butt" || caskType === "port_pipe" ? 1.5 : 1;
  const score = years * caskFactor;
  if (score < 5) return "pale gold";
  if (score < 10) return "amber";
  if (score < 20) return "deep amber";
  return "mahogany";
}

export function costPerDram(bottlePrice: number, dramMl: number = 30, bottleMl: number = 700): number {
  return parseFloat((bottlePrice / (bottleMl / dramMl)).toFixed(2));
}

export function whiskeyTypes(): WhiskeyType[] {
  return ["bourbon", "scotch", "irish", "rye", "japanese", "canadian"];
}
