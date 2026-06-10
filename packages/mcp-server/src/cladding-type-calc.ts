export type CladdingType = "brick_veneer" | "fiber_cement" | "vinyl" | "stone" | "timber";

export function durabilityYears(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 100, fiber_cement: 50, vinyl: 30, stone: 200, timber: 25,
  };
  return m[clad];
}

export function impactResistance(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 9, fiber_cement: 7, vinyl: 4, stone: 10, timber: 5,
  };
  return m[clad];
}

export function thermalMass(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 8, fiber_cement: 4, vinyl: 1, stone: 10, timber: 3,
  };
  return m[clad];
}

export function maintenanceFrequency(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 1, fiber_cement: 3, vinyl: 2, stone: 1, timber: 7,
  };
  return m[clad];
}

export function aestheticVersatility(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 6, fiber_cement: 8, vinyl: 5, stone: 9, timber: 10,
  };
  return m[clad];
}

export function fireResistant(clad: CladdingType): boolean {
  const m: Record<CladdingType, boolean> = {
    brick_veneer: true, fiber_cement: true, vinyl: false, stone: true, timber: false,
  };
  return m[clad];
}

export function renewable(clad: CladdingType): boolean {
  const m: Record<CladdingType, boolean> = {
    brick_veneer: false, fiber_cement: false, vinyl: false, stone: false, timber: true,
  };
  return m[clad];
}

export function bestStyle(clad: CladdingType): string {
  const m: Record<CladdingType, string> = {
    brick_veneer: "traditional", fiber_cement: "modern", vinyl: "suburban",
    stone: "luxury", timber: "rustic",
  };
  return m[clad];
}

export function costPerSqFt(clad: CladdingType): number {
  const m: Record<CladdingType, number> = {
    brick_veneer: 15, fiber_cement: 8, vinyl: 4, stone: 30, timber: 12,
  };
  return m[clad];
}

export function claddingTypes(): CladdingType[] {
  return ["brick_veneer", "fiber_cement", "vinyl", "stone", "timber"];
}
