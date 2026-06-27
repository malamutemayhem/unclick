export type PepperType = "jalapeno" | "habanero" | "ghost" | "reaper" | "cayenne" | "serrano" | "scotch_bonnet";
export type VinegarType = "white" | "apple_cider" | "rice" | "distilled" | "malt";

export function scovilleRating(pepper: PepperType): number {
  const shu: Record<PepperType, number> = {
    jalapeno: 5000, serrano: 15000, cayenne: 40000, scotch_bonnet: 200000,
    habanero: 300000, ghost: 1000000, reaper: 2200000,
  };
  return shu[pepper];
}

export function heatLevel(shu: number): string {
  if (shu < 2500) return "mild";
  if (shu < 30000) return "medium";
  if (shu < 100000) return "hot";
  if (shu < 500000) return "very hot";
  if (shu < 1500000) return "extreme";
  return "superhot";
}

export function dilutionRatio(sourceShu: number, targetShu: number): number {
  if (targetShu <= 0 || sourceShu <= 0) return 0;
  return parseFloat((sourceShu / targetShu).toFixed(1));
}

export function vinegarPercent(targetPh: number): number {
  if (targetPh <= 2.5) return 50;
  if (targetPh <= 3.0) return 40;
  if (targetPh <= 3.5) return 30;
  return 20;
}

export function fermentationDays(pepperType: PepperType): number {
  const days: Record<PepperType, number> = {
    jalapeno: 5, serrano: 5, cayenne: 7, scotch_bonnet: 7,
    habanero: 10, ghost: 14, reaper: 14,
  };
  return days[pepperType];
}

export function saltBrinePercent(fermentStyle: "lacto" | "vinegar_only"): number {
  return fermentStyle === "lacto" ? 3.5 : 0;
}

export function yieldMl(peppersG: number, vinegarMl: number): number {
  return Math.round(peppersG * 0.7 + vinegarMl);
}

export function bottlesNeeded(totalMl: number, bottleMl: number = 150): number {
  return Math.ceil(totalMl / bottleMl);
}

export function shelfLifeMonths(vinegar: boolean, fermented: boolean): number {
  let months = 3;
  if (vinegar) months += 9;
  if (fermented) months += 6;
  return months;
}

export function capsaicinMg(shu: number, volumeMl: number): number {
  return parseFloat((shu * volumeMl / 16000000).toFixed(3));
}

export function blendShu(peppers: Array<{ shu: number; grams: number }>): number {
  if (peppers.length === 0) return 0;
  const totalG = peppers.reduce((s, p) => s + p.grams, 0);
  if (totalG === 0) return 0;
  const weightedSum = peppers.reduce((s, p) => s + p.shu * p.grams, 0);
  return Math.round(weightedSum / totalG);
}

export function labelWarning(shu: number): string {
  if (shu < 2500) return "none needed";
  if (shu < 50000) return "mildly spicy";
  if (shu < 300000) return "caution: very hot";
  return "extreme heat warning";
}

export function pepperTypes(): PepperType[] {
  return ["jalapeno", "habanero", "ghost", "reaper", "cayenne", "serrano", "scotch_bonnet"];
}
