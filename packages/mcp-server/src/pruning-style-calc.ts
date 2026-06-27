export type PruningStyle = "topiary" | "espalier" | "pollard" | "coppice" | "bonsai";

export function skillRequired(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 9, espalier: 8, pollard: 5, coppice: 3, bonsai: 10,
  };
  return m[style];
}

export function maintenanceFrequency(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 9, espalier: 7, pollard: 4, coppice: 2, bonsai: 10,
  };
  return m[style];
}

export function yearsToMature(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 5, espalier: 4, pollard: 3, coppice: 7, bonsai: 10,
  };
  return m[style];
}

export function aestheticValue(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 10, espalier: 8, pollard: 5, coppice: 4, bonsai: 10,
  };
  return m[style];
}

export function productiveYield(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 1, espalier: 8, pollard: 6, coppice: 9, bonsai: 0,
  };
  return m[style];
}

export function fruitBearing(style: PruningStyle): boolean {
  const m: Record<PruningStyle, boolean> = {
    topiary: false, espalier: true, pollard: false, coppice: false, bonsai: false,
  };
  return m[style];
}

export function indoorSuitable(style: PruningStyle): boolean {
  const m: Record<PruningStyle, boolean> = {
    topiary: false, espalier: false, pollard: false, coppice: false, bonsai: true,
  };
  return m[style];
}

export function bestTreeType(style: PruningStyle): string {
  const m: Record<PruningStyle, string> = {
    topiary: "boxwood", espalier: "apple", pollard: "willow",
    coppice: "hazel", bonsai: "juniper",
  };
  return m[style];
}

export function toolComplexity(style: PruningStyle): number {
  const m: Record<PruningStyle, number> = {
    topiary: 7, espalier: 6, pollard: 4, coppice: 3, bonsai: 9,
  };
  return m[style];
}

export function pruningStyles(): PruningStyle[] {
  return ["topiary", "espalier", "pollard", "coppice", "bonsai"];
}
