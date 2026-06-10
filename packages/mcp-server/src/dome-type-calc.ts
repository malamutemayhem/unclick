export type DomeType = "hemispherical" | "onion" | "geodesic" | "saucer" | "pendentive";

export function maxSpanMeters(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 40, onion: 15, geodesic: 60, saucer: 50, pendentive: 30,
  };
  return m[dome];
}

export function structuralEfficiency(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 8, onion: 5, geodesic: 10, saucer: 6, pendentive: 7,
  };
  return m[dome];
}

export function windResistance(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 8, onion: 5, geodesic: 9, saucer: 7, pendentive: 7,
  };
  return m[dome];
}

export function interiorVolume(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 8, onion: 6, geodesic: 9, saucer: 5, pendentive: 7,
  };
  return m[dome];
}

export function aestheticImpact(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 7, onion: 9, geodesic: 6, saucer: 5, pendentive: 8,
  };
  return m[dome];
}

export function squareBase(dome: DomeType): boolean {
  const m: Record<DomeType, boolean> = {
    hemispherical: false, onion: false, geodesic: false, saucer: false, pendentive: true,
  };
  return m[dome];
}

export function modernMaterial(dome: DomeType): boolean {
  const m: Record<DomeType, boolean> = {
    hemispherical: false, onion: false, geodesic: true, saucer: true, pendentive: false,
  };
  return m[dome];
}

export function bestApplication(dome: DomeType): string {
  const m: Record<DomeType, string> = {
    hemispherical: "pantheon", onion: "orthodox_church", geodesic: "exhibition_hall",
    saucer: "sports_arena", pendentive: "byzantine_church",
  };
  return m[dome];
}

export function costPerM2(dome: DomeType): number {
  const m: Record<DomeType, number> = {
    hemispherical: 400, onion: 600, geodesic: 300, saucer: 350, pendentive: 500,
  };
  return m[dome];
}

export function domeTypes(): DomeType[] {
  return ["hemispherical", "onion", "geodesic", "saucer", "pendentive"];
}
