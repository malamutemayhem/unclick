export type BathMatType = "cotton_terry" | "memory_foam" | "teak_wood" | "diatomite_stone" | "bamboo_slat";

export function absorbency(t: BathMatType): number {
  const m: Record<BathMatType, number> = {
    cotton_terry: 10, memory_foam: 8, teak_wood: 2, diatomite_stone: 9, bamboo_slat: 3,
  };
  return m[t];
}

export function dryingSpeed(t: BathMatType): number {
  const m: Record<BathMatType, number> = {
    cotton_terry: 3, memory_foam: 4, teak_wood: 9, diatomite_stone: 10, bamboo_slat: 8,
  };
  return m[t];
}

export function footComfort(t: BathMatType): number {
  const m: Record<BathMatType, number> = {
    cotton_terry: 8, memory_foam: 10, teak_wood: 6, diatomite_stone: 4, bamboo_slat: 5,
  };
  return m[t];
}

export function slipResistance(t: BathMatType): number {
  const m: Record<BathMatType, number> = {
    cotton_terry: 6, memory_foam: 8, teak_wood: 7, diatomite_stone: 9, bamboo_slat: 6,
  };
  return m[t];
}

export function matCost(t: BathMatType): number {
  const m: Record<BathMatType, number> = {
    cotton_terry: 2, memory_foam: 4, teak_wood: 8, diatomite_stone: 6, bamboo_slat: 5,
  };
  return m[t];
}

export function machineWash(t: BathMatType): boolean {
  const m: Record<BathMatType, boolean> = {
    cotton_terry: true, memory_foam: true, teak_wood: false, diatomite_stone: false, bamboo_slat: false,
  };
  return m[t];
}

export function moldResistant(t: BathMatType): boolean {
  const m: Record<BathMatType, boolean> = {
    cotton_terry: false, memory_foam: false, teak_wood: true, diatomite_stone: true, bamboo_slat: true,
  };
  return m[t];
}

export function surfaceMaterial(t: BathMatType): string {
  const m: Record<BathMatType, string> = {
    cotton_terry: "looped_cotton_pile",
    memory_foam: "microfiber_over_foam",
    teak_wood: "slatted_teak_oil_finish",
    diatomite_stone: "natural_diatomaceous_earth",
    bamboo_slat: "rolled_bamboo_strip",
  };
  return m[t];
}

export function bestBath(t: BathMatType): string {
  const m: Record<BathMatType, string> = {
    cotton_terry: "classic_soft_everyday",
    memory_foam: "luxury_plush_spa_feel",
    teak_wood: "rustic_spa_shower_deck",
    diatomite_stone: "minimal_fast_dry_modern",
    bamboo_slat: "eco_natural_zen_bath",
  };
  return m[t];
}

export function bathMats(): BathMatType[] {
  return ["cotton_terry", "memory_foam", "teak_wood", "diatomite_stone", "bamboo_slat"];
}
