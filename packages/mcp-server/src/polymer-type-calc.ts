export type PolymerType = "thermoplastic" | "thermoset" | "elastomer" | "fiber" | "biopolymer";

export function meltingPointC(p: PolymerType): number {
  const m: Record<PolymerType, number> = {
    thermoplastic: 200, thermoset: 0, elastomer: 0, fiber: 260, biopolymer: 150,
  };
  return m[p];
}

export function tensileStrength(p: PolymerType): number {
  const m: Record<PolymerType, number> = {
    thermoplastic: 6, thermoset: 9, elastomer: 3, fiber: 10, biopolymer: 4,
  };
  return m[p];
}

export function flexibility(p: PolymerType): number {
  const m: Record<PolymerType, number> = {
    thermoplastic: 7, thermoset: 2, elastomer: 10, fiber: 4, biopolymer: 6,
  };
  return m[p];
}

export function chemicalResistance(p: PolymerType): number {
  const m: Record<PolymerType, number> = {
    thermoplastic: 6, thermoset: 9, elastomer: 7, fiber: 5, biopolymer: 3,
  };
  return m[p];
}

export function recyclability(p: PolymerType): number {
  const m: Record<PolymerType, number> = {
    thermoplastic: 9, thermoset: 2, elastomer: 4, fiber: 5, biopolymer: 8,
  };
  return m[p];
}

export function remoldable(p: PolymerType): boolean {
  const m: Record<PolymerType, boolean> = {
    thermoplastic: true, thermoset: false, elastomer: false, fiber: false, biopolymer: true,
  };
  return m[p];
}

export function biodegradable(p: PolymerType): boolean {
  const m: Record<PolymerType, boolean> = {
    thermoplastic: false, thermoset: false, elastomer: false, fiber: false, biopolymer: true,
  };
  return m[p];
}

export function exampleMaterial(p: PolymerType): string {
  const m: Record<PolymerType, string> = {
    thermoplastic: "polyethylene", thermoset: "epoxy",
    elastomer: "natural_rubber", fiber: "kevlar",
    biopolymer: "pla",
  };
  return m[p];
}

export function commonApplication(p: PolymerType): string {
  const m: Record<PolymerType, string> = {
    thermoplastic: "packaging", thermoset: "circuit_boards",
    elastomer: "tires", fiber: "bulletproof_vests",
    biopolymer: "medical_implants",
  };
  return m[p];
}

export function polymerTypes(): PolymerType[] {
  return ["thermoplastic", "thermoset", "elastomer", "fiber", "biopolymer"];
}
