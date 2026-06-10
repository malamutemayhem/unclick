export type OvenType = "igloo" | "barrel_vault" | "beehive" | "black_oven" | "white_oven";

export function maxTempCelsius(oven: OvenType): number {
  const t: Record<OvenType, number> = {
    igloo: 500, barrel_vault: 450, beehive: 480, black_oven: 400, white_oven: 350,
  };
  return t[oven];
}

export function heatRetentionHours(oven: OvenType): number {
  const h: Record<OvenType, number> = {
    igloo: 8, barrel_vault: 6, beehive: 10, black_oven: 5, white_oven: 4,
  };
  return h[oven];
}

export function buildDays(oven: OvenType): number {
  const b: Record<OvenType, number> = {
    igloo: 7, barrel_vault: 14, beehive: 10, black_oven: 5, white_oven: 21,
  };
  return b[oven];
}

export function cookingArea(oven: OvenType): number {
  const c: Record<OvenType, number> = {
    igloo: 7, barrel_vault: 9, beehive: 6, black_oven: 5, white_oven: 8,
  };
  return c[oven];
}

export function smokeExposure(oven: OvenType): number {
  const s: Record<OvenType, number> = {
    igloo: 3, barrel_vault: 2, beehive: 4, black_oven: 10, white_oven: 1,
  };
  return s[oven];
}

export function fireRemoved(oven: OvenType): boolean {
  const f: Record<OvenType, boolean> = {
    igloo: true, barrel_vault: true, beehive: true, black_oven: false, white_oven: true,
  };
  return f[oven];
}

export function bestFood(oven: OvenType): string {
  const b: Record<OvenType, string> = {
    igloo: "pizza", barrel_vault: "bread", beehive: "roasts",
    black_oven: "flatbread", white_oven: "pastries",
  };
  return b[oven];
}

export function fuelEfficiency(oven: OvenType): number {
  const f: Record<OvenType, number> = {
    igloo: 7, barrel_vault: 6, beehive: 9, black_oven: 4, white_oven: 5,
  };
  return f[oven];
}

export function buildCost(oven: OvenType): number {
  const c: Record<OvenType, number> = {
    igloo: 800, barrel_vault: 2000, beehive: 1200, black_oven: 400, white_oven: 3000,
  };
  return c[oven];
}

export function ovenTypes(): OvenType[] {
  return ["igloo", "barrel_vault", "beehive", "black_oven", "white_oven"];
}
