export type CoinGrade = "AG" | "G" | "VG" | "F" | "VF" | "EF" | "AU" | "MS" | "PF";
export type Metal = "gold" | "silver" | "copper" | "nickel" | "zinc" | "platinum";

const GRADE_NUMBER: Record<CoinGrade, number> = {
  AG: 3, G: 6, VG: 10, F: 15, VF: 30, EF: 45, AU: 55, MS: 65, PF: 67,
};

export function gradeNumber(grade: CoinGrade): number {
  return GRADE_NUMBER[grade];
}

export function meltValue(weightG: number, purity: number, spotPricePerOzTroy: number): number {
  const troyOz = weightG / 31.1035;
  return parseFloat((troyOz * purity * spotPricePerOzTroy).toFixed(2));
}

export function premiumPercent(marketPrice: number, meltVal: number): number {
  if (meltVal === 0) return 0;
  return parseFloat(((marketPrice / meltVal - 1) * 100).toFixed(1));
}

export function populationEstimate(mintage: number, survivalRate: number): number {
  return Math.round(mintage * survivalRate);
}

export function rarityScale(surviving: number): string {
  if (surviving < 10) return "unique/extremely rare";
  if (surviving < 100) return "very rare";
  if (surviving < 1000) return "rare";
  if (surviving < 10000) return "scarce";
  return "common";
}

export function slabDimensions(coinDiameterMm: number): { widthMm: number; heightMm: number } {
  return {
    widthMm: coinDiameterMm + 20,
    heightMm: coinDiameterMm + 30,
  };
}

export function storageTubeCapacity(coinThicknessMm: number, tubeLengthMm: number): number {
  return Math.floor(tubeLengthMm / coinThicknessMm);
}

export function albumPages(coinCount: number, coinsPerPage: number = 20): number {
  return Math.ceil(coinCount / coinsPerPage);
}

export function insurancePremium(totalValue: number, ratePercent: number = 1.5): number {
  return parseFloat((totalValue * ratePercent / 100).toFixed(2));
}

export function authenticityCheck(weight: number, expectedWeight: number, toleranceG: number = 0.1): boolean {
  return Math.abs(weight - expectedWeight) <= toleranceG;
}

export function edgeType(era: "ancient" | "medieval" | "modern"): string {
  if (era === "ancient") return "irregular";
  if (era === "medieval") return "plain or lettered";
  return "reeded";
}

export function yearRange(startYear: number, endYear: number): number {
  return endYear - startYear + 1;
}

export function coinGrades(): CoinGrade[] {
  return ["AG", "G", "VG", "F", "VF", "EF", "AU", "MS", "PF"];
}
