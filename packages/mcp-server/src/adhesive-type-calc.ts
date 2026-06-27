export type AdhesiveType = "epoxy" | "cyanoacrylate" | "pva" | "hot_melt" | "contact";

export function bondStrength(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 10, cyanoacrylate: 8, pva: 5, hot_melt: 4, contact: 7,
  };
  return m[adh];
}

export function cureTimeMinutes(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 60, cyanoacrylate: 1, pva: 30, hot_melt: 2, contact: 15,
  };
  return m[adh];
}

export function heatResistanceCelsius(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 200, cyanoacrylate: 80, pva: 60, hot_melt: 70, contact: 100,
  };
  return m[adh];
}

export function flexibility(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 3, cyanoacrylate: 2, pva: 7, hot_melt: 8, contact: 9,
  };
  return m[adh];
}

export function gapFilling(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 10, cyanoacrylate: 1, pva: 5, hot_melt: 8, contact: 3,
  };
  return m[adh];
}

export function waterproof(adh: AdhesiveType): boolean {
  const m: Record<AdhesiveType, boolean> = {
    epoxy: true, cyanoacrylate: true, pva: false, hot_melt: false, contact: true,
  };
  return m[adh];
}

export function repositionable(adh: AdhesiveType): boolean {
  const m: Record<AdhesiveType, boolean> = {
    epoxy: false, cyanoacrylate: false, pva: true, hot_melt: true, contact: false,
  };
  return m[adh];
}

export function bestMaterial(adh: AdhesiveType): string {
  const m: Record<AdhesiveType, string> = {
    epoxy: "metal", cyanoacrylate: "plastic", pva: "wood",
    hot_melt: "craft", contact: "laminate",
  };
  return m[adh];
}

export function shelfLifeMonths(adh: AdhesiveType): number {
  const m: Record<AdhesiveType, number> = {
    epoxy: 24, cyanoacrylate: 12, pva: 36, hot_melt: 60, contact: 24,
  };
  return m[adh];
}

export function adhesiveTypes(): AdhesiveType[] {
  return ["epoxy", "cyanoacrylate", "pva", "hot_melt", "contact"];
}
