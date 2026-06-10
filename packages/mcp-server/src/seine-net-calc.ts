export type SeineType = "beach_seine" | "purse_seine" | "danish_seine" | "lampara" | "ring_net";

export function netLengthMeters(type: SeineType): number {
  const l: Record<SeineType, number> = {
    beach_seine: 200, purse_seine: 600, danish_seine: 400, lampara: 300, ring_net: 250,
  };
  return l[type];
}

export function depthMeters(type: SeineType): number {
  const d: Record<SeineType, number> = {
    beach_seine: 5, purse_seine: 60, danish_seine: 30, lampara: 20, ring_net: 15,
  };
  return d[type];
}

export function catchCapacityTonnes(type: SeineType): number {
  const c: Record<SeineType, number> = {
    beach_seine: 2, purse_seine: 50, danish_seine: 10, lampara: 5, ring_net: 3,
  };
  return c[type];
}

export function crewSize(type: SeineType): number {
  const c: Record<SeineType, number> = {
    beach_seine: 10, purse_seine: 20, danish_seine: 5, lampara: 8, ring_net: 6,
  };
  return c[type];
}

export function vesselRequired(type: SeineType): boolean {
  return type !== "beach_seine";
}

export function meshSizeCm(type: SeineType): number {
  const m: Record<SeineType, number> = {
    beach_seine: 3, purse_seine: 4, danish_seine: 10, lampara: 3, ring_net: 5,
  };
  return m[type];
}

export function deployTimeMinutes(type: SeineType): number {
  const t: Record<SeineType, number> = {
    beach_seine: 30, purse_seine: 15, danish_seine: 45, lampara: 20, ring_net: 25,
  };
  return t[type];
}

export function targetSpeciesCount(type: SeineType): number {
  const s: Record<SeineType, number> = {
    beach_seine: 8, purse_seine: 3, danish_seine: 5, lampara: 4, ring_net: 6,
  };
  return s[type];
}

export function costEstimate(type: SeineType): number {
  const c: Record<SeineType, number> = {
    beach_seine: 2000, purse_seine: 50000, danish_seine: 15000, lampara: 8000, ring_net: 5000,
  };
  return c[type];
}

export function seineTypes(): SeineType[] {
  return ["beach_seine", "purse_seine", "danish_seine", "lampara", "ring_net"];
}
