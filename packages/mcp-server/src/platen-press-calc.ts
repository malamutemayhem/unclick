export type PressType = "clamshell" | "cylinder" | "flatbed" | "proof" | "tabletop";

export function maxSheetSizeCm(type: PressType): { w: number; h: number } {
  const sizes: Record<PressType, { w: number; h: number }> = {
    clamshell: { w: 33, h: 48 }, cylinder: { w: 56, h: 76 },
    flatbed: { w: 71, h: 102 }, proof: { w: 30, h: 45 },
    tabletop: { w: 15, h: 23 },
  };
  return sizes[type];
}

export function impressionsPerHour(type: PressType): number {
  const iph: Record<PressType, number> = {
    clamshell: 2500, cylinder: 4000, flatbed: 1500, proof: 30, tabletop: 200,
  };
  return iph[type];
}

export function maxPressurePsi(type: PressType): number {
  const p: Record<PressType, number> = {
    clamshell: 200, cylinder: 150, flatbed: 300, proof: 100, tabletop: 80,
  };
  return p[type];
}

export function motorized(type: PressType): boolean {
  return type === "clamshell" || type === "cylinder" || type === "flatbed";
}

export function inkDistributionRollers(type: PressType): number {
  const r: Record<PressType, number> = {
    clamshell: 6, cylinder: 10, flatbed: 8, proof: 1, tabletop: 2,
  };
  return r[type];
}

export function registrationAccuracyMm(type: PressType): number {
  const a: Record<PressType, number> = {
    clamshell: 0.5, cylinder: 0.2, flatbed: 0.3, proof: 1, tabletop: 1.5,
  };
  return a[type];
}

export function weightKg(type: PressType): number {
  const w: Record<PressType, number> = {
    clamshell: 500, cylinder: 2000, flatbed: 3000, proof: 50, tabletop: 15,
  };
  return w[type];
}

export function beginnerFriendly(type: PressType): boolean {
  return type === "tabletop" || type === "proof";
}

export function costEstimate(type: PressType): number {
  const c: Record<PressType, number> = {
    clamshell: 5000, cylinder: 15000, flatbed: 25000, proof: 1000, tabletop: 300,
  };
  return c[type];
}

export function pressTypes(): PressType[] {
  return ["clamshell", "cylinder", "flatbed", "proof", "tabletop"];
}
