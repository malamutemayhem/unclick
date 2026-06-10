export type TanningAgent = "oak_bark" | "chestnut" | "mimosa" | "quebracho" | "sumac";

export function tanningWeeks(agent: TanningAgent): number {
  const w: Record<TanningAgent, number> = {
    oak_bark: 12, chestnut: 8, mimosa: 4, quebracho: 6, sumac: 10,
  };
  return w[agent];
}

export function colorProduced(agent: TanningAgent): string {
  const c: Record<TanningAgent, string> = {
    oak_bark: "golden_brown", chestnut: "reddish_brown",
    mimosa: "light_tan", quebracho: "dark_red", sumac: "pale_cream",
  };
  return c[agent];
}

export function concentrationPercent(agent: TanningAgent): number {
  const c: Record<TanningAgent, number> = {
    oak_bark: 10, chestnut: 12, mimosa: 15, quebracho: 20, sumac: 8,
  };
  return c[agent];
}

export function phRange(agent: TanningAgent): { min: number; max: number } {
  const r: Record<TanningAgent, { min: number; max: number }> = {
    oak_bark: { min: 3.5, max: 4.5 }, chestnut: { min: 3.0, max: 4.0 },
    mimosa: { min: 4.0, max: 5.0 }, quebracho: { min: 3.5, max: 4.5 },
    sumac: { min: 4.0, max: 5.5 },
  };
  return r[agent];
}

export function leatherFirmness(agent: TanningAgent): number {
  const f: Record<TanningAgent, number> = {
    oak_bark: 9, chestnut: 7, mimosa: 5, quebracho: 8, sumac: 4,
  };
  return f[agent];
}

export function toolabilityRating(agent: TanningAgent): number {
  const t: Record<TanningAgent, number> = {
    oak_bark: 9, chestnut: 7, mimosa: 6, quebracho: 5, sumac: 8,
  };
  return t[agent];
}

export function lightfastness(agent: TanningAgent): number {
  const l: Record<TanningAgent, number> = {
    oak_bark: 7, chestnut: 5, mimosa: 6, quebracho: 8, sumac: 4,
  };
  return l[agent];
}

export function availabilityRating(agent: TanningAgent): number {
  const a: Record<TanningAgent, number> = {
    oak_bark: 6, chestnut: 7, mimosa: 9, quebracho: 8, sumac: 5,
  };
  return a[agent];
}

export function costPerKg(agent: TanningAgent): number {
  const c: Record<TanningAgent, number> = {
    oak_bark: 15, chestnut: 12, mimosa: 8, quebracho: 10, sumac: 20,
  };
  return c[agent];
}

export function tanningAgents(): TanningAgent[] {
  return ["oak_bark", "chestnut", "mimosa", "quebracho", "sumac"];
}
