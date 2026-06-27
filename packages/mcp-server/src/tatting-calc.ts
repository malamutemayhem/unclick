export type TattingStyle = "shuttle" | "needle" | "cro_tatting" | "split_ring" | "celtic";

export function knotsPerCm(style: TattingStyle): number {
  const k: Record<TattingStyle, number> = {
    shuttle: 6, needle: 5, cro_tatting: 4, split_ring: 7, celtic: 8,
  };
  return k[style];
}

export function threadConsumptionFactor(style: TattingStyle): number {
  const t: Record<TattingStyle, number> = {
    shuttle: 4, needle: 3, cro_tatting: 5, split_ring: 6, celtic: 7,
  };
  return t[style];
}

export function toolsNeeded(style: TattingStyle): number {
  const t: Record<TattingStyle, number> = {
    shuttle: 2, needle: 1, cro_tatting: 1, split_ring: 2, celtic: 2,
  };
  return t[style];
}

export function joinComplexity(style: TattingStyle): number {
  const j: Record<TattingStyle, number> = {
    shuttle: 5, needle: 3, cro_tatting: 4, split_ring: 8, celtic: 9,
  };
  return j[style];
}

export function reversible(style: TattingStyle): boolean {
  return style === "shuttle" || style === "split_ring";
}

export function speedRating(style: TattingStyle): number {
  const s: Record<TattingStyle, number> = {
    shuttle: 6, needle: 8, cro_tatting: 7, split_ring: 4, celtic: 3,
  };
  return s[style];
}

export function dimensionalStability(style: TattingStyle): number {
  const d: Record<TattingStyle, number> = {
    shuttle: 9, needle: 6, cro_tatting: 5, split_ring: 8, celtic: 7,
  };
  return d[style];
}

export function beginnerFriendly(style: TattingStyle): number {
  const b: Record<TattingStyle, number> = {
    shuttle: 4, needle: 8, cro_tatting: 6, split_ring: 3, celtic: 2,
  };
  return b[style];
}

export function costPerProject(style: TattingStyle): number {
  const c: Record<TattingStyle, number> = {
    shuttle: 5, needle: 3, cro_tatting: 4, split_ring: 6, celtic: 8,
  };
  return c[style];
}

export function tattingStyles(): TattingStyle[] {
  return ["shuttle", "needle", "cro_tatting", "split_ring", "celtic"];
}
