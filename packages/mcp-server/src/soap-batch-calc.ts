export type OilType = "olive" | "coconut" | "palm" | "lard" | "castor";

export function lyeWeightG(oilWeightG: number, saponificationValue: number): number {
  return parseFloat((oilWeightG * saponificationValue).toFixed(1));
}

export function saponificationValue(oil: OilType): number {
  const values: Record<OilType, number> = {
    olive: 0.134, coconut: 0.178, palm: 0.141, lard: 0.138, castor: 0.128,
  };
  return values[oil];
}

export function waterMl(lyeWeightG: number): number {
  return Math.round(lyeWeightG * 2.33);
}

export function traceTimeMinutes(oil: OilType): number {
  const times: Record<OilType, number> = {
    olive: 30, coconut: 5, palm: 15, lard: 20, castor: 10,
  };
  return times[oil];
}

export function cureTimeWeeks(oil: OilType): number {
  const weeks: Record<OilType, number> = {
    olive: 8, coconut: 4, palm: 6, lard: 6, castor: 4,
  };
  return weeks[oil];
}

export function hardnessRating(oil: OilType): number {
  const ratings: Record<OilType, number> = {
    olive: 3, coconut: 5, palm: 4, lard: 4, castor: 1,
  };
  return ratings[oil];
}

export function latherRating(oil: OilType): number {
  const ratings: Record<OilType, number> = {
    olive: 2, coconut: 5, palm: 2, lard: 1, castor: 4,
  };
  return ratings[oil];
}

export function superfattPercent(): number {
  return 5;
}

export function costPerBar(oilCostPerKg: number, barWeightG: number): number {
  return parseFloat((oilCostPerKg * barWeightG / 1000 * 1.2).toFixed(2));
}

export function oilTypes(): OilType[] {
  return ["olive", "coconut", "palm", "lard", "castor"];
}
