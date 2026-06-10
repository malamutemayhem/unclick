export type CompositeType = "fiberglass" | "carbon_fiber" | "kevlar_composite" | "wood_laminate" | "concrete";

export function strengthToWeight(c: CompositeType): number {
  const m: Record<CompositeType, number> = {
    fiberglass: 6, carbon_fiber: 10, kevlar_composite: 9, wood_laminate: 4, concrete: 3,
  };
  return m[c];
}

export function stiffness(c: CompositeType): number {
  const m: Record<CompositeType, number> = {
    fiberglass: 5, carbon_fiber: 10, kevlar_composite: 6, wood_laminate: 4, concrete: 8,
  };
  return m[c];
}

export function impactResistance(c: CompositeType): number {
  const m: Record<CompositeType, number> = {
    fiberglass: 6, carbon_fiber: 4, kevlar_composite: 10, wood_laminate: 5, concrete: 2,
  };
  return m[c];
}

export function costPerKg(c: CompositeType): number {
  const m: Record<CompositeType, number> = {
    fiberglass: 3, carbon_fiber: 10, kevlar_composite: 8, wood_laminate: 2, concrete: 1,
  };
  return m[c];
}

export function fatigueLife(c: CompositeType): number {
  const m: Record<CompositeType, number> = {
    fiberglass: 5, carbon_fiber: 9, kevlar_composite: 8, wood_laminate: 4, concrete: 6,
  };
  return m[c];
}

export function lightweight(c: CompositeType): boolean {
  const m: Record<CompositeType, boolean> = {
    fiberglass: true, carbon_fiber: true, kevlar_composite: true, wood_laminate: true, concrete: false,
  };
  return m[c];
}

export function conductiveHeat(c: CompositeType): boolean {
  const m: Record<CompositeType, boolean> = {
    fiberglass: false, carbon_fiber: true, kevlar_composite: false, wood_laminate: false, concrete: false,
  };
  return m[c];
}

export function primaryApplication(c: CompositeType): string {
  const m: Record<CompositeType, string> = {
    fiberglass: "boat_hulls", carbon_fiber: "aerospace",
    kevlar_composite: "body_armor", wood_laminate: "furniture",
    concrete: "buildings",
  };
  return m[c];
}

export function matrixMaterial(c: CompositeType): string {
  const m: Record<CompositeType, string> = {
    fiberglass: "polyester_resin", carbon_fiber: "epoxy",
    kevlar_composite: "epoxy", wood_laminate: "adhesive",
    concrete: "cement_paste",
  };
  return m[c];
}

export function compositeTypes(): CompositeType[] {
  return ["fiberglass", "carbon_fiber", "kevlar_composite", "wood_laminate", "concrete"];
}
