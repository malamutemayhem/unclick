export type PaperType = "cotton_rag" | "kozo" | "gampi" | "flax" | "abaca";

export function grainDirectionFactor(withGrain: boolean): number {
  return withGrain ? 1.0 : 0.6;
}

export function basisWeightGsm(paperType: PaperType): number {
  const weights: Record<PaperType, number> = {
    cotton_rag: 120, kozo: 30, gampi: 25, flax: 100, abaca: 45,
  };
  return weights[paperType];
}

export function foldEndurance(paperType: PaperType): number {
  const folds: Record<PaperType, number> = {
    cotton_rag: 500, kozo: 2000, gampi: 1500, flax: 400, abaca: 1800,
  };
  return folds[paperType];
}

export function tearStrengthMn(paperType: PaperType): number {
  const strength: Record<PaperType, number> = {
    cotton_rag: 800, kozo: 1200, gampi: 600, flax: 700, abaca: 1000,
  };
  return strength[paperType];
}

export function absorbencySeconds(paperType: PaperType): number {
  const seconds: Record<PaperType, number> = {
    cotton_rag: 30, kozo: 5, gampi: 8, flax: 25, abaca: 10,
  };
  return seconds[paperType];
}

export function phLevel(paperType: PaperType): number {
  const ph: Record<PaperType, number> = {
    cotton_rag: 7.0, kozo: 7.2, gampi: 7.1, flax: 6.8, abaca: 7.0,
  };
  return ph[paperType];
}

export function archivalLifeYears(paperType: PaperType): number {
  const years: Record<PaperType, number> = {
    cotton_rag: 500, kozo: 1000, gampi: 800, flax: 400, abaca: 600,
  };
  return years[paperType];
}

export function sheetsPerKg(paperType: PaperType): number {
  const gsm = basisWeightGsm(paperType);
  return Math.round(1000 / (gsm * 0.06));
}

export function costPerSheet(paperType: PaperType): number {
  const costs: Record<PaperType, number> = {
    cotton_rag: 2, kozo: 8, gampi: 12, flax: 3, abaca: 6,
  };
  return costs[paperType];
}

export function paperTypes(): PaperType[] {
  return ["cotton_rag", "kozo", "gampi", "flax", "abaca"];
}
