export type FretWire = "nickel_silver" | "stainless_steel" | "evo_gold" | "brass" | "copper_nickel";

export function hardnessRating(wire: FretWire): number {
  const m: Record<FretWire, number> = {
    nickel_silver: 5, stainless_steel: 9, evo_gold: 7, brass: 3, copper_nickel: 4,
  };
  return m[wire];
}

export function wearLifeYears(wire: FretWire): number {
  const m: Record<FretWire, number> = {
    nickel_silver: 5, stainless_steel: 20, evo_gold: 10, brass: 3, copper_nickel: 4,
  };
  return m[wire];
}

export function toneCharacter(wire: FretWire): string {
  const m: Record<FretWire, string> = {
    nickel_silver: "balanced", stainless_steel: "bright", evo_gold: "warm",
    brass: "vintage", copper_nickel: "mellow",
  };
  return m[wire];
}

export function installDifficulty(wire: FretWire): number {
  const m: Record<FretWire, number> = {
    nickel_silver: 4, stainless_steel: 8, evo_gold: 5, brass: 3, copper_nickel: 4,
  };
  return m[wire];
}

export function bendingEase(wire: FretWire): number {
  const m: Record<FretWire, number> = {
    nickel_silver: 7, stainless_steel: 3, evo_gold: 6, brass: 9, copper_nickel: 8,
  };
  return m[wire];
}

export function corrosionResistant(wire: FretWire): boolean {
  const m: Record<FretWire, boolean> = {
    nickel_silver: true, stainless_steel: true, evo_gold: true, brass: false, copper_nickel: false,
  };
  return m[wire];
}

export function nickelFree(wire: FretWire): boolean {
  const m: Record<FretWire, boolean> = {
    nickel_silver: false, stainless_steel: false, evo_gold: true, brass: true, copper_nickel: false,
  };
  return m[wire];
}

export function bestGuitarType(wire: FretWire): string {
  const m: Record<FretWire, string> = {
    nickel_silver: "acoustic", stainless_steel: "electric_shred",
    evo_gold: "boutique", brass: "vintage_restoration", copper_nickel: "classical",
  };
  return m[wire];
}

export function costPerMeter(wire: FretWire): number {
  const m: Record<FretWire, number> = {
    nickel_silver: 5, stainless_steel: 12, evo_gold: 15, brass: 3, copper_nickel: 4,
  };
  return m[wire];
}

export function fretWires(): FretWire[] {
  return ["nickel_silver", "stainless_steel", "evo_gold", "brass", "copper_nickel"];
}
