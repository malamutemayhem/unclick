export type ToothType = "incisor" | "canine" | "premolar" | "molar" | "wisdom";

export function cuttingAbility(t: ToothType): number {
  const m: Record<ToothType, number> = {
    incisor: 10, canine: 7, premolar: 4, molar: 2, wisdom: 1,
  };
  return m[t];
}

export function grindingAbility(t: ToothType): number {
  const m: Record<ToothType, number> = {
    incisor: 2, canine: 3, premolar: 7, molar: 10, wisdom: 8,
  };
  return m[t];
}

export function rootCount(t: ToothType): number {
  const m: Record<ToothType, number> = {
    incisor: 1, canine: 1, premolar: 1, molar: 3, wisdom: 3,
  };
  return m[t];
}

export function decayRisk(t: ToothType): number {
  const m: Record<ToothType, number> = {
    incisor: 4, canine: 3, premolar: 6, molar: 8, wisdom: 10,
  };
  return m[t];
}

export function eruptionAge(t: ToothType): number {
  const m: Record<ToothType, number> = {
    incisor: 7, canine: 11, premolar: 10, molar: 12, wisdom: 20,
  };
  return m[t];
}

export function visibleWhenSmiling(t: ToothType): boolean {
  const m: Record<ToothType, boolean> = {
    incisor: true, canine: true, premolar: true, molar: false, wisdom: false,
  };
  return m[t];
}

export function commonlyExtracted(t: ToothType): boolean {
  const m: Record<ToothType, boolean> = {
    incisor: false, canine: false, premolar: false, molar: false, wisdom: true,
  };
  return m[t];
}

export function primaryFunction(t: ToothType): string {
  const m: Record<ToothType, string> = {
    incisor: "cutting_biting", canine: "tearing_piercing",
    premolar: "crushing_tearing", molar: "grinding_chewing",
    wisdom: "vestigial_grinding",
  };
  return m[t];
}

export function surfaceShape(t: ToothType): string {
  const m: Record<ToothType, string> = {
    incisor: "flat_chisel", canine: "pointed_conical",
    premolar: "two_cusps", molar: "four_five_cusps",
    wisdom: "irregular_cusps",
  };
  return m[t];
}

export function toothTypes(): ToothType[] {
  return ["incisor", "canine", "premolar", "molar", "wisdom"];
}
