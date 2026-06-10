export type SoapOil = "olive" | "coconut" | "palm" | "castor" | "shea_butter";

export function sapValueNaOH(oil: SoapOil): number {
  const sap: Record<SoapOil, number> = {
    olive: 0.134, coconut: 0.178, palm: 0.141, castor: 0.128, shea_butter: 0.128,
  };
  return sap[oil];
}

export function lyeGrams(oilGrams: number, oil: SoapOil, superFatPercent: number): number {
  return Math.round(oilGrams * sapValueNaOH(oil) * (1 - superFatPercent / 100));
}

export function waterGrams(lyeGrams: number): number {
  return Math.round(lyeGrams * 2.3);
}

export function traceMoistureRating(oil: SoapOil): number {
  const rating: Record<SoapOil, number> = {
    olive: 2, coconut: 5, palm: 4, castor: 3, shea_butter: 2,
  };
  return rating[oil];
}

export function hardnessRating(oil: SoapOil): number {
  const hard: Record<SoapOil, number> = {
    olive: 2, coconut: 5, palm: 5, castor: 1, shea_butter: 4,
  };
  return hard[oil];
}

export function latherQuality(oil: SoapOil): number {
  const lather: Record<SoapOil, number> = {
    olive: 2, coconut: 5, palm: 2, castor: 5, shea_butter: 2,
  };
  return lather[oil];
}

export function cureTimeWeeks(): number {
  return 6;
}

export function shelfLifeMonths(oil: SoapOil): number {
  const months: Record<SoapOil, number> = {
    olive: 12, coconut: 18, palm: 18, castor: 10, shea_butter: 12,
  };
  return months[oil];
}

export function costPerBar(oil: SoapOil): number {
  const costs: Record<SoapOil, number> = {
    olive: 2.5, coconut: 1.5, palm: 1.0, castor: 3.0, shea_butter: 3.5,
  };
  return costs[oil];
}

export function soapOils(): SoapOil[] {
  return ["olive", "coconut", "palm", "castor", "shea_butter"];
}
