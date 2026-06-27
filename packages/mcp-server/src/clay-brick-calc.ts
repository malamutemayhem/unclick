export type ClayBrick = "common" | "facing" | "engineering" | "firebrick" | "adobe";

export function compressiveStrengthMpa(brick: ClayBrick): number {
  const c: Record<ClayBrick, number> = {
    common: 10, facing: 20, engineering: 70, firebrick: 15, adobe: 2,
  };
  return c[brick];
}

export function firingTempCelsius(brick: ClayBrick): number {
  const f: Record<ClayBrick, number> = {
    common: 1000, facing: 1100, engineering: 1300, firebrick: 1500, adobe: 0,
  };
  return f[brick];
}

export function waterAbsorptionPercent(brick: ClayBrick): number {
  const w: Record<ClayBrick, number> = {
    common: 20, facing: 8, engineering: 4, firebrick: 10, adobe: 25,
  };
  return w[brick];
}

export function thermalMass(brick: ClayBrick): number {
  const t: Record<ClayBrick, number> = {
    common: 7, facing: 7, engineering: 8, firebrick: 10, adobe: 9,
  };
  return t[brick];
}

export function frostResistance(brick: ClayBrick): number {
  const f: Record<ClayBrick, number> = {
    common: 4, facing: 7, engineering: 10, firebrick: 3, adobe: 1,
  };
  return f[brick];
}

export function sunDried(brick: ClayBrick): boolean {
  const s: Record<ClayBrick, boolean> = {
    common: false, facing: false, engineering: false, firebrick: false, adobe: true,
  };
  return s[brick];
}

export function bestApplication(brick: ClayBrick): string {
  const b: Record<ClayBrick, string> = {
    common: "interior_walls", facing: "exterior_facades", engineering: "foundations",
    firebrick: "kilns", adobe: "desert_homes",
  };
  return b[brick];
}

export function lifespanYears(brick: ClayBrick): number {
  const l: Record<ClayBrick, number> = {
    common: 100, facing: 150, engineering: 200, firebrick: 50, adobe: 80,
  };
  return l[brick];
}

export function costPer1000(brick: ClayBrick): number {
  const c: Record<ClayBrick, number> = {
    common: 300, facing: 600, engineering: 1000, firebrick: 1500, adobe: 100,
  };
  return c[brick];
}

export function clayBricks(): ClayBrick[] {
  return ["common", "facing", "engineering", "firebrick", "adobe"];
}
