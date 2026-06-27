export type AlloyType = "steel" | "stainless_steel" | "aluminum" | "titanium" | "brass";

export function tensileStrengthMpa(a: AlloyType): number {
  const m: Record<AlloyType, number> = {
    steel: 500, stainless_steel: 600, aluminum: 300, titanium: 900, brass: 350,
  };
  return m[a];
}

export function corrosionResistance(a: AlloyType): number {
  const m: Record<AlloyType, number> = {
    steel: 3, stainless_steel: 9, aluminum: 7, titanium: 10, brass: 6,
  };
  return m[a];
}

export function densityGCm3(a: AlloyType): number {
  const m: Record<AlloyType, number> = {
    steel: 7.8, stainless_steel: 8.0, aluminum: 2.7, titanium: 4.5, brass: 8.5,
  };
  return m[a];
}

export function machinability(a: AlloyType): number {
  const m: Record<AlloyType, number> = {
    steel: 7, stainless_steel: 5, aluminum: 9, titanium: 3, brass: 10,
  };
  return m[a];
}

export function costPerTon(a: AlloyType): number {
  const m: Record<AlloyType, number> = {
    steel: 2, stainless_steel: 5, aluminum: 6, titanium: 10, brass: 7,
  };
  return m[a];
}

export function magnetic(a: AlloyType): boolean {
  const m: Record<AlloyType, boolean> = {
    steel: true, stainless_steel: false, aluminum: false, titanium: false, brass: false,
  };
  return m[a];
}

export function weldable(a: AlloyType): boolean {
  const m: Record<AlloyType, boolean> = {
    steel: true, stainless_steel: true, aluminum: true, titanium: true, brass: false,
  };
  return m[a];
}

export function primaryElement(a: AlloyType): string {
  const m: Record<AlloyType, string> = {
    steel: "iron", stainless_steel: "iron",
    aluminum: "aluminum", titanium: "titanium",
    brass: "copper",
  };
  return m[a];
}

export function commonUse(a: AlloyType): string {
  const m: Record<AlloyType, string> = {
    steel: "construction", stainless_steel: "medical_instruments",
    aluminum: "aircraft", titanium: "jet_engines",
    brass: "plumbing_fittings",
  };
  return m[a];
}

export function alloyTypes(): AlloyType[] {
  return ["steel", "stainless_steel", "aluminum", "titanium", "brass"];
}
