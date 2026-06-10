export type ReactorType = "pwr" | "bwr" | "candu" | "fast_breeder" | "molten_salt";

export function thermalEfficiency(r: ReactorType): number {
  const m: Record<ReactorType, number> = {
    pwr: 33, bwr: 32, candu: 30, fast_breeder: 40, molten_salt: 45,
  };
  return m[r];
}

export function safetyRating(r: ReactorType): number {
  const m: Record<ReactorType, number> = {
    pwr: 8, bwr: 7, candu: 9, fast_breeder: 5, molten_salt: 10,
  };
  return m[r];
}

export function fuelUtilization(r: ReactorType): number {
  const m: Record<ReactorType, number> = {
    pwr: 5, bwr: 5, candu: 7, fast_breeder: 10, molten_salt: 9,
  };
  return m[r];
}

export function constructionCost(r: ReactorType): number {
  const m: Record<ReactorType, number> = {
    pwr: 7, bwr: 6, candu: 8, fast_breeder: 10, molten_salt: 9,
  };
  return m[r];
}

export function proliferationRisk(r: ReactorType): number {
  const m: Record<ReactorType, number> = {
    pwr: 4, bwr: 4, candu: 6, fast_breeder: 9, molten_salt: 3,
  };
  return m[r];
}

export function requiresEnrichedFuel(r: ReactorType): boolean {
  const m: Record<ReactorType, boolean> = {
    pwr: true, bwr: true, candu: false, fast_breeder: true, molten_salt: false,
  };
  return m[r];
}

export function passiveSafety(r: ReactorType): boolean {
  const m: Record<ReactorType, boolean> = {
    pwr: false, bwr: false, candu: false, fast_breeder: false, molten_salt: true,
  };
  return m[r];
}

export function coolant(r: ReactorType): string {
  const m: Record<ReactorType, string> = {
    pwr: "pressurized_water", bwr: "boiling_water",
    candu: "heavy_water", fast_breeder: "liquid_sodium",
    molten_salt: "fluoride_salt",
  };
  return m[r];
}

export function generationClass(r: ReactorType): string {
  const m: Record<ReactorType, string> = {
    pwr: "generation_iii", bwr: "generation_ii",
    candu: "generation_ii", fast_breeder: "generation_iv",
    molten_salt: "generation_iv",
  };
  return m[r];
}

export function reactorTypes(): ReactorType[] {
  return ["pwr", "bwr", "candu", "fast_breeder", "molten_salt"];
}
