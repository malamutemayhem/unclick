export type BarrelType = "american_oak" | "french_oak" | "sherry" | "port" | "bourbon";

export function volumeLiters(barrel: BarrelType): number {
  const v: Record<BarrelType, number> = {
    american_oak: 200, french_oak: 225, sherry: 500, port: 550, bourbon: 200,
  };
  return v[barrel];
}

export function charLevel(barrel: BarrelType): number {
  const c: Record<BarrelType, number> = {
    american_oak: 4, french_oak: 2, sherry: 1, port: 1, bourbon: 4,
  };
  return c[barrel];
}

export function vanillinContribution(barrel: BarrelType): number {
  const v: Record<BarrelType, number> = {
    american_oak: 9, french_oak: 7, sherry: 3, port: 3, bourbon: 8,
  };
  return v[barrel];
}

export function tanninLevel(barrel: BarrelType): number {
  const t: Record<BarrelType, number> = {
    american_oak: 5, french_oak: 8, sherry: 4, port: 5, bourbon: 4,
  };
  return t[barrel];
}

export function usableFills(barrel: BarrelType): number {
  const u: Record<BarrelType, number> = {
    american_oak: 3, french_oak: 4, sherry: 3, port: 3, bourbon: 1,
  };
  return u[barrel];
}

export function angelsSharePercent(barrel: BarrelType): number {
  const a: Record<BarrelType, number> = {
    american_oak: 2, french_oak: 3, sherry: 4, port: 4, bourbon: 2,
  };
  return a[barrel];
}

export function colorImparted(barrel: BarrelType): string {
  const c: Record<BarrelType, string> = {
    american_oak: "golden", french_oak: "amber", sherry: "mahogany",
    port: "ruby", bourbon: "caramel",
  };
  return c[barrel];
}

export function bestSpirit(barrel: BarrelType): string {
  const b: Record<BarrelType, string> = {
    american_oak: "bourbon", french_oak: "cognac", sherry: "scotch",
    port: "rum", bourbon: "rye_whiskey",
  };
  return b[barrel];
}

export function costPerBarrel(barrel: BarrelType): number {
  const c: Record<BarrelType, number> = {
    american_oak: 400, french_oak: 1200, sherry: 2000, port: 1800, bourbon: 250,
  };
  return c[barrel];
}

export function barrelTypes(): BarrelType[] {
  return ["american_oak", "french_oak", "sherry", "port", "bourbon"];
}
