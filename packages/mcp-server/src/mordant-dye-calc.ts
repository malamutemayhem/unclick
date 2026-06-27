export type MordantType = "alum" | "iron" | "copper" | "chrome" | "tin";

export function colorfastnessRating(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 7, iron: 8, copper: 6, chrome: 9, tin: 5,
  };
  return m[mordant];
}

export function toxicity(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 1, iron: 2, copper: 5, chrome: 9, tin: 4,
  };
  return m[mordant];
}

export function colorShift(mordant: MordantType): string {
  const m: Record<MordantType, string> = {
    alum: "brightens", iron: "darkens", copper: "greens",
    chrome: "intensifies", tin: "brightens_warm",
  };
  return m[mordant];
}

export function concentrationPercent(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 15, iron: 2, copper: 3, chrome: 3, tin: 5,
  };
  return m[mordant];
}

export function soakTimeHours(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 1, iron: 0.5, copper: 2, chrome: 1, tin: 0.5,
  };
  return m[mordant];
}

export function fiberDamage(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 1, iron: 3, copper: 4, chrome: 2, tin: 6,
  };
  return m[mordant];
}

export function ecoFriendly(mordant: MordantType): boolean {
  const m: Record<MordantType, boolean> = {
    alum: true, iron: true, copper: false, chrome: false, tin: false,
  };
  return m[mordant];
}

export function bestFiber(mordant: MordantType): string {
  const m: Record<MordantType, string> = {
    alum: "wool", iron: "cellulose", copper: "silk",
    chrome: "wool", tin: "silk",
  };
  return m[mordant];
}

export function costPerKg(mordant: MordantType): number {
  const m: Record<MordantType, number> = {
    alum: 8, iron: 5, copper: 25, chrome: 40, tin: 35,
  };
  return m[mordant];
}

export function mordantTypes(): MordantType[] {
  return ["alum", "iron", "copper", "chrome", "tin"];
}
