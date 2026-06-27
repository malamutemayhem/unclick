export type StillType = "pot" | "column" | "reflux" | "alembic" | "hybrid";

export function purityRating(still: StillType): number {
  const p: Record<StillType, number> = {
    pot: 5, column: 9, reflux: 10, alembic: 4, hybrid: 8,
  };
  return p[still];
}

export function flavorRetention(still: StillType): number {
  const f: Record<StillType, number> = {
    pot: 9, column: 3, reflux: 2, alembic: 10, hybrid: 6,
  };
  return f[still];
}

export function outputAbvPercent(still: StillType): number {
  const o: Record<StillType, number> = {
    pot: 65, column: 95, reflux: 96, alembic: 55, hybrid: 85,
  };
  return o[still];
}

export function runTimeHours(still: StillType): number {
  const r: Record<StillType, number> = {
    pot: 8, column: 4, reflux: 6, alembic: 10, hybrid: 5,
  };
  return r[still];
}

export function capacityLiters(still: StillType): number {
  const c: Record<StillType, number> = {
    pot: 100, column: 500, reflux: 50, alembic: 30, hybrid: 200,
  };
  return c[still];
}

export function copperContact(still: StillType): number {
  const c: Record<StillType, number> = {
    pot: 8, column: 6, reflux: 5, alembic: 10, hybrid: 7,
  };
  return c[still];
}

export function skillRequired(still: StillType): number {
  const s: Record<StillType, number> = {
    pot: 6, column: 4, reflux: 7, alembic: 8, hybrid: 5,
  };
  return s[still];
}

export function bestSpirit(still: StillType): string {
  const b: Record<StillType, string> = {
    pot: "whiskey", column: "vodka", reflux: "neutral_spirit",
    alembic: "brandy", hybrid: "gin",
  };
  return b[still];
}

export function costEstimate(still: StillType): number {
  const c: Record<StillType, number> = {
    pot: 2000, column: 8000, reflux: 1500, alembic: 3000, hybrid: 5000,
  };
  return c[still];
}

export function stillTypes(): StillType[] {
  return ["pot", "column", "reflux", "alembic", "hybrid"];
}
