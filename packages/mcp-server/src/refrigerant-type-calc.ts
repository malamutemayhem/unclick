export type RefrigerantType = "r410a" | "r32" | "r134a" | "r290" | "r744";

export function coolingEfficiency(r: RefrigerantType): number {
  const m: Record<RefrigerantType, number> = {
    r410a: 8, r32: 9, r134a: 7, r290: 8, r744: 6,
  };
  return m[r];
}

export function globalWarmingPotential(r: RefrigerantType): number {
  const m: Record<RefrigerantType, number> = {
    r410a: 9, r32: 6, r134a: 8, r290: 1, r744: 1,
  };
  return m[r];
}

export function operatingPressure(r: RefrigerantType): number {
  const m: Record<RefrigerantType, number> = {
    r410a: 8, r32: 8, r134a: 5, r290: 6, r744: 10,
  };
  return m[r];
}

export function systemCost(r: RefrigerantType): number {
  const m: Record<RefrigerantType, number> = {
    r410a: 5, r32: 6, r134a: 4, r290: 7, r744: 9,
  };
  return m[r];
}

export function chargeRequired(r: RefrigerantType): number {
  const m: Record<RefrigerantType, number> = {
    r410a: 7, r32: 5, r134a: 7, r290: 4, r744: 8,
  };
  return m[r];
}

export function flammable(r: RefrigerantType): boolean {
  const m: Record<RefrigerantType, boolean> = {
    r410a: false, r32: true, r134a: false, r290: true, r744: false,
  };
  return m[r];
}

export function naturalRefrigerant(r: RefrigerantType): boolean {
  const m: Record<RefrigerantType, boolean> = {
    r410a: false, r32: false, r134a: false, r290: true, r744: true,
  };
  return m[r];
}

export function chemicalClass(r: RefrigerantType): string {
  const m: Record<RefrigerantType, string> = {
    r410a: "hfc_blend", r32: "hfc_single", r134a: "hfc_single",
    r290: "hydrocarbon_propane", r744: "carbon_dioxide",
  };
  return m[r];
}

export function primaryApplication(r: RefrigerantType): string {
  const m: Record<RefrigerantType, string> = {
    r410a: "residential_ac", r32: "split_system_ac",
    r134a: "automotive_ac", r290: "commercial_refrigeration",
    r744: "industrial_transcritical",
  };
  return m[r];
}

export function refrigerantTypes(): RefrigerantType[] {
  return ["r410a", "r32", "r134a", "r290", "r744"];
}
