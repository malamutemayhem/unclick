export type KilnType = "electric" | "gas_reduction" | "wood_fired" | "pit_firing" | "soda_kiln";

export function maxTempCelsius(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 1300, gas_reduction: 1350, wood_fired: 1400, pit_firing: 900, soda_kiln: 1320,
  };
  return m[kiln];
}

export function firingHours(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 10, gas_reduction: 12, wood_fired: 48, pit_firing: 8, soda_kiln: 14,
  };
  return m[kiln];
}

export function temperatureControl(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 9, gas_reduction: 7, wood_fired: 4, pit_firing: 2, soda_kiln: 6,
  };
  return m[kiln];
}

export function atmosphereControl(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 3, gas_reduction: 9, wood_fired: 7, pit_firing: 2, soda_kiln: 8,
  };
  return m[kiln];
}

export function fuelCostPerFiring(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 40, gas_reduction: 60, wood_fired: 30, pit_firing: 10, soda_kiln: 55,
  };
  return m[kiln];
}

export function outdoorRequired(kiln: KilnType): boolean {
  const m: Record<KilnType, boolean> = {
    electric: false, gas_reduction: true, wood_fired: true, pit_firing: true, soda_kiln: true,
  };
  return m[kiln];
}

export function reduction(kiln: KilnType): boolean {
  const m: Record<KilnType, boolean> = {
    electric: false, gas_reduction: true, wood_fired: true, pit_firing: false, soda_kiln: true,
  };
  return m[kiln];
}

export function bestGlazeType(kiln: KilnType): string {
  const m: Record<KilnType, string> = {
    electric: "oxidation_glaze", gas_reduction: "celadon", wood_fired: "ash_glaze",
    pit_firing: "terra_sigillata", soda_kiln: "soda_glaze",
  };
  return m[kiln];
}

export function setupCost(kiln: KilnType): number {
  const m: Record<KilnType, number> = {
    electric: 2000, gas_reduction: 5000, wood_fired: 8000, pit_firing: 200, soda_kiln: 6000,
  };
  return m[kiln];
}

export function kilnTypes(): KilnType[] {
  return ["electric", "gas_reduction", "wood_fired", "pit_firing", "soda_kiln"];
}
