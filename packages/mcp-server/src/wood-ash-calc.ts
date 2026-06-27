export type WoodAshSource = "hardwood" | "softwood" | "straw" | "seaweed" | "bone_ash";

export function potassiumPercent(source: WoodAshSource): number {
  const k: Record<WoodAshSource, number> = {
    hardwood: 6, softwood: 3, straw: 10, seaweed: 12, bone_ash: 1,
  };
  return k[source];
}

export function calciumPercent(source: WoodAshSource): number {
  const c: Record<WoodAshSource, number> = {
    hardwood: 25, softwood: 15, straw: 5, seaweed: 8, bone_ash: 35,
  };
  return c[source];
}

export function phLevel(source: WoodAshSource): number {
  const p: Record<WoodAshSource, number> = {
    hardwood: 12, softwood: 10, straw: 11, seaweed: 9, bone_ash: 8,
  };
  return p[source];
}

export function lyeMakingSuitability(source: WoodAshSource): number {
  const l: Record<WoodAshSource, number> = {
    hardwood: 9, softwood: 4, straw: 3, seaweed: 2, bone_ash: 1,
  };
  return l[source];
}

export function soilAmendmentValue(source: WoodAshSource): number {
  const s: Record<WoodAshSource, number> = {
    hardwood: 8, softwood: 5, straw: 7, seaweed: 9, bone_ash: 6,
  };
  return s[source];
}

export function glazeIngredient(source: WoodAshSource): boolean {
  return source === "hardwood" || source === "bone_ash";
}

export function ashYieldPercent(source: WoodAshSource): number {
  const a: Record<WoodAshSource, number> = {
    hardwood: 1.5, softwood: 0.5, straw: 5, seaweed: 15, bone_ash: 30,
  };
  return a[source];
}

export function primaryUse(source: WoodAshSource): string {
  const u: Record<WoodAshSource, string> = {
    hardwood: "soap_making", softwood: "garden_amendment", straw: "fertilizer",
    seaweed: "kelp_supplement", bone_ash: "bone_china",
  };
  return u[source];
}

export function costPerKg(source: WoodAshSource): number {
  const c: Record<WoodAshSource, number> = {
    hardwood: 2, softwood: 1, straw: 0.5, seaweed: 5, bone_ash: 8,
  };
  return c[source];
}

export function woodAshSources(): WoodAshSource[] {
  return ["hardwood", "softwood", "straw", "seaweed", "bone_ash"];
}
